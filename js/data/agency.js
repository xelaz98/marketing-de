// Agentur: Kanäle, Optimierungsmaßnahmen und Kundenszenarien (fiktive Firmen).
// Das Modell steckt in js/engine/sim.js. Alle Zahlen sind deterministisch — gleiche Entscheidungen ergeben gleiche Ergebnisse.
//
// Kanal: cpm (€ pro 1000 Einblendungen), ctr, cvr (Basis), maxFreq (wie viele Einblendungen pro Person und Woche der Kanal „verträgt“), fatigue (Werbemüdigkeit)
const CHANNELS = {
  search: { name: "Suchmaschinenanzeigen", icon: "🔎", cpm: 60, ctr: 0.045, cvr: 0.06, maxFreq: 2, fatigue: false, term: "sem" },
  meta: { name: "Instagram / Facebook", icon: "📸", cpm: 9, ctr: 0.011, cvr: 0.025, maxFreq: 8, fatigue: true, term: "social-media-marketing" },
  tiktok: { name: "TikTok", icon: "🎵", cpm: 6, ctr: 0.008, cvr: 0.012, maxFreq: 8, fatigue: true, term: "social-media-marketing" },
  youtube: { name: "YouTube", icon: "▶️", cpm: 12, ctr: 0.005, cvr: 0.012, maxFreq: 6, fatigue: true, term: "display-advertising" },
  linkedin: { name: "LinkedIn", icon: "💼", cpm: 55, ctr: 0.006, cvr: 0.04, maxFreq: 6, fatigue: true, term: "b2b" },
  email: { name: "E-Mail an die Liste", icon: "✉️", cpm: 4, ctr: 0.03, cvr: 0.05, maxFreq: 2, fatigue: false, term: "email-marketing" },
  influencer: { name: "Influencer", icon: "🤳", cpm: 18, ctr: 0.012, cvr: 0.02, maxFreq: 3, fatigue: true, term: "influencer-marketing" },
  local: { name: "Flyer / lokale Werbung", icon: "📍", cpm: 25, ctr: 0.004, cvr: 0.25, maxFreq: 3, fatigue: false, term: "btl" },
  retarget: { name: "Retargeting", icon: "🎯", cpm: 15, ctr: 0.02, cvr: 0.07, maxFreq: 6, fatigue: true, term: "retargeting" },
};

// Optimierungsmaßnahmen (ab Woche 2). Die Wirkung setzt sim.js um.
const ACTIONS = [
  { id: "none", name: "Keine Änderung — mehr Daten sammeln", desc: "Manchmal richtig: Daten aus 1 Woche sind wenig. Aber die Werbemüdigkeit wächst weiter.", terms: ["a-b-testing"] },
  { id: "refresh", name: "Neue Kreation", desc: "Neue Visuals und Texte. Setzt die Werbemüdigkeit zurück (die CTR erholt sich).", terms: ["frequency", "ctr"] },
  { id: "landing", name: "Landingpage verbessern (CRO)", desc: "Schnellere Seite, kürzeres Formular, Bewertungen neben dem Button. +20 % Conversion für alle Kanäle ab dieser Woche. Einmalig 150 € aus dem Budget.", terms: ["cro", "landing-page", "conversion-rate"] },
  { id: "retarget", name: "Retargeting einschalten", desc: "Neuer Kanal: Anzeigen für Menschen, die letzte Woche geklickt, aber nicht gekauft haben.", terms: ["retargeting"] },
  { id: "lookalike", name: "Lookalike-Zielgruppe", desc: "Die Plattformen finden weitere Menschen, die den Käufern ähneln: +50 % Zielgruppe in den Social-Kanälen, aber 15 % geringere Relevanz.", terms: ["lookalike-audience"] },
  { id: "keywords", name: "Keywords bereinigen", desc: "Ausschließende Keywords und präzisere Phrasen in der Suche: +20 % CTR und +15 % Conversion bei der Suche.", terms: ["keyword", "search-intent", "quality-score"] },
];

// Rang in der Agentur (nach Agentur-XP)
const RANKS = [
  { min: 0, name: "Intern", bg: "Praktikant/in" },
  { min: 150, name: "Junior Marketer", bg: "Junior" },
  { min: 400, name: "Mid Marketer", bg: "Marketing-Manager/in" },
  { min: 800, name: "Senior Marketer", bg: "Senior" },
  { min: 1400, name: "Head of Marketing", bg: "Marketingleitung" },
];

