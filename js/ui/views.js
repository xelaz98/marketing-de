// Ansichten: Pfad, Einstufungstest, Modulschritte, Wiederholen, Theorie, Glossar, Mehr.
const REVIEW_FIRST = 15; // warten so viele Begriffe auf Wiederholung, führt „Weiter“ zuerst dorthin

// ───── Was ist der nächste Schritt
function nextAction() {
  const due = SRS.due().length;
  if (due >= REVIEW_FIRST) return { label: `Wiederholen: ${due} Begriffe warten`, sub: "Zuerst wiederholen — das Gedächtnis wird stärker, wenn du kurz vor dem Vergessen abrufst.", run: startReview };
  for (const m of MODULES) {
    const st = Units.steps(m.id).find((s) => !s.done);
    if (st) return { label: `${m.icon} ${m.short}: ${st.name}`, sub: `Modul ${MODULES.indexOf(m) + 1} von ${MODULES.length} · ${m.title}`, run: () => runStep(m.id, st.id), m: m.id, step: st.id };
  }
  if (due) return { label: `Wiederholen: ${due} Begriffe`, sub: "Alle Module bestanden — halte dein Wissen lebendig.", run: startReview };
  return { label: "Gemischte Aufgaben", sub: "Alles bestanden und wiederholt. Gemischte Aufgaben aus allen Modulen trainieren das Prüfungsdenken.", run: () => startMixed() };
}
function runStep(m, step) {
  if (step === "learn") return startLearn(m);
  if (step === "theory") { const t = THEORY.find((x) => x.m === m && !LS.get("tread", {})[x.id]) || THEORY.find((x) => x.m === m); return go("theory", t.id); }
  if (step === "prac") return startPractice(m);
  if (step === "test") return startTest(m);
}

// ───── PFAD
VIEWS.path = (arg, v) => {
  const na = nextAction(), placed = LS.get("placement", null), due = SRS.due().length;
  const doneN = MODULES.filter((m) => Units.done(m.id)).length;
  v.innerHTML = `
    <div class="hero"><div class="small muted">${doneN}/${MODULES.length} Module · ${SRS.boxes().slice(1).reduce((a, b) => a + b, 0)} Begriffe im Gedächtnis</div>
      <h1>${na.label}</h1><div class="muted small" style="margin-top:4px">${na.sub}</div>
      <button class="btn big" id="cont">Weiter →</button></div>
    ${!placed ? `<div class="card row" style="margin-top:12px"><div style="flex:1;min-width:200px"><b>Du weißt schon etwas über Marketing?</b><div class="small muted">Einstufungstest: je 3 Fragen pro Modul, stoppt nach 2 nicht bestandenen Modulen. Markiert Bekanntes und sagt dir, wo du anfangen solltest.</div></div><button class="btn" id="plc">Einstufungstest</button></div>` : ""}
    ${due && due < REVIEW_FIRST ? `<div class="card row" style="margin-top:12px"><div style="flex:1"><b>🔁 ${due} Begriffe heute zu wiederholen</b><div class="small muted">Kurzes aktives Abrufen — 3–5 Minuten.</div></div><button class="btn" id="rev">Wiederholen</button></div>` : ""}
    <div class="section-t">Module in Kursreihenfolge</div>
    <div class="stack" id="mods"></div>`;
  $("#cont").onclick = na.run;
  if ($("#plc")) $("#plc").onclick = startPlacement;
  if ($("#rev")) $("#rev").onclick = startReview;
  $("#mods").innerHTML = MODULES.map((m, i) => {
    const steps = Units.steps(m.id), done = steps.every((s) => s.done), u = Units.get(m.id);
    return `<div class="card mod ${done ? "done" : ""}"><div class="ic">${done ? "✅" : m.icon}</div><div class="body">
      <div class="row"><b>${i + 1}. ${esc(m.title)}</b>${u.placed ? `<span class="tag ok">aus dem Test bekannt</span>` : ""}<span class="spacer"></span><span class="small muted">${Units.pct(m.id)}%</span></div>
      <div class="bar ${done ? "ok" : ""}" style="margin-top:6px"><i style="width:${Units.pct(m.id)}%"></i></div>
      <div class="steps">${steps.map((s) => `<button class="step ${s.done ? "done" : ""} ${na.m === m.id && na.step === s.id ? "next" : ""}" data-m="${m.id}" data-s="${s.id}"><b>${s.name}</b><span>${s.info}</span></button>`).join("")}</div></div></div>`;
  }).join("");
  $$(".step", v).forEach((b) => (b.onclick = () => runStep(b.dataset.m, b.dataset.s)));
};

