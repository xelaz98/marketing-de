// Deterministisches Simulationsmodell der Agentur.
// Für jeden Kanal mit Budget b:
//   Zielgruppe  = Segmentgröße × Präsenz im Kanal (E-Mail: Listengröße; Retargeting: Klickende ohne Kauf der Vorwoche)
//   Obergrenze  = Zielgruppe × maxFreq                           (wie viele Einblendungen der Kanal pro Woche „verträgt“)
//   Impressionen = Obergrenze × (1 − e^(−roh/Obergrenze)), roh = b / CPM × 1000   → abnehmender Grenzertrag
//   Reichweite  = Zielgruppe × (1 − e^(−Impressionen/Zielgruppe));  Frequenz = Impressionen / Reichweite
//   CTR         = Basis-CTR × Kanalrelevanz × Anzeige (A/B) × Position × Müdigkeit × Überfrequenz × Krise
//   Conversion  = Basis-CVR × Angebot (Stärke abhängig von Preissensibilität) × Position × Landingpage × Krise
//   Umsatz      = Conversions × Wert × (1 − Rabatt);  Rohertrag = Umsatz − Wareneinsatz − Angebotskosten pro Conversion
const SOCIAL = new Set(["meta", "tiktok", "youtube", "linkedin", "influencer"]);

function newRun(clientId) {
  const cl = CLIENT[clientId];
  return { client: clientId, week: 1, seg: null, pos: null, offer: null, copy: null, alloc: {}, budget: cl.budget, creativeAge: 0, landing: 1,
    lookalike: false, keywords: false, retargetOn: false, retargetAud: 0, crisis: { ctr: 1, cvr: 1 }, sat: 60, history: [], decisions: [], landingCost: 0 };
}

function simulate(cl, s) {
  const seg = cl.segments.find((x) => x.id === s.seg), pos = cl.positions.find((x) => x.id === s.pos);
  const offer = cl.offers.find((x) => x.id === s.offer), copy = cl.copies.find((x) => x.id === s.copy);
  const posFit = pos.fit[seg.id];
  const offerCvr = 1 + (offer.cvr - 1) * (0.5 + seg.ps);
  const valPer = cl.value * (seg.valueMult || 1) * offer.val;
  const rows = [];
  for (const ch of Object.keys(s.alloc)) {
    const b = +s.alloc[ch] || 0; if (b <= 0) continue;
    const C = CHANNELS[ch];
    let aud, fit;
    if (ch === "email") { aud = cl.emailList; fit = seg.f.email != null ? seg.f.email : 1; }
    else if (ch === "retarget") { aud = s.retargetAud; fit = 1.2; }
    else { aud = seg.size * (seg.p[ch] || 0) * (s.lookalike && SOCIAL.has(ch) ? 1.5 : 1); fit = (seg.f[ch] || 0.5) * (s.lookalike && SOCIAL.has(ch) ? 0.85 : 1); }
    const cap = aud * C.maxFreq, raw = b / C.cpm * 1000;
    const imp = cap > 0 ? cap * (1 - Math.exp(-raw / cap)) : 0;
    const reach = aud > 0 ? aud * (1 - Math.exp(-imp / aud)) : 0;
    const freq = reach > 0 ? imp / reach : 0;
    const fat = C.fatigue ? Math.max(0.6, 1 - 0.1 * s.creativeAge) : 1;
    const over = freq > 4 ? 1 / (1 + 0.08 * (freq - 4)) : 1;
    const kwCtr = ch === "search" && s.keywords ? 1.2 : 1, kwCvr = ch === "search" && s.keywords ? 1.15 : 1;
    const ctr = C.ctr * fit * copy.mult * posFit * fat * over * kwCtr * s.crisis.ctr;
    const clicks = imp * ctr;
    const cvr = Math.min(0.6, C.cvr * (cl.cvrMult || 1) * offerCvr * posFit * s.landing * kwCvr * s.crisis.cvr);
    const conv = clicks * cvr;
    const rev = conv * valPer * (1 - offer.disc);
    const gp = rev - conv * valPer * (1 - cl.margin) - conv * offer.cost;
    rows.push({ ch, spend: b, aud, cap, raw, imp, reach, freq, ctr, clicks, cvr, conv, rev, gp, cpa: conv > 0 ? b / conv : Infinity, sat: raw / Math.max(cap, 1), fit, fat });
  }
  const T = rows.reduce((a, r) => { ["spend", "imp", "clicks", "conv", "rev", "gp"].forEach((k) => (a[k] += r[k])); return a; }, { spend: 0, imp: 0, clicks: 0, conv: 0, rev: 0, gp: 0 });
  T.spend += s.landingCost || 0;
  // Reichweite ohne Doppelzählung zwischen Kanälen (unabhängige Überschneidung); E-Mail und Retargeting sind dieselben Menschen
  const notSeen = rows.filter((r) => r.ch !== "email" && r.ch !== "retarget").reduce((p, r) => p * (1 - r.reach / seg.size), 1);
  T.reach = seg.size * (1 - notSeen) + rows.filter((r) => r.ch === "email").reduce((a, r) => a + r.reach * 0.6, 0);
  T.ctr = T.imp ? T.clicks / T.imp : 0; T.cvr = T.clicks ? T.conv / T.clicks : 0;
  T.offerCost = rows.reduce((a, r) => a + r.conv * (offer.cost + valPer * offer.disc), 0);
  T.cpa = T.conv > 0 ? T.spend / T.conv : Infinity; T.cac = T.conv > 0 ? (T.spend + T.offerCost) / T.conv : Infinity; T.roas = T.spend ? T.rev / T.spend : 0;
  T.profit = T.gp - T.spend; T.roi = T.spend ? T.profit / T.spend : 0;
  const g = cl.goal;
  T.ratio = g.kpi === "conv" ? T.conv / g.target : g.kpi === "roas" ? T.roas / g.target : g.kpi === "cac" ? (T.conv > 0 ? g.target / T.cac : 0) : (T.conv > 0 ? g.target / T.cpa : 0);
  T.goalOk = T.ratio >= 1;
  return { rows, T, seg, pos, offer, copy, posFit, valPer };
}

