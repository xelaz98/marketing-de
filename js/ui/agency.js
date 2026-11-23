// AGENTUR: Kundenmissionen (Simulation), Rang, Rechner und Rechenaufgaben.
const Ag = {
  get() { return LS.get("agency", { xp: 0, best: {}, runs: 0, cur: null }); },
  save(a) { LS.set("agency", a); },
};
const STAGES1 = ["brief", "seg", "pos", "offer", "copy", "budget"];

VIEWS.agency = (arg, v) => {
  const a = Ag.get();
  if (arg === "calc") return calcView(v);
  if (arg === "mission" && a.cur) return missionView(v);
  const r = rankOf(a.xp), ri = RANKS.indexOf(r), nx = RANKS[ri + 1];
  v.innerHTML = `<h1>🏢 Agentur „Imaginäres Marketing“</h1>
    <p class="muted">Du arbeitest in einer Agentur mit echten Briefings, Budgets und Personas. Deine Entscheidungen laufen durch ein deterministisches Modell (Formeln, kein Glück): Segment → Position → Angebot → Anzeige → Kanäle → Reichweite, CTR, Conversions, CPA, ROI. Nach jeder Woche — Analyse vom Mentor.</p>
    <div class="card"><div class="row"><span style="font-size:1.6rem">🎖️</span><div style="flex:1"><b>${r.name}</b> <span class="muted small">(${r.bg})</span><div class="small muted">${fmt(a.xp)} Agentur-XP${nx ? ` · bis ${nx.name}: ${fmt(nx.min - a.xp)}` : " · höchster Rang!"}</div></div></div>
      <div class="bar" style="margin-top:8px"><i style="width:${nx ? (a.xp - r.min) / (nx.min - r.min) * 100 : 100}%"></i></div>
      <div class="row small muted" style="margin-top:6px">${RANKS.map((x) => `<span ${x === r ? 'style="color:var(--accent);font-weight:700"' : ""}>${x.name}</span>`).join(" → ")}</div></div>
    ${a.cur ? `<div class="card row" style="margin-top:12px;border-color:var(--accent)"><span style="font-size:1.5rem">${CLIENT[a.cur.client].icon}</span><div style="flex:1"><b>Laufende Mission: ${esc(CLIENT[a.cur.client].name)}</b><div class="small muted">Woche ${Math.min(a.cur.week, AGENCY_WEEKS)} von ${AGENCY_WEEKS}</div></div><button class="btn primary" id="cont">Fortsetzen</button><button class="btn sm ghost" id="drop">Abbrechen</button></div>` : ""}
    <div class="section-t">Kunden</div>
    <div class="grid">${CLIENTS.map((c) => { const b = a.best[c.id]; return `<div class="card"><div class="row"><span style="font-size:1.8rem">${c.icon}</span><div style="flex:1"><b>${esc(c.name)}</b><div class="small muted">${esc(c.city)}</div></div>${b ? `<span title="Bestes Ergebnis">${"★".repeat(b.stars)}${"☆".repeat(3 - b.stars)}</span>` : ""}</div>
      <p class="small" style="margin:8px 0">${esc(c.brief.split(". ").slice(0, 2).join(". "))}.</p><div class="small"><span class="tag acc">Ziel: ${esc(c.goal.label)}</span> <span class="tag">${fmtLv(c.budget, 0)}/Woche</span></div>
      <button class="btn ${a.cur ? "" : "primary"}" style="margin-top:10px;width:100%" data-c="${c.id}">${b ? "Noch einmal spielen" : "Kunden übernehmen"}</button></div>`; }).join("")}</div>
    <div class="section-t">Die Zahlen des Marketers</div>
    <div class="grid"><div class="card"><b>🧮 Rechner</b><p class="small muted">ROAS/ROI, CPA, LTV/CAC und Break-even — mit Formeln.</p><button class="btn" id="calc">Öffnen</button></div>
      <div class="card"><b>✏️ Aufgaben mit echten Zahlen</b><p class="small muted">10 Aufgaben: berechne ROAS, CAC, LTV, Break-even, Marge… Die Prüfung ist exakt, die Erklärung zeigt die Formel.</p><button class="btn primary" id="nums">10 Aufgaben lösen</button></div></div>`;
  if ($("#cont")) $("#cont").onclick = () => go("agency", "mission");
  if ($("#drop")) $("#drop").onclick = () => { if (confirm("Aktuelle Mission abbrechen?")) { a.cur = null; Ag.save(a); render(); } };
  $$("[data-c]", v).forEach((b) => (b.onclick = () => { if (a.cur && !confirm("Du hast eine laufende Mission. Neue starten (die aktuelle geht verloren)?")) return; a.cur = newRun(b.dataset.c); a.cur.stage = "brief"; Ag.save(a); go("agency", "mission"); }));
  $("#calc").onclick = () => go("agency", "calc");
  $("#nums").onclick = () => { const ts = []; const seen = new Set(); for (let i = 0; i < 60 && ts.length < 10; i++) { const t = calcFor(null); if (t && !seen.has(t.calcId)) { seen.add(t.calcId); ts.push(t); } } startSession({ title: "Aufgaben mit echten Zahlen", tasks: ts, mode: "practice", back: () => go("agency"), onDone: () => go("agency") }); };
};

