// Aufgabengeneratoren. Jede Aufgabe:
// { type, kind: mcq|input|order|match|open, prompt, sub, options[{html, why}], answer, why, terms[], key (für „Meine Fehler“) }
// input: { accept[] | num:{value, tol}, unit, answerText }

// Oberbegriffe, die als falsche Option bei „Welcher Begriff beschreibt die Situation?“ ungeeignet sind (decken viele andere ab)
const UMBRELLA = new Set(["marketing", "marketing-mix", "4p", "7p", "stp", "product-life-cycle", "marketing-funnel", "consumer-behavior", "marketing-environment",
  "promotion-mix", "marketing-research", "marketing-plan", "social-media-marketing", "e-commerce", "gdpr", "unfair-commercial-practices", "attribution", "swot",
  "ansoff-matrix", "bcg-matrix", "marketing-budget", "intermediary", "brand", "segmentation", "distribution-channel", "seo", "sem", "imc"]);
// Gruppen naher Begriffe, die in Situations- und Lückenaufgaben nicht als falsche Optionen füreinander dienen
const RELATED_GROUPS = [
  ["niche", "concentrated-marketing", "focus-strategy"], ["segmentation", "market-segment"], ["usp", "value-proposition", "points-of-difference", "differentiation", "competitive-advantage"],
  ["positioning", "positioning-statement", "repositioning", "differentiation"], ["customer-journey", "buyer-decision-process", "touchpoint"],
  ["buyer-decision-process", "need-recognition", "information-search", "evaluation-of-alternatives", "purchase-decision", "post-purchase-behavior"],
  ["post-purchase-behavior", "cognitive-dissonance"], ["marketing-funnel", "funnel-conversion", "aida"], ["bofu", "retargeting"], ["tofu", "brand-marketing", "content-marketing"],
  ["mofu", "lead-magnet", "content-marketing"], ["performance-marketing", "affiliate-marketing", "ppc", "sem"], ["influencer-marketing", "opinion-leader", "reference-group"],
  ["earned-media", "word-of-mouth", "ugc", "public-relations"], ["owned-media", "email-marketing", "content-marketing"], ["paid-media", "advertising", "display-advertising", "atl"],
  ["sales-promotion", "promotional-pricing", "btl"], ["direct-marketing", "email-marketing", "marketing-automation"], ["need", "maslow-s-hierarchy", "motivation"],
  ["perception", "selective-attention"], ["habitual-buying-behavior", "involvement"], ["intangibility", "physical-evidence"], ["variability", "process"],
  ["inseparability", "people"], ["customer-retention", "crm", "churn-rate", "retention-rate"], ["b2b", "buying-center", "personal-selling"],
  ["psychographic-segmentation", "lifestyle"], ["behavioral-segmentation", "benefit-segmentation", "occasion-segmentation", "usage-rate"],
  ["product-line", "product-line-depth", "product-mix", "product-mix-width"], ["npd", "mvp", "product-market-fit"], ["brand", "brand-equity"],
  ["price-anchoring", "reference-price"], ["loss-leader", "promotional-pricing"], ["markup", "cost-plus-pricing"], ["gross-margin", "contribution-margin"],
  ["price-elasticity-of-demand", "inelastic-demand"], ["dynamic-pricing", "segmented-pricing"], ["distribution-channel", "indirect-channel", "channel-level"],
  ["direct-channel", "d2c"], ["omnichannel", "click-and-collect"], ["logistics", "supply-chain", "last-mile"], ["push-strategy", "trade-marketing"],
  ["merchandising", "planogram"], ["vertical-marketing-system", "franchising"], ["intermediary", "wholesaler", "agent", "retailer"], ["key-message", "slogan"],
  ["seo", "on-page-seo", "organic-traffic"], ["sem", "ppc"], ["social-media-marketing", "organic-reach", "engagement"], ["a-b-testing", "cro"],
  ["tracking-pixel", "cookies", "retargeting"], ["email-marketing", "marketing-automation"], ["programmatic", "display-advertising"], ["conversion", "lead"],
  ["retention-rate", "cohort-analysis"], ["kpi", "north-star-metric"], ["funnel-conversion", "conversion-rate"], ["marketing-objective", "smart-goals"],
  ["marketing-plan", "go-to-market-strategy", "situation-analysis"], ["swot", "situation-analysis", "tows"], ["marketing-research", "research-brief"],
  ["primary-data", "survey", "in-depth-interview", "focus-group", "observation", "experiment"], ["secondary-data", "desk-research"],
  ["qualitative-research", "in-depth-interview", "focus-group", "ethnography"], ["quantitative-research", "survey", "experiment"], ["observation", "ethnography", "mystery-shopping"],
  ["sample", "convenience-sample", "probability-sampling", "sampling-bias"], ["survey", "questionnaire"], ["likert-scale", "closed-question"],
  ["consent", "double-opt-in"], ["misleading-advertising", "bait-and-switch"], ["unfair-commercial-practices", "dark-patterns", "bait-and-switch", "misleading-advertising"],
  ["hidden-advertising", "influencer-disclosure"], ["uwg", "verbraucherzentrale", "pangv"], ["bundeskartellamt", "unfair-competition", "comparative-advertising"],
  ["csr", "cause-marketing", "sustainability-marketing"], ["4p", "marketing-mix", "7p", "4c", "product", "price", "place", "promotion"],
  ["macroenvironment", "pestel"], ["marketing-environment", "microenvironment", "macroenvironment"], ["cpa", "cpl"], ["sponsorship", "cause-marketing"],
  ["growth-stage", "product-life-cycle"], ["marketing-strategy", "go-to-market-strategy"], ["go-to-market-strategy", "tactics"],
  ["indirect-channel", "selective-distribution"], ["indirect-channel", "exclusive-distribution"], ["indirect-channel", "intensive-distribution"], ["indirect-channel", "franchising"], ["indirect-channel", "marketplace"], ["exclusive-distribution", "specialty-product"], ["intensive-distribution", "convenience-product"],
];
const _rel = {};
RELATED_GROUPS.forEach((g) => g.forEach((a) => g.forEach((b) => { if (a !== b) (_rel[a] = _rel[a] || new Set()).add(b); })));
const related = (a, b) => a === b || (_rel[a] && _rel[a].has(b));