// ───── Kunden
// Segment: size (Personen im Kampagnengebiet), p: Anteil des Segments, der im Kanal erreichbar ist, f: Relevanz des Kanals (0,4–1,4), ps: Preissensibilität 0–1
// pos.fit: wie stark die Position bei jedem Segment verfängt; offer: cvr (Multiplikator), val (Multiplikator des Werts), disc (% Rabatt vom Wert), cost (€ Kosten pro Conversion)
// goal.kpi: conv (Anzahl ≥ target) | roas (≥ target) | cpa (≤ target) | cac (Werbung + Angebotskosten pro Kunde ≤ target)
const CLIENTS = [
  {
    id: "cafe", icon: "☕", name: "Café „Bohne“", city: "Trier, nahe der Porta Nigra",
    brief: "Neues Café für Spezialitätenkaffee, seit 2 Monaten geöffnet. Es hat 14 Plätze und ein Fenster für „to go“-Bestellungen. Inhaber Paul will einen stabilen Zustrom neuer Stammgäste. Die Morgenspitze (7:30–9:30) ist halb leer. E-Mail-Liste: 1200 Personen aus dem Gewinnspiel zur Eröffnung.",
    goal: { kpi: "conv", target: 25, label: "≥ 25 Neukunden pro Woche" },
    convName: "Neukunden", value: 25, valueNote: "erwarteter Wert eines Neukunden pro Monat (≈3 Besuche × 8,30 €)", margin: 0.65,
    budget: 300, emailList: 1200,
    channels: ["search", "meta", "tiktok", "influencer", "local", "email"],
    segments: [
      { id: "office", name: "Büroangestellte in der Nähe", persona: "Lena, 31, Buchhalterin. Kommt um 8:10 vorbei, hat es eilig, will guten Kaffee ohne Schlange.", size: 6000, ps: 0.4,
        p: { search: 0.08, meta: 0.6, tiktok: 0.25, influencer: 0.2, local: 0.5 }, f: { search: 1.1, meta: 1.0, tiktok: 0.7, influencer: 0.8, local: 1.25, email: 1.0 } },
      { id: "students", name: "Studierende", persona: "Max, 21, studiert an der Uni Trier. Sucht einen Platz mit WLAN und Steckdosen zum Lernen. Muss aufs Geld achten.", size: 9000, ps: 0.85,
        p: { search: 0.05, meta: 0.5, tiktok: 0.7, influencer: 0.45, local: 0.3 }, f: { search: 0.9, meta: 0.9, tiktok: 1.25, influencer: 1.15, local: 0.9, email: 0.8 } },
      { id: "tourists", name: "Touristen in der Altstadt", persona: "Anna und Lukas, 34, aus Wien. Suchen bei 2 Tagen in der Stadt „authentische“ lokale Orte in Google Maps.", size: 4000, ps: 0.3,
        p: { search: 0.2, meta: 0.25, tiktok: 0.15, influencer: 0.1, local: 0.15 }, f: { search: 1.3, meta: 0.8, tiktok: 0.7, influencer: 0.7, local: 0.8, email: 0.3 } },
    ],
    positions: [
      { id: "fast", text: "„Spezialitätenkaffee in 3 Minuten — auf dem Weg zur Arbeit“", fit: { office: 1.3, students: 0.85, tourists: 0.8 } },
      { id: "cozy", text: "„Der gemütliche Ort zum Lernen und Treffen — WLAN und Steckdose an jedem Tisch“", fit: { office: 0.8, students: 1.3, tourists: 0.9 } },
      { id: "local", text: "„Das authentische Trierer Café an der Porta Nigra“", fit: { office: 0.8, students: 0.9, tourists: 1.35 } },
    ],
    offers: [
      { id: "none", name: "Kein Angebot", cvr: 1, val: 1, disc: 0, cost: 0, note: "Normaler Preis — erhält die Marge, gibt aber keinen Anlass zum Ausprobieren." },
      { id: "half", name: "Erster Kaffee −50 %", cvr: 1.5, val: 0.95, disc: 0, cost: 1.6, note: "Starker Anreiz zum Probieren; kostet etwa 1,60 € pro Neukunde." },
      { id: "loyal", name: "Stempelkarte: 10. Kaffee gratis", cvr: 1.2, val: 1.15, disc: 0, cost: 0.9, note: "Heute schwacher Anreiz, aber Menschen kommen wieder (höherer Wert)." },
      { id: "croissant", name: "Gratis-Croissant zum ersten Kaffee", cvr: 1.35, val: 1, disc: 0, cost: 1.2, note: "Geschenk statt Rabatt — schützt die Preiswahrnehmung." },
    ],
    copies: [
      { id: "A", text: "„Café Bohne — täglich ab 7:30 geöffnet. Herzlich willkommen!“", mult: 0.8, why: "Kein Nutzen, kein Grund, gerade jetzt zu kommen, kein Unterschied — „wir haben geöffnet“ ist ein Point of Parity, kein Point of Difference." },
      { id: "B", text: "„Cappuccino aus Spezialitätenkaffee in 3 Minuten — 50 m von der Haltestelle. Zeig diese Anzeige und hol dir deinen Bonus.“", mult: 1.25, why: "Konkreter Nutzen (3 Minuten), Ort, klarer Call to Action — und ein messbarer Code (Anzeige zeigen), der die Wirkung misst." },
    ],
    events: {
      3: { title: "🔥 Krise in den sozialen Medien", text: "Ein lokaler Vlogger postet ein Video: „Haar im Kaffee bei Café Bohne gefunden.“ 40 000 Aufrufe in 24 Stunden, die Kommentare sind wütend, der Inhaber ist außer sich.",
        options: [
          { text: "Schnelle öffentliche Entschuldigung, Erklärung der Maßnahmen (Haarnetz, Kontrollen), Einladung an den Vlogger, vorbeizukommen", good: true, sat: 6, ctr: 1, cvr: 1, note: "Eine schnelle, ehrliche und konkrete Reaktion begrenzt den Schaden und dreht oft die Stimmung. Das ist PR und Reputationsmanagement.", terms: ["public-relations", "stakeholders"] },
          { text: "Negative Kommentare löschen und den Vlogger blockieren", good: false, sat: -14, ctr: 0.85, cvr: 0.8, note: "Löschen fällt auf und löst eine zweite Welle aus („die zensieren“). Das Vertrauen sinkt — die Conversion auch.", terms: ["public-relations"] },
          { text: "Schweigen — das geht vorbei", good: false, sat: -8, ctr: 0.92, cvr: 0.88, note: "Schweigen lässt die Geschichte ohne dich erzählen. Neukunden sehen das Video und nichts von deiner Seite.", terms: ["public-relations"] },
          { text: "Anwaltsschreiben an den Vlogger wegen Verleumdung", good: false, sat: -12, ctr: 0.9, cvr: 0.82, note: "Die Drohung erhöht die Aufmerksamkeit (Streisand-Effekt) und wirkt aggressiv.", terms: ["public-relations"] },
        ] },
      4: { title: "📞 Anruf vom Kunden", text: "Paul: „Auf Instagram haben wir viele Likes, aber ich sehe die Leute von dort nicht. Flyer kann man wenigstens anfassen. Sollen wir Instagram stoppen und alles in Flyer stecken?“",
        options: [
          { text: "„Lass es uns messen: eigener Rabattcode pro Kanal (und UTM für die Links). In 2 Wochen entscheiden wir nach Daten, nicht nach Gefühl.“", good: true, sat: 7, ctr: 1, cvr: 1.03, note: "Entscheidungen nach Daten, nicht nach Meinungen. Codes pro Kanal und UTM zeigen den echten Beitrag und machen den Streit überflüssig.", terms: ["utm", "attribution", "incrementality"] },
          { text: "„Okay, wir stoppen Instagram.“", good: false, sat: 0, ctr: 1, cvr: 1, note: "Kann richtig sein oder nicht — aber die Entscheidung fällt ohne Daten. Likes sind keine Verkäufe, aber fehlender Last-Click heißt nicht fehlende Wirkung.", terms: ["attribution", "vanity-metrics"] },
          { text: "„Instagram ist die Zukunft, wir brauchen dort mehr Budget.“", good: false, sat: -5, ctr: 1, cvr: 1, note: "Du verteidigst den Kanal ohne Belege — der Kunde verliert Vertrauen in die Agentur.", terms: ["vanity-metrics"] },
          { text: "„Likes sind die wichtigste Kennzahl für die Marke.“", good: false, sat: -9, ctr: 1, cvr: 1, note: "Likes sind eine Vanity Metric. Der Kunde hat Anspruch auf Geschäftsergebnisse.", terms: ["vanity-metrics", "kpi"] },
        ] },
    },
  },
  {
    id: "gym", icon: "🏋️", name: "Fitnessstudio „Puls“", city: "Berlin-Neukölln",
    brief: "Fitnessstudio im Kiez mit modernen Geräten und Gruppenkursen. Mitgliedschaft: 60 €/Monat. Morgens und abends voll, nachmittags leer. Mitglieder bleiben im Schnitt 9 Monate. Inhaberin Daniela will neue Mitglieder zu vernünftigen Kosten. E-Mail-Liste: 2500 ehemalige und aktuelle Mitglieder.",
    goal: { kpi: "cac", target: 100, label: "Kosten pro Neumitglied (CAC: Werbung + Angebotskosten) ≤ 100 €" },
    convName: "Neumitglieder", cvrMult: 0.13, value: 540, valueNote: "Umsatz pro Mitglied über die gesamte Dauer: 60 € × 9 Monate (LTV nach Umsatz)", margin: 0.5,
    budget: 800, emailList: 2500,
    channels: ["search", "meta", "tiktok", "youtube", "influencer", "local", "email"],
    segments: [
      { id: "office", name: "Büroangestellte 25–40", persona: "Jonas, 33, Entwickler. Sitzt 9 Stunden, will abnehmen, hat aber nur 45 Minuten vor der Arbeit.", size: 30000, ps: 0.4,
        p: { search: 0.04, meta: 0.65, tiktok: 0.3, youtube: 0.5, influencer: 0.25, local: 0.2 }, f: { search: 1.2, meta: 1.1, tiktok: 0.8, youtube: 0.9, influencer: 0.9, local: 0.9, email: 1.0 } },
      { id: "students", name: "Studierende", persona: "Vicky, 20, lebt im Wohnheim. Will mit Freunden trainieren, aber jeder Euro zählt.", size: 20000, ps: 0.9,
        p: { search: 0.03, meta: 0.5, tiktok: 0.75, youtube: 0.55, influencer: 0.5, local: 0.3 }, f: { search: 0.9, meta: 0.9, tiktok: 1.25, youtube: 0.9, influencer: 1.2, local: 0.9, email: 0.7 } },
      { id: "senior", name: "Menschen 50+ für die Gesundheit", persona: "Gabi, 57. Ihr Arzt hat ihr wegen des Blutdrucks Bewegung empfohlen. Sie hat Angst, dass „Fitness nur für Junge ist“.", size: 15000, ps: 0.5,
        p: { search: 0.05, meta: 0.55, tiktok: 0.08, youtube: 0.4, influencer: 0.05, local: 0.6 }, f: { search: 1.1, meta: 1.0, tiktok: 0.5, youtube: 0.9, influencer: 0.5, local: 1.3, email: 1.1 } },
    ],
    positions: [
      { id: "time", text: "„Effektives Training in 45 Minuten — vor oder nach der Arbeit“", fit: { office: 1.3, students: 0.9, senior: 0.8 } },
      { id: "cheap", text: "„Das günstigste Studio in Neukölln — alles Nötige, nichts Überflüssiges“", fit: { office: 0.85, students: 1.3, senior: 0.85 } },
      { id: "health", text: "„Bewegung für die Gesundheit mit persönlichem Trainer — es ist nie zu spät“", fit: { office: 0.85, students: 0.75, senior: 1.4 } },
    ],
    offers: [
      { id: "none", name: "Kein Angebot", cvr: 1, val: 1, disc: 0, cost: 0, note: "Voller Preis; schwierigeres Ausprobieren." },
      { id: "onelev", name: "Erster Monat für 1 €", cvr: 1.8, val: 0.75, disc: 0, cost: 59, note: "Viele melden sich an, aber ein Teil kommt nur für den billigen Monat und geht wieder (geringerer Wert)." },
      { id: "trainer", name: "Kostenloses Training mit Trainer", cvr: 1.4, val: 1.08, disc: 0, cost: 15, note: "Nimmt die Angst vor dem Ausprobieren und startet eine Beziehung zum Trainer — Menschen bleiben länger." },
      { id: "annual", name: "Jahresmitgliedschaft −20 %", cvr: 1.1, val: 1.15, disc: 0.2, cost: 0, note: "Vorauszahlung, Bindung 12 Monate, aber 20 % niedrigerer Preis." },
    ],
    copies: [
      { id: "A", text: "„Fitnessstudio Puls — moderne Geräte, Gruppenkurse, flexible Öffnungszeiten.“", mult: 0.82, why: "Zählt Eigenschaften auf, die jedes Studio hat (Points of Parity). Kein konkreter Nutzen für eine konkrete Person und kein Aufruf." },
      { id: "B", text: "„45 Minuten. 3-mal pro Woche. Das erste Training mit Trainer geht auf uns — buch heute deinen Termin.“", mult: 1.22, why: "Spricht über die Lösung (kurzes effektives Training), senkt das Risiko (kostenloses erstes Training) und hat einen klaren Call to Action." },
    ],
    events: {
      3: { title: "🔥 Krise: 1-Stern-Bewertungen", text: "In der Hitze fällt die Klimaanlage im Studio 4 Tage aus. Bei Google erscheinen 12 Bewertungen mit 1 Stern: „Sauna statt Fitnessstudio!“. Die Reparatur ist morgen.",
        options: [
          { text: "Jede Bewertung mit Entschuldigung und Reparaturtermin beantworten + 1 Woche Gratisverlängerung für alle Mitglieder + E-Mail an die Mitglieder", good: true, sat: 7, ctr: 1, cvr: 1, note: "Die öffentliche Antwort zeigt künftigen Kunden, dass sich das Unternehmen kümmert. Die Entschädigung hält die aktuellen Mitglieder (Bindung ist günstiger als Gewinnung).", terms: ["customer-retention", "public-relations"] },
          { text: "30 gefälschte 5-Sterne-Bewertungen kaufen, um die schlechten zu „begraben“", good: false, sat: -18, ctr: 0.85, cvr: 0.75, note: "Gefälschte Bewertungen sind eine unlautere geschäftliche Handlung und leicht zu erkennen. Fliegt es auf, ist der Schaden viel größer.", terms: ["unfair-commercial-practices", "misleading-advertising"] },
          { text: "Keine Reaktion — die Reparatur ist morgen", good: false, sat: -7, ctr: 0.95, cvr: 0.88, note: "Die Bewertungen bleiben monatelang unbeantwortet und schrecken neue Kunden ab.", terms: ["touchpoint"] },
          { text: "−50 % Rabatt für Neumitglieder diese Woche", good: false, sat: -3, ctr: 1.05, cvr: 1, note: "Versuch, neue Leute zu „kaufen“, ohne das Problem der aktuellen zu lösen. Die Bewertungen bleiben, die Marge sinkt.", terms: ["customer-retention"] },
        ] },
      4: { title: "📞 Anruf von der Kundin", text: "Daniela: „Der Wettbewerber gibt den ersten Monat gratis. Lass uns allen die ersten ZWEI Monate gratis geben!“",
        options: [
          { text: "„Lass uns rechnen: Bei 2 Gratismonaten kommen viele nur für das Gratisangebot, und der Wert pro Mitglied sinkt. Ich schlage ein kostenloses Training mit Trainer vor — das bindet die Menschen.“", good: true, sat: 6, ctr: 1, cvr: 1.04, note: "Entschieden wird nach LTV, nicht nach Anmeldezahl. Billige Angebote ziehen Menschen mit hohem Churn an.", terms: ["ltv", "churn-rate", "promotional-pricing"] },
          { text: "„Klar, die Konkurrenz macht es ja auch!“", good: false, sat: -4, ctr: 1, cvr: 1, note: "Den Wettbewerber ohne Rechnung zu kopieren, führt in einen Preiskrieg und senkt den Kundenwert.", terms: ["price-war", "competition-based-pricing"] },
          { text: "„Nein, niemals irgendwelche Angebote.“", good: false, sat: -6, ctr: 1, cvr: 1, note: "Ein harter Nein ohne Argumente beschädigt die Beziehung. Die Kundin erwartet eine Alternative.", terms: ["sales-promotion"] },
          { text: "„Lass uns den Preis erhöhen, damit wir premium wirken.“", good: false, sat: -8, ctr: 1, cvr: 1, note: "Passt weder zur Situation noch zur Positionierung im Kiez.", terms: ["prestige-pricing"] },
        ] },
    },
  },
  {
    id: "shop", icon: "🛒", name: "Onlineshop „Körbchen“", city: "online, ganz Deutschland",
    brief: "Onlineshop für Küchen- und Haushaltswaren. Durchschnittlicher Bestellwert: 70 €. Bruttomarge: 35 %. Lieferung an Packstation oder Adresse. Inhaber Christian will profitables Wachstum. E-Mail-Liste: 15 000 Kunden mit Einwilligung.",
    goal: { kpi: "roas", target: 4, label: "ROAS ≥ 4 (Break-even liegt bei 1 / 0,35 ≈ 2,86)" },
    convName: "Bestellungen", value: 70, valueNote: "durchschnittlicher Bestellwert (AOV)", margin: 0.35,
    budget: 1500, emailList: 15000,
    channels: ["search", "meta", "tiktok", "youtube", "influencer", "email"],
    segments: [
      { id: "families", name: "Junge Familien", persona: "Sarah, 34, zwei Kinder. Kocht täglich, kauft abends am Handy ein, wenn die Kinder schlafen.", size: 120000, ps: 0.55,
        p: { search: 0.04, meta: 0.7, tiktok: 0.35, youtube: 0.45, influencer: 0.3 }, f: { search: 1.2, meta: 1.1, tiktok: 0.85, youtube: 0.9, influencer: 1.0, email: 1.1 } },
      { id: "movers", name: "Erste eigene Wohnung", persona: "Tim und Mila, 27. Haben gerade eine Wohnung gemietet und brauchen alles — von Pfannen bis Kleiderbügeln.", size: 50000, ps: 0.7,
        p: { search: 0.08, meta: 0.6, tiktok: 0.55, youtube: 0.4, influencer: 0.35 }, f: { search: 1.3, meta: 1.0, tiktok: 1.05, youtube: 0.9, influencer: 0.95, email: 0.8 } },
      { id: "gifts", name: "Geschenksuchende", persona: "Georg, 41. Weiß nicht, was er seiner Schwester zur neuen Wohnung schenken soll. Will etwas Schönes, verpackt und morgen geliefert.", size: 80000, ps: 0.35,
        p: { search: 0.05, meta: 0.55, tiktok: 0.25, youtube: 0.35, influencer: 0.2 }, f: { search: 1.25, meta: 1.0, tiktok: 0.8, youtube: 0.8, influencer: 1.0, email: 0.9 } },
    ],
    positions: [
      { id: "kitchen", text: "„Alles für die Küche — heute bestellen, morgen kochen“", fit: { families: 1.3, movers: 1.05, gifts: 0.8 } },
      { id: "home", text: "„Ein schönes Zuhause zum fairen Preis — alles für die neue Wohnung an einem Ort“", fit: { families: 0.95, movers: 1.35, gifts: 0.9 } },
      { id: "gift", text: "„Geschenke fürs Zuhause, die Freude machen — mit Verpackung und Lieferung morgen“", fit: { families: 0.8, movers: 0.85, gifts: 1.35 } },
    ],
    offers: [
      { id: "none", name: "Kein Angebot", cvr: 1, val: 1, disc: 0, cost: 0, note: "Volle Marge." },
      { id: "minus20", name: "−20 % auf alles", cvr: 1.45, val: 1, disc: 0.2, cost: 0, note: "Mehr Bestellungen, aber bei 35 % Marge frisst ein Rabatt von 20 % mehr als die Hälfte des Gewinns pro Bestellung." },
      { id: "freeship", name: "Gratisversand ab 80 €", cvr: 1.15, val: 1.2, disc: 0, cost: 5, note: "Kunden legen mehr in den Warenkorb (AOV ↑) — kostet etwa 5 € Versand pro Bestellung." },
      { id: "gift", name: "Geschenk ab 100 € Bestellwert", cvr: 1.08, val: 1.3, disc: 0, cost: 7, note: "Hebt den Bestellwert; das Geschenk kostet etwa 7 €." },
    ],
    copies: [
      { id: "A", text: "„−20 %!!! Nur jetzt!!! Nicht verpassen!!!“", mult: 0.85, why: "Schreit, ohne zu sagen, was du verkaufst und für wen. Wirkt billig und verdächtig; bei den meisten Produkten gibt es keinen echten Rabatt." },
      { id: "B", text: "„Pfannenset für die neue Küche — Lieferung morgen, Rückgabe bis 30 Tage. 120 Bewertungen mit ★4,8.“", mult: 1.2, why: "Konkretes Produkt für eine konkrete Situation, senkt das Risiko (Rückgabe) und liefert Social Proof (Bewertungen)." },
    ],
    events: {
      3: { title: "🔥 Krise: verspätete Lieferungen", text: "Der Paketdienst hat massive Verzögerungen: Sendungen kommen 3–5 Tage zu spät. Kunden schreiben wütend im Chat und in sozialen Medien.",
        options: [
          { text: "Proaktive E-Mail an alle mit offenen Bestellungen: ehrliche Erklärung, neuer Termin, Code −10 % für die nächste Bestellung; Banner auf der Website mit der Lieferzeit", good: true, sat: 6, ctr: 1, cvr: 0.97, note: "Proaktive Kommunikation reduziert Anfragen und Ärger; ein ehrlicher Termin steuert Erwartungen (Zufriedenheit = Erlebnis vs. Erwartung).", terms: ["customer-satisfaction", "touchpoint"] },
          { text: "Nichts — die Schuld liegt beim Paketdienst, nicht bei uns", good: false, sat: -10, ctr: 0.95, cvr: 0.85, note: "Für den Kunden ist die Lieferung Teil deines Produkts (erweitertes Produkt). Wessen Schuld es ist, interessiert ihn nicht.", terms: ["augmented-product", "last-mile"] },
          { text: "Alle Anzeigen bis Monatsende stoppen", good: false, sat: -4, ctr: 1, cvr: 1, note: "Überreaktion — du verlierst Umsatz, statt die neue Lieferzeit ehrlich auf der Website zu nennen und weiterzumachen.", terms: ["logistics"] },
          { text: "Trotz Verzögerung „Lieferung morgen“ versprechen", good: false, sat: -15, ctr: 1, cvr: 0.8, note: "Ein falsches Versprechen ist irreführend und garantiert noch größere Enttäuschung.", terms: ["misleading-advertising"] },
        ] },
      4: { title: "📞 Anruf vom Kunden", text: "Christian: „Der Wettbewerber hat alle Preise um 30 % gesenkt! Wir müssen sofort dasselbe tun, sonst verlieren wir Kunden!“",
        options: [
          { text: "„Bei 35 % Marge bleibt mit −30 % fast kein Gewinn pro Bestellung. Lass uns mit Wert antworten: Lieferung morgen, 30 Tage Rückgabe, Bewertungen — und die Conversion 2 Wochen beobachten.“", good: true, sat: 6, ctr: 1, cvr: 1.02, note: "Ein Preiskrieg hat selten einen Sieger. Eine Antwort mit Wert und Daten schützt die Marge.", terms: ["price-war", "value-proposition", "gross-margin"] },
          { text: "„Ja, −35 %, um sie zu schlagen!“", good: false, sat: -6, ctr: 1, cvr: 1, note: "Unter Einstand verlierst du an jeder Bestellung; der Wettbewerber kann wieder reagieren.", terms: ["price-war", "loss-leader"] },
          { text: "„Lass uns die Werbung stoppen, bis es vorbei ist.“", good: false, sat: -6, ctr: 1, cvr: 1, note: "Du überlässt den Markt dem Wettbewerber, ohne zu prüfen, ob du überhaupt Kunden verlierst.", terms: ["share-of-voice"] },
          { text: "„Lass uns Werbung schalten, dass der Wettbewerber Schrott verkauft.“", good: false, sat: -12, ctr: 1, cvr: 1, note: "Herabsetzung des Wettbewerbers ist unlauterer Wettbewerb und unzulässige vergleichende Werbung.", terms: ["comparative-advertising", "unfair-competition"] },
        ] },
    },
  },
  {
    id: "saas", icon: "🧾", name: "Software „Rechnix“ (B2B)", city: "online, kleine Firmen",
    brief: "Online-Software für Rechnungen und Ausgaben. Abo: 30 €/Monat; Kunden bleiben im Schnitt 12 Monate; die Marge beträgt 80 %. Gründerin Elena will zahlende Kunden, nicht nur Anmeldungen. E-Mail-Liste: 4000 Personen, die sich früher für einen Test registriert haben.",
    goal: { kpi: "conv", target: 10, label: "≥ 10 neue zahlende Kunden pro Woche" },
    convName: "zahlende Kunden", cvrMult: 0.18, value: 360, valueNote: "Umsatz pro Kunde über 12 Monate (30 € × 12)", margin: 0.8,
    budget: 1200, emailList: 4000,
    channels: ["search", "meta", "youtube", "linkedin", "influencer", "email"],
    segments: [
      { id: "freelance", name: "Freelancer", persona: "Stefan, 29, Grafikdesigner. Hasst Papierkram; schreibt 6 Kunden monatlich Rechnungen vom Handy.", size: 40000, ps: 0.75,
        p: { search: 0.05, meta: 0.6, youtube: 0.45, linkedin: 0.35, influencer: 0.3 }, f: { search: 1.2, meta: 1.0, youtube: 0.95, linkedin: 0.9, influencer: 1.1, email: 0.9 } },
      { id: "smb", name: "Kleine Firmen (2–10 Personen)", persona: "Petra, 45, Inhaberin eines Blumenladens. Zahlt einen Steuerberater und will weniger Chaos mit Rechnungen und Belegen.", size: 30000, ps: 0.5,
        p: { search: 0.06, meta: 0.5, youtube: 0.3, linkedin: 0.45, influencer: 0.15 }, f: { search: 1.3, meta: 0.95, youtube: 0.8, linkedin: 1.15, influencer: 0.8, email: 1.05 } },
      { id: "accountants", name: "Steuerberatungskanzleien", persona: "Herr Weber, 52, hat eine Kanzlei mit 60 Mandanten. Empfiehlt er die Software, nutzen sie seine Mandanten.", size: 4000, ps: 0.3,
        p: { search: 0.1, meta: 0.4, youtube: 0.2, linkedin: 0.7, influencer: 0.25 }, f: { search: 1.2, meta: 0.7, youtube: 0.7, linkedin: 1.35, influencer: 1.2, email: 1.0 }, valueMult: 3 },
    ],
    positions: [
      { id: "speed", text: "„Rechnung in 30 Sekunden — vom Handy, wo auch immer du bist“", fit: { freelance: 1.35, smb: 1.0, accountants: 0.75 } },
      { id: "allinone", text: "„Rechnungen, Ausgaben und Auswertungen für kleine Unternehmen — an einem Ort“", fit: { freelance: 0.9, smb: 1.3, accountants: 0.95 } },
      { id: "partner", text: "„Das Tool, das der Steuerberater seinen Mandanten gibt — alles kommt fertig bei ihm an“", fit: { freelance: 0.7, smb: 0.95, accountants: 1.45 } },
    ],
    offers: [
      { id: "none", name: "Direkt zahlen, keine Testphase", cvr: 0.7, val: 1, disc: 0, cost: 0, note: "Bei Software wollen Menschen testen; ohne Testphase wagen es wenige." },
      { id: "trial", name: "14 Tage kostenlos", cvr: 1.25, val: 1, disc: 0, cost: 4, note: "SaaS-Standard: senkt das Risiko; kostet etwa 4 € Server und Support pro Kunde." },
      { id: "freemium", name: "Kostenlos bis 5 Rechnungen/Monat", cvr: 1.15, val: 0.75, disc: 0, cost: 6, note: "Viele Anmeldungen, aber nur ein kleiner Teil wechselt zum Bezahltarif, oft für die günstigeren Funktionen — geringerer Durchschnittswert." },
      { id: "annual", name: "Jahresplan: 2 Monate geschenkt", cvr: 1.05, val: 1.1, disc: 0.17, cost: 0, note: "Vorauszahlung für ein Jahr (weniger Abwanderung), aber mit ~17 % Rabatt." },
    ],
    copies: [
      { id: "A", text: "„Innovative Cloud-Plattform zur Steuerung finanzieller Prozesse mit KI.“", mult: 0.8, why: "Fachjargon und Eigenschaften. Petra sucht keine „Plattform für Finanzprozesse“ — sie will weniger Chaos mit Rechnungen." },
      { id: "B", text: "„Rechnung vom Handy in 30 Sekunden. Dein Steuerberater bekommt alles automatisch. 14 Tage kostenlos.“", mult: 1.22, why: "Konkreter Nutzen, löst den Schmerz (Chaos beim Steuerberater), senkt das Risiko mit Testphase." },
    ],
    events: {
      3: { title: "🔥 Krise: Ausfall am Monatsende", text: "Am 30. ist das System 6 Stunden nicht erreichbar — genau dann, wenn alle Rechnungen schreiben. In Gruppen für Kleinunternehmer heißt es, „Rechnix“ sei unzuverlässig.",
        options: [
          { text: "Statusseite in Echtzeit, ehrlicher Bericht, was passiert ist und was ihr ändert, 1 Monat gratis für Betroffene, persönlicher Brief der Gründerin", good: true, sat: 8, ctr: 1, cvr: 0.97, note: "Im B2B ist Vertrauen alles. Transparenz und Entschädigung halten die Kunden und zeigen künftigen, dass man sich auf euch verlassen kann.", terms: ["customer-retention", "public-relations", "b2b"] },
          { text: "Kurze Meldung „technisches Problem, wir entschuldigen uns“ und sonst nichts", good: false, sat: -6, ctr: 0.97, cvr: 0.88, note: "Ohne Erklärung und Maßnahmen wissen die Kunden nicht, ob es wieder passiert.", terms: ["public-relations"] },
          { text: "Öffentlich dem Hosting-Anbieter die Schuld geben", good: false, sat: -9, ctr: 0.95, cvr: 0.85, note: "Für den Kunden ist das Produkt deins. Schuldzuweisungen wirken unprofessionell.", terms: ["augmented-product"] },
          { text: "Schweigen und hoffen, dass es keiner bemerkt hat", good: false, sat: -12, ctr: 0.9, cvr: 0.8, note: "Alle haben es bemerkt — genau am Monatsende.", terms: ["social-listening"] },
        ] },
      4: { title: "📞 Anruf von der Kundin", text: "Elena: „LinkedIn ist furchtbar teuer — 4 € pro Klick! Auf Facebook kostet der Klick 0,40 €. Wir stoppen LinkedIn.“",
        options: [
          { text: "„Lass uns die Kosten pro zahlendem Kunden vergleichen, nicht pro Klick. Bringt LinkedIn Kunden günstiger pro Kunde (vor allem Kanzleien mit vielen Mandanten), ist es trotz teurem Klick billiger.“", good: true, sat: 7, ctr: 1, cvr: 1.03, note: "CPA = CPC / CVR. Ein teurer Klick mit hoher Conversion kann pro Kunde billiger sein. Dazu: Eine Kanzlei bringt viele Endkunden.", terms: ["cpa", "cpc", "conversion-rate", "ltv"] },
          { text: "„Sie haben recht, wir stoppen.“", good: false, sat: 0, ctr: 1, cvr: 1, note: "Entscheidung nach CPC statt nach CPA und Kundenwert.", terms: ["cpc", "cpa"] },
          { text: "„Lass uns alles zu TikTok verschieben — da ist es am billigsten.“", good: false, sat: -8, ctr: 1, cvr: 1, note: "Die billigste Einblendung ist nicht der billigste Kunde. TikTok ist für B2B-Buchhaltungslösungen nicht stark.", terms: ["cpm", "b2b"] },
          { text: "„Der Klickpreis ist nicht unser Thema.“", good: false, sat: -10, ctr: 1, cvr: 1, note: "Genau euer Thema ist es, der Kundin zu erklären, welche Zahlen zählen.", terms: ["kpi"] },
        ] },
    },
  },
];
const CLIENT = Object.fromEntries(CLIENTS.map((c) => [c.id, c]));
const AGENCY_WEEKS = 4;