function missionView(v) {
  const a = Ag.get(), s = a.cur, cl = CLIENT[s.client];
  const save = () => { a.cur = s; Ag.save(a); };
  const goStage = (st) => { s.stage = st; save(); missionView(v); window.scrollTo(0, 0); };
  const head = (title, step, total) => `<div class="row small"><a class="tl" style="border:0" id="back">← Agentur</a><span class="muted">${cl.icon} ${esc(cl.name)} · Woche ${Math.min(s.week, AGENCY_WEEKS)}/${AGENCY_WEEKS}</span><span class="spacer"></span><span class="sat small" style="min-width:150px">😊 <span class="bar"><i style="width:${s.sat}%;background:${s.sat >= 60 ? "var(--ok)" : s.sat >= 40 ? "var(--warn)" : "var(--bad)"}"></i></span>${s.sat}</span></div>
    ${total ? `<div class="wiz" style="margin-top:10px">${Array.from({ length: total }, (_, i) => `<i class="${i <= step ? "on" : ""}"></i>`).join("")}</div>` : ""}<h1 style="margin-top:10px">${title}</h1>`;
  const bind = () => { $("#back").onclick = () => go("agency"); };
  const choice = (title, sub, items, key, nextSt, stepI, extra) => {
    v.innerHTML = head(title, stepI, STAGES1.length) + `<p class="muted">${sub}</p>${extra || ""}<div id="picks">${items.map((it) => `<button class="pick ${s[key] === it.id ? "on" : ""}" data-id="${it.id}">${it.html}</button>`).join("")}</div>
      <div class="actions"><button class="btn ghost" id="prev">← Zurück</button><button class="btn primary" id="nx" ${s[key] ? "" : "disabled"}>Weiter →</button></div>`;
    bind();
    $$(".pick", v).forEach((b) => (b.onclick = () => { s[key] = b.dataset.id; save(); $$(".pick", v).forEach((x) => x.classList.toggle("on", x === b)); $("#nx").disabled = false; }));
    $("#nx").onclick = () => goStage(nextSt);
    $("#prev").onclick = () => goStage(STAGES1[Math.max(0, stepI - 1)]);
  };
  const seg = cl.segments.find((x) => x.id === s.seg);

  switch (s.stage) {
    case "brief":
      v.innerHTML = head("📄 Briefing vom Kunden", 0, STAGES1.length) + `<div class="card"><h2>${cl.icon} ${esc(cl.name)}</h2><div class="small muted">${esc(cl.city)}</div><p>${esc(cl.brief)}</p>
        <div class="kpis"><div class="kpi"><div class="l">Ziel (KPI)</div><div class="v" style="font-size:1rem">${esc(cl.goal.label)}</div></div><div class="kpi"><div class="l">Budget</div><div class="v">${fmtLv(cl.budget, 0)}<span class="small muted">/Woche</span></div></div><div class="kpi"><div class="l">Wert pro ${esc(cl.convName.split(" ").pop())}</div><div class="v">${fmtLv(cl.value, 0)}</div><div class="l">${esc(cl.valueNote)}</div></div><div class="kpi"><div class="l">Bruttomarge</div><div class="v">${fmt(cl.margin * 100)}%</div></div></div>
        <p class="small muted" style="margin-top:10px">Du entscheidest: Segment → Positionierung → Angebot → Anzeigentext (A/B) → Budgetverteilung auf Kanäle. Die Kampagne läuft ${AGENCY_WEEKS} Wochen; nach jeder gibt es Daten und Analyse. Gute Ergebnisse erhöhen das Budget.</p></div>
        <div class="actions"><button class="btn primary" id="nx">Los geht's →</button></div>`;
      bind(); $("#nx").onclick = () => goStage("seg"); break;
    case "seg":
      choice("🎯 Wähle das Zielsegment", "Targeting: Wen sprechen wir an? Lies die Personas — davon hängt ab, welcher Kanal und welche Position funktionieren.",
        cl.segments.map((g) => ({ id: g.id, html: `<b>${esc(g.name)}</b> <span class="tag">${fmt(g.size)} Personen im Gebiet</span><div class="small" style="margin-top:4px">👤 ${esc(g.persona)}</div><div class="small muted" style="margin-top:4px">Preissensibilität: ${g.ps >= 0.7 ? "hoch" : g.ps <= 0.4 ? "niedrig" : "mittel"}${g.valueMult ? ` · jeder Kunde bringt ×${g.valueMult} Wert` : ""}</div>` })), "seg", "pos", 1); break;
    case "pos":
      choice("🧭 Positionierung", `Welche Position soll ${esc(cl.name)} im Kopf von „${esc(seg.name)}“ einnehmen? Denk an die Persona: Welchen Nutzen sucht sie?`,
        cl.positions.map((p) => ({ id: p.id, html: esc(p.text) })), "pos", "offer", 2, `<div class="card small" style="margin-bottom:10px">👤 ${esc(seg.persona)}</div>`); break;
    case "offer":
      choice("🏷️ Angebot / Preis", "Das Angebot beeinflusst die Conversion, aber auch Marge und Kundenwert. Die Wirkung hängt von der Preissensibilität des Segments ab.",
        cl.offers.map((o) => ({ id: o.id, html: `<b>${esc(o.name)}</b>` })), "offer", "copy", 3); break;
    case "copy":
      choice("✍️ Anzeigentext: A oder B?", "Welchen Text schaltest du? (Die Auswertung nach der Woche erklärt, warum.)",
        cl.copies.map((c) => ({ id: c.id, html: `<b>${c.id}:</b> ${esc(c.text)}` })), "copy", "budget", 4); break;
    case "budget": budgetView(v, s, cl, head, save, goStage); break;
    case "results": resultsView(v, s, cl, head, save, goStage); break;
    case "event": eventView(v, s, cl, head, save, goStage); break;
    case "action": actionView(v, s, cl, head, save, goStage); break;
    case "final": finalView(v, s, cl, a); break;
  }
}