function termWhy(t, withEx = true) {
  let h = `<b>${esc(termLabel(t))}</b> — ${esc(t.bg)}: ${esc(t.def)}`;
  if (withEx && t.ex && t.ex[0]) h += `<div class="why-ex">Beispiel: ${esc(pick(t.ex))}</div>`;
  if (t.conf) h += `<div class="why-conf">⚠️ ${esc(t.conf)}</div>`;
  return h;
}
const showEn = (t) => t.en && !t.en.toLowerCase().includes(t.key.toLowerCase());
const termShort = (t) => `<b>${esc(t.key)}</b>${showEn(t) ? ` <span class="muted">(${esc(t.en)})</span>` : ""}`;

// Falsche Optionen: zuerst aus demselben Modul (schwerer), ohne nahe Begriffe bei strict
function distractors(t, n, strict, pool) {
  const ok = (x) => x.id !== t.id && !(strict && (related(t.id, x.id) || UMBRELLA.has(x.id)));
  let same = shuffle((pool || TERMS).filter((x) => x.m === t.m && ok(x)));
  if (same.length < n) same = same.concat(shuffle(TERMS.filter((x) => x.m !== t.m && ok(x))));
  return same.slice(0, n);
}
function mcq(type, prompt, sub, correct, wrongs, why, terms, key) {
  const opts = shuffle([correct].concat(wrongs));
  return { type, kind: "mcq", prompt, sub, options: opts, answer: opts.indexOf(correct), why, terms, key };
}