// ───── Einstufungstest
function startPlacement() {
  const results = {}; let i = 0, failed = 0;
  const nextMod = () => {
    if (i >= MODULES.length || failed >= 2) return done();
    const m = MODULES[i].id, ts = sample(Units.termsOf(m), 3).map((t) => termTask(t, ["def2term", "situation", "term2def"]));
    startSession({ title: `Einstufungstest · Modul ${i + 1}/${MODULES.length}: ${MODULES[i].title}${failed ? " · nicht bestanden: " + failed + "/2" : ""}`, tasks: ts, mode: "test", requeue: false, silent: true, back: () => go("path"),
      onDone: (r) => { results[m] = r.sum; if (r.sum < 2) failed++; i++; nextMod(); } });
  };
  const done = () => {
    const known = Object.keys(results).filter((m) => results[m] >= 2);
    known.forEach((m) => { Units.set(m, { placed: true }); Units.termsOf(m).forEach((t) => SRS.learn(t.id)); });
    LS.set("placement", { date: dayStr(), results });
    const first = MODULES.find((m) => !known.includes(m.id));
    const v = $("#view");
    v.innerHTML = `<div class="player"><div class="card result"><h1>Ergebnis des Einstufungstests</h1>
      <div class="stack" style="text-align:left;margin-top:12px">${MODULES.map((m) => m.id in results ? `<div class="row"><span>${m.icon} ${esc(m.title)}</span><span class="spacer"></span><span class="tag ${results[m.id] >= 2 ? "ok" : "bad"}">${results[m.id]}/3</span></div>` : "").join("")}</div>
      <p style="margin-top:14px">${known.length ? `Als bekannt markiert: <b>${known.length}</b> Module. Ihre Begriffe kommen in die Wiederholung, damit du sie nicht vergisst.` : "Wir beginnen von vorn — so baust du ein solides Fundament auf."}</p>
      <p><b>Starte mit:</b> ${first ? `${first.icon} ${esc(first.title)}` : "alles bekannt — weiter mit gemischten Aufgaben und Klausur."}</p>
      <button class="btn primary" id="ok">Zum Pfad →</button></div></div>`;
    $("#ok").onclick = () => go("path");
  };
  nextMod();
}