function budgetView(v, s, cl, head, save, goStage) {
  const chs = cl.channels.concat(s.retargetOn ? ["retarget"] : []);
  const B = s.budget - (s.landingCost || 0);
  let tot = chs.reduce((x, c) => x + (+s.alloc[c] || 0), 0);
  if (tot > B) { chs.forEach((c) => (s.alloc[c] = Math.floor((+s.alloc[c] || 0) * B / tot / 10) * 10)); }
  const seg = cl.segments.find((x) => x.id === s.seg);
  v.innerHTML = head("💸 Budget auf Kanäle verteilen", s.week === 1 ? 5 : null, s.week === 1 ? STAGES1.length : 0) +
    `<p class="muted">Budget für die Woche: <b>${fmtLv(s.budget, 0)}</b>${s.landingCost ? ` (−${s.landingCost} € für die Landingpage)` : ""}. Denk nach: Wo ist das Segment „${esc(seg.name)}“, wie groß ist die Zielgruppe dort (Sättigung!) und wie hoch die Absicht?</p>
    <div class="card"><div class="alloc">${chs.map((c) => { const C = CHANNELS[c]; const aud = c === "email" ? cl.emailList : c === "retarget" ? s.retargetAud : seg.size * (seg.p[c] || 0); return `<div class="a"><div><b>${C.icon} ${C.name}</b><div class="small muted">CPM ~${C.cpm} € · Zielgruppe ~${fmt(aud)}</div></div><input type="range" min="0" max="${B}" step="10" value="${+s.alloc[c] || 0}" data-c="${c}"><div class="val" id="v-${c}">${fmt(+s.alloc[c] || 0)} €</div></div>`; }).join("")}</div>
    <div class="row" style="margin-top:12px"><span>Verteilt: <b id="sum"></b> von ${fmt(B)} €</span><span class="spacer"></span><button class="btn sm" id="eq">Gleich verteilen</button><button class="btn sm" id="zero">Zurücksetzen</button></div></div>
    <div class="actions">${s.week === 1 ? `<button class="btn ghost" id="prev">← Zurück</button>` : ""}<button class="btn primary" id="run">▶ Woche starten: ${s.week}</button></div>`;
  $("#back").onclick = () => go("agency");
  const upd = () => { const sum = chs.reduce((x, c) => x + (+s.alloc[c] || 0), 0); $("#sum").textContent = fmt(sum) + " €"; $("#sum").style.color = sum > B ? "var(--bad)" : ""; $("#run").disabled = sum <= 0 || sum > B; chs.forEach((c) => ($("#v-" + c).textContent = fmt(+s.alloc[c] || 0) + " €")); };
  $$("input[type=range]", v).forEach((r) => (r.oninput = () => { const c = r.dataset.c; let val = +r.value; const others = chs.reduce((x, k) => x + (k === c ? 0 : +s.alloc[k] || 0), 0); if (others + val > B) { val = Math.max(0, B - others); r.value = val; } s.alloc[c] = val; save(); upd(); }));
  $("#eq").onclick = () => { chs.forEach((c) => (s.alloc[c] = Math.floor(B / chs.length / 10) * 10)); save(); budgetView(v, s, cl, head, save, goStage); };
  $("#zero").onclick = () => { chs.forEach((c) => (s.alloc[c] = 0)); save(); budgetView(v, s, cl, head, save, goStage); };
  if ($("#prev")) $("#prev").onclick = () => goStage("copy");
  $("#run").onclick = () => { Object.keys(s.alloc).forEach((c) => { if (!chs.includes(c)) delete s.alloc[c]; }); const res = runWeek(s); const a = Ag.get(); a.xp += res.xp; a.cur = s; s.stage = "results"; Ag.save(a); Prog.addXP(Math.round(res.xp / 2)); missionView(v); window.scrollTo(0, 0); };
  upd();
}

