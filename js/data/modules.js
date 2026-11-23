// Kursmodule (in Lehrplan-Reihenfolge) und Hilfsfunktionen für die Daten.
// Neues Modul: hier eintragen, dann Begriffe (terms*.js), Theorie (theory.js) und Aufgaben (tasks.js).
const MODULES = [
  { id: "m1", icon: "🧩", title: "Grundlagen und Marketing-Mix", short: "Grundlagen" },
  { id: "m2", icon: "🧠", title: "Markt und Konsument", short: "Konsument" },
  { id: "m3", icon: "🎯", title: "Segmentierung, Targeting, Positionierung", short: "STP" },
  { id: "m4", icon: "📦", title: "Produkt und Marke", short: "Produkt" },
  { id: "m5", icon: "💰", title: "Preispolitik", short: "Preise" },
  { id: "m6", icon: "🚚", title: "Distribution", short: "Distribution" },
  { id: "m7", icon: "📣", title: "Kommunikation und Werbung", short: "Kommunikation" },
  { id: "m8", icon: "💻", title: "Digitales Marketing", short: "Digital" },
  { id: "m9", icon: "📊", title: "Analyse und Kennzahlen", short: "Kennzahlen" },
  { id: "m10", icon: "🗺️", title: "Marketingplan und Budget", short: "Plan" },
  { id: "m11", icon: "🔍", title: "Marktforschung", short: "Forschung" },
  { id: "m12", icon: "⚖️", title: "Ethik und Recht", short: "Recht" },
];
const MOD = Object.fromEntries(MODULES.map((m) => [m.id, m]));

const TERMS = [];
const TERM = {};
let _curMod = "m1";
function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9а-яäöüß]+/gi, "-").replace(/^-|-$/g, "");
}
function M(id) { _curMod = id; }
// K(Schlüssel, Englisch, Deutsch, Definition, „In der Praxis“ (enthält den Schlüssel), [Beispiele ohne Schlüssel], häufige Verwechslungen, {alt: [andere Schreibweisen]})
function K(key, en, bg, def, use, ex, conf, extra) {
  const id = slug(key);
  if (TERM[id]) throw new Error("Doppelter Begriff: " + key);
  const t = Object.assign({ id, key, en, bg, def, use, ex, conf: conf || "", m: _curMod }, extra || {});
  TERMS.push(t);
  TERM[id] = t;
}
// Anzeigename: „CTR (click-through rate)“
function termLabel(t) {
  const en = t.en && !t.en.toLowerCase().includes(t.key.toLowerCase()) ? ` (${t.en})` : "";
  return `${t.key}${en}`;
}
