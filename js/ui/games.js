// Spiele: Memory, Blitz, Welcher Kanal?, Errate die Marke. Rekorde in mkde:records.
const Rec = {
  get(id) { return LS.get("records", {})[id]; },
  set(id, val, lowerBetter) { const r = LS.get("records", {}); const old = r[id]; if (old == null || (lowerBetter ? val < old : val > old)) { r[id] = val; LS.set("records", r); return true; } return false; },
};
function gameShell(title, inner) {
  return `<div class="player"><div class="ph"><button class="iconbtn" id="gq" aria-label="Beenden">✕</button><b style="flex:1">${title}</b><span class="timer" id="gs"></span></div>${inner}</div>`;
}
function gameEnd(v, title, score, unit, isRec, again, extra) {
  App.busy = null;
  v.innerHTML = gameShell(title, `<div class="card result"><div class="big">${score}</div><div>${unit}</div>${isRec ? `<h2>🏆 Neuer Rekord!</h2>` : ""}${extra || ""}<div class="row" style="justify-content:center;margin-top:12px"><button class="btn" id="ga">↻ Noch einmal</button><button class="btn primary" id="gb">Zu den Spielen</button></div></div>`);
  $("#gq").onclick = () => go("more"); $("#ga").onclick = again; $("#gb").onclick = () => go("more");
  App.busy = { confirmLeave: () => true, key: (e) => { if (e.key === "Enter") again(); } };
}
function gamePool() { const ids = Object.keys(SRS.all()).filter((id) => TERM[id]); return ids.length >= 12 ? ids.map((id) => TERM[id]) : TERMS; }