function resultsView(v, s, cl, head, save, goStage) {
  const r = s.history[s.history.length - 1], T = r.T, g = cl.goal;
  const kpiCls = (ok) => (ok ? "good" : "bad");
  const goalTile = g.kpi === "conv" ? [`${cl.convName}`, fmt(T.conv, 1), T.goalOk] : g.kpi === "roas" ? ["ROAS (Ziel ≥ " + g.target + ")", fmt(T.roas, 2), T.goalOk] : g.kpi === "cac" ? ["CAC (Ziel ≤ " + g.target + " €)", fmtLv(T.cac, 0), T.goalOk] : ["CPA (Ziel ≤ " + g.target + " €)", fmtLv(T.cpa, 0), T.goalOk];
  const tiles = [["Kosten", fmtLv(T.spend, 0)], ["Impressionen", fmt(T.imp)], ["Reichweite (eindeutig)", fmt(T.reach)], ["Klicks", fmt(T.clicks)], ["CTR", fmtPct(T.ctr * 100, 2)], ["Conversion-Rate (CVR)", fmtPct(T.cvr * 100, 2)],
    [cl.convName, fmt(T.conv, 1)], ["CPA", isFinite(T.cpa) ? fmtLv(T.cpa, 0) : "—"], ["Umsatz (Wert)", fmtLv(T.rev, 0)], ["ROAS", fmt(T.roas, 2)], ["ROI", fmtPct(T.roi * 100, 0)]];
  const last = s.week > AGENCY_WEEKS;
  const ev = !last && cl.events[s.week];
  v.innerHTML = `<div class="row small"><a class="tl" style="border:0" id="back">← Agentur</a><span class="muted">${cl.icon} ${esc(cl.name)}</span></div>
    <h1 style="margin-top:10px">📊 Ergebnisse · Woche ${r.week}</h1>
    <div class="kpis"><div class="kpi ${kpiCls(goalTile[2])}"><div class="l">🎯 ${esc(goalTile[0])}</div><div class="v">${goalTile[1]}</div><div class="l">${goalTile[2] ? "Ziel erreicht" : "unter dem Ziel"}</div></div>${tiles.map((t) => `<div class="kpi"><div class="l">${esc(t[0])}</div><div class="v">${t[1]}</div></div>`).join("")}</div>
    <div class="card" style="margin-top:12px"><b>Funnel</b><div class="funnel-v"><div style="width:100%">${fmt(T.imp)} Impressionen</div><div style="width:80%">${fmt(T.reach)} Personen Reichweite</div><div style="width:60%">${fmt(T.clicks)} Klicks · CTR ${fmtPct(T.ctr * 100, 2)}</div><div style="width:40%;background:var(--ok-soft)">${fmt(T.conv, 1)} ${esc(cl.convName)} · CVR ${fmtPct(T.cvr * 100, 1)}</div></div>
      <div class="tbl-wrap"><table class="tbl"><tr><th>Kanal</th><th>Kosten</th><th>Impressionen</th><th>Frequenz</th><th>Klicks</th><th>CTR</th><th>Conv.</th><th>CPA</th></tr>
      ${r.rows.map((x) => `<tr><td>${CHANNELS[x.ch].icon} ${CHANNELS[x.ch].name}</td><td>${fmt(x.spend)}</td><td>${fmt(x.imp)}</td><td>${fmt(x.freq, 1)}</td><td>${fmt(x.clicks)}</td><td>${fmtPct(x.ctr * 100, 2)}</td><td>${fmt(x.conv, 1)}</td><td>${isFinite(x.cpa) ? fmt(x.cpa) : "—"}</td></tr>`).join("")}</table></div></div>
    <div class="card" style="margin-top:12px"><b>🧑‍🏫 Mentor-Analyse</b>${r.notes.map((n) => `<div class="note ${n.tone}">${n.tone === "good" ? "✅" : n.tone === "bad" ? "⚠️" : "💡"} ${esc(n.text)}${n.terms.length ? `<div class="small" style="margin-top:4px">Theorie: ${n.terms.map(termChip).filter(Boolean).join(", ")}</div>` : ""}</div>`).join("")}</div>
    <div class="card row" style="margin-top:12px"><div style="flex:1;min-width:200px"><b>Der Kunde:</b> Zufriedenheit ${r.satBefore} → <b>${r.satAfter}</b> · Budget für nächste Woche: <b>${fmtLv(r.nextBudget, 0)}</b>${r.nextBudget > r.budget ? " ⬆️" : r.nextBudget < r.budget ? " ⬇️" : ""}</div><span class="tag acc">+${r.xp} Agentur-XP</span></div>
    <div class="actions"><button class="btn primary" id="nx">${last ? "Abschlussbericht →" : ev ? `Woche ${s.week}: Es passiert etwas… →` : `Zu Woche ${s.week} →`}</button></div>`;
  $("#back").onclick = () => go("agency");
  $("#nx").onclick = () => goStage(last ? "final" : ev ? "event" : "action");
}
function eventView(v, s, cl, head, save, goStage) {
  const ev = cl.events[s.week];
  v.innerHTML = head(ev.title) + `<div class="card"><p>${esc(ev.text)}</p></div><p class="muted">Wie reagierst du?</p><div>${ev.options.map((o, i) => `<button class="pick" data-i="${i}">${esc(o.text)}</button>`).join("")}</div><div id="evfb"></div>`;
  $("#back").onclick = () => go("agency");
  $$(".pick", v).forEach((b) => (b.onclick = () => {
    if (s.evDone === s.week) return; s.evDone = s.week;
    const o = ev.options[+b.dataset.i]; applyEvent(s, o); s.decisions.push({ week: s.week, event: ev.title, choice: o.text, good: o.good }); save();
    $$(".pick", v).forEach((x, i) => { x.disabled = true; if (ev.options[i].good) x.classList.add("on"); });
    $("#evfb").innerHTML = `<div class="fb ${o.good ? "ok" : "bad"}"><h3>${o.good ? "Starker Zug" : "Riskanter Zug"}</h3><div>${esc(o.note)}</div><div class="small" style="margin-top:6px">Kundenzufriedenheit: ${o.sat >= 0 ? "+" : ""}${o.sat}${o.cvr !== 1 || o.ctr !== 1 ? ` · Wirkung auf die Kampagne: CTR ×${fmt(o.ctr, 2)}, Conversion ×${fmt(o.cvr, 2)}` : ""}</div><div class="small" style="margin-top:4px">Theorie: ${o.terms.map(termChip).join(", ")}</div></div><div class="actions"><button class="btn primary" id="nx">Weiter →</button></div>`;
    $("#nx").onclick = () => goStage("action");
  }));
}
function actionView(v, s, cl, head, save, goStage) {
  const acts = ACTIONS.filter((x) => (x.id !== "keywords" || cl.channels.includes("search")) && (x.id !== "landing" || s.landing === 1) && (x.id !== "retarget" || !s.retargetOn) && (x.id !== "lookalike" || !s.lookalike) && (x.id !== "keywords" || !s.keywords));
  v.innerHTML = head(`🔧 Optimierung vor Woche ${s.week}`) + `<p class="muted">Schau dir Daten und Auswertung an. Wähle <b>eine</b> Maßnahme (die Ressourcen des Teams sind begrenzt).</p>
    ${acts.map((x) => `<button class="pick" data-id="${x.id}"><b>${esc(x.name)}</b><div class="small muted">${esc(x.desc)}</div></button>`).join("")}`;
  $("#back").onclick = () => go("agency");
  $$(".pick", v).forEach((b) => (b.onclick = () => { applyAction(s, b.dataset.id); s.decisions.push({ week: s.week, action: b.dataset.id }); save(); goStage("budget"); }));
}
function finalView(v, s, cl, a) {
  const H = s.history, tot = H.reduce((x, r) => ({ spend: x.spend + r.T.spend, conv: x.conv + r.T.conv, rev: x.rev + r.T.rev, profit: x.profit + r.T.profit }), { spend: 0, conv: 0, rev: 0, profit: 0 });
  const hits = H.filter((r) => r.T.goalOk).length, stars = s.sat >= 80 && hits >= 3 ? 3 : s.sat >= 60 && hits >= 2 ? 2 : s.sat >= 40 ? 1 : 0;
  const bonus = [5, 20, 40, 70][stars];
  if (!s.closed) {
    s.closed = true; a.xp += bonus; a.runs++;
    const b = a.best[cl.id]; if (!b || stars > b.stars || (stars === b.stars && s.sat > b.sat)) a.best[cl.id] = { stars, sat: s.sat };
    a.cur = s; Ag.save(a); Prog.addXP(bonus);
  }
  const terms = {}; H.forEach((r) => r.notes.filter((n) => n.tone === "bad").forEach((n) => n.terms.forEach((t) => (terms[t] = (terms[t] || 0) + 1))));
  const lessons = Object.entries(terms).sort((x, y) => y[1] - x[1]).slice(0, 6).map((x) => x[0]);
  const r = rankOf(a.xp);
  v.innerHTML = `<div class="row small"><a class="tl" style="border:0" id="back">← Agentur</a></div><div class="card result" style="margin-top:10px">
    <div style="font-size:2.4rem">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</div><h1>Abschlussbericht: ${esc(cl.name)}</h1>
    <p>Ziel erreicht in <b>${hits} von ${H.length}</b> Wochen · Kundenzufriedenheit <b>${s.sat}/100</b> · Bonus <b>+${bonus} XP</b></p>
    <div class="kpis" style="text-align:left"><div class="kpi"><div class="l">Gesamtkosten</div><div class="v">${fmtLv(tot.spend, 0)}</div></div><div class="kpi"><div class="l">${esc(cl.convName)}</div><div class="v">${fmt(tot.conv, 0)}</div></div><div class="kpi"><div class="l">Umsatz (Wert)</div><div class="v">${fmtLv(tot.rev, 0)}</div></div><div class="kpi ${tot.profit >= 0 ? "good" : "bad"}"><div class="l">Gewinn nach Werbung</div><div class="v">${fmtLv(tot.profit, 0)}</div></div></div>
    <div class="tbl-wrap"><table class="tbl"><tr><th>Woche</th><th>Budget</th><th>${esc(cl.convName)}</th><th>CPA</th><th>ROAS</th><th>Ziel</th></tr>${H.map((x) => `<tr><td>${x.week}</td><td>${fmt(x.budget)}</td><td>${fmt(x.T.conv, 1)}</td><td>${isFinite(x.T.cpa) ? fmt(x.T.cpa) : "—"}</td><td>${fmt(x.T.roas, 2)}</td><td>${x.T.goalOk ? "✅" : "—"}</td></tr>`).join("")}</table></div>
    <p class="small">Rang: <b>${r.name}</b> · ${fmt(a.xp)} Agentur-XP</p>
    ${lessons.length ? `<p class="small" style="text-align:left"><b>Was du wiederholen solltest:</b> ${lessons.map(termChip).join(", ")}</p>` : ""}
    <div class="row" style="justify-content:center"><button class="btn" id="again">↻ Noch einmal spielen</button><button class="btn primary" id="done">Zur Agentur</button></div></div>`;
  const close = () => { const A = Ag.get(); A.cur = null; Ag.save(A); };
  $("#back").onclick = () => { close(); go("agency"); };
  $("#done").onclick = () => { close(); go("agency"); };
  $("#again").onclick = () => { const A = Ag.get(); A.cur = newRun(cl.id); A.cur.stage = "brief"; Ag.save(A); go("agency", "mission"); };
}

