# 📈 Marketing-Akademie (Deutsch)

App zum Marketing-Lernen auf Deutsch: Begriffe, Theorie, Wiederholung mit Spaced Repetition, Klausur und Agentur-Simulation.
Ohne Build-Schritt (Vanilla JS). Der Fortschritt bleibt im Browser (localStorage, Präfix `mkde:`).
Rechtliche Inhalte sind auf Deutschland angepasst (DSGVO, UWG, PAngV, Bundeskartellamt, Verbraucherzentralen, Deutscher Werberat), Beträge in Euro.

- Öffentlich: https://xelaz98.github.io/marketing-de/
- Bulgarische Version: https://xelaz98.github.io/marketing/

## Struktur
| Datei | Inhalt |
|---|---|
| `js/data/modules.js` | Module + Hilfsfunktionen `M()` und `K()` |
| `js/data/terms1–4.js` | Begriffe (je 3 Module pro Datei) |
| `js/data/theory.js` | Theorie nach Themen, `[[Schlüssel]]` wird zum Glossar-Link |
| `js/data/diagrams.js` | SVG-Schemata (Funnel, 4P, SWOT, BCG, Ansoff, PESTEL, Customer Journey …) |
| `js/data/tasks.js` | Handaufgaben: richtig/falsch, Fehler finden, ordnen, zuordnen, Fallstudien, offene Fragen |
| `js/data/games.js` | Marken, Kanal-Situationen, Verwechslungspaare |
| `js/data/agency.js` | Kanäle, Kunden und Szenarien der Agentur |
| `js/engine/` | Speicher, Spaced Repetition, Aufgabengeneratoren, Rechenaufgaben, Simulation |
| `js/ui/` | Ansichten und Aufgaben-Player |

## Eigene Inhalte ergänzen
**Neuer Begriff** — in der passenden `terms*.js` nach `M("mX")`:
```js
K("Schlüssel", "english name", "deutsche Übersetzung",
  "Definition…",
  "Satz aus der Praxis, der den Schlüssel ENTHÄLT…",   // für Lückentexte
  ["Beispiel 1 ohne Schlüssel", "Beispiel 2 ohne Schlüssel"], // für „Welcher Begriff beschreibt die Situation?“
  "Häufige Verwechslungen (optional)",
  { alt: ["andere Schreibweisen für die Schreibantwort"] });
```
**Neues Theoriethema** — in `theory.js`: `TH("mX", "Titel", \`<p>… [[Schlüssel]] …</p>\`, { dia: "funnel" })`.

**Neue Aufgaben** — in `tasks.js`: `TF(...)`, `ERR(...)`, `SEQ(...)`, `CAT(...)`, `DEC(...)`, `OPEN(...)` (Format oben in der Datei).

Danach die Prüfung laufen lassen (erzeugt Tausende Aufgaben und sucht Fehler):
```bash
node tools/check.js
```

## Veröffentlichen
```bash
bash tools/build-public.sh --deploy
```