// Mentor-Analyse: welche Entscheidung was bewirkt hat, mit Bezug zu den Begriffen
function mentorNotes(cl, s, R) {
  const N = [], add = (tone, text, terms) => N.push({ tone, text, terms: terms || [] });
  const { rows, T, seg, pos, offer, copy, posFit } = R;
  // Ziel
  const kpiTxt = cl.goal.kpi === "conv" ? `${fmt(T.conv, 0)} ${cl.convName} bei Ziel ${cl.goal.target}` : cl.goal.kpi === "roas" ? `ROAS ${fmt(T.roas, 2)} bei Ziel ${cl.goal.target}` : cl.goal.kpi === "cac" ? `CAC ${fmt(T.cac, 0)} € (Werbung ${fmt(T.cpa, 0)} + Angebot ${fmt(T.conv ? T.offerCost / T.conv : 0, 0)} pro Kunde) bei Ziel ≤ ${cl.goal.target} €` : `CPA ${fmt(T.cpa, 0)} € bei Ziel ≤ ${cl.goal.target} €`;
  add(T.goalOk ? "good" : "bad", `${T.goalOk ? "Ziel erreicht" : "Ziel nicht erreicht"}: ${kpiTxt}. ${T.goalOk ? "Der Kunde ist zufrieden und erhöht das Budget." : "Der Kunde ist besorgt — das Budget könnte gekürzt werden."}`, ["kpi"]);
  // Positionierung
  if (posFit >= 1.25) add("good", `Die Position ${pos.text} passt stark zum Segment „${seg.name}“ (×${fmt(posFit, 2)} auf CTR und Conversion). Das ist STP in Aktion: Die Position wird für das konkrete Segment gewählt.`, ["positioning", "stp"]);
  else if (posFit < 0.95) add("bad", `Die Position ${pos.text} verfängt beim Segment „${seg.name}“ nicht (×${fmt(posFit, 2)}). Sie brauchen einen anderen Nutzen — sieh dir die Persona an: „${seg.persona}“`, ["positioning", "buyer-persona", "points-of-difference"]);
  // Anzeige A/B
  add(copy.mult >= 1 ? "good" : "bad", `Anzeigentext ${copy.id} (×${fmt(copy.mult, 2)} auf die CTR): ${copy.why}`, copy.mult >= 1 ? ["call-to-action", "aida"] : ["points-of-parity", "call-to-action"]);
  // Angebot
  const offerCost = T.offerCost;
  if (offer.id !== "none") add(T.profit < 0 && offerCost > T.gp * 0.5 ? "bad" : "info", `Angebot „${offer.name}“: ${offer.note} Angebotskosten diese Woche ≈ ${fmtLv(offerCost, 0)}${seg.ps >= 0.7 ? "; das Segment ist preissensibel, deshalb wirkt das Angebot stark" : seg.ps <= 0.4 ? "; das Segment ist wenig preissensibel — das Angebot wirkt schwach" : ""}.`, offer.disc > 0 ? ["promotional-pricing", "gross-margin"] : ["sales-promotion"]);
  // Kanäle
  const conv = rows.filter((r) => r.conv >= 0.5 && isFinite(r.cpa)).sort((a, b) => a.cpa - b.cpa);
  if (conv.length >= 2) { const a = conv[0], z = conv[conv.length - 1];
    if (z.cpa > a.cpa * 1.6) add("info", `Günstigste ${cl.convName}: ${CHANNELS[a.ch].name} (CPA ${fmtLv(a.cpa, 0)}); teuerste: ${CHANNELS[z.ch].name} (CPA ${fmtLv(z.cpa, 0)}). Verschiebt Budget in den effizienteren Kanal — bis er gesättigt ist.`, ["cpa"]); }
  rows.forEach((r) => {
    const C = CHANNELS[r.ch];
    if (r.sat > 1.5) add("bad", `${C.name}: Kanal gesättigt — ihr habt ${fmt(r.raw, 0)} Einblendungen gekauft, die Zielgruppe verträgt ~${fmt(r.cap, 0)} pro Woche. Erhalten: ${fmt(r.imp, 0)} (Frequenz ${fmt(r.freq, 1)}). Jeder weitere Euro bringt immer weniger.`, ["frequency", "reach", "impressions"]);
    else if (r.ch !== "email" && r.ch !== "retarget" && (seg.p[r.ch] || 0) < 0.12) add("bad", `${C.name}: nur ~${fmt((seg.p[r.ch] || 0) * 100, 0)} % des Segments „${seg.name}“ sind hier erreichbar${r.ch === "search" ? " pro Woche (wenige suchen aktiv — aber mit hoher Absicht)" : ""}.`, r.ch === "search" ? ["search-intent"] : ["targeting", "media-plan"]);
    if (r.ch !== "email" && r.ch !== "retarget" && r.fit < 0.8) add("bad", `${C.name} ist für „${seg.name}“ wenig relevant (×${fmt(r.fit, 2)} auf die CTR).`, ["targeting"]);
    if (r.conv < 0.5 && r.spend >= 50) add("bad", `${C.name}: ${fmtLv(r.spend, 0)} ohne eine einzige Conversion.`, ["cpa"]);
    if (C.fatigue && s.creativeAge >= 2) add("bad", `${C.name}: Die Kreation ist ${s.creativeAge + 1} Wochen alt — die CTR sinkt (×${fmt(r.fat, 2)}). Erneuert die Anzeigen.`, ["frequency", "ctr"]);
    if (r.ch === "retarget" && r.conv >= 0.5) add("info", `Retargeting: hohe Conversion (${fmtPct(r.cvr * 100)}), aber kleine Zielgruppe (${fmt(r.aud, 0)} Personen) — und ein Teil hätte auch ohne gekauft. Deshalb überschätzt ihn der Last-Click-Bericht.`, ["retargeting", "incrementality", "last-click-attribution"]);
  });
  if (!s.alloc.email && cl.emailList && cl.channels.includes("email")) add("info", `Ihr habt die E-Mail-Liste (${fmt(cl.emailList)} Personen) nicht genutzt — ein eigener Kanal mit sehr niedrigen Kosten.`, ["owned-media", "email-marketing"]);
  if (s.alloc.email > 0) { const r = rows.find((x) => x.ch === "email"); if (r && r.sat > 1.2) add("info", `E-Mail ist günstig, aber die Liste ist begrenzt: Mehr als 2 Mails pro Woche und Person bringen wenig.`, ["email-marketing"]); }
  // Wirtschaftlichkeit
  const be = 1 / cl.margin;
  add(T.profit >= 0 ? "good" : "info", `Wirtschaftlichkeit: Umsatz ${fmtLv(T.rev, 0)}, ROAS ${fmt(T.roas, 2)} (Break-even bei ROAS ${fmt(be, 2)} = 1 / Marge ${fmt(cl.margin * 100, 0)} %), ROI ${fmtPct(T.roi * 100, 0)}.${cl.id === "gym" || cl.id === "saas" ? " Der Wert gilt für die gesamte Kundendauer (LTV), deshalb kann die Kampagne diese Woche „im Minus“ sein und sich trotzdem lohnen." : ""}`, ["roas", "roi", cl.id === "gym" || cl.id === "saas" ? "ltv" : "gross-margin"]);
  const order = { bad: 0, info: 1, good: 2 };
  return N.sort((a, b) => order[a.tone] - order[b.tone]);
}

