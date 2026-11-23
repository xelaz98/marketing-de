// Aufgaben-Player: Lernen, Üben, Prüfung, Wiederholung, Klausur.
// startSession({ title, tasks, mode: learn|practice|test|exam|review|mistakes, pass, srs, timer (Sek.), onDone(res), back(), again() })
function startSession(opts) {
  const tasks = opts.tasks.filter(Boolean);
  if (!tasks.length) { toast("Keine Aufgaben für diese Sitzung."); return; }
  const exam = opts.mode === "exam", scored = tasks.length;
  const requeue = !exam && opts.mode !== "test" && opts.requeue !== false;
  const S = { queue: tasks.map((t, i) => ({ t, i, retry: false })), pos: 0, res: new Array(scored).fill(null), streak: 0, t0: Date.now(), answered: false, retried: new Set() };
  const view = $("#view");
  let timerI = null, keyH = null;
  App.busy = { confirmLeave: () => S.done || confirm("Sitzung abbrechen? Der Fortschritt daraus wird nicht gespeichert."), key: (e) => keyH && keyH(e) };
  if (opts.timer) timerI = setInterval(() => { const left = opts.timer - Math.floor((Date.now() - S.t0) / 1000); const el = $("#tmr"); if (el) el.textContent = mmss(Math.max(0, left)); if (left <= 0) { clearInterval(timerI); finish(true); } }, 500);
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  function head() {
    const done = S.res.filter((r) => r !== null).length;
    return `${opts.title ? `<div class="small muted" style="margin-bottom:6px">${esc(opts.title)}</div>` : ""}<div class="ph"><button class="iconbtn" id="quit" title="Beenden (Esc)" aria-label="Beenden">✕</button>
      <div class="bar"><i style="width:${done / scored * 100}%"></i></div>
      ${opts.timer ? `<span class="timer" id="tmr">${mmss(opts.timer)}</span>` : `<span class="small muted">${done}/${scored}</span>`}</div>
      ${S.streak >= 3 && !exam ? `<div class="small" style="text-align:center;margin:-6px 0 8px">🔥 ${S.streak} richtig in Folge</div>` : ""}`;
  }
  function show() {
    if (S.pos >= S.queue.length) return finish(false);
    const q = S.queue[S.pos], t = q.t; S.answered = false; keyH = null; App.cur = t; // App.cur — für Browser-Autotests
    view.innerHTML = `<div class="player">${head()}<div class="card">
      ${q.retry ? `<div class="tag warn" style="margin-bottom:8px">Wiederholung eines Fehlers</div>` : ""}
      <div class="q-sub">${t.sub || ""}</div><div class="q-prompt">${t.prompt}</div><div id="ans"></div><div id="fb"></div></div>
      <div class="small muted hide-m" style="text-align:center;margin-top:10px">${t.kind === "mcq" ? "<span class='kbd'>1</span>–<span class='kbd'>" + t.options.length + "</span> Auswahl · " : ""}<span class="kbd">Enter</span> weiter · <span class="kbd">Esc</span> beenden</div></div>`;
    $("#quit").onclick = () => quit();
    ({ mcq: rMcq, input: rInput, order: rOrder, match: rMatch, open: rOpen })[t.kind](t, q);
  }
  function quit() { if (App.busy.confirmLeave()) { cleanup(); App.busy = null; (opts.back || (() => go(App.tab)))(); } }
  function cleanup() { clearInterval(timerI); S.done = true; keyH = null; }

  // ───── Antworttypen
  function rMcq(t, q) {
    const a = $("#ans");
    a.innerHTML = `<div class="opts">${t.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="n">${i + 1}</span><span>${o.html}<span class="w"></span></span></button>`).join("")}</div>`;
    const choose = (i) => {
      if (S.answered) return; S.answered = true;
      const ok = i === t.answer;
      $$(".opt", a).forEach((b, j) => { b.disabled = true; if (!exam) { if (j === t.answer) b.classList.add("ok"); else if (j === i) b.classList.add("bad"); } else if (j === i) b.classList.add("sel"); });
      if (!exam && !ok && t.options[i].why) $$(".opt", a)[i].querySelector(".w").innerHTML = t.options[i].why;
      answer(q, ok, t.options[i].html, ok ? "" : t.options[i].why);
    };
    $$(".opt", a).forEach((b) => (b.onclick = () => choose(+b.dataset.i)));
    keyH = (e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= t.options.length) choose(n - 1); };
  }
  function rInput(t, q) {
    const a = $("#ans");
    a.innerHTML = `<div class="row"><input type="text" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="${t.num ? "decimal" : "text"}" placeholder="${t.num ? "Zahl" + (t.unit ? ", " + t.unit : "") : "Antwort"}" style="flex:1;min-width:0">${t.hint && !exam ? `<button class="btn sm ghost" id="hint">Tipp</button>` : ""}</div><div class="actions"><button class="btn primary" id="chk">Prüfen</button></div>`;
    const inp = $("#inp"); setTimeout(() => inp.focus(), 30);
    const check = () => { if (S.answered) return; if (!inp.value.trim()) { inp.focus(); return; } S.answered = true; inp.disabled = true; $("#chk").remove(); const ok = checkInput(t, inp.value); answer(q, ok, esc(inp.value), ""); };
    $("#chk").onclick = check;
    if ($("#hint")) $("#hint").onclick = () => { inp.placeholder = "beginnt mit: " + t.hint; $("#hint").remove(); };
    keyH = (e) => { if (e.key === "Enter" && !S.answered) { e.preventDefault(); check(); } };
  }
  function rOrder(t, q) {
    const a = $("#ans"), sh = shuffle(t.items.map((s, i) => i)); let picked = [];
    const draw = () => {
      a.innerHTML = `<div class="ordered">${picked.length ? picked.map((i, k) => `<button class="chip" data-k="${k}">${k + 1}. ${esc(t.items[i])}</button>`).join("") : `<span class="muted small" style="padding:8px">Tippe die Elemente in der richtigen Reihenfolge an…</span>`}</div>
        <div class="chips">${sh.map((i, k) => `<button class="chip" data-i="${i}" ${picked.includes(i) ? "disabled" : ""}><span class="muted">${k + 1}</span> ${esc(t.items[i])}</button>`).join("")}</div>
        <div class="actions"><button class="btn ghost" id="clr">Leeren</button><button class="btn primary" id="chk" ${picked.length < t.items.length ? "disabled" : ""}>Prüfen</button></div>`;
      $$(".chips .chip", a).forEach((b) => (b.onclick = () => { picked.push(+b.dataset.i); draw(); }));
      $$(".ordered .chip", a).forEach((b) => (b.onclick = () => { picked.splice(+b.dataset.k, 1); draw(); }));
      $("#clr").onclick = () => { picked = []; draw(); };
      $("#chk").onclick = check;
    };
    const check = () => {
      if (S.answered || picked.length < t.items.length) return; S.answered = true;
      const ok = picked.every((v, i) => v === i);
      if (!exam) $$(".ordered .chip", a).forEach((b, k) => b.classList.add(picked[k] === k ? "ok" : "bad"));
      $$(".chip", a).forEach((b) => (b.disabled = true)); $(".actions", a).remove();
      answer(q, ok, picked.map((i) => esc(t.items[i])).join(" → "), ok ? "" : `<div class="small"><b>Richtige Reihenfolge:</b> ${t.items.map(esc).join(" → ")}</div>`);
    };
    draw();
    keyH = (e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= sh.length && !picked.includes(sh[n - 1])) { picked.push(sh[n - 1]); draw(); } if (e.key === "Backspace") { picked.pop(); draw(); } if (e.key === "Enter" && !S.answered && picked.length === t.items.length) { e.preventDefault(); check(); } };
  }
  function rMatch(t, q) {
    const a = $("#ans"), L = shuffle(t.pairs.map((p, i) => i)), R = shuffle(t.pairs.map((p, i) => i));
    let sel = null, mistakes = 0, done = new Set();
    a.innerHTML = `<div class="match"><div class="col">${L.map((i) => `<button class="chip" data-l="${i}">${esc(t.pairs[i][0])}</button>`).join("")}</div><div class="col">${R.map((i) => `<button class="chip" data-r="${i}">${esc(t.pairs[i][1])}</button>`).join("")}</div></div>`;
    $$("[data-l]", a).forEach((b) => (b.onclick = () => { if (done.has(+b.dataset.l)) return; sel = +b.dataset.l; $$("[data-l]", a).forEach((x) => x.classList.toggle("sel", x === b)); }));
    $$("[data-r]", a).forEach((b) => (b.onclick = () => {
      const r = +b.dataset.r; if (sel === null || done.has(r)) return;
      if (r === sel) { done.add(r); [b, $(`[data-l="${r}"]`, a)].forEach((x) => { x.classList.remove("sel"); x.classList.add("done"); }); sel = null;
        if (done.size === t.pairs.length) { S.answered = true; answer(q, mistakes === 0, mistakes ? mistakes + " Fehlversuche" : "fehlerfrei", mistakes ? `Es gab ${mistakes} Fehlversuche — die Aufgabe zählt nur fehlerfrei als richtig.` : ""); } }
      else { mistakes++; b.classList.add("wrong"); setTimeout(() => b.classList.remove("wrong"), 500); }
    }));
  }
  function rOpen(t, q) {
    const a = $("#ans");
    a.innerHTML = `<textarea id="txt" placeholder="Schreib deine Antwort…"></textarea><div class="actions"><button class="btn primary" id="chk">${exam ? "Speichern und weiter" : "Prüfen"}</button></div>`;
    setTimeout(() => $("#txt").focus(), 30);
    $("#chk").onclick = () => {
      const v = $("#txt").value.trim(); if (!v) return; S.answered = true; $("#txt").disabled = true; $("#chk").remove();
      const sc = scoreOpen(t, v);
      if (exam) { record(q, sc.score, esc(v)); return next(); }
      const kwH = t.kw.map((k, i) => `<span class="kw ${sc.hits[i] ? "hit" : "miss"}">${esc(k.split("|")[0])}</span>`).join("");
      $("#fb").innerHTML = `<div class="fb ${sc.score >= 1 ? "ok" : "bad"}"><h3>${sc.score >= 1 ? "Gute Antwort" : sc.score > 0 ? "Teilweise" : "Wichtige Elemente fehlen"}</h3>
        <div class="small">Schlüsselelemente: ${kwH}</div><div style="margin-top:8px"><b>Musterantwort:</b> ${esc(t.model)}</div>
        <div class="small muted" style="margin-top:8px">Die automatische Bewertung sucht nach den Kernideen. Bewerte dich ehrlich:</div>
        <div class="row" style="margin-top:6px"><button class="btn sm" data-s="1">✔ Richtig</button><button class="btn sm" data-s="0.5">≈ Teilweise</button><button class="btn sm" data-s="0">✘ Falsch</button></div></div>`;
      $$("[data-s]").forEach((b) => (b.onclick = () => { record(q, +b.dataset.s, esc(v)); next(); }));
      keyH = (e) => { if (e.key === "Enter") { record(q, sc.score, esc(v)); next(); } };
    };
  }

  // ───── Antwort → Feedback
  function record(q, ok, given) {
    if (!q.retry && S.res[q.i] === null) S.res[q.i] = { t: q.t, ok, given };
  }
  function answer(q, ok, given, extra) {
    const t = q.t, first = !q.retry && S.res[q.i] === null;
    record(q, ok ? 1 : 0, given);
    if (first) {
      if (opts.srs && !exam) t.terms.forEach((id) => SRS.grade(id, ok));
      if (!ok && t.key) Mist.add(t.key);
      if (ok && opts.mode === "mistakes" && t.key) Mist.fix(t.key);
      if (ok) Prog.addXP(2);
    } else if (ok) Prog.addXP(1);
    S.streak = ok ? S.streak + 1 : 0;
    if (exam) return next();
    if (!ok && requeue && !S.retried.has(q.i)) { S.retried.add(q.i); S.queue.push({ t: q.t, i: q.i, retry: true }); }
    $("#fb").innerHTML = `<div class="fb ${ok ? "ok" : "bad"}"><h3>${ok ? pick(["Richtig!", "Genau!", "Super!", "Stimmt!"]) : "Nicht ganz"}</h3>
      ${!ok && t.kind === "input" ? `<div style="margin-bottom:6px">Richtige Antwort: <b>${esc(t.answerText)}</b></div>` : ""}${extra ? `<div style="margin-bottom:6px">${extra}</div>` : ""}
      <div>${t.why}</div>${!ok && requeue && !q.retry ? `<div class="small muted" style="margin-top:8px">↻ Diese Aufgabe kommt am Ende noch einmal.</div>` : ""}</div>
      <div class="actions"><button class="btn primary" id="nx">Weiter ↵</button></div>`;
    $("#nx").onclick = next; $("#nx").focus({ preventScroll: true });
    $("#fb").scrollIntoView({ behavior: "smooth", block: "nearest" });
    keyH = (e) => { if (e.key === "Enter") { e.preventDefault(); next(); } };
  }
  function next() { S.pos++; show(); }

  function finish(timeUp) {
    cleanup(); keyH = null;
    const sum = S.res.reduce((a, r) => a + (r ? r.ok : 0), 0), pct = Math.round(sum / scored * 100);
    if (opts.silent) { App.busy = null; return opts.onDone({ pct, passed: true, sum, total: scored, results: S.res }); }
    const passed = opts.pass == null || pct >= opts.pass;
    Prog.addXP(5 + (passed && opts.pass ? 10 : 0));
    const res = { pct, passed, sum, total: scored, results: S.res };
    App.busy = null;
    const wrong = S.res.map((r, i) => (r && r.ok < 1 ? r : !r ? { t: tasks[i], ok: 0, given: "<i>keine Antwort</i>" } : null)).filter(Boolean);
    const listFor = exam ? S.res.map((r, i) => r || { t: tasks[i], ok: 0, given: "<i>keine Antwort</i>" }) : wrong;
    view.innerHTML = `<div class="player"><div class="card result">
      <div class="small muted">${esc(opts.title || "")}${timeUp ? " · Zeit abgelaufen" : ""}</div>
      <div class="big" style="color:${passed ? "var(--ok)" : "var(--bad)"}">${pct}%</div>
      <div>${fmt(sum, sum % 1 ? 1 : 0)} von ${scored}${opts.pass ? ` · Schwelle ${opts.pass} %` : ""}</div>
      <h2 style="margin-top:10px">${opts.pass ? (passed ? "✅ Bestanden!" : "Fast — versuch es noch einmal") : pct >= 80 ? "Ausgezeichnet!" : pct >= 60 ? "Gut!" : "Weiter üben"}</h2>
      ${exam ? `<div class="small muted">Note: <b>${grade6(pct)}</b> (Richtwert, IHK-Notenschlüssel)</div>` : ""}
      <div class="row" style="justify-content:center;margin-top:14px">${!passed && opts.again ? `<button class="btn" id="again">↻ Noch einmal</button>` : ""}<button class="btn primary" id="cont">Weiter ↵</button></div></div>
      ${listFor.length ? `<div class="section-t">${exam ? "Auswertung aller Fragen" : "Auswertung der Fehler"}</div><div class="review-list">${listFor.map(revItem).join("")}</div>` : ""}</div>`;
    const cont = () => { opts.onDone ? opts.onDone(res) : (opts.back || (() => go(App.tab)))(); };
    $("#cont").onclick = cont; if ($("#again")) $("#again").onclick = opts.again;
    keyH = null; App.busy = { confirmLeave: () => true, key: (e) => { if (e.key === "Enter") cont(); } };
  }
  function revItem(r) {
    const t = r.t, ok = r.ok >= 1;
    let right = "";
    if (t.kind === "mcq") right = t.options[t.answer].html; else if (t.kind === "input") right = esc(t.answerText); else if (t.kind === "order") right = t.items.map(esc).join(" → "); else if (t.kind === "open") right = esc(t.model); else if (t.kind === "match") right = t.pairs.map((p) => esc(p[0])).join(", ");
    return `<div class="card"><div class="row"><span class="tag ${ok ? "ok" : r.ok > 0 ? "warn" : "bad"}">${ok ? "richtig" : r.ok > 0 ? "teilweise" : "falsch"}</span><span class="small muted">${esc(t.sub || "")}</span></div>
      <div style="margin:6px 0;font-weight:600">${t.prompt}</div>
      <div class="small">Deine Antwort: ${r.given || "—"}</div>${!ok ? `<div class="small">Richtige Antwort: <b>${right}</b></div>` : ""}
      ${t.kind === "open" && t.kw ? `<div class="small">Schlüsselelemente: ${t.kw.map((k) => `<span class="kw miss">${esc(k.split("|")[0])}</span>`).join("")}</div>` : ""}
      ${t.kind !== "open" ? `<div class="small" style="margin-top:6px">${t.why}</div>` : ""}</div>`;
  }
  show();
}
function grade6(p) { return p >= 92 ? "1 (sehr gut)" : p >= 81 ? "2 (gut)" : p >= 67 ? "3 (befriedigend)" : p >= 50 ? "4 (ausreichend)" : p >= 30 ? "5 (mangelhaft)" : "6 (ungenügend)"; }
document.addEventListener("keydown", (e) => {
  if (!App.busy) return;
  if (e.target.tagName === "TEXTAREA" && e.key !== "Escape") return;
  if (e.target.tagName === "INPUT" && !["Enter", "Escape"].includes(e.key)) return;
  if (e.key === "Escape") { const q = $("#quit"); if (q) { e.preventDefault(); q.click(); } return; }
  App.busy.key(e);
});