// ───── Rechner
function calcView(v) {
  const F = (id, label, val) => `<label class="small">${label}<input type="number" id="${id}" value="${val}" step="any" inputmode="decimal"></label>`;
  v.innerHTML = `<div class="row small"><a class="tl" style="border:0" id="back">← Agentur</a></div><h1 style="margin-top:10px">🧮 Rechner</h1>
    <div class="grid">
      <div class="card"><b>ROAS und ROI</b><div class="stack">${F("c1r", "Umsatz aus Werbung (€)", 3000)}${F("c1s", "Werbekosten (€)", 1000)}${F("c1m", "Bruttomarge (%)", 30)}</div><div class="formula" id="o1" style="margin-top:10px"></div></div>
      <div class="card"><b>CPC, CVR → CPA</b><div class="stack">${F("c2s", "Kosten (€)", 500)}${F("c2c", "Klicks", 1000)}${F("c2v", "Conversions", 20)}</div><div class="formula" id="o2" style="margin-top:10px"></div></div>
      <div class="card"><b>LTV, CAC und Amortisationsdauer</b><div class="stack">${F("c3p", "Monatspreis (€)", 60)}${F("c3n", "Durchschnittliche Monate als Kunde", 9)}${F("c3m", "Marge (%)", 50)}${F("c3c", "CAC (€)", 90)}</div><div class="formula" id="o3" style="margin-top:10px"></div></div>
      <div class="card"><b>Break-even-Punkt</b><div class="stack">${F("c4f", "Fixkosten (€/Monat)", 6000)}${F("c4p", "Preis pro Stück (€)", 3)}${F("c4v", "Variable Kosten pro Stück (€)", 1)}</div><div class="formula" id="o4" style="margin-top:10px"></div></div>
    </div>`;
  $("#back").onclick = () => go("agency");
  const n = (id) => +$("#" + id).value || 0;
  const upd = () => {
    const r = n("c1r"), s = n("c1s"), m = n("c1m") / 100;
    $("#o1").innerHTML = s ? `ROAS = ${fmt(r)} / ${fmt(s)} = <b>${fmt(r / s, 2)}</b><br>Rohertrag = ${fmt(r)} × ${fmt(m * 100)} % = ${fmt(r * m, 2)} €<br>ROI = (${fmt(r * m, 2)} − ${fmt(s)}) / ${fmt(s)} = <b>${fmtPct((r * m - s) / s * 100, 1)}</b><br>Break-even-ROAS = 1 / Marge = <b>${m ? fmt(1 / m, 2) : "—"}</b>` : "Kosten eingeben > 0";
    const s2 = n("c2s"), c = n("c2c"), v2 = n("c2v");
    $("#o2").innerHTML = c && v2 ? `CPC = ${fmt(s2)} / ${fmt(c)} = <b>${fmt(s2 / c, 2)} €</b><br>CVR = ${fmt(v2)} / ${fmt(c)} = <b>${fmtPct(v2 / c * 100, 2)}</b><br>CPA = ${fmt(s2)} / ${fmt(v2)} = <b>${fmt(s2 / v2, 2)} €</b> (= CPC / CVR)` : "Klicks und Conversions eingeben > 0";
    const p = n("c3p"), mo = n("c3n"), m3 = n("c3m") / 100, cac = n("c3c"), ltv = p * mo * m3;
    $("#o3").innerHTML = `LTV = ${fmt(p)} × ${fmt(mo)} × ${fmt(m3 * 100)}% = <b>${fmt(ltv, 2)} €</b><br>LTV:CAC = ${cac ? `<b>${fmt(ltv / cac, 2)} : 1</b> ${ltv / cac >= 3 ? "✅ gesund" : ltv / cac >= 1 ? "⚠️ knapp" : "❌ Verlust pro Kunde"}` : "—"}<br>Amortisationsdauer = ${cac && p * m3 ? `${fmt(cac)} / ${fmt(p * m3, 2)} = <b>${fmt(cac / (p * m3), 1)} Mon.</b>` : "—"}`;
    const f = n("c4f"), pr = n("c4p"), vc = n("c4v"), cm = pr - vc;
    $("#o4").innerHTML = cm > 0 ? `Deckungsbeitrag = ${fmt(pr, 2)} − ${fmt(vc, 2)} = ${fmt(cm, 2)} €<br>Break-even = ${fmt(f)} / ${fmt(cm, 2)} = <b>${fmt(Math.ceil(f / cm - 1e-9))} Stück</b><br>Umsatz am Break-even = <b>${fmtLv(Math.ceil(f / cm - 1e-9) * pr, 0)}</b>` : "Der Preis muss über den variablen Kosten liegen";
  };
  $$("input", v).forEach((i) => (i.oninput = upd)); upd();
}