// ───── Schritt 1: neue Begriffe (je 6 auf einmal)
function startLearn(m) {
  const fresh = Units.termsOf(m).filter((t) => !SRS.known(t.id));
  if (!fresh.length) { toast("Alle Begriffe des Moduls sind gelernt."); return go("path"); }
  const batch = fresh.slice(0, 6); let k = 0;
  const v = $("#view");
  App.busy = { confirmLeave: () => confirm("Lektion abbrechen?"), key: (e) => { if (e.key === "Enter" || e.key === "ArrowRight") { e.preventDefault(); nextCard(); } if (e.key === "Escape") { App.busy = null; go("path"); } } };
  const nextCard = () => { k++; k < batch.length ? card() : quiz(); };
  const card = () => {
    const t = batch[k];
    v.innerHTML = `<div class="player"><div class="ph"><button class="iconbtn" id="quit">✕</button><div class="bar"><i style="width:${k / batch.length * 50}%"></i></div><span class="small muted">${k + 1}/${batch.length}</span></div>
      <div class="card"><div class="q-sub">${MOD[m].icon} ${esc(MOD[m].title)} · neuer Begriff</div>${termDetailHTML(t)}
      <div class="actions"><button class="btn primary" id="nx">${k + 1 < batch.length ? "Nächster ↵" : "Zur Übung ↵"}</button></div></div></div>`;
    $("#nx").onclick = nextCard; $("#quit").onclick = () => { App.busy = null; go("path"); };
  };
  const quiz = () => {
    App.busy = null;
    const tasks = shuffle(batch.map((t) => termTask(t, ["def2term", "situation"])).concat(batch.map((t) => termTask(t, ["cloze", "tf", "term2def"])))).slice(0, Math.max(6, batch.length + 3));
    const mt = matchTask([m], batch.map((t) => t.id)); if (mt) tasks.push(mt);
    startSession({ title: `Neue Begriffe · ${MOD[m].short}`, tasks, mode: "learn", back: () => go("path"),
      onDone: () => { batch.forEach((t) => SRS.learn(t.id)); const left = Units.termsOf(m).filter((t) => !SRS.known(t.id)).length; toast(left ? `${batch.length} Begriffe gelernt. Es bleiben ${left}.` : "Alle Begriffe des Moduls sind gelernt! 🎉"); go("path"); } });
  };
  card();
}
// ───── Schritt 3 und 4
function startPractice(m) {
  const tasks = buildSession([m], 12); const mt = matchTask([m]); if (mt) tasks.splice(rnd(tasks.length), 0, mt);
  startSession({ title: `Übungen · ${MOD[m].title}`, tasks, mode: "practice", pass: 70, srs: true, back: () => go("path"),
    again: () => startPractice(m), onDone: (r) => { Units.set(m, { prac: Math.max(Units.get(m).prac, r.pct) }); go("path"); } });
}
function startTest(m) {
  startSession({ title: `Prüfung · ${MOD[m].title}`, tasks: buildSession([m], 15, { handShare: 0.4 }), mode: "test", pass: 80, srs: true, back: () => go("path"),
    again: () => startTest(m), onDone: (r) => { Units.set(m, { test: Math.max(Units.get(m).test, r.pct) }); if (r.passed) toast(`✅ Modul „${MOD[m].short}“ bestanden!`); go("path"); } });
}

