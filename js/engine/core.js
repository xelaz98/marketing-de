// Allgemeine Hilfsfunktionen, Speicher (localStorage mit Präfix mkde:), XP, Serie, Spaced Repetition.
const LS = {
  get(k, d) { try { const v = localStorage.getItem("mkde:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("mkde:" + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem("mkde:" + k); } catch (e) {} },
};

const rnd = (n) => Math.floor(Math.random() * n);
const pick = (a) => a[rnd(a.length)];
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const sample = (a, n) => shuffle(a).slice(0, n);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

// Zahlen auf Deutsch: 1.234,5
function fmt(n, d = 0) {
  if (!isFinite(n)) return "—";
  const s = Math.abs(n).toFixed(d).split(".");
  s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (n < 0 ? "−" : "") + s.join(",");
}
const fmtLv = (n, d = 2) => fmt(n, d) + " €"; // Name aus der bulgarischen Version, Währung: Euro
const fmtPct = (n, d = 1) => fmt(n, d) + " %";
// Zahl aus Nutzereingabe lesen: „1.234,5“, „1234.5“, „12 %“, „12 €“
function parseNum(s) {
  if (s == null) return NaN;
  s = String(s).trim().replace(/\s|€|eur(o)?|%|x|×/gi, "").replace(/−/g, "-");
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
  return s === "" ? NaN : Number(s);
}

// Datum (Ortszeit)
function dayStr(d = new Date()) { const z = (x) => String(x).padStart(2, "0"); return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`; }
function addDays(str, n) { const [y, m, d] = str.split("-").map(Number); return dayStr(new Date(y, m - 1, d + n)); }
function daysBetween(a, b) { const p = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); }; return Math.round((p(b) - p(a)) / 864e5); }

// ───── XP, Tagesziel, Serie
const Prog = {
  xp() { return LS.get("xp", 0); },
  goal() { return LS.get("goal", 30); },
  today() { return LS.get("days", {})[dayStr()] || 0; },
  addXP(n) {
    if (!n) return;
    LS.set("xp", this.xp() + n);
    const days = LS.get("days", {}); const t = dayStr();
    const before = days[t] || 0; days[t] = before + n; LS.set("days", days);
    if (before < this.goal() && days[t] >= this.goal()) { const s = this.streakInfo(); LS.set("streak", { last: t, count: s.alive ? s.count + 1 : 1 }); if (typeof toast === "function") toast("🎯 Tagesziel erreicht! Serie: " + (s.alive ? s.count + 1 : 1) + " Tage"); }
    if (typeof refreshHeader === "function") refreshHeader();
  },
  // Serie = aufeinanderfolgende Tage mit erreichtem Tagesziel
  streakInfo() {
    const s = LS.get("streak", { last: null, count: 0 });
    if (!s.last) return { count: 0, alive: false, todayDone: false };
    const gap = daysBetween(s.last, dayStr());
    return { count: gap <= 1 ? s.count : 0, alive: gap <= 1, todayDone: gap === 0 };
  },
  level(xp = this.xp()) { return Math.floor(Math.sqrt(xp / 40)) + 1; },
  levelRange(l) { return [40 * (l - 1) ** 2, 40 * l ** 2]; },
};

// ───── Spaced Repetition: Fächer 1→3→7→16 Tage (nach Fach 4 → 30 Tage, „gelernt“)
const SRS_DAYS = [0, 1, 3, 7, 16, 30];
const SRS = {
  all() { return LS.get("srs", {}); },
  save(s) { LS.set("srs", s); },
  // beim ersten Kennenlernen des Begriffs
  learn(id) { const s = this.all(); if (!s[id]) { s[id] = { b: 1, due: addDays(dayStr(), 1), n: 0, w: 0 }; this.save(s); } },
  grade(id, ok) {
    const s = this.all(); const e = s[id] || { b: 0, due: dayStr(), n: 0, w: 0 };
    e.n++;
    if (ok) { e.b = Math.min(5, e.b + 1); e.due = addDays(dayStr(), SRS_DAYS[e.b]); }
    else { e.b = 1; e.w++; e.due = addDays(dayStr(), 1); Mist.add("t:" + id); }
    s[id] = e; this.save(s);
  },
  due() { const t = dayStr(), s = this.all(); return Object.keys(s).filter((id) => TERM[id] && s[id].due <= t); },
  boxes() { const s = this.all(), c = [0, 0, 0, 0, 0, 0]; Object.values(s).forEach((e) => c[e.b]++); return c; },
  known(id) { return !!this.all()[id]; },
};

// ───── Meine Fehler: Schlüssel → Anzahl (t:<Begriff> oder h:<Aufgabe>)
const Mist = {
  all() { return LS.get("mist", {}); },
  add(k) { const m = this.all(); m[k] = (m[k] || 0) + 1; LS.set("mist", m); },
  fix(k) { const m = this.all(); if (m[k]) { m[k]--; if (m[k] <= 0) delete m[k]; LS.set("mist", m); } },
  count() { return Object.keys(this.all()).length; },
};

// ───── Fortschritt je Modul: {learned: n, theory: bool, prac: %, test: %, placed: bool}
const Units = {
  all() { return LS.get("units", {}); },
  get(m) { return Object.assign({ learned: 0, theory: false, prac: 0, test: 0, placed: false }, this.all()[m] || {}); },
  set(m, patch) { const a = this.all(); a[m] = Object.assign(this.get(m), patch); LS.set("units", a); },
  termsOf(m) { return TERMS.filter((t) => t.m === m); },
  learnedCount(m) { const s = SRS.all(); return this.termsOf(m).filter((t) => s[t.id]).length; },
  steps(m) {
    const u = this.get(m), total = this.termsOf(m).length, learned = this.learnedCount(m);
    return [
      { id: "learn", name: "Neue Begriffe", done: u.placed || learned >= total, info: `${learned}/${total}` },
      { id: "theory", name: "Theorie", done: u.placed || u.theory, info: u.theory ? "gelesen" : "" },
      { id: "prac", name: "Übungen", done: u.placed || u.prac >= 70, info: u.prac ? u.prac + "%" : "≥70%" },
      { id: "test", name: "Prüfung", done: u.placed || u.test >= 80, info: u.test ? u.test + "%" : "≥80%" },
    ];
  },
  done(m) { return this.steps(m).every((s) => s.done); },
  pct(m) { return Math.round(this.steps(m).filter((s) => s.done).length / 4 * 100); },
};