// Wendet die Entscheidungen auf die nächste Woche an und liefert das Ergebnis
function runWeek(s) {
  const cl = CLIENT[s.client];
  const R = simulate(cl, s);
  const notes = mentorNotes(cl, s, R);
  const prevSat = s.sat;
  s.sat = clamp(Math.round(s.sat + clamp((R.T.ratio - 1) * 25, -15, 15)), 0, 100);
  const xp = 10 + Math.round(10 * Math.min(R.T.ratio, 1.5));
  const nextBudget = R.T.ratio >= 1 ? Math.min(cl.budget * 2, Math.round(s.budget * 1.2 / 10) * 10) : R.T.ratio < 0.7 ? Math.max(Math.round(cl.budget * 0.6), Math.round(s.budget * 0.9 / 10) * 10) : s.budget;
  const res = { week: s.week, alloc: Object.assign({}, s.alloc), T: R.T, rows: R.rows.map((r) => ({ ch: r.ch, spend: r.spend, imp: r.imp, reach: r.reach, freq: r.freq, clicks: r.clicks, ctr: r.ctr, conv: r.conv, cvr: r.cvr, cpa: r.cpa, rev: r.rev })),
    notes, satBefore: prevSat, satAfter: s.sat, budget: s.budget, nextBudget, xp };
  s.history.push(res);
  // Vorbereitung der nächsten Woche
  s.retargetAud = Math.max(0, R.T.clicks - R.T.conv);
  s.creativeAge++;
  s.landingCost = 0;
  s.budget = nextBudget;
  s.week++;
  return res;
}
function applyAction(s, id) {
  if (id === "refresh") s.creativeAge = 0;
  if (id === "landing" && s.landing === 1) { s.landing = 1.2; s.landingCost = 150; }
  if (id === "retarget") s.retargetOn = true;
  if (id === "lookalike") s.lookalike = true;
  if (id === "keywords") s.keywords = true;
}
function applyEvent(s, opt) {
  s.sat = clamp(s.sat + opt.sat, 0, 100);
  s.crisis = { ctr: s.crisis.ctr * opt.ctr, cvr: s.crisis.cvr * opt.cvr };
}
function rankOf(xp) { let r = RANKS[0]; RANKS.forEach((x) => { if (xp >= x.min) r = x; }); return r; }