// ───── WIEDERHOLEN
function startedMods() { return MODULES.filter((m) => Units.get(m.id).placed || Units.learnedCount(m.id) > 0).map((m) => m.id); }
function startReview() {
  const due = SRS.due();
  if (!due.length) { toast("Heute keine Begriffe zu wiederholen. 👏"); return go("review"); }
  startSession({ title: "Wiederholung (Spaced Repetition)", tasks: reviewTasks(due.slice(0, 20)), mode: "review", srs: true, back: () => go("review"), onDone: () => go("review") });
}
function startMixed(n = 15) {
  const mods = startedMods(); const use = mods.length ? mods : ["m1"];
  const tasks = buildSession(use, n, { handShare: 0.4 }); const mt = matchTask(use); if (mt) tasks.push(mt);
  startSession({ title: "Gemischte Aufgaben" + (mods.length ? ` (${mods.length} Module)` : ""), tasks, mode: "practice", srs: true, back: () => go("review"), onDone: () => go("review") });
}
function startMistakes() {
  const keys = Object.keys(Mist.all()); if (!keys.length) { toast("Keine Fehler gespeichert. 👏"); return; }
  const tasks = shuffle(keys).slice(0, 15).map(taskFromKey).filter(Boolean);
  tasks.forEach((t, i) => { if (!t.key) t.key = keys[i]; });
  startSession({ title: "Meine Fehler", tasks, mode: "mistakes", srs: true, back: () => go("review"), onDone: () => go("review") });
}
function startExam(mods, n, minutes) {
  const nOpen = Math.max(1, Math.round(n * 0.15)), nCase = Math.round(n * 0.2), nCalc = Math.round(n * 0.15), nMcq = n - nOpen - nCase - nCalc;
  const open = shuffle(handItems(mods, ["open"])).slice(0, nOpen).map(([k, x]) => HAND_GEN[k](x));
  const cases = shuffle(handItems(mods, ["dec", "err"])).slice(0, nCase).map(([k, x]) => HAND_GEN[k](x));
  const calcs = []; for (let i = 0; i < nCalc * 3 && calcs.length < nCalc; i++) { const c = calcFor(mods.filter((m) => CALC_MODS.has(m)).length ? mods.filter((m) => CALC_MODS.has(m)) : null); if (c && !calcs.some((x) => x.calcId === c.calcId)) calcs.push(c); }
  const mcq = buildSession(mods, nMcq + (nCase - cases.length) + (nOpen - open.length), { calc: false, handShare: 0.3, kinds: ["htf", "cat", "seq"], types: ["def2term", "situation", "cloze", "term2def", "tf"] });
  const tasks = mcq.concat(cases, calcs, open);
  startSession({ title: `Klausur · ${tasks.length} Fragen · ${minutes} Min.`, tasks: shuffle(tasks).sort((a, b) => (a.kind === "open") - (b.kind === "open")), mode: "exam", timer: minutes * 60, back: () => go("review"),
    onDone: (r) => { const h = LS.get("exams", []); h.unshift({ d: dayStr(), pct: r.pct, n: r.total }); LS.set("exams", h.slice(0, 20)); go("review"); } });
}
VIEWS.review = (arg, v) => {
  const due = SRS.due().length, mist = Mist.count(), b = SRS.boxes(), mods = startedMods(), exams = LS.get("exams", []);
  const total = b.slice(1).reduce((a, x) => a + x, 0);
  v.innerHTML = `<h1>🔁 Wiederholen</h1><p class="muted">Aktives Abrufen: Du schreibst oder wählst zwischen ähnlichen Optionen — kein „weiß ich/weiß ich nicht“. Fächer: 1 → 3 → 7 → 16 Tage; ein Fehler schickt den Begriff zurück in Fach 1.</p>
    <div class="grid">
      <div class="card"><h2>Heutige Wiederholung</h2><p class="muted small">${due ? `${due} Begriffe warten heute.` : "Heute warten keine Begriffe. 👏"}</p><button class="btn primary" id="r1" ${due ? "" : "disabled"}>Starten (${Math.min(due, 20)})</button></div>
      <div class="card"><h2>Meine Fehler</h2><p class="muted small">${mist ? `${mist} Aufgaben/Begriffe mit Fehlern. Richtig gelöste Aufgaben verschwinden aus der Liste.` : "Noch keine Fehler."}</p><button class="btn" id="r2" ${mist ? "" : "disabled"}>Fehler beheben</button></div>
      <div class="card"><h2>Gemischte Aufgaben</h2><p class="muted small">Interleaving: Aufgaben aus allen begonnenen Modulen (${mods.length || 1}) — so lernt das Gehirn zu erkennen, welches Werkzeug passt.</p><button class="btn" id="r3">15 gemischte Aufgaben</button></div>
      <div class="card"><h2>⏱️ Klausurmodus</h2><p class="muted small">Test, Fallstudien, Rechenaufgaben und offene Fragen. Timer, keine Hinweise; Note und vollständige Auswertung am Ende.</p>
        <select id="exMods"><option value="started">Begonnene Module (${mods.length || 1})</option><option value="all">Alle 12 Module</option>${MODULES.map((m) => `<option value="${m.id}">${m.icon} ${esc(m.title)}</option>`).join("")}</select>
        <div class="row" style="margin-top:8px"><select id="exLen" style="flex:1"><option value="20,25">20 Fragen · 25 Min.</option><option value="30,40">30 Fragen · 40 Min.</option><option value="10,12">10 Fragen · 12 Min.</option></select><button class="btn primary" id="r4">Start</button></div></div>
    </div>
    <div class="section-t">Gedächtnisfächer</div>
    <div class="card"><div class="row" style="align-items:flex-end;gap:6px;height:110px">${[1, 2, 3, 4, 5].map((i) => `<div style="flex:1;text-align:center"><div style="height:${total ? Math.max(4, b[i] / Math.max(...b.slice(1)) * 70) : 4}px;background:${i === 5 ? "var(--ok)" : "var(--accent)"};border-radius:6px 6px 0 0;opacity:${0.45 + i * 0.11}"></div><div class="small"><b>${b[i]}</b></div><div class="small muted">${i < 5 ? ["", "1 Tag", "3 Tage", "7 Tage", "16 Tage"][i] : "gelernt"}</div></div>`).join("")}</div></div>
    ${exams.length ? `<div class="section-t">Letzte Klausuren</div><div class="card">${exams.slice(0, 5).map((e) => `<div class="row"><span>${e.d.split("-").reverse().join(".")}</span><span class="muted small">${e.n} Fragen</span><span class="spacer"></span><b>${e.pct}%</b><span class="tag">${grade6(e.pct)}</span></div>`).join("")}</div>` : ""}`;
  $("#r1").onclick = startReview; $("#r2").onclick = startMistakes; $("#r3").onclick = () => startMixed();
  $("#r4").onclick = () => { const s = $("#exMods").value; const ms = s === "started" ? (mods.length ? mods : ["m1"]) : s === "all" ? MODULES.map((m) => m.id) : [s]; const [n, min] = $("#exLen").value.split(",").map(Number); startExam(ms, n, min); };
};

