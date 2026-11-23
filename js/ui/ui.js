// App-Hülle: Tabs, Routen, Header, Hinweise, Dialoge.
const TABS = [
  { id: "path", icon: "🧭", name: "Pfad" },
  { id: "review", icon: "🔁", name: "Wiederholen" },
  { id: "agency", icon: "🏢", name: "Agentur" },
  { id: "theory", icon: "📘", name: "Theorie" },
  { id: "glossary", icon: "📖", name: "Glossar" },
  { id: "more", icon: "☰", name: "Mehr" },
];
const VIEWS = {}; // id → render(arg)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const App = { tab: "path", arg: null, busy: null }; // busy: aktive Sitzung (für Bestätigung beim Verlassen)

function go(tab, arg) {
  if (App.busy && !App.busy.confirmLeave()) return;
  App.busy = null;
  const h = "#" + tab + (arg ? "/" + arg : "");
  if (location.hash !== h) history.pushState(null, "", h);
  render();
}
function render() {
  const [tab, ...rest] = location.hash.replace(/^#/, "").split("/");
  App.tab = TABS.some((t) => t.id === tab) || VIEWS[tab] ? tab : "path";
  App.arg = rest.length ? decodeURIComponent(rest.join("/")) : null;
  const top = TABS.find((t) => t.id === App.tab) ? App.tab : (VIEWS[App.tab] && VIEWS[App.tab].parent) || "more";
  $$("#nav button, #bottom button").forEach((b) => b.classList.toggle("on", b.dataset.t === top));
  const v = $("#view"); v.innerHTML = "";
  window.scrollTo(0, 0);
  (VIEWS[App.tab] || VIEWS.path)(App.arg, v);
  refreshHeader();
}
window.addEventListener("popstate", () => { if (App.busy && !App.busy.confirmLeave()) { history.pushState(null, "", "#" + App.tab); return; } App.busy = null; render(); });

function buildNav() {
  $("#nav").innerHTML = TABS.map((t) => `<button data-t="${t.id}">${t.icon} ${t.name}</button>`).join("");
  $("#bottom").innerHTML = TABS.map((t) => `<button data-t="${t.id}"><span class="i">${t.icon}</span>${t.name}</button>`).join("");
  $$("#nav button, #bottom button").forEach((b) => (b.onclick = () => go(b.dataset.t)));
}
function refreshHeader() {
  const goal = Prog.goal(), today = Prog.today(), st = Prog.streakInfo(), xp = Prog.xp(), lvl = Prog.level(xp);
  const p = Math.min(1, today / goal), C = 2 * Math.PI * 14;
  $("#stats").innerHTML = `
    <span class="pill" title="Serie: Tage in Folge mit erreichtem Tagesziel">🔥 ${st.count}</span>
    <span class="pill hide-m" title="Level und Gesamt-XP">⭐ ${lvl} · ${fmt(xp)} XP</span>
    <div class="ring" title="Tagesziel: ${today}/${goal} XP"><svg width="34" height="34"><circle cx="17" cy="17" r="14" fill="none" stroke="var(--card2)" stroke-width="4"/><circle cx="17" cy="17" r="14" fill="none" stroke="${p >= 1 ? "var(--ok)" : "var(--accent)"}" stroke-width="4" stroke-linecap="round" stroke-dasharray="${C * p} ${C}"/></svg><span>${p >= 1 ? "✓" : today}</span></div>
    <button class="iconbtn" id="themeBtn" title="Dunkles/helles Design" aria-label="Design wechseln">${isDark() ? "☀️" : "🌙"}</button>`;
  $("#themeBtn").onclick = () => { const d = !isDark(); document.documentElement.dataset.theme = d ? "dark" : "light"; LS.set("theme", d ? "dark" : "light"); refreshHeader(); };
}
function isDark() { const t = document.documentElement.dataset.theme; return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches; }

let _toastT;
function toast(msg) { let t = $(".toast"); if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); } t.textContent = msg; clearTimeout(_toastT); _toastT = setTimeout(() => t.remove(), 2600); }
function modal(html, onClose) {
  const bg = document.createElement("div"); bg.className = "modal-bg";
  bg.innerHTML = `<div class="modal" role="dialog"><button class="iconbtn x" aria-label="Schließen">✕</button>${html}</div>`;
  const close = () => { bg.remove(); document.removeEventListener("keydown", esc); onClose && onClose(); };
  const esc = (e) => { if (e.key === "Escape") { e.stopImmediatePropagation(); close(); } };
  bg.onclick = (e) => { if (e.target === bg) close(); };
  $(".x", bg).onclick = close;
  document.addEventListener("keydown", esc, true);
  document.body.appendChild(bg);
  return { el: $(".modal", bg), close };
}
// [[Schlüssel]] → Link ins Glossar
function linkTerms(html) {
  return html.replace(/\[\[([^\]]+)\]\]/g, (_, k) => { const t = TERM[slug(k)]; return t ? `<a class="tl" data-t="${t.id}">${esc(k)}</a>` : esc(k); });
}
function termChip(id) { const t = TERM[id]; return t ? `<a class="tl" data-t="${t.id}">${esc(t.key)}</a>` : ""; }
document.addEventListener("click", (e) => { const a = e.target.closest(".tl"); if (a && a.dataset.t) { e.preventDefault(); showTerm(a.dataset.t); } });

function termDetailHTML(t) {
  const conf = CONFUSIONS.filter((p) => p.includes(t.id)).map((p) => TERM[p[0] === t.id ? p[1] : p[0]]).filter(Boolean);
  const s = SRS.all()[t.id];
  return `<div class="gl-d">
    <div class="row"><span class="tag acc">${MOD[t.m].icon} ${esc(MOD[t.m].short)}</span>${s ? `<span class="tag ${s.b >= 4 ? "ok" : ""}">Fach ${s.b}/5 · Wiederholung ${s.due <= dayStr() ? "heute" : s.due.split("-").reverse().join(".")}</span>` : `<span class="tag">neu</span>`}</div>
    <h2 style="margin-top:10px">${esc(t.key)}</h2>
    <div class="muted">${esc(t.en)} — <b>${esc(t.bg)}</b></div>
    <h3>Definition</h3><p>${esc(t.def)}</p>
    <h3>So wird es in der Praxis verwendet</h3><p>${esc(t.use)}</p>
    <h3>Beispiele</h3><ul>${t.ex.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
    ${t.conf || conf.length ? `<h3>Häufige Verwechslungen</h3>${t.conf ? `<p>⚠️ ${esc(t.conf)}</p>` : ""}${conf.length ? `<p class="small">Vergleiche mit: ${conf.map((c) => termChip(c.id)).join(", ")}</p>` : ""}` : ""}
  </div>`;
}
function showTerm(id) {
  const t = TERM[id]; if (!t) return;
  const m = modal(termDetailHTML(t) + `<div class="actions"><button class="btn primary" id="tPr">Begriff üben</button></div>`);
  $("#tPr", m.el).onclick = () => { m.close(); startSession({ title: t.key, tasks: [TERM_GEN.def2term(t), TERM_GEN.situation(t) || TERM_GEN.term2def(t), TERM_GEN.cloze(t) || TERM_GEN.tf(t), TERM_GEN.type(t)], mode: "practice", srs: true }); };
}
