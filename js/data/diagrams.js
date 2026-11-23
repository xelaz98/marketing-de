// SVG-Schemata für die Theorie. Farben aus CSS-Variablen → funktionieren im hellen und dunklen Modus.
const DIAGRAMS = {
  funnel: () => {
    const rows = [["Bekanntheit (TOFU)", "Reichweite, Impressionen", 100], ["Interesse / Erwägung (MOFU)", "Klicks, Leads", 86], ["Entscheidung / Conversion (BOFU)", "Bestellungen, CPA, ROAS", 70], ["Loyalität und Empfehlung", "Wiederkäufe, NPS", 56]];
    let y = 10, s = "";
    rows.forEach(([a, b, w], i) => {
      const x = (100 - w) / 2 * 3.4 + 10, W = w * 3.4;
      s += `<rect x="${x}" y="${y}" width="${W}" height="46" rx="8" class="d-fill${i}"/>`;
      s += `<text x="180" y="${y + 20}" class="d-t">${a}</text><text x="180" y="${y + 37}" class="d-s">${b}</text>`;
      y += 54;
    });
    return `<svg viewBox="0 0 360 230" role="img" aria-label="Marketing-Funnel">${s}</svg>`;
  },
  p4: () => {
    const q = [["Product", "Produkt", "Qualität, Design, Marke, Verpackung, Garantie"], ["Price", "Preis", "Preisliste, Rabatte, Konditionen"], ["Place", "Distribution", "Kanäle, Standorte, Verfügbarkeit, Logistik"], ["Promotion", "Kommunikation", "Werbung, PR, Vertrieb, digital"]];
    let s = "";
    q.forEach(([a, b, c], i) => {
      const x = (i % 2) * 190, y = Math.floor(i / 2) * 125;
      s += `<rect x="${x}" y="${y}" width="170" height="105" rx="12" class="d-fill${i}"/><text x="${x + 85}" y="${y + 26}" class="d-t">${a}</text><text x="${x + 85}" y="${y + 43}" class="d-s">${b}</text><foreignObject x="${x + 8}" y="${y + 50}" width="154" height="52"><div class="d-fo">${c}</div></foreignObject>`;
    });
    s += `<circle cx="180" cy="115" r="27" class="d-center"/><text x="180" y="112" class="d-s" style="fill:var(--text);font-weight:700">Ziel-</text><text x="180" y="125" class="d-s" style="fill:var(--text);font-weight:700">kunde</text>`;
    return `<svg viewBox="0 0 360 230" role="img" aria-label="4P">${s}</svg>`;
  },
  swot: () => {
    const q = [["S — Stärken", "intern, +"], ["W — Schwächen", "intern, −"], ["O — Chancen", "extern, +"], ["T — Risiken", "extern, −"]];
    let s = `<text x="12" y="62" class="d-s" transform="rotate(-90 12 62)">intern</text><text x="12" y="152" class="d-s" transform="rotate(-90 12 152)">extern</text>`;
    q.forEach(([a, b], i) => {
      const x = (i % 2) * 170 + 22, y = Math.floor(i / 2) * 92 + 15;
      s += `<rect x="${x}" y="${y}" width="164" height="86" rx="10" class="d-fill${i}"/><text x="${x + 82}" y="${y + 40}" class="d-t">${a}</text><text x="${x + 82}" y="${y + 60}" class="d-s">${b}</text>`;
    });
    return `<svg viewBox="0 0 360 200" role="img" aria-label="SWOT">${s}</svg>`;
  },
  bcg: () => {
    const q = [["⭐ Star", "investieren"], ["❓ Question Mark", "investieren oder aufgeben"], ["🐄 Cash Cow", "abschöpfen, halten"], ["🐕 Poor Dog", "aufgeben / Nische"]];
    let s = `<text x="190" y="214" class="d-s">← hoch   relativer Marktanteil   niedrig →</text><text x="12" y="105" class="d-s" transform="rotate(-90 12 105)">Marktwachstum ↑</text>`;
    q.forEach(([a, b], i) => {
      const x = (i % 2) * 165 + 26, y = Math.floor(i / 2) * 97 + 6;
      s += `<rect x="${x}" y="${y}" width="160" height="91" rx="10" class="d-fill${i}"/><text x="${x + 80}" y="${y + 42}" class="d-t">${a}</text><text x="${x + 80}" y="${y + 62}" class="d-s">${b}</text>`;
    });
    return `<svg viewBox="0 0 360 222" role="img" aria-label="BCG-Matrix">${s}</svg>`;
  },
  ansoff: () => {
    const q = [["Marktdurchdringung", "altes Produkt · alter Markt", "geringes Risiko"], ["Produktentwicklung", "neues Produkt · alter Markt", "mittleres Risiko"], ["Marktentwicklung", "altes Produkt · neuer Markt", "mittleres Risiko"], ["Diversifikation", "neues Produkt · neuer Markt", "hohes Risiko"]];
    let s = `<text x="190" y="214" class="d-s">Produkte: bestehend → neu</text><text x="12" y="105" class="d-s" transform="rotate(-90 12 105)">Märkte: bestehend → neu</text>`;
    q.forEach(([a, b, c], i) => {
      const x = (i % 2) * 165 + 26, y = Math.floor(i / 2) * 97 + 6;
      s += `<rect x="${x}" y="${y}" width="160" height="91" rx="10" class="d-fill${i}"/><text x="${x + 80}" y="${y + 34}" class="d-t">${a}</text><text x="${x + 80}" y="${y + 54}" class="d-s">${b}</text><text x="${x + 80}" y="${y + 72}" class="d-s">${c}</text>`;
    });
    return `<svg viewBox="0 0 360 222" role="img" aria-label="Ansoff-Matrix">${s}</svg>`;
  },
  pestel: () => {
    const q = [["P", "Politisch", "Stabilität, Förderung"], ["E", "Ökonomisch", "Inflation, Einkommen"], ["S", "Sozial", "Demografie, Werte"], ["T", "Technologisch", "neue Kanäle, KI"], ["E", "Ökologisch", "Klima, Abfall"], ["L", "Rechtlich", "DSGVO, UWG, Steuern"]];
    let s = "";
    q.forEach(([a, b, c], i) => {
      const x = (i % 3) * 118 + 4, y = Math.floor(i / 3) * 92 + 4;
      s += `<rect x="${x}" y="${y}" width="112" height="86" rx="10" class="d-fill${i % 4}"/><text x="${x + 56}" y="${y + 30}" class="d-big">${a}</text><text x="${x + 56}" y="${y + 52}" class="d-t">${b}</text><text x="${x + 56}" y="${y + 70}" class="d-s">${c}</text>`;
    });
    return `<svg viewBox="0 0 360 188" role="img" aria-label="PESTEL">${s}</svg>`;
  },
  journey: () => {
    const st = [["Bedarf", "Werbung, Freunde"], ["Suche", "Google, Bewertungen"], ["Vergleich", "Website, Tabellen"], ["Kauf", "Kasse, Lieferung"], ["Nutzung", "Produkt, Support"], ["Empfehlung", "Bewertung, Teilen"]];
    let s = `<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" class="d-dot"/></marker></defs>`;
    st.forEach(([a, b], i) => {
      const x = (i % 3) * 122, y = Math.floor(i / 3) * 88;
      s += `<rect x="${x}" y="${y}" width="110" height="66" rx="12" class="d-fill${i % 4}"/><text x="${x + 55}" y="${y + 22}" class="d-big" style="font-size:15px">${i + 1}</text><text x="${x + 55}" y="${y + 40}" class="d-t">${a}</text><text x="${x + 55}" y="${y + 56}" class="d-s">${b}</text>`;
      if (i % 3 < 2) s += `<line x1="${x + 111}" y1="${y + 33}" x2="${x + 121}" y2="${y + 33}" class="d-line" style="stroke-width:2" marker-end="url(#ar)"/>`;
    });
    s += `<path d="M 299 67 C 299 80, 55 74, 55 86" class="d-line" style="stroke-width:2" marker-end="url(#ar)"/>`;
    return `<svg viewBox="0 0 356 156" role="img" aria-label="Customer Journey: Kontaktpunkte je Phase">${s}</svg>`;
  },
  plc: () => `<svg viewBox="0 0 360 190" role="img" aria-label="Produktlebenszyklus">
    <line x1="30" y1="160" x2="350" y2="160" class="d-axis"/><line x1="30" y1="160" x2="30" y2="10" class="d-axis"/>
    <path d="M30 158 C 70 156, 90 140, 120 100 S 170 30, 220 30 S 300 60, 345 120" class="d-line"/>
    <path d="M30 170 C 80 175, 110 170, 140 130 S 200 70, 240 75 S 310 110, 345 150" class="d-line2"/>
    <text x="70" y="182" class="d-s">Einführung</text><text x="140" y="182" class="d-s">Wachstum</text><text x="225" y="182" class="d-s">Reife</text><text x="315" y="182" class="d-s">Rückgang</text>
    <text x="250" y="22" class="d-t">Umsatz</text><text x="258" y="98" class="d-s">Gewinn</text></svg>`,
  perceptual: () => `<svg viewBox="0 0 360 220" role="img" aria-label="Wahrnehmungslandkarte">
    <line x1="180" y1="10" x2="180" y2="210" class="d-axis"/><line x1="10" y1="110" x2="350" y2="110" class="d-axis"/>
    <text x="180" y="8" class="d-s">hoher Preis</text><text x="180" y="218" class="d-s">niedriger Preis</text><text x="40" y="104" class="d-s">traditionell</text><text x="315" y="104" class="d-s">modern</text>
    <circle cx="90" cy="50" r="9" class="d-dot"/><text x="90" y="40" class="d-s">Marke A</text>
    <circle cx="270" cy="60" r="9" class="d-dot"/><text x="270" y="50" class="d-s">Marke B</text>
    <circle cx="110" cy="170" r="9" class="d-dot"/><text x="110" y="160" class="d-s">Marke C</text>
    <circle cx="275" cy="165" r="14" class="d-gap"/><text x="275" y="192" class="d-t">freie Position?</text></svg>`,
};