// ───── THEORIE
VIEWS.theory = (arg, v) => {
  const read = LS.get("tread", {});
  if (arg && THEORY.find((t) => t.id === arg)) return theoryTopic(arg, v);
  v.innerHTML = `<h1>📘 Theorie</h1><p class="muted">Kurz das „Warum und Wie“, mit echten Beispielen. Unter jedem Thema — „Das üben“.</p><div class="stack">${MODULES.map((m) => {
    const ts = THEORY.filter((t) => t.m === m.id), nr = ts.filter((t) => read[t.id]).length;
    return `<div class="card"><div class="acc-h"><span style="font-size:1.4rem">${m.icon}</span><b style="flex:1">${esc(m.title)}</b><span class="tag ${nr === ts.length ? "ok" : ""}">${nr}/${ts.length}</span></div>
      <div class="tlist" style="margin-top:6px">${ts.map((t) => `<a data-id="${t.id}">${read[t.id] ? "✅" : "📄"} ${esc(t.title)}${t.dia ? ' <span class="tag">Schema</span>' : ""}</a>`).join("")}</div></div>`;
  }).join("")}</div>`;
  $$(".tlist a", v).forEach((a) => (a.onclick = () => go("theory", a.dataset.id)));
};
function topicTerms(t) {
  if (t.terms) return t.terms.filter((id) => TERM[id]);
  const ids = []; t.html.replace(/\[\[([^\]]+)\]\]/g, (_, k) => { const id = slug(k); if (TERM[id] && !ids.includes(id)) ids.push(id); }); return ids;
}
function theoryTopic(id, v) {
  const t = THEORY.find((x) => x.id === id), i = THEORY.indexOf(t), nx = THEORY[i + 1], pv = THEORY[i - 1];
  const read = LS.get("tread", {}); read[id] = true; LS.set("tread", read);
  if (THEORY.filter((x) => x.m === t.m).every((x) => read[x.id]) && !Units.get(t.m).theory) { Units.set(t.m, { theory: true }); toast("📘 Theorie des Moduls gelesen"); }
  const ids = topicTerms(t);
  v.innerHTML = `<div class="row small"><a class="tl" style="border:0" id="back">← Theorie</a><span class="muted">${MOD[t.m].icon} ${esc(MOD[t.m].title)}</span></div>
    <article class="card theory" style="margin-top:8px"><h1>${esc(t.title)}</h1>${t.dia ? `<div class="dia">${DIAGRAMS[t.dia]()}</div>` : ""}${linkTerms(t.html)}</article>
    <div class="card" style="margin-top:12px"><b>Das üben</b><div class="small muted">${ids.length} Begriffe aus dem Thema: ${ids.slice(0, 8).map(termChip).join(", ")}${ids.length > 8 ? "…" : ""}</div>
      <div class="row" style="margin-top:10px"><button class="btn primary" id="pr">Üben (10 Aufgaben)</button><span class="spacer"></span>${pv ? `<button class="btn ghost" id="pv">← Vorheriges</button>` : ""}${nx ? `<button class="btn" id="nx">Nächstes Thema →</button>` : ""}</div></div>`;
  $("#back").onclick = () => go("theory");
  $("#pr").onclick = () => { ids.forEach((x) => SRS.learn(x)); const tasks = buildSession([t.m], 10, { terms: ids, handShare: 0.2 }); const mt = matchTask([t.m], ids); if (mt) tasks.push(mt); startSession({ title: "Übung · " + t.title, tasks, mode: "practice", srs: true, back: () => go("theory", id), onDone: () => go("theory", id) }); };
  if (nx) $("#nx").onclick = () => go("theory", nx.id);
  if (pv) $("#pv").onclick = () => go("theory", pv.id);
}