// ───── Generatoren auf Basis der Begriffe
const TERM_GEN = {
  def2term(t) {
    const w = distractors(t, 3, false);
    const o = (x) => ({ html: termShort(x), why: x === t ? "" : `${esc(x.key)} ist etwas anderes: ${esc(x.def)}` });
    return mcq("def2term", esc(t.def), "Welcher Begriff passt zur Definition?", o(t), w.map(o), termWhy(t), [t.id], "t:" + t.id);
  },
  term2def(t) {
    const w = distractors(t, 3, false);
    const o = (x) => ({ html: esc(x.def), why: x === t ? "" : `Das ist die Definition von ${esc(x.key)} (${esc(x.bg)}).` });
    return mcq("term2def", `${termShort(t)} <span class="muted">— ${esc(t.bg)}</span>`, "Welche Definition ist richtig?", o(t), w.map(o), termWhy(t), [t.id], "t:" + t.id);
  },
  situation(t) {
    const exs = t.ex.filter((e) => !e.toLowerCase().includes(t.key.toLowerCase()));
    if (!exs.length || UMBRELLA.has(t.id)) return null;
    const w = distractors(t, 3, true);
    const o = (x) => ({ html: termShort(x), why: x === t ? "" : `${esc(x.key)} (${esc(x.bg)}) ist: ${esc(x.def)}` });
    return mcq("situation", "„" + esc(pick(exs)) + "“", "Welcher Begriff beschreibt die Situation?", o(t), w.map(o), termWhy(t, false), [t.id], "t:" + t.id);
  },
  cloze(t) {
    const i = t.use.toLowerCase().indexOf(t.key.toLowerCase());
    if (i < 0) return null;
    const s = esc(t.use.slice(0, i)) + '<span class="blank">______</span>' + esc(t.use.slice(i + t.key.length));
    const w = distractors(t, 3, true);
    const o = (x) => ({ html: termShort(x), why: x === t ? "" : `${esc(x.key)} passt hier nicht: ${esc(x.def)}` });
    return mcq("cloze", s, "Ergänze den fehlenden Begriff (aus der Praxis)", o(t), w.map(o), termWhy(t), [t.id], "t:" + t.id);
  },
  type(t) {
    const accept = [t.key, t.en].concat(t.alt || []).concat(t.bg.split(/[,(]/)[0].trim().length > 2 ? [t.bg] : []);
    return { type: "type", kind: "input", prompt: esc(t.def), sub: "Schreib den Begriff (auf Englisch, wie in der Praxis üblich, oder auf Deutsch)",
      accept, answerText: t.key, why: termWhy(t), terms: [t.id], key: "t:" + t.id, hint: t.key[0] + "…" };
  },
  tf(t) {
    const truth = Math.random() < 0.5;
    let other = null;
    if (!truth) { const c = CONFUSIONS.find((p) => p.includes(t.id)); other = c ? TERM[c[0] === t.id ? c[1] : c[0]] : null; if (!other) other = distractors(t, 1, true)[0]; }
    const shown = truth ? t : other;
    const opts = [{ html: "✔ Richtig", why: truth ? "" : `Nein — das ist die Definition von ${esc(other.key)}.` }, { html: "✘ Falsch", why: truth ? "Es ist tatsächlich richtig." : "" }];
    return { type: "tf", kind: "mcq", prompt: `${termShort(t)} = ${esc(shown.def)}`, sub: "Richtig oder falsch?", options: opts, answer: truth ? 0 : 1,
      why: (truth ? "" : `Falsch: Angegeben ist die Definition von <b>${esc(other.key)}</b>. `) + termWhy(t, false), terms: [t.id], key: "t:" + t.id };
  },
};
const TERM_GEN_TYPES = Object.keys(TERM_GEN);

function termTask(t, types) {
  for (let k = 0; k < 6; k++) { const g = TERM_GEN[pick(types || TERM_GEN_TYPES)](t); if (g) return g; }
  return TERM_GEN.def2term(t);
}

// ───── Generatoren auf Basis der handgeschriebenen Aufgaben
const HAND_GEN = {
  htf(x) {
    const opts = [{ html: "✔ Richtig", why: "" }, { html: "✘ Falsch", why: "" }];
    return { type: "htf", kind: "mcq", prompt: esc(x.s), sub: "Richtig oder falsch?", options: opts, answer: x.v ? 0 : 1, why: esc(x.why), terms: [], key: "h:tf:" + TFS.indexOf(x) };
  },
  err(x) {
    const opts = shuffle([{ html: esc(x.fix), why: "" }].concat(x.bad.map((b) => ({ html: esc(b), why: "" }))));
    return { type: "err", kind: "mcq", prompt: esc(x.s), sub: "Finde den Fehler in der Aussage — welche Korrektur ist richtig?", options: opts,
      answer: opts.findIndex((o) => o.html === esc(x.fix)), why: esc(x.why), terms: [], key: "h:err:" + ERRS.indexOf(x) };
  },
  seq(x) {
    return { type: "seq", kind: "order", prompt: esc(x.title), sub: "Bring in die richtige Reihenfolge (nacheinander antippen)", items: x.steps.slice(), why: esc(x.why), terms: [], key: "h:seq:" + SEQS.indexOf(x) };
  },
  cat(x) {
    const it = pick(x.items);
    const opts = x.cats.map((c, i) => ({ html: esc(c), why: i === it[1] ? "" : "" }));
    return { type: "cat", kind: "mcq", prompt: esc(it[0]), sub: esc(x.q), options: opts, answer: it[1], why: `<b>${esc(x.cats[it[1]])}</b>: ${esc(it[2])}`, terms: [], key: "h:cat:" + CATS.indexOf(x) + ":" + x.items.indexOf(it), fixedOrder: true };
  },
  dec(x) {
    const opts = shuffle(x.opts.map((o) => ({ html: esc(o[0]), why: esc(o[2]), ok: o[1] })));
    const good = x.opts.find((o) => o[1]);
    return { type: "dec", kind: "mcq", prompt: `<div class="brief">${esc(x.brief)}</div><b>${esc(x.q)}</b>`, sub: "Fallstudie: Was ist die beste Entscheidung?", options: opts,
      answer: opts.findIndex((o) => o.ok), why: esc(good[2]), terms: [], key: "h:dec:" + DECS.indexOf(x), long: true };
  },
  open(x) { return { type: "open", kind: "open", prompt: esc(x.q), sub: "Offene Frage — antworte in eigenen Worten", model: x.model, kw: x.kw, why: esc(x.model), terms: [], key: "h:open:" + OPENS.indexOf(x) }; },
};

// ───── Rechenaufgaben (exakte Prüfung; die Erklärung zeigt Formel und Einsetzen)
const r2 = (x) => Math.round(x * 100) / 100;
const between = (a, b, step = 1) => a + rnd(Math.floor((b - a) / step) + 1) * step;
function calcTask(m, title, prompt, value, unit, steps, meaning, terms, dec = 2) {
  return { type: "calc", kind: "input", calcId: title, prompt, sub: "Berechne" + (dec === 0 ? " (ganze Zahl)" : ` (auf ${dec} Nachkommastellen runden)`) + (unit ? `, in ${unit}` : ""),
    num: { value, tol: Math.max(Math.abs(value) * 0.005, dec === 0 ? 0.5 : 0.5 * 10 ** -dec + 1e-9) }, unit, answerText: fmt(value, dec) + (unit ? " " + unit : ""),
    why: `<div class="formula">${steps}</div><div>${meaning}</div>`, terms, key: "c:" + title, m };
}
const CALCS = [
  { m: "m9", id: "ctr", gen() { const imp = between(8, 60) * 1000, ctr = between(5, 40) / 10, cl = Math.round(imp * ctr / 100); const v = cl / imp * 100;
      return calcTask("m9", "ctr", `Die Anzeige hat <b>${fmt(imp)}</b> Impressionen und <b>${fmt(cl)}</b> Klicks. Wie hoch ist die CTR?`, r2(v), "%", `CTR = Klicks / Impressionen × 100 = ${fmt(cl)} / ${fmt(imp)} × 100 = <b>${fmt(v, 2)} %</b>`, "Die CTR zeigt, wie attraktiv die Anzeige für die Menschen ist, die sie sehen — nicht, ob sie verkauft.", ["ctr"]); } },
  { m: "m9", id: "cpc", gen() { const cl = between(200, 2000, 50), cpc = between(15, 180) / 100, cost = r2(cl * cpc);
      return calcTask("m9", "cpc", `Kosten <b>${fmtLv(cost)}</b>, Klicks <b>${fmt(cl)}</b>. Wie hoch sind die Kosten pro Klick (CPC)?`, r2(cost / cl), "€", `CPC = Kosten / Klicks = ${fmt(cost, 2)} / ${fmt(cl)} = <b>${fmt(cost / cl, 2)} €</b>`, "Der Klickpreis allein sagt nicht, ob die Kampagne gut ist — schau auf den CPA.", ["cpc"]); } },
  { m: "m9", id: "cpm", gen() { const imp = between(20, 400, 5) * 1000, cpm = between(20, 150) / 10, cost = r2(imp * cpm / 1000);
      return calcTask("m9", "cpm", `Kosten <b>${fmtLv(cost)}</b> für <b>${fmt(imp)}</b> Impressionen. Wie hoch ist der CPM (TKP)?`, r2(cpm), "€", `CPM = Kosten / Impressionen × 1000 = ${fmt(cost, 2)} / ${fmt(imp)} × 1000 = <b>${fmt(cpm, 2)} €</b>`, "Der CPM ist der Preis für 1000 Einblendungen — die Hauptgröße in Bekanntheitskampagnen.", ["cpm"]); } },
  { m: "m9", id: "cpa", gen() { const conv = between(10, 120), cpa = between(8, 90), cost = conv * cpa;
      return calcTask("m9", "cpa", `Kampagne: Kosten <b>${fmtLv(cost, 0)}</b>, Bestellungen <b>${conv}</b>. Wie hoch ist der CPA?`, r2(cpa), "€", `CPA = Kosten / Conversions = ${fmt(cost)} / ${conv} = <b>${fmt(cpa, 2)} €</b>`, "Vergleiche den CPA mit dem Gewinn pro Bestellung (oder dem LTV): Ist der CPA größer, bringt jeder Verkauf Verlust.", ["cpa"]); } },
  { m: "m9", id: "cpa2", gen() { const cpc = between(20, 200, 5) / 100, cvr = pick([1, 1.5, 2, 2.5, 3, 4, 5]); const v = cpc / (cvr / 100);
      return calcTask("m9", "cpa2", `Der CPC beträgt <b>${fmtLv(cpc)}</b>, die Conversion-Rate der Klicks <b>${fmt(cvr, 1)} %</b>. Was kostet eine Bestellung (CPA)?`, r2(v), "€", `CPA = CPC / CVR = ${fmt(cpc, 2)} / ${fmt(cvr / 100, 3)} = <b>${fmt(v, 2)} €</b> (pro Bestellung braucht man ${fmt(100 / cvr, 1)} Klicks)`, "Deshalb kann ein billiger Klick mit niedriger Conversion teurer sein als ein teurer Klick mit hoher Conversion.", ["cpa", "cpc", "conversion-rate"]); } },
  { m: "m9", id: "cvr", gen() { const vis = between(20, 200) * 100, cvr = between(5, 50) / 10, conv = Math.round(vis * cvr / 100); const v = conv / vis * 100;
      return calcTask("m9", "cvr", `Die Website hat <b>${fmt(vis)}</b> Besuche und <b>${conv}</b> Bestellungen. Wie hoch ist die Conversion-Rate?`, r2(v), "%", `CVR = Conversions / Besuche × 100 = ${conv} / ${fmt(vis)} × 100 = <b>${fmt(v, 2)} %</b>`, "Eine bessere Conversion (CRO) bringt mehr Verkäufe aus demselben Traffic, ohne zusätzliches Werbebudget.", ["conversion-rate"]); } },
  { m: "m9", id: "roas", gen() { const cost = between(5, 60) * 100, roas = between(15, 80) / 10, rev = cost * roas;
      return calcTask("m9", "roas", `Werbekosten <b>${fmtLv(cost, 0)}</b>, Umsatz aus der Werbung <b>${fmtLv(rev, 0)}</b>. Wie hoch ist der ROAS (als Zahl, z. B. 4,5)?`, r2(roas), "", `ROAS = Umsatz / Werbekosten = ${fmt(rev)} / ${fmt(cost)} = <b>${fmt(roas, 2)}</b>`, "Der ROAS berücksichtigt keinen Wareneinsatz: Ob die Kampagne Gewinn bringt, hängt von der Marge ab (Mindest-ROAS = 1 / Marge).", ["roas"]); } },
  { m: "m9", id: "roi", gen() { const cost = between(10, 50) * 100, rev = cost * between(20, 60) / 10, mg = pick([25, 30, 35, 40, 50]); const gp = rev * mg / 100, v = (gp - cost) / cost * 100;
      return calcTask("m9", "roi", `Kampagne: Kosten <b>${fmtLv(cost, 0)}</b>, Umsatz <b>${fmtLv(rev, 0)}</b>, Bruttomarge <b>${mg} %</b>. Wie hoch ist der ROI (in %)?`, r2(v), "%", `Rohertrag = ${fmt(rev)} × ${mg} % = ${fmt(gp, 2)} €<br>ROI = (Gewinn − Kosten) / Kosten × 100 = (${fmt(gp, 2)} − ${fmt(cost)}) / ${fmt(cost)} × 100 = <b>${fmt(v, 2)} %</b>`,
        v < 0 ? `Negativer ROI: Trotz ROAS ${fmt(rev / cost, 2)} deckt die Marge die Werbung nicht. Der Mindest-ROAS bei ${mg} % Marge ist ${fmt(100 / mg, 2)}.` : `Positiver ROI: Jeder Werbe-Euro kommt mit ${fmt(v / 100, 2)} € Nettogewinn obendrauf zurück.`, ["roi", "roas", "gross-margin"]); } },
  { m: "m9", id: "beroas", gen() { const mg = pick([20, 25, 30, 35, 40, 50, 60]); const v = 100 / mg;
      return calcTask("m9", "beroas", `Die Bruttomarge beträgt <b>${mg} %</b>. Ab welchem ROAS rechnet sich die Werbung (ohne Verlust)?`, r2(v), "", `Break-even-ROAS = 1 / Marge = 1 / ${fmt(mg / 100, 2)} = <b>${fmt(v, 2)}</b>`, "Darunter bringt jeder Verkauf aus der Werbung Verlust; darüber Gewinn.", ["roas", "gross-margin"]); } },
  { m: "m9", id: "cac", gen() { const ads = between(10, 60) * 1000, sal = between(5, 30) * 1000, n = between(50, 400, 10); const v = (ads + sal) / n;
      return calcTask("m9", "cac", `Im Quartal: Werbung <b>${fmtLv(ads, 0)}</b>, Gehälter Marketing und Vertrieb <b>${fmtLv(sal, 0)}</b>, Neukunden <b>${n}</b>. Wie hoch ist der CAC?`, r2(v), "€", `CAC = alle Akquisitionskosten / Neukunden = (${fmt(ads)} + ${fmt(sal)}) / ${n} = <b>${fmt(v, 2)} €</b>`, "Der CAC umfasst nicht nur Werbung, sondern auch Personal und Tools. Er wird mit dem LTV verglichen.", ["cac"]); } },
  { m: "m9", id: "ltv", gen() { const p = between(20, 90, 5), mo = between(4, 24), mg = pick([40, 50, 60, 70, 80]); const v = p * mo * mg / 100;
      return calcTask("m9", "ltv", `Abo <b>${p} €/Monat</b>, der Kunde bleibt im Schnitt <b>${mo} Monate</b>, die Marge beträgt <b>${mg} %</b>. Wie hoch ist der LTV (nach Gewinn)?`, r2(v), "€", `LTV = Monatspreis × Monate × Marge = ${p} × ${mo} × ${fmt(mg / 100, 2)} = <b>${fmt(v, 2)} €</b>`, "So viel Gewinn bringt der durchschnittliche Kunde — die Obergrenze dessen, was seine Gewinnung kosten darf.", ["ltv"]); } },
  { m: "m9", id: "ltvcac", gen() { const cac = between(50, 400, 10), ratio = pick([0.8, 1.5, 2, 2.5, 3, 4, 5]), ltv = cac * ratio;
      return calcTask("m9", "ltvcac", `Der LTV beträgt <b>${fmtLv(ltv, 0)}</b>, der CAC <b>${fmtLv(cac, 0)}</b>. Wie hoch ist das Verhältnis LTV:CAC (als Zahl)?`, r2(ratio), "", `LTV / CAC = ${fmt(ltv)} / ${fmt(cac)} = <b>${fmt(ratio, 2)}</b>`, ratio < 1 ? "Unter 1: Jeder Neukunde bringt Verlust — Wachstum verschärft das Problem." : ratio >= 3 ? "Um oder über 3:1 — ein oft zitierter Richtwert für ein gesundes Abo-Geschäft." : "Zwischen 1 und 3: Du verdienst, aber knapp — arbeite an Bindung oder Akquisitionskosten.", ["ltv-cac", "ltv", "cac"]); } },
  { m: "m9", id: "payback", gen() { const cac = between(60, 600, 20), mp = between(10, 80, 5); const v = cac / mp;
      return calcTask("m9", "payback", `Der CAC beträgt <b>${fmtLv(cac, 0)}</b>, der monatliche Gewinn pro Kunde <b>${fmtLv(mp, 0)}</b>. In wie vielen Monaten amortisiert sich die Gewinnung?`, r2(v), "Monate", `Dauer = CAC / Monatsgewinn = ${cac} / ${mp} = <b>${fmt(v, 2)} Monate</b>`, "Je kürzer die Dauer, desto schneller ist das Geld zurück für neues Wachstum.", ["payback-period"]); } },
  { m: "m9", id: "churn", gen() { const st = between(10, 80) * 100, ch = pick([2, 3, 4, 5, 6, 8, 10]), lost = Math.round(st * ch / 100); const v = lost / st * 100;
      return calcTask("m9", "churn", `Zu Monatsbeginn gibt es <b>${fmt(st)}</b> Abonnenten, im Monat kündigen <b>${lost}</b>. Wie hoch ist der monatliche Churn?`, r2(v), "%", `Churn = verloren / zu Beginn × 100 = ${lost} / ${fmt(st)} × 100 = <b>${fmt(v, 2)} %</b>`, `Vereinfacht bleibt der durchschnittliche Kunde ≈ 1 / Churn = ${fmt(100 / v, 1)} Monate.`, ["churn-rate"]); } },
  { m: "m9", id: "life", gen() { const ch = pick([2, 2.5, 4, 5, 8, 10, 12.5, 20]); const v = 100 / ch;
      return calcTask("m9", "life", `Der monatliche Churn beträgt <b>${fmt(ch, 1)} %</b>. Wie viele Monate bleibt ein Kunde im Schnitt (vereinfacht)?`, r2(v), "Monate", `Durchschnittliche Dauer ≈ 1 / Churn = 1 / ${fmt(ch / 100, 3)} = <b>${fmt(v, 2)} Monate</b>`, "Deshalb erhöht schon eine kleine Senkung der Abwanderung den Kundenwert (LTV) stark.", ["churn-rate", "ltv"]); } },
  { m: "m9", id: "aov", gen() { const n = between(100, 900, 10), aov = between(25, 180); const rev = n * aov;
      return calcTask("m9", "aov", `Umsatz <b>${fmtLv(rev, 0)}</b> aus <b>${n}</b> Bestellungen. Wie hoch ist der durchschnittliche Bestellwert (AOV)?`, aov, "€", `AOV = Umsatz / Bestellungen = ${fmt(rev)} / ${n} = <b>${fmt(aov, 2)} €</b>`, "Der AOV steigt mit Bundles, Gratisversand-Schwelle und Empfehlungen „wird oft zusammen gekauft“.", ["aov"]); } },
  { m: "m9", id: "share", gen() { const mk = between(10, 90), sh = between(2, 40) / 2, s = mk * sh * 10;
      return calcTask("m9", "share", `Der Umsatz des Unternehmens beträgt <b>${fmt(s)} Tsd. €</b>, der des gesamten Marktes <b>${fmt(mk)} Mio. €</b>. Wie hoch ist der Marktanteil?`, r2(sh), "%", `Marktanteil = Umsatz des Unternehmens / Marktvolumen × 100 = ${fmt(s)} Tsd. / ${fmt(mk * 1000)} Tsd. × 100 = <b>${fmt(sh, 2)} %</b>`, "Der Anteil ist „wie groß das Stück“; nicht mit dem Marktwachstum verwechseln.", ["market-share"]); } },
  { m: "m9", id: "growth", gen() { const a = between(20, 200), g = pick([-10, -5, 3, 5, 8, 12, 15, 20, 25]), b = a * (1 + g / 100);
      return calcTask("m9", "growth", `Der Markt lag letztes Jahr bei <b>${fmt(a)} Mio. €</b> und dieses Jahr bei <b>${fmt(b, 2)} Mio. €</b>. Wie hoch ist die Wachstumsrate?`, g, "%", `Wachstum = (neu − alt) / alt × 100 = (${fmt(b, 2)} − ${fmt(a)}) / ${fmt(a)} × 100 = <b>${fmt(g, 2)} %</b>`, "In der BCG-Matrix ist das Marktwachstum die senkrechte Achse.", ["market-growth-rate"]); } },
  { m: "m5", id: "bep", gen() { const fc = between(3, 60) * 1000, vc = between(2, 40), cm = between(2, 30), p = vc + cm; const v = Math.ceil(fc / cm - 1e-9);
      return calcTask("m5", "bep", `Fixkosten <b>${fmtLv(fc, 0)}</b> pro Monat, Preis <b>${fmtLv(p, 0)}</b>, variable Kosten <b>${fmtLv(vc, 0)}</b> pro Stück. Wie viele Stück pro Monat braucht man für den Break-even (aufrunden)?`, v, "Stück", `Deckungsbeitrag = ${p} − ${vc} = ${cm} €<br>Stück = Fixkosten / Deckungsbeitrag = ${fmt(fc)} / ${cm} = ${fmt(fc / cm, 2)} → <b>${fmt(v)} Stück</b>`, "Darunter — Verlust, darüber bringt jedes Stück " + cm + " € Gewinn.", ["break-even-point", "contribution-margin", "fixed-costs"], 0); } },
  { m: "m5", id: "markup", gen() { const c = between(4, 200), mu = pick([20, 25, 30, 40, 50, 60, 80, 100]); const v = c * (1 + mu / 100);
      return calcTask("m5", "markup", `Selbstkosten <b>${fmtLv(c, 0)}</b>, Aufschlag <b>${mu} %</b>. Wie hoch ist der Verkaufspreis?`, r2(v), "€", `Preis = Selbstkosten × (1 + Aufschlag) = ${c} × ${fmt(1 + mu / 100, 2)} = <b>${fmt(v, 2)} €</b>`, `Achtung: Die Marge beträgt hier ${fmt(mu / (100 + mu) * 100, 1)} %, nicht ${mu} % — der Aufschlag bezieht sich auf die Selbstkosten, die Marge auf den Preis.`, ["markup", "cost-plus-pricing"]); } },
  { m: "m5", id: "margin", gen() { const c = between(10, 300), p = c + between(5, 200); const v = (p - c) / p * 100;
      return calcTask("m5", "margin", `Selbstkosten <b>${fmtLv(c, 0)}</b>, Verkaufspreis <b>${fmtLv(p, 0)}</b>. Wie hoch ist die Bruttomarge (in %)?`, r2(v), "%", `Marge = (Preis − Selbstkosten) / Preis × 100 = (${p} − ${c}) / ${p} × 100 = <b>${fmt(v, 2)} %</b>`, `Der Aufschlag für dasselbe Geschäft beträgt ${fmt((p - c) / c * 100, 1)} % — eine größere Zahl, weil durch die kleineren Selbstkosten geteilt wird.`, ["gross-margin"]); } },
  { m: "m5", id: "pricefrommargin", gen() { const c = between(10, 200), mg = pick([20, 25, 30, 40, 50, 60]); const v = c / (1 - mg / 100);
      return calcTask("m5", "pricefrommargin", `Selbstkosten <b>${fmtLv(c, 0)}</b>. Du willst eine Bruttomarge von <b>${mg} %</b>. Wie hoch muss der Preis sein?`, r2(v), "€", `Preis = Selbstkosten / (1 − Marge) = ${c} / ${fmt(1 - mg / 100, 2)} = <b>${fmt(v, 2)} €</b>`, `Häufiger Fehler: ${c} × ${fmt(1 + mg / 100, 2)} = ${fmt(c * (1 + mg / 100), 2)} € ergibt ${mg} % Aufschlag, aber nur ${fmt(mg / (100 + mg) * 100, 1)} % Marge.`, ["gross-margin", "markup"]); } },
  { m: "m5", id: "elasticity", gen() { const dp = pick([-20, -10, -5, 5, 10, 20]), e = pick([0.3, 0.5, 0.8, 1.5, 2, 2.5, 3]); const dq = -e * dp;
      return calcTask("m5", "elasticity", `Der Preis ändert sich um <b>${dp > 0 ? "+" : "−"}${Math.abs(dp)} %</b>, die Nachfragemenge um <b>${dq > 0 ? "+" : "−"}${fmt(Math.abs(dq), 1)} %</b>. Wie hoch ist die Preiselastizität (Betrag)?`, r2(e), "", `|E| = |% Mengenänderung / % Preisänderung| = ${fmt(Math.abs(dq), 1)} / ${Math.abs(dp)} = <b>${fmt(e, 2)}</b>`, e > 1 ? "|E| > 1 → elastische Nachfrage: Eine Preissenkung erhöht den Umsatz, eine Erhöhung senkt ihn." : "|E| < 1 → unelastische Nachfrage: Eine Preiserhöhung erhöht den Umsatz.", ["price-elasticity-of-demand", "inelastic-demand"]); } },
  { m: "m5", id: "discvol", gen() { const vc = between(4, 30), cm = between(5, 30), p = vc + cm, d = pick([10, 15, 20, 25]); const np = p * (1 - d / 100), ncm = np - vc; if (ncm <= 0.5) return null; const q = between(5, 50) * 20; const v = Math.ceil(q * cm / ncm - 1e-9);
      return calcTask("m5", "discvol", `Produkt: Preis <b>${fmtLv(p, 0)}</b>, variable Kosten <b>${fmtLv(vc, 0)}</b>, Absatz <b>${q} Stück/Monat</b>. Du erwägst <b>${d} %</b> Rabatt. Wie viele Stück brauchst du, um denselben Gesamtdeckungsbeitrag zu halten (aufrunden)?`, v, "Stück", `Alter Deckungsbeitrag = ${p} − ${vc} = ${cm} € → gesamt ${fmt(q * cm)} €<br>Neuer Preis = ${fmt(np, 2)} € → Deckungsbeitrag ${fmt(ncm, 2)} €<br>Nötige Stück = ${fmt(q * cm)} / ${fmt(ncm, 2)} = ${fmt(q * cm / ncm, 2)} → <b>${fmt(v)} Stück</b> (+${fmt((v / q - 1) * 100, 0)} %)`, "Jeder Rabatt muss sich durch zusätzliche Menge „bezahlen“ — oft viel mehr, als es scheint.", ["contribution-margin", "promotional-pricing"], 0); } },
  { m: "m7", id: "grp", gen() { const r = between(20, 80, 5), f = between(2, 8); const v = r * f;
      return calcTask("m7", "grp", `Die Kampagne erreicht <b>${r} %</b> der Zielgruppe mit durchschnittlicher Frequenz <b>${f}</b>. Wie viele GRP sind das?`, v, "GRP", `GRP = Reichweite (%) × Frequenz = ${r} × ${f} = <b>${v}</b>`, "GRP messen den gesamten Werbedruck; dieselben Punkte können viele Menschen wenige Male oder wenige Menschen viele Male sein.", ["grp", "reach", "frequency"], 0); } },
  { m: "m7", id: "imp", gen() { const r = between(5, 90) * 1000, f = between(15, 60) / 10; const v = Math.round(r * f);
      return calcTask("m7", "imp", `Reichweite <b>${fmt(r)}</b> Personen, durchschnittliche Frequenz <b>${fmt(f, 1)}</b>. Wie viele Impressionen sind das?`, v, "", `Impressionen = Reichweite × Frequenz = ${fmt(r)} × ${fmt(f, 1)} = <b>${fmt(v)}</b>`, "Die Reichweite zählt Menschen, die Impressionen Einblendungen.", ["impressions", "reach", "frequency"], 0); } },
  { m: "m7", id: "freq", gen() { const r = between(5, 90) * 1000, f = between(12, 60) / 10, imp = Math.round(r * f); const v = imp / r;
      return calcTask("m7", "freq", `<b>${fmt(imp)}</b> Impressionen bei einer Reichweite von <b>${fmt(r)}</b> Personen. Wie hoch ist die durchschnittliche Frequenz?`, r2(v), "", `Frequenz = Impressionen / Reichweite = ${fmt(imp)} / ${fmt(r)} = <b>${fmt(v, 2)}</b>`, "Zu hohe Frequenz führt zu Werbemüdigkeit und sinkender CTR.", ["frequency"]); } },
  { m: "m8", id: "open", gen() { const del = between(20, 200) * 100, or = between(12, 45), op = Math.round(del * or / 100); const v = op / del * 100;
      return calcTask("m8", "open", `<b>${fmt(del)}</b> E-Mails zugestellt, <b>${fmt(op)}</b> geöffnet. Wie hoch ist die Öffnungsrate?`, r2(v), "%", `Öffnungsrate = geöffnet / zugestellt × 100 = ${fmt(op)} / ${fmt(del)} × 100 = <b>${fmt(v, 2)} %</b>`, "Betreff und Vertrauen in den Absender wirken am stärksten; wegen Datenschutzfunktionen ist die Zahl nur ungefähr.", ["open-rate"]); } },
  { m: "m8", id: "er", gen() { const reach = between(10, 200) * 100, er = between(10, 120) / 10, act = Math.round(reach * er / 100); const v = act / reach * 100;
      return calcTask("m8", "er", `Beitrag mit Reichweite <b>${fmt(reach)}</b> und <b>${fmt(act)}</b> Interaktionen. Wie hoch ist die Engagement-Rate (bezogen auf die Reichweite)?`, r2(v), "%", `ER = Interaktionen / Reichweite × 100 = ${fmt(act)} / ${fmt(reach)} × 100 = <b>${fmt(v, 2)} %</b>`, "Nenne immer die Basis — Reichweite oder Follower; die Zahlen unterscheiden sich.", ["engagement-rate", "engagement"]); } },
  { m: "m10", id: "pctsales", gen() { const s = between(2, 80) * 10000, p = pick([2, 3, 4, 5, 6, 8, 10]); const v = s * p / 100;
      return calcTask("m10", "pctsales", `Erwarteter Umsatz <b>${fmtLv(s, 0)}</b>. Das Unternehmen reserviert <b>${p} %</b> des Umsatzes für Marketing. Wie hoch ist das Budget?`, v, "€", `Budget = Umsatz × % = ${fmt(s)} × ${p} % = <b>${fmt(v, 2)} €</b>`, "Einfache Methode, kehrt aber die Logik um: Der Umsatz bestimmt das Marketing, nicht umgekehrt.", ["percentage-of-sales-method"]); } },
  { m: "m10", id: "objtask", gen() { const n = between(5, 40) * 10, cpa = between(10, 80), extra = between(5, 40) * 100; const v = n * cpa + extra;
      return calcTask("m10", "objtask", `Ziel: <b>${n}</b> Neukunden. Der historische CPA beträgt <b>${cpa} €</b>. Zusätzlich braucht man <b>${fmtLv(extra, 0)}</b> für Content und Tools. Welches Budget ergibt die Ziel-Aufgaben-Methode?`, v, "€", `Budget = Kunden × CPA + weitere Aufgaben = ${n} × ${cpa} + ${fmt(extra)} = <b>${fmt(v, 2)} €</b>`, "Das Budget folgt dem Ziel. Ist es unbezahlbar, ändert man das Ziel oder verbessert den CPA, statt blind zu kürzen.", ["objective-and-task-method"]); } },
  { m: "m11", id: "nps", gen() { const pro = between(20, 70, 5), det = between(5, 40, 5); if (pro + det > 95) return null; const pas = 100 - pro - det; const v = pro - det;
      return calcTask("m11", "nps", `Befragung (0–10): <b>${pro}%</b> geben 9–10, <b>${pas}%</b> geben 7–8, <b>${det}%</b> geben 0–6. Wie hoch ist der NPS?`, v, "", `NPS = % Promotoren − % Kritiker = ${pro} − ${det} = <b>${v}</b> (die Passiven mit ${pas} % werden nicht abgezogen)`, "Der NPS ist eine Zahl von −100 bis +100, kein Prozentwert.", ["nps"], 0); } },
  { m: "m11", id: "csat", gen() { const n = between(10, 80) * 10, sat = between(40, 95), k = Math.round(n * sat / 100); const v = k / n * 100;
      return calcTask("m11", "csat", `Von <b>${n}</b> Antworten geben <b>${k}</b> eine 4 oder 5 von 5. Wie hoch ist der CSAT (in %)?`, r2(v), "%", `CSAT = Zufriedene (4–5) / alle × 100 = ${k} / ${n} × 100 = <b>${fmt(v, 2)} %</b>`, "CSAT misst die Zufriedenheit mit einer konkreten Interaktion, NPS die gesamte Loyalität.", ["csat"]); } },
  { m: "m3", id: "som", gen() { const sam = between(5, 80) * 1000, sh = pick([1, 2, 3, 5, 8, 10]), arpu = between(10, 60, 5) * 12; const v = sam * sh / 100 * arpu;
      return calcTask("m3", "som", `SAM: <b>${fmt(sam)}</b> Firmen. Realistisch gewinnst du <b>${sh} %</b> davon; jede zahlt <b>${fmtLv(arpu, 0)}</b> pro Jahr. Wie hoch ist der SOM in Euro pro Jahr?`, v, "€", `SOM = SAM × Anteil × Jahreswert = ${fmt(sam)} × ${sh} % × ${fmt(arpu)} = <b>${fmt(v, 2)} €</b>`, "Der Businessplan baut auf dem SOM auf — dem realistisch Erreichbaren, nicht auf dem TAM.", ["som", "sam"]); } },
];
const CALC_MODS = new Set(CALCS.map((c) => c.m));
function calcFor(mods) {
  const pool = CALCS.filter((c) => !mods || mods.includes(c.m));
  for (let k = 0; k < 10; k++) { const c = pick(pool); const t = c.gen(); if (t) return t; }
  return null;
}

// ───── Sitzungen zusammenstellen
function handItems(mods, kinds) {
  const inM = (x) => !mods || mods.includes(x.m), out = [];
  if (kinds.includes("htf")) TFS.filter(inM).forEach((x) => out.push(["htf", x]));
  if (kinds.includes("err")) ERRS.filter(inM).forEach((x) => out.push(["err", x]));
  if (kinds.includes("seq")) SEQS.filter(inM).forEach((x) => out.push(["seq", x]));
  if (kinds.includes("cat")) CATS.filter(inM).forEach((x) => out.push(["cat", x]));
  if (kinds.includes("dec")) DECS.filter(inM).forEach((x) => out.push(["dec", x]));
  if (kinds.includes("open")) OPENS.filter(inM).forEach((x) => out.push(["open", x]));
  return out;
}
// Sitzung nach Modulen: n Aufgaben, Anteil Begriffe/Handaufgaben/Rechnen. opts.terms — nur diese Begriffe; opts.kinds — Arten von Handaufgaben
function buildSession(mods, n, opts = {}) {
  const termPool = opts.terms ? opts.terms.map((id) => TERM[id]).filter(Boolean) : TERMS.filter((t) => mods.includes(t.m));
  const hand = shuffle(handItems(mods, opts.kinds || ["htf", "err", "seq", "cat", "dec"]));
  const hasCalc = opts.calc !== false && mods.some((m) => CALC_MODS.has(m));
  const nCalc = hasCalc ? Math.max(1, Math.round(n * (opts.calcShare || 0.15))) : 0;
  const nHand = Math.min(hand.length, Math.round(n * (opts.handShare != null ? opts.handShare : 0.35)));
  const nTerm = Math.max(0, n - nCalc - nHand);
  const out = [], usedT = new Set();
  const terms = shuffle(termPool);
  for (let i = 0; i < nTerm && terms.length; i++) { const t = terms[i % terms.length]; out.push(termTask(t, opts.types)); usedT.add(t.id); }
  hand.slice(0, nHand).forEach(([k, x]) => out.push(HAND_GEN[k](x)));
  for (let i = 0; i < nCalc; i++) { const c = calcFor(mods); if (c) out.push(c); }
  return shuffle(out).slice(0, n);
}
// Wiederholung: aktives Abrufen der Begriffe (Schreiben oder ähnliche Optionen)
function reviewTasks(ids) {
  return shuffle(ids).map((id) => { const t = TERM[id]; return termTask(t, t.key.length <= 22 && Math.random() < 0.4 ? ["type"] : ["def2term", "situation", "cloze", "term2def"]); });
}
// Aufgabe aus dem Schlüssel in „Meine Fehler“
function taskFromKey(k) {
  const [a, b, c, d] = k.split(":");
  if (a === "t" && TERM[b]) return termTask(TERM[b]);
  if (a === "c") { const g = CALCS.find((x) => x.id === b); for (let i = 0; g && i < 10; i++) { const t = g.gen(); if (t) return t; } return null; }
  if (a === "h") {
    const src = { tf: [TFS, "htf"], err: [ERRS, "err"], seq: [SEQS, "seq"], cat: [CATS, "cat"], dec: [DECS, "dec"], open: [OPENS, "open"] }[b];
    if (!src || !src[0][+c]) return null;
    if (b === "cat" && d != null) { const x = src[0][+c], it = x.items[+d]; if (!it) return null; const t = HAND_GEN.cat({ ...x, items: [it] }); t.key = k; return t; }
    return HAND_GEN[src[1]](src[0][+c]);
  }
  return null;
}
// Prüfung einer geschriebenen Antwort
function normTxt(s) { return String(s).toLowerCase().replace(/[’'`´]/g, "'").replace(/[^a-z0-9а-яäöüß':]+/gi, ""); }
function lev(a, b) {
  const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
function checkInput(task, val) {
  if (task.num) { const x = parseNum(val); return isFinite(x) && Math.abs(x - task.num.value) <= task.num.tol; }
  const v = normTxt(val); if (!v) return false;
  return task.accept.some((a) => { const n = normTxt(a); if (!n) return false; if (n === v) return true; const tol = n.length > 10 ? 2 : n.length > 5 ? 1 : 0; return tol > 0 && lev(n, v) <= tol; });
}
// Bewertung einer offenen Antwort nach Schlüsselwörtern (0, 0,5 oder 1)
function scoreOpen(task, txt) {
  const low = String(txt || "").toLowerCase();
  const hits = task.kw.map((k) => k.split("|").some((w) => low.includes(w.toLowerCase())));
  const r = hits.filter(Boolean).length / task.kw.length;
  return { hits, score: r >= 0.6 ? 1 : r >= 0.3 ? 0.5 : 0 };
}

// Paare verbinden: 4 Begriffe ↔ kurze Definition
function matchTask(mods, ids) {
  let pool = ids ? ids.map((i) => TERM[i]).filter(Boolean) : TERMS.filter((t) => mods.includes(t.m));
  pool = shuffle(pool).filter((t, i, a) => a.slice(0, i).every((x) => !related(x.id, t.id))).slice(0, 4);
  if (pool.length < 3) return null;
  const short = (d) => (d.length > 110 ? d.slice(0, d.lastIndexOf(" ", 105)) + "…" : d);
  return { type: "match", kind: "match", prompt: "Verbinde den Begriff mit der Definition", sub: "Wähle einen Begriff, dann seine Definition",
    pairs: pool.map((t) => [t.key, short(t.def), t.id]), why: pool.map((t) => `<div><b>${esc(t.key)}</b> — ${esc(t.bg)}</div>`).join(""), terms: pool.map((t) => t.id), key: null };
}