const GAMES = [
  { id: "memory", icon: "🃏", name: "Memory", desc: "Dreh die Karten um und finde die Paare Begriff ↔ Definition.", rec: () => (Rec.get("memory") != null ? Rec.get("memory") + " Züge" : "—"),
    start() {
      const v = $("#view"), pool = gamePool();
      const ts = shuffle(pool).filter((t, i, a) => a.slice(0, i).every((x) => !related(x.id, t.id))).slice(0, 6);
      const short = (d) => (d.length > 70 ? d.slice(0, d.lastIndexOf(" ", 66)) + "…" : d);
      const cards = shuffle(ts.flatMap((t) => [{ id: t.id, html: `<span class="k">${esc(t.key)}</span>` }, { id: t.id, html: esc(short(t.def)) }]));
      let open = [], moves = 0, found = 0, lock = false;
      v.innerHTML = gameShell("🃏 Memory", `<div class="mem">${cards.map((c, i) => `<button data-i="${i}" aria-label="Karte ${i + 1}">?</button>`).join("")}</div><p class="small muted" style="text-align:center">Paar = Begriff und seine Definition.</p>`);
      $("#gq").onclick = () => go("more"); App.busy = { confirmLeave: () => true, key: () => {} };
      const upd = () => ($("#gs").textContent = moves + " Züge");
      $$(".mem button", v).forEach((b) => (b.onclick = () => {
        const i = +b.dataset.i; if (lock || b.classList.contains("open") || b.classList.contains("gone")) return;
        b.classList.add("open"); b.innerHTML = cards[i].html; open.push(b);
        if (open.length === 2) { moves++; upd(); const [x, y] = open; lock = true;
          if (cards[+x.dataset.i].id === cards[+y.dataset.i].id) { setTimeout(() => { [x, y].forEach((e) => { e.classList.remove("open"); e.classList.add("gone"); }); open = []; lock = false; found++; Prog.addXP(1);
              if (found === ts.length) { const rec = Rec.set("memory", moves, true); gameEnd(v, "🃏 Memory", moves, "Züge (Minimum 6)", rec, () => GAMES[0].start(), `<div class="small" style="margin-top:10px">${ts.map((t) => termChip(t.id)).join(" · ")}</div>`); } }, 350); }
          else setTimeout(() => { [x, y].forEach((e) => { e.classList.remove("open"); e.innerHTML = "?"; }); open = []; lock = false; }, 1100); }
      }));
      upd();
    } },
  { id: "flash", icon: "⚡", name: "Blitz", desc: "60 Sekunden richtig/falsch. ← oder 1 = richtig, → oder 2 = falsch.", rec: () => (Rec.get("flash") != null ? Rec.get("flash") + " Pkt." : "—"),
    start() {
      const v = $("#view"), pool = gamePool(); let score = 0, wrong = 0, t0 = Date.now(), cur, timer, log = [];
      const nextQ = () => { cur = Math.random() < 0.35 ? HAND_GEN.htf(pick(TFS)) : TERM_GEN.tf(pick(pool)); $("#fq").innerHTML = cur.prompt; };
      v.innerHTML = gameShell("⚡ Blitz", `<div class="card"><div class="flash" id="fq"></div><div class="row"><button class="btn big" id="ft" style="flex:1">✔ Richtig</button><button class="btn big" id="ff" style="flex:1">✘ Falsch</button></div><div class="small muted" style="text-align:center;margin-top:8px">Punkte: <b id="fs">0</b> · Fehler: <span id="fw">0</span></div></div>`);
      $("#gq").onclick = () => { clearInterval(timer); go("more"); };
      const ans = (a) => { const ok = a === cur.answer; if (ok) { score++; Prog.addXP(1); } else { wrong++; log.push(cur); } $("#fs").textContent = score; $("#fw").textContent = wrong; const c = $(".flash"); c.style.color = ok ? "var(--ok)" : "var(--bad)"; setTimeout(() => (c.style.color = ""), 200); nextQ(); };
      $("#ft").onclick = () => ans(0); $("#ff").onclick = () => ans(1);
      App.busy = { confirmLeave: () => { clearInterval(timer); return true; }, key: (e) => { if (e.key === "ArrowLeft" || e.key === "1") ans(0); if (e.key === "ArrowRight" || e.key === "2") ans(1); } };
      timer = setInterval(() => { const left = 60 - Math.floor((Date.now() - t0) / 1000); $("#gs").textContent = left + " s"; if (left <= 0) { clearInterval(timer); const rec = Rec.set("flash", score); gameEnd(v, "⚡ Blitz", score, `Punkte · ${wrong} Fehler`, rec, () => GAMES[1].start(), log.length ? `<div style="text-align:left;margin-top:12px" class="small">${log.slice(0, 5).map((t) => `<div class="note bad">${t.prompt}<div class="small" style="margin-top:4px">${t.why}</div></div>`).join("")}</div>` : ""); } }, 250);
      nextQ();
    } },
  { id: "channel", icon: "📡", name: "Welcher Kanal?", desc: "10 Situationen, je 10 Sekunden: Wähle den passendsten Kanal.", rec: () => (Rec.get("channel") != null ? Rec.get("channel") + " Pkt." : "—"),
    start() { quizGame(this, "📡 Welcher Kanal?", sample(CHANNEL_Q, 10).map((q) => ({ q: esc(q[0]), right: q[1], opts: shuffle([q[1]].concat(sample(CHANNELS_LIST.filter((c) => c !== q[1]), 3))), why: q[2] })), 10); } },
  { id: "brand", icon: "🏷️", name: "Errate die Marke", desc: "Nach Positionierung oder Slogan — welche Marke ist es?", rec: () => (Rec.get("brand") != null ? Rec.get("brand") + " Pkt." : "—"),
    start() { quizGame(this, "🏷️ Errate die Marke", sample(BRANDS, 10).map((b) => { const same = BRANDS.filter((x) => x[2] === b[2] && x !== b).map((x) => x[1]); const other = BRANDS.filter((x) => x[2] !== b[2]).map((x) => x[1]); const w = sample(same, 3).concat(sample(other, 3)).slice(0, 3); return { q: esc(b[0]), right: b[1], opts: shuffle([b[1]].concat(w)), why: b[3] }; }), 15); } },
];
// Allgemeines Zeit-Quiz: Punkte = 10 + Bonus für Tempo
function quizGame(g, title, qs, secs) {
  const v = $("#view"); let i = 0, score = 0, t0, timer, lock = false; const log = [];
  v.innerHTML = gameShell(title, `<div class="card"><div class="q-sub" id="qn"></div><div class="q-prompt" id="qq"></div><div class="opts" id="qo"></div><div id="qf"></div></div>`);
  $("#gq").onclick = () => { clearInterval(timer); go("more"); };
  const show = () => {
    if (i >= qs.length) { clearInterval(timer); const rec = Rec.set(g.id, score); return gameEnd(v, title, score, "Punkte", rec, () => g.start(), `<div style="text-align:left;margin-top:12px" class="small">${log.map((l) => `<div class="note ${l.ok ? "good" : "bad"}">${l.ok ? "✅" : "❌"} ${l.q}<br><b>${esc(l.right)}</b> — ${esc(l.why)}</div>`).join("")}</div>`); }
    const q = qs[i]; lock = false; t0 = Date.now();
    $("#qn").textContent = `Frage ${i + 1}/${qs.length} · Punkte: ${score}`; $("#qq").innerHTML = q.q; $("#qf").innerHTML = "";
    $("#qo").innerHTML = q.opts.map((o, k) => `<button class="opt" data-k="${k}"><span class="n">${k + 1}</span><span>${esc(o)}</span></button>`).join("");
    $$("#qo .opt").forEach((b) => (b.onclick = () => ans(+b.dataset.k)));
  };
  const ans = (k) => {
    if (lock) return; lock = true; const q = qs[i], ok = k >= 0 && q.opts[k] === q.right, left = Math.max(0, secs - (Date.now() - t0) / 1000);
    if (ok) { score += 10 + Math.round(left); Prog.addXP(1); }
    log.push({ q: q.q, right: q.right, why: q.why, ok });
    $$("#qo .opt").forEach((b, j) => { b.disabled = true; if (q.opts[j] === q.right) b.classList.add("ok"); else if (j === k) b.classList.add("bad"); });
    $("#qf").innerHTML = `<div class="fb ${ok ? "ok" : "bad"}"><b>${ok ? "Ja!" : k < 0 ? "Zeit abgelaufen" : "Nein"}</b> ${esc(q.why)}</div><div class="actions"><button class="btn primary" id="qn2">Weiter ↵</button></div>`;
    $("#qn2").onclick = () => { i++; show(); };
  };
  App.busy = { confirmLeave: () => { clearInterval(timer); return true; }, key: (e) => { const n = parseInt(e.key, 10); if (!lock && n >= 1 && n <= 4) ans(n - 1); else if (lock && e.key === "Enter") { i++; show(); } } };
  timer = setInterval(() => { if (lock || i >= qs.length) return; const left = secs - Math.floor((Date.now() - t0) / 1000); $("#gs").textContent = Math.max(0, left) + " s"; if (left <= 0) ans(-1); }, 200);
  show();
}
VIEWS.games = (arg, v) => { const g = GAMES.find((x) => x.id === arg); if (g) g.start(); else go("more"); };
VIEWS.games.parent = "more";