// ───── GLOSSAR
VIEWS.glossary = (arg, v) => {
  v.innerHTML = `<h1>📖 Glossar</h1><p class="muted">${TERMS.length} Begriffe: Definition, Verwendung in der Praxis, Beispiele und häufige Verwechslungen. Suche auf Englisch oder Deutsch.</p>
    <div class="row"><input type="search" id="q" placeholder="Suche: CTR, Positionierung, Marge…" style="flex:2;min-width:180px"><select id="fm" style="flex:1;min-width:140px"><option value="">Alle Module</option>${MODULES.map((m) => `<option value="${m.id}">${m.icon} ${esc(m.short)}</option>`).join("")}</select></div>
    <div class="card" style="margin-top:12px" id="gl"></div>`;
  const draw = () => {
    const q = $("#q").value.trim().toLowerCase(), fm = $("#fm").value;
    const list = TERMS.filter((t) => (!fm || t.m === fm) && (!q || [t.key, t.en, t.bg, (t.alt || []).join(" ")].join(" ").toLowerCase().includes(q) || (q.length > 3 && t.def.toLowerCase().includes(q))))
      .sort((a, b) => { const sa = a.key.toLowerCase().startsWith(q) ? 0 : 1, sb = b.key.toLowerCase().startsWith(q) ? 0 : 1; return sa - sb || a.key.localeCompare(b.key); });
    $("#gl").innerHTML = list.length ? `<div class="small muted">${list.length} Treffer</div>` + list.slice(0, 200).map((t) => `<div class="gl-item" data-t="${t.id}"><b>${esc(t.key)}</b><span class="bgt">${esc(t.bg)}</span><span class="spacer"></span><span class="small">${SRS.known(t.id) ? "🧠" : ""}</span></div>`).join("") : `<div class="empty">Nichts gefunden.</div>`;
    $$(".gl-item", v).forEach((d) => (d.onclick = () => showTerm(d.dataset.t)));
  };
  $("#q").oninput = draw; $("#fm").onchange = draw; draw();
  if (arg && TERM[arg]) showTerm(arg);
};

// ───── MEHR
VIEWS.more = (arg, v) => {
  const xp = Prog.xp(), lvl = Prog.level(), [a, b] = Prog.levelRange(lvl), st = Prog.streakInfo();
  v.innerHTML = `<h1>☰ Mehr</h1>
    <div class="card"><div class="row"><b>⭐ Level ${lvl}</b><span class="muted small">${fmt(xp)} XP · bis Level ${lvl + 1}: ${fmt(b - xp)} XP</span><span class="spacer"></span><span class="pill">🔥 ${st.count} Tage</span></div><div class="bar" style="margin-top:8px"><i style="width:${(xp - a) / (b - a) * 100}%"></i></div></div>
    <div class="section-t">Spiele (Pause, aber du lernst)</div>
    <div class="grid">${GAMES.map((g) => `<div class="card"><div class="row"><span style="font-size:1.6rem">${g.icon}</span><div style="flex:1"><b>${g.name}</b><div class="small muted">${g.desc}</div></div></div><div class="row" style="margin-top:10px"><span class="small muted">Rekord: <b>${g.rec()}</b></span><span class="spacer"></span><button class="btn sm primary" data-g="${g.id}">Spielen</button></div></div>`).join("")}</div>
    <div class="section-t">Fortschritt nach Modulen</div>
    <div class="card">${MODULES.map((m) => { const u = Units.get(m.id); return `<div class="row" style="padding:4px 0"><span style="width:26px">${m.icon}</span><span style="flex:1;min-width:120px" class="small">${esc(m.short)}</span><span class="small muted">${Units.learnedCount(m.id)}/${Units.termsOf(m.id).length} Begriffe</span><span class="tag ${u.prac >= 70 ? "ok" : ""}">Übg. ${u.prac}%</span><span class="tag ${u.test >= 80 ? "ok" : ""}">Prüf. ${u.test}%</span></div>`; }).join("")}</div>
    <div class="section-t">Einstellungen</div>
    <div class="card stack">
      <div class="row"><span style="flex:1">Tagesziel</span><select id="goal" style="width:auto">${[20, 30, 50, 80, 120].map((g) => `<option value="${g}" ${g === Prog.goal() ? "selected" : ""}>${g} XP/Tag</option>`).join("")}</select></div>
      <div class="row"><span style="flex:1">Design</span><select id="th" style="width:auto"><option value="">Wie das System</option><option value="light">Hell</option><option value="dark">Dunkel</option></select></div>
      <div class="row"><button class="btn sm" id="plc">Einstufungstest erneut</button><button class="btn sm" id="exp">Fortschritt herunterladen (JSON)</button><label class="btn sm">Fortschritt laden<input type="file" id="imp" accept=".json" hidden></label><button class="btn sm" id="rst" style="color:var(--bad)">Alles zurücksetzen</button></div>
    </div>
    <div class="section-t">Hilfe</div>
    <div class="card small"><p><b>Tasten:</b> <span class="kbd">1</span>–<span class="kbd">4</span> Antwort wählen · <span class="kbd">Enter</span> prüfen/weiter · <span class="kbd">Esc</span> Sitzung beenden oder Fenster schließen · <span class="kbd">Backspace</span> entfernt das letzte Element bei „ordnen“.</p>
      <p><b>So funktioniert der Pfad:</b> Jedes Modul hat 4 Schritte — neue Begriffe → Theorie → Übungen (≥70 %) → Prüfung (≥80 %). „Weiter“ wählt den nächsten Schritt; warten ${REVIEW_FIRST}+ Begriffe auf Wiederholung, geht es zuerst dorthin.</p>
      <p><b>XP:</b> +2 für eine richtige Antwort im ersten Versuch, +1 für einen korrigierten Fehler, +5 für eine abgeschlossene Sitzung, +10 für eine bestandene Schwelle. Die Serie wächst mit jedem Tag, an dem das Tagesziel erreicht ist.</p>
      <p><b>Eigene Inhalte:</b> Begriffe, Themen und Aufgaben ergänzt man in <code>js/data/*.js</code> — siehe README.md im Projektordner.</p></div>`;
  $$("[data-g]", v).forEach((b) => (b.onclick = () => GAMES.find((g) => g.id === b.dataset.g).start()));
  $("#goal").onchange = (e) => { LS.set("goal", +e.target.value); refreshHeader(); toast("Tagesziel aktualisiert"); };
  $("#th").value = LS.get("theme", "") || "";
  $("#th").onchange = (e) => { const t = e.target.value; if (t) { document.documentElement.dataset.theme = t; LS.set("theme", t); } else { delete document.documentElement.dataset.theme; LS.del("theme"); } refreshHeader(); };
  $("#plc").onclick = startPlacement;
  $("#exp").onclick = () => { const d = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith("mkde:")) d[k] = localStorage.getItem(k); } const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(d)], { type: "application/json" })); a.download = `marketing-fortschritt-${dayStr()}.json`; a.click(); };
  $("#imp").onchange = (e) => { const f = e.target.files[0]; if (!f) return; f.text().then((s) => { try { const d = JSON.parse(s); Object.keys(d).forEach((k) => k.startsWith("mkde:") && localStorage.setItem(k, d[k])); toast("Fortschritt geladen"); render(); } catch (er) { toast("Ungültige Datei"); } }); };
  $("#rst").onclick = () => { if (confirm("Den gesamten Fortschritt löschen? Das kann nicht rückgängig gemacht werden.")) { Object.keys(localStorage).filter((k) => k.startsWith("mkde:")).forEach((k) => localStorage.removeItem(k)); toast("Fortschritt zurückgesetzt"); go("path"); } };
};
