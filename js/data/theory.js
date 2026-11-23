// Theorie nach Modulen. [[Schlüssel]] wird zum Link ins Glossar. dia: Schlüssel aus DIAGRAMS.
// terms: Begriffe für „Das üben“ (fehlt es — alle [[…]] aus dem Text).
const THEORY = [];
function TH(m, title, html, opts) { THEORY.push(Object.assign({ id: "t" + (THEORY.length + 1), m, title, html }, opts || {})); }

// ───── m1
TH("m1", "Was Marketing wirklich ist", `
<p>[[Marketing]] ist nicht „Werbung“. Kotler definiert es als Prozess, in dem man <b>Wert für den Kunden</b> schafft und Beziehungen aufbaut, um im Gegenzug Wert zu erhalten. Werbung kommt am Ende — zuerst versteht man den Kunden.</p>
<p><b>Die Verständniskette:</b> [[Need]] (ich habe Hunger) → [[Want]] (ich will eine Brezel) → [[Demand]] (ich will und kann 2 € zahlen). Marketing schafft keine Bedürfnisse, formt aber Wünsche und macht aus Wünschen Nachfrage.</p>
<p><b>Warum das wichtig ist:</b> Der Kunde kauft kein Produkt, sondern [[Customer value]] — Nutzen minus alle Kosten (Geld, Zeit, Risiko). Übertrifft das Erlebnis die Erwartungen, entsteht [[Customer satisfaction]] und daraus [[Customer retention]] und Empfehlungen.</p>
<div class="ex"><b>Beispiel:</b> IKEA verkauft nicht „Möbel“, sondern gutes Design zum niedrigen Preis. Der Kunde „zahlt“ mit Arbeit — er transportiert das Flachpaket selbst und baut es auf. Das ist ein bewusster Tausch von Nutzen und Kosten.</div>
<p><b>Entwicklung der Konzepte</b> (wie Unternehmen denken):</p>
<ul><li>[[Production concept]] — „billig und viel herstellen“;</li><li>[[Product concept]] — „das Beste bauen“ (Falle: die „bessere Mausefalle“, die keiner will);</li><li>[[Selling concept]] — „verkaufen, was wir gemacht haben“;</li><li>[[Marketing concept]] — „das Bedürfnis erkennen und besser befriedigen“;</li><li>[[Societal marketing concept]] — dasselbe, aber auch langfristig im Interesse der Gesellschaft.</li></ul>
<div class="ex"><b>Lehre aus der Geschichte:</b> Kodak baute schon 1975 den ersten Prototyp einer Digitalkamera, schützte aber jahrelang das Filmgeschäft. Das Unternehmen dachte vom Produkt aus, nicht vom Kunden — und verlor den Markt.</div>`,
  { terms: ["need", "want", "demand", "customer-value", "customer-satisfaction", "production-concept", "product-concept", "selling-concept", "marketing-concept", "societal-marketing-concept", "marketing"] });
TH("m1", "Der Marketing-Mix: 4P, 7P und 4C", `
<p>Der [[Marketing mix]] ist das Set der Entscheidungen, die du kontrollierst. Der klassische Rahmen sind die [[4P]] (McCarthy, 1960): [[Product]], [[Price]], [[Place]], [[Promotion]].</p>
<p><b>Goldene Regel:</b> Die vier P müssen zusammenpassen. Ein Luxusparfum im Discounter-Angebot zerstört das Image. Ein Billigprodukt mit TV-Imagekampagne verbrennt Geld.</p>
<p><b>Dienstleistungen</b> haben 4 Besonderheiten: [[Intangibility]], [[Inseparability]], [[Variability]], [[Perishability]]. Deshalb wird der Mix auf die [[7P]] erweitert, mit [[People]], [[Process]] und [[Physical evidence]].</p>
<div class="ex"><b>Beispiel Hotel:</b> Das leere Zimmer heute Nacht ist für immer verloren (Vergänglichkeit). Deshalb ändern Hotels und Airlines die Preise je nach Nachfrage. Saubere Lobby und Uniformen sind „physische Hinweise“ auf eine Qualität, die man vorher nicht testen kann.</div>
<p>Die [[4C]] (Lauterborn, 1990) übersetzen die 4P in die Sprache des Kunden: Lösung statt Produkt, Gesamtkosten statt Preis, Bequemlichkeit statt Ort, Kommunikation statt Promotion. Nutze sie als Check: „Würde ich als Kunde das als Lösung, bequem und faire Kosten sehen?“</p>
<p><b>B2B vs. B2C:</b> Im [[B2B]] kauft eine Gruppe in einem langen Prozess, im [[B2C]] eine Einzelperson, oft schnell und emotional. Der Mix unterscheidet sich: B2B setzt mehr auf persönlichen Verkauf und Content, B2C auf Reichweite und Kreation.</p>`,
  { dia: "p4" });
TH("m1", "Kundenbeziehungen (CRM)", `
<p>[[CRM]] ist Strategie und Software zugleich: Du weißt, wer der Kunde ist, was er gekauft hat und wann. Ziel ist, profitable Kunden zu halten und ihren Wert zu steigern.</p>
<p><b>Warum Bindung so wichtig ist:</b> Einen Neukunden zu gewinnen kostet meist mehr, als einen bestehenden zu halten. Eine kleine Verbesserung der [[Customer retention]] wirkt stark auf den Gewinn, weil loyale Kunden mehr kaufen und weiterempfehlen.</p>
<ul><li>Segmentiere Kunden nach Wert und Aktivität.</li><li>Kommuniziere unterschiedlich mit neuen, Stamm- und „eingeschlafenen“ Kunden.</li><li>Miss die [[Customer satisfaction]] nach den entscheidenden Momenten.</li></ul>
<div class="ex"><b>Beispiel:</b> Bonusprogramme von Supermärkten (Karten und Apps) geben Rabatte. Zusätzlich sammeln sie Daten darüber, wer was kauft, und ermöglichen persönliche Angebote — CRM im großen Maßstab.</div>`);

// ───── m2
TH("m2", "Marketingumfeld: Mikro und Makro", `
<p>Das [[Marketing environment]] sind die Kräfte außerhalb der Marketingabteilung. Die [[Microenvironment]] ist der enge Kreis: Lieferanten, Absatzmittler, Kunden, Wettbewerber, Öffentlichkeiten. Die [[Macroenvironment]] sind die großen Kräfte, die alle betreffen.</p>
<p>[[PESTEL]] ordnet die Makroumwelt in 6 Gruppen: politische, ökonomische, soziale, technologische, ökologische und rechtliche Faktoren. Die Frage ist nicht „was passiert“, sondern „was bedeutet das für uns — Chance oder Risiko“.</p>
<div class="ex"><b>Beispiel:</b> Das EU-Verbot bestimmter Einwegkunststoffprodukte (Richtlinie 2019/904) ist ein rechtlicher und ökologischer Faktor. Für Strohhalmhersteller ein Risiko, für Hersteller von Papieralternativen eine Chance.</div>
<p><b>Typischer Fehler:</b> PESTEL mit SWOT verwechseln. PESTEL ist nur die externe Makroumwelt. SWOT kombiniert interne Stärken und Schwächen mit externen Chancen und Risiken — oft mit PESTEL als Input für O und T.</p>
<p>[[Stakeholders]] sind nicht nur Kunden: Mitarbeitende, Investoren, Gemeinde, Medien, Behörden. In der Krise muss jede Gruppe ihre Botschaft hören.</p>`, { dia: "pestel" });
TH("m2", "Wie Menschen kaufen", `
<p>Der [[Buyer decision process]] hat 5 Phasen: [[Need recognition]] → [[Information search]] → [[Evaluation of alternatives]] → [[Purchase decision]] → [[Post-purchase behavior]].</p>
<p><b>Warum du das kennen solltest:</b> In jeder Phase hat der Kunde eine andere Frage und braucht eine andere Botschaft. Bei der Suche gewinnen SEO und Bewertungen. Beim Vergleich Tabellen und Belege. Beim Kauf ein einfacher Checkout. Nach dem Kauf die Bestätigung, richtig gewählt zu haben (gegen [[Cognitive dissonance]]).</p>
<p><b>Psychologische Faktoren:</b> [[Motivation]] (warum), [[Perception]] (wie gedeutet wird; [[Selective attention]] filtert fast alles), [[Attitude]] (dauerhafte Bewertungen, schwer zu ändern).</p>
<p><b>Soziale und kulturelle:</b> [[Culture]], [[Subculture]], [[Reference group]], [[Opinion leader]], [[Lifestyle]].</p>
<p><b>Involvement:</b> Bei hohem [[Involvement]] (Auto, Wohnung) durchlaufen Menschen alle Phasen. Bei niedrigem [[Habitual buying behavior]] oder [[Impulse buying]]: Es entscheiden Regal, Verfügbarkeit und Gewohnheit.</p>
<div class="ex"><b>Beispiel:</b> Bei der „Pepsi Challenge“ (ab 1975) bevorzugten viele im Blindtest den Geschmack von Pepsi. Mit sichtbaren Marken verschoben sich die Präferenzen. Wahrnehmung und Einstellung zur Marke wirken so stark wie der Geschmack selbst.</div>
<p>Die [[Maslow's hierarchy]] hilft zu sehen, welche Bedürfnisebene ein Produkt anspricht: die Alarmanlage Sicherheit, der Malkurs Selbstverwirklichung.</p>`);
TH("m2", "Customer Journey, Personas und Jobs to be done", `
<p>Die [[Customer journey]] beschreibt das gesamte Erlebnis aus Kundensicht. Jeder [[Touchpoint]] — Anzeige, Website, Kurier, Rechnung — baut Vertrauen auf oder zerstört es.</p>
<p>Die [[Buyer persona]] macht aus dem Segment einen Menschen, für den man schreiben kann. Eine gute Persona basiert auf Interviews und Daten, nicht auf Fantasie. Wichtig sind Ziele, Ängste, Einwände und Kanäle.</p>
<p>[[Jobs to be done]] fragt: Für welchen „Job“ heuert der Kunde das Produkt an? Er will keine Bohrmaschine, sondern ein Regal aufhängen. Das zeigt unerwartete Wettbewerber: Beim Job „unterhalte mich am Abend“ konkurriert der Streamingdienst auch mit dem Schlaf.</p>
<p>Im [[B2B]] kauft ein [[Buying center]]: Nutzer, Beeinflusser, Finanzen, Entscheider, Gatekeeper. Die Inhalte müssen die Fragen jedes Einzelnen beantworten.</p>`, { dia: "journey" });

// ───── m3
TH("m3", "STP: Segmentierung → Targeting → Positionierung", `
<p>[[STP]] ist das Herz der Marketingstrategie. Ohne STP sind die 4P ein Schuss ins Blaue.</p>
<p><b>1. [[Segmentation]]</b> — Nach welchen Merkmalen unterscheiden sich Kunden in ihren Bedürfnissen?</p>
<ul><li>[[Geographic segmentation]] — wo;</li><li>[[Demographic segmentation]] — wer (Alter, Einkommen, Lebensphase);</li><li>[[Psychographic segmentation]] — wie (Werte, [[Lifestyle]]);</li><li>[[Behavioral segmentation]] — wie sie sich verhalten: [[Benefit segmentation]], [[Occasion segmentation]], [[Usage rate]], Loyalität.</li></ul>
<p>Ein brauchbares Segment erfüllt die [[Effective segmentation criteria]]: messbar, erreichbar, substanziell, unterscheidbar, umsetzbar.</p>
<p><b>2. [[Targeting]]</b> — Welche Segmente bedienen? Man prüft die [[Segment attractiveness]] und die eigenen Ressourcen. Strategien: [[Undifferentiated marketing]], [[Differentiated marketing]], [[Concentrated marketing]], [[Micromarketing]].</p>
<p><b>3. [[Positioning]]</b> — Welchen Platz willst du im Kopf des Kunden im Vergleich zur Konkurrenz?</p>
<div class="ex"><b>Beispiel:</b> Volvo positioniert sich seit Jahrzehnten über Sicherheit. Volvo-Ingenieur Nils Bohlin entwickelte 1959 den Dreipunktgurt, und das Unternehmen gab das Patent für alle Hersteller frei. Die Position ist durch Fakten gedeckt, nicht nur durch Werbung.</div>`);
TH("m3", "Wie man eine Position aufbaut", `
<p>Die Position steht auf zwei Beinen:</p>
<ul><li>[[Points of parity]] — was alle in der Kategorie haben müssen (Eintrittskarte);</li><li>[[Points of difference]] — worin du anders und besser bist und was Kunden schätzen.</li></ul>
<p>[[Positioning statement]] (internes Dokument): „Für [Segment], die [Bedürfnis], ist [Marke] die [Kategorie], die [Nutzen], weil [Beleg].“</p>
<p>Der [[USP]] ist ein starker, konkreter Nutzen. Die [[Value proposition]] das ganze Nutzenbündel im Verhältnis zum Preis. Wertpositionen: [[More for more]], mehr fürs Gleiche, das Gleiche für weniger, [[Less for much less]], mehr für weniger.</p>
<div class="ex"><b>Beispiel:</b> Billigairlines (Ryanair, Wizz Air) sind „weniger für viel weniger“. Kein Gepäck inklusive, kein Essen, abgelegene Flughäfen, aber sehr niedrige Preise. Ihre Kunden sind nicht enttäuscht, weil sie nicht mehr erwarten.</div>
<p>Die [[Perceptual map]] zeigt, wie Kunden Marken auf zwei Achsen sehen und wo eine Position frei ist. Achtung: Eine freie Position ist nicht immer eine Chance. Manchmal ist sie leer, weil es dort keine Kunden gibt.</p>
<p>[[Differentiation]] ist der echte Unterschied. [[Competitive advantage]] ist seine nachhaltige Folge. [[Repositioning]] — der Wechsel der Position — ist langsam und teuer.</p>`, { dia: "perceptual" });
TH("m3", "Wie groß ist der Markt: TAM, SAM, SOM", `
<p>Die drei Kreise schätzen das Potenzial:</p>
<ul><li>[[TAM]] — der ganze Markt der Kategorie (theoretische Obergrenze);</li><li>[[SAM]] — der Teil, den dein Modell tatsächlich bedienen kann (Region, Sprache, Kanal);</li><li>[[SOM]] — der Teil, den du in den nächsten Jahren realistisch gewinnst.</li></ul>
<p><b>Warum das wichtig ist:</b> Der Businessplan baut auf dem SOM auf, nicht auf dem TAM. „Der Kaffeemarkt in der EU ist riesig“ heißt nicht, dass ein Café in Leipzig davon etwas spürt.</p>
<div class="ex"><b>Beispiel (fiktive Firma):</b> Rechnungssoftware. TAM sind alle Unternehmen in der EU, die Rechnungen schreiben. SAM sind die kleinen Firmen in Deutschland, die online Rechnungen schreiben. SOM sind 3 % davon in 3 Jahren, angesichts von Konkurrenz und Vertriebsteam.</div>
<p>Bottom-up-Rechnungen (Anzahl Kunden × durchschnittlicher Kauf) sind verlässlicher als Top-down („1 % eines riesigen Marktes“).</p>`);

// ───── m4
TH("m4", "Produktebenen und Güterarten", `
<p>Ein Produkt hat drei Ebenen: [[Core benefit]] (welches Bedürfnis es löst) → [[Actual product]] (Design, Funktionen, Marke, Verpackung) → [[Augmented product]] (Garantie, Lieferung, Support). Wenn reale Produkte sich ähneln, findet der Wettbewerb im erweiterten Produkt statt.</p>
<p><b>Arten von Konsumgütern</b> nach Kaufverhalten:</p>
<ul><li>[[Convenience product]] — häufig, schnell, überall → intensive Distribution;</li><li>[[Shopping product]] — wird verglichen → Information, Verkäufer;</li><li>[[Specialty product]] — die Marke wird gezielt gesucht → Exklusivität;</li><li>[[Unsought product]] — man denkt nicht daran → aktiver Verkauf.</li></ul>
<p>Sortiment: [[Product line]] ist eine Gruppe ähnlicher Produkte, [[Product mix]] umfasst alle Linien. [[Product mix width]] ist die Zahl der Linien, [[Product line depth]] die Varianten in einer Linie.</p>
<div class="ex"><b>Beispiel:</b> Beim iPhone ist der Kern „Verbundenheit und Sicherheit“. Das reale Produkt ist das Telefon. Das erweiterte Produkt sind iCloud, AppleCare, Apple Store und das Ökosystem. Dieses Ökosystem macht den Markenwechsel für den Kunden „teuer“.</div>`);
TH("m4", "Lebenszyklus und neue Produkte", `
<p>[[Product life cycle]]: [[Introduction stage]] → [[Growth stage]] → [[Maturity stage]] → [[Decline stage]]. In jeder Phase ist die Strategie anders:</p>
<ul><li>Einführung — Bekanntheit und Probieren; noch kein Gewinn.</li><li>Wachstum — Distribution ausbauen, neue Varianten, Kampf um Anteile.</li><li>Reife — Anteil verteidigen, neue Segmente, Updates, Effizienz.</li><li>Rückgang — halten, „abernten“ oder einstellen.</li></ul>
<p>[[NPD]] siebt Ideen früh aus, solange Fehler billig sind. Das [[MVP]] prüft, ob jemand zahlt, bevor man Monate investiert. [[Product-market fit]] zeigt sich, wenn Wachstum von selbst kommt — durch Empfehlungen, nicht nur bezahlte Werbung.</p>
<div class="ex"><b>Beispiel:</b> Netflix begann als DVD-Verleih per Post. 2007 startete das Streaming — während das DVD-Geschäft noch in der Reife war. So „kannibalisierte“ Netflix sein altes Produkt selbst, bevor es ein Wettbewerber tat.</div>`, { dia: "plc" });
TH("m4", "Marke und Markenwert", `
<p>Die [[Brand]] ist ein Versprechen: Sie senkt Risiko und Aufwand bei der Wahl. [[Brand equity]] ist der Zusatzwert der Marke — höherer Preis, Loyalität, leichterer Eintritt in neue Kategorien.</p>
<p>Die [[Brand identity]] ist, was das Unternehmen sein will. Das [[Brand image]] ist, was Kunden tatsächlich denken. Aufgabe des Marketings ist, beides anzunähern — durch Taten, nicht nur durch ein Logo.</p>
<p>[[Brand awareness]] ist die erste Stufe. Ohne Bekanntheit keine Wahl. Bekanntheit allein reicht aber nicht — es braucht positive Assoziationen.</p>
<p>Wachsen mit der Marke: [[Line extension]] (neue Sorte in derselben Kategorie), [[Brand extension]] (neue Kategorie), [[Co-branding]] (zwei Marken gemeinsam). Die [[Private label]] der Händler sind ein echter Wettbewerber der Marken, besonders bei Inflation.</p>
<p>[[Packaging]] ist der „stumme Verkäufer“ im Regal. [[Rebranding]] ist riskant: Ohne Veränderung des Erlebnisses ist das neue Logo nur Kosmetik.</p>
<div class="ex"><b>Beispiel aus Deutschland:</b> Nach der Fusion von Karstadt und Kaufhof (2019) firmierte das Unternehmen als „Galeria Karstadt Kaufhof“ und 2023 nur noch als „Galeria“. Der neue Name allein löste die Probleme jedoch nicht — ohne besseres Einkaufserlebnis bleibt Rebranding Kosmetik.</div>`);

// ───── m5
TH("m5", "Drei Ansätze zur Preisbildung", `
<p>Der Preis ist das einzige P, das Erlöse bringt. Drei Logiken:</p>
<ul><li>[[Cost-plus pricing]] — Selbstkosten + [[Markup]]. Einfach, ignoriert aber den Kunden.</li><li>[[Value-based pricing]] — was der Nutzen dem Kunden wert ist. Am profitabelsten, erfordert aber Forschung.</li><li>[[Competition-based pricing]] — im Verhältnis zur Konkurrenz.</li></ul>
<p>Die Obergrenze des Preises ist der wahrgenommene Wert. Die Untergrenze die Kosten. Dazwischen liegen die Konkurrenz und der [[Reference price]] im Kopf des Kunden.</p>
<p><b>Aufschlag vs. Marge — der klassische Fehler:</b> Einkauf für 60 €, Verkauf für 100 €. Der Aufschlag ist 40/60 = 66,7 % (auf die Selbstkosten). Die [[Gross margin]] ist 40/100 = 40 % (auf den Preis).</p>
<p>[[Price elasticity of demand]]: Wenn −10 % Preis +25 % Menge bringen, ist die Nachfrage elastisch (|E| = 2,5) und die Senkung erhöht den Umsatz. Bei [[Inelastic demand]] erhöht eine Preiserhöhung den Umsatz.</p>`);
TH("m5", "Preisstrategien", `
<p><b>Für neue Produkte:</b> [[Price skimming]] (hoher Startpreis, dann sinkend — bei Prestige und schwerer Kopierbarkeit) oder [[Penetration pricing]] (niedriger Preis für schnellen Anteil — bei preissensiblem Markt und Skaleneffekten).</p>
<p><b>Für das Sortiment:</b> [[Bundle pricing]], [[Captive product pricing]] (billiger Drucker, teure Patronen; Kapselmaschinen), [[Optional-product pricing]].</p>
<p><b>Modelle:</b> [[Freemium]] (kostenlose Basis, bezahlte Extras — z. B. Spotify), [[Subscription pricing]], [[Dynamic pricing]] (Flüge, Hotels, Fahrdienste zur Rushhour), [[Segmented pricing]] (Studententickets).</p>
<p><b>Psychologie:</b> [[Psychological pricing]] (9,99), [[Prestige pricing]], [[Price anchoring]], [[Decoy effect]].</p>
<p><b>Aktionen:</b> [[Promotional pricing]] und [[Loss leader]] bringen Frequenz, aber häufige Rabatte bringen Kunden bei zu warten. Ein [[Price war]] hat selten einen Sieger.</p>
<div class="ex"><b>Recht:</b> Bei einer angekündigten Preisermäßigung musst du in Deutschland den niedrigsten Preis der letzten 30 Tage angeben ([[PAngV]] §11). Der Trick „erst erhöhen, dann senken“ ist verboten.</div>`);
TH("m5", "Break-even und Deckungsbeitrag", `
<p>[[Fixed costs]] hängen nicht von der Menge ab (Miete, Gehälter). [[Variable costs]] steigen mit jedem Stück (Rohstoffe, Verpackung).</p>
<p>[[Contribution margin]] = Preis − variable Stückkosten. Er deckt die Fixkosten und bringt danach Gewinn.</p>
<p>[[Break-even point]] (Stück) = Fixkosten / Deckungsbeitrag pro Stück.</p>
<div class="ex"><b>Beispiel:</b> Café mit Miete und Gehältern 6000 €/Monat. Kaffee für 3,00 € mit 1,00 € variablen Kosten → Deckungsbeitrag 2,00 € → Break-even bei 3000 Kaffees/Monat (≈100 am Tag). Senkst du den Preis auf 2,50 €, sinkt der Deckungsbeitrag auf 1,50 € und du brauchst 4000 Kaffees — 33 % mehr.</div>
<p><b>Warum das für Marketer wichtig ist:</b> Jeder Rabatt muss sich über zusätzliche Menge „bezahlen“. Wie viel? Nötige Menge = alter Deckungsbeitrag / neuer Deckungsbeitrag × alte Menge.</p>`);

// ───── m6
TH("m6", "Kanäle und Absatzmittler", `
<p>Der [[Distribution channel]] ist der Weg des Produkts zum Kunden. Der [[Direct channel]] hat keine Absatzmittler — volle Kontrolle und Daten, aber eigene Logistik. Der [[Indirect channel]] führt über [[Wholesaler]], [[Retailer]] oder [[Agent]] — mehr Reichweite, weniger Marge und Kontrolle. Jeder Absatzmittler ist ein [[Channel level]].</p>
<p><b>Warum es Absatzmittler gibt:</b> Sie verringern die Zahl der Kontakte. 5 Hersteller × 20 Läden = 100 Verbindungen. Über einen Großhändler sind es 5 + 20 = 25.</p>
<p><b>Abdeckung:</b> [[Intensive distribution]] (Güter des täglichen Bedarfs), [[Selective distribution]] (Elektronik, Möbel), [[Exclusive distribution]] (Luxus).</p>
<p>Organisation: Das [[Vertical marketing system]] vereint die Beteiligten. [[Franchising]] ist eine vertragliche Form eines solchen Systems. [[Channel conflict]] entsteht, wenn Partner unterschiedliche Interessen haben — etwa wenn der Hersteller online günstiger verkauft als seine Händler.</p>
<div class="ex"><b>Beispiel:</b> Tesla verkauft seine Autos überwiegend direkt — online und in eigenen Showrooms, statt über klassische Händler. So kontrolliert Tesla Preis und Erlebnis, trägt aber die Kosten für Vertrieb und Service.</div>`);
TH("m6", "Online, Omnichannel und Logistik", `
<p>[[E-commerce]] kann ein eigener Shop sein ([[D2C]]), ein [[Marketplace]] (schneller Zugang zu Traffic gegen Provision) oder [[Dropshipping]] (ohne Lager, aber mit niedriger Marge und wenig Kontrolle).</p>
<p>[[Multichannel distribution]] heißt viele getrennte Kanäle. [[Omnichannel]] ist ein verbundenes Erlebnis: gemeinsamer Bestand, Rückgabe im Laden, gemeinsame Treuepunkte. [[Click and collect]] ist eine typische Brücke zwischen online und Laden.</p>
<p>[[Logistics]] und [[Supply chain]] sind Marketing: Schnelle Lieferung ist Teil des Werts. Die [[Last mile]] ist der teuerste und sichtbarste Teil. Ein [[Stockout]] während einer Kampagne verbrennt Budget und schickt Kunden zur Konkurrenz.</p>
<div class="ex"><b>Beispiel aus Deutschland:</b> DHL betreibt seit Anfang der 2000er-Jahre Packstationen. Sie senken die Kosten der letzten Meile und sind bequem für Kunden, die tagsüber nicht zu Hause sind.</div>`);
TH("m6", "Push, Pull und der Laden", `
<p>Die [[Push strategy]] drückt das Produkt durch den Kanal — Rabatte und Boni für Händler, Verkäuferschulungen, [[Trade marketing]]. Die [[Pull strategy]] bringt Kunden dazu, nach dem Produkt zu fragen — Werbung an Endkunden, und der Handel listet es.</p>
<p>Die meisten Marken kombinieren beides. Eine neue, unbekannte Marke kommt ohne Push kaum aus; eine starke Marke mit Pull hat mehr Verhandlungsmacht.</p>
<p>Im Laden: [[Merchandising]] (Position, Schaufenster, Nähe zu Ergänzungsprodukten) und [[Planogram]] (der genaue Regalplan). Ein Produkt auf Augenhöhe verkauft sich besser als dasselbe im untersten Regal.</p>`);

// ───── m7
TH("m7", "Kommunikationsmix und IMC", `
<p>[[Promotion mix]] = [[Advertising]] + [[Public relations]] + [[Sales promotion]] + [[Personal selling]] + [[Direct marketing]] (und Digital). [[IMC]] heißt, dass alle dasselbe sagen.</p>
<ul><li>Werbung — bezahlt, mit klarem Absender, große Reichweite.</li><li>PR — verdientes Vertrauen, aber keine Kontrolle.</li><li>Verkaufsförderung — schnelle Wirkung, Risiko für die Marke.</li><li>Persönlicher Verkauf — am überzeugendsten, am teuersten pro Kontakt; zentral im B2B.</li></ul>
<p>[[Paid media]], [[Owned media]], [[Earned media]]: kaufen, besitzen, verdienen. Starke Kampagnen nutzen Paid, um Earned zu entzünden, und sammeln Menschen in eigenen Kanälen (E-Mail-Liste).</p>
<p>[[ATL]] ist Massenkommunikation, [[BTL]] zielgerichtet. Heute ist fast alles integriert.</p>
<div class="ex"><b>Beispiel:</b> Die Kampagne „Share a Coke“ (Start 2011 in Australien) druckte Vornamen auf die Flaschen. Die bezahlte Werbung löste eine riesige Menge an Fotos und Shares aus, also verdiente Medien. Das Produkt selbst wurde zum Medium.</div>`);
TH("m7", "Funnel und AIDA", `
<p>Der [[Marketing funnel]] zählt Menschen pro Stufe. Ziele und Kennzahlen ändern sich mit der Stufe:</p>
<ul><li>[[TOFU]] — Reichweite, Aufmerksamkeit: Video, nützliche Inhalte. Kennzahlen: [[Reach]], [[Impressions]], Views.</li><li>[[MOFU]] — Erwägung: Vergleiche, Fallstudien, [[Lead magnet]]. Kennzahlen: Klicks, Leads.</li><li>[[BOFU]] — Entscheidung: Angebot, Garantie, Retargeting, Demo. Kennzahlen: Conversions, CPA, ROAS.</li></ul>
<p>[[AIDA]] beschreibt die Psychologie einer Botschaft: Aufmerksamkeit → Interesse → Verlangen → Handlung. Ohne klaren [[Call to action]] wird Aufmerksamkeit nicht zur Handlung.</p>
<p>[[Brand marketing]] und [[Performance marketing]] sind keine Feinde: Branding füllt den oberen Funnel, Performance „erntet“ unten. Nur Performance erschöpft das Publikum mit der Zeit.</p>`, { dia: "funnel" });
TH("m7", "Mediaplanung und Kreation", `
<p>Der [[Media plan]] beantwortet: wo, wann, wie viel. Schlüsselbegriffe:</p>
<ul><li>[[Reach]] — eindeutige Personen; [[Frequency]] — durchschnittlich wie oft; [[Impressions]] = Reichweite × Frequenz.</li><li>[[GRP]] = Reichweite % × Frequenz (300 GRP = 60 % × 5).</li><li>[[Share of voice]] — dein Anteil am Werbedruck der Kategorie.</li></ul>
<p><b>Warum die Frequenz eine Grenze hat:</b> Unter 2–3 Kontakten erinnert man sich nicht, ab einem gewissen Niveau nervt es und die CTR sinkt (Werbemüdigkeit). Die genaue Grenze hängt von Format und Zielgruppe ab.</p>
<p><b>Kreation:</b> [[Creative brief]] (die Aufgabe) → [[Big idea]] (das Konzept) → [[Key message]] (ein Gedanke) → [[Slogan]] (einprägsamer Satz). [[Storytelling]] macht die Botschaft merkfähig.</p>
<div class="ex"><b>Beispiel:</b> Dove startete 2004 die „Campaign for Real Beauty“ mit echten Frauen statt Models. Die Big Idea — Schönheit ist kein einziger Standard — lebt seit über 20 Jahren in verschiedenen Formaten.</div>
<p>Weitere Instrumente: [[Sponsorship]] (z. B. Red Bull Stratos — der Sprung von Felix Baumgartner aus der Stratosphäre 2012), [[Product placement]], [[Influencer marketing]], [[Word of mouth]], [[Guerrilla marketing]].</p>`);

// ───── m8
TH("m8", "Suchmaschinen: SEO und SEA", `
<p>Die Suchmaschine ist ein einzigartiger Kanal: Der Mensch sagt selbst, was er will. Die [[Search intent]] kann informational („wie…“), navigational, vergleichend („bester…“) oder transaktional („kaufen“, „Preis“) sein.</p>
<p>[[SEO]] bringt [[Organic traffic]]: [[On-page SEO]] (Titel, Inhalt, Ladezeit, Mobilversion) + Autorität ([[Backlink]]). Langsam, aber dauerhaft.</p>
<p>[[SEM]]/[[PPC]]: Du zahlst pro Klick. Die Position entscheidet die [[Ad auction]] — Gebot + Qualität. Der [[Quality Score]] (1–10) belohnt die relevante Kombination [[Keyword]] → Anzeige → [[Landing page]] mit niedrigerem CPC.</p>
<div class="ex"><b>Beispiel (fiktiv):</b> Ein Waschmaschinen-Reparaturdienst bietet auf „Waschmaschine Reparatur Köln“ (hohe Absicht) statt auf „Waschmaschinen“ (unscharf). Die Anzeige führt auf eine Seite genau zur Reparatur mit Telefonnummer und Anfahrtspreis. CTR und Quality Score steigen, der CPC sinkt.</div>
<p>Die [[SERP]] enthält heute Anzeigen, Karten, Fragen und KI-Antworten — Platz 1 der organischen Ergebnisse steht nicht mehr unbedingt ganz oben auf dem Bildschirm.</p>`);
TH("m8", "Social Media, Content und Influencer", `
<p>[[Social media marketing]] = organische Inhalte + Community + bezahlte Anzeigen. Die [[Organic reach]] von Marken ist in den meisten Netzwerken gering, deshalb müssen Inhalte [[Engagement]] erzeugen — dann zeigt der Algorithmus sie mehr Menschen.</p>
<p>[[Content marketing]] hilft, bevor es verkauft: Leitfäden, Videos, Podcasts. Der [[Lead magnet]] macht aus nützlichem Content einen Kontakt.</p>
<p>[[UGC]] ist der authentischste Beleg. [[Influencer marketing]] funktioniert am besten mit engagierten Nischenprofilen, die zur Marke passen. Bezahlte Inhalte müssen gekennzeichnet sein ([[Influencer disclosure]]).</p>
<div class="ex"><b>Beispiel:</b> Old Spice setzte „The Man Your Man Could Smell Like“ (2010) nach dem TV-Spot mit Dutzenden persönlicher Videoantworten auf Social-Media-Kommentare innerhalb weniger Tage fort. Ein klassisches Beispiel einer integrierten, reaktiven Kampagne.</div>
<p>Werbeinstrumente: [[Lookalike audience]] (neue Menschen, die den Kunden ähneln), [[Retargeting]] (Bekannte, die nicht gekauft haben), [[Display advertising]], [[Programmatic]].</p>`);
TH("m8", "E-Mail, Conversion und Messung", `
<p>[[Email marketing]] ist ein eigener Kanal: Kein Algorithmus entscheidet, ob der Abonnent die Mail sieht. Kennzahlen: [[Open rate]] (ungenau wegen Datenschutzfunktionen), Klicks, Conversions, Abmeldungen.</p>
<p>[[Marketing automation]] sendet die richtige Mail zur richtigen Zeit: Begrüßung, verlassener Warenkorb, „wir vermissen dich“.</p>
<p>[[CRO]] verbessert die Conversion-Rate aus demselben Traffic. Das Werkzeug ist der [[A/B testing]]: eine Änderung auf einmal, genügend große Stichprobe, vorher festgelegte Kennzahl.</p>
<p>Messung: [[UTM]] zeigt, woher der Klick kam. Das [[Tracking pixel]] sendet Ereignisse an die Werbeplattform. [[Cookies]] merken sich den Browser. In der EU (in Deutschland §25 TDDDG) brauchen Werbe-Cookies vorherige Einwilligung, daher fehlt immer ein Teil der Daten — modellieren statt blind vertrauen.</p>
<p>[[Affiliate marketing]] bezahlt nur für Ergebnisse — Verkauf oder Lead.</p>`);

// ───── m9
TH("m9", "Die Kennzahlen der Werbung", `
<p>Die Kette: Impressionen → Klicks → Conversions → Umsatz.</p>
<ul>
<li>[[CTR]] = Klicks / Impressionen × 100 → Attraktivität der Anzeige.</li>
<li>[[CPC]] = Kosten / Klicks; [[CPM]] = Kosten / Impressionen × 1000.</li>
<li>[[Conversion rate]] = Conversions / Klicks × 100 → Qualität von Traffic und Seite.</li>
<li>[[CPA]] = Kosten / Conversions; [[CPL]] = Kosten / Leads.</li>
<li>[[ROAS]] = Umsatz / Werbekosten; [[ROI]] = (Gewinn − Kosten) / Kosten.</li>
</ul>
<p><b>Der Zusammenhang, den du dir merken musst:</b> CPA = CPC / CVR. Ein Klick für 0,50 € bei 2 % Conversion = 25 € pro Bestellung. Ein billiger Klick heißt also nicht billiger Verkauf.</p>
<div class="ex"><b>ROAS vs. ROI:</b> 1000 € Werbung bringen 3000 € Umsatz → ROAS 3. Bei 30 % Marge sind das 900 € Gewinn → ROI = (900 − 1000) / 1000 = −10 %. Die Kampagne verliert trotz „gutem“ ROAS. Mindest-ROAS für Gewinn = 1 / Marge = 1 / 0,30 ≈ 3,33.</div>
<p>[[Vanity metrics]] (Likes, Follower) sehen im Bericht gut aus, beantworten aber nicht die Frage „verdienen wir Geld?“.</p>`);
TH("m9", "Kundenökonomie: CAC, LTV, Churn", `
<p>[[CAC]] = alle Vertriebs- und Marketingkosten / Neukunden. [[LTV]] = wie viel Gewinn ein Kunde über die ganze Zeit bringt.</p>
<p>[[LTV:CAC]] — ein oft zitierter Richtwert für Abo-Geschäfte liegt bei etwa 3:1. Unter 1:1 bringt jeder Neukunde Verlust. Deutlich über 3:1 kann heißen, dass du zu wenig in Wachstum investierst.</p>
<p>[[Payback period]] = CAC / monatlicher Gewinn pro Kunde — wie schnell das Geld zurückkommt (wichtig für den Cashflow).</p>
<p>[[Churn rate]] und [[Retention rate]]: Bei Abos bestimmt die Abwanderung den LTV. Vereinfacht: durchschnittliche Dauer ≈ 1 / monatlicher Churn. Bei 5 % monatlicher Abwanderung bleibt ein Kunde im Schnitt 20 Monate.</p>
<div class="ex"><b>Beispiel (fiktives Fitnessstudio):</b> Mitgliedschaft 60 €/Monat, Marge 50 % → 30 €/Monat Gewinn. Churn 10 %/Monat → im Schnitt 10 Monate → LTV ≈ 300 €. Bei CAC 90 € ist LTV:CAC ≈ 3,3:1, die Amortisation dauert 3 Monate.</div>
<p>[[AOV]], [[Cohort analysis]] und [[North star metric]] vervollständigen das Bild.</p>`);
TH("m9", "Attribution und der echte Effekt", `
<p>[[Attribution]] verteilt den Verdienst auf die Kontaktpunkte. [[Last-click attribution]] gibt alles dem letzten Klick — meist Markensuche oder Retargeting — und unterschätzt Video und Social Media, die das Interesse geweckt haben. [[Multi-touch attribution]] verteilt den Verdienst, beweist aber trotzdem keine Kausalität.</p>
<p>[[Incrementality]] fragt: Was wäre ohne die Kampagne passiert? Die Antwort liefert eine Kontrollgruppe oder ein Geo-Experiment.</p>
<div class="ex"><b>Klassische Falle:</b> Retargeting zeigt einen ROAS von 15, weil es Menschen Anzeigen zeigt, die ohnehin gekauft hätten. Ein Test mit Kontrollgruppe kann zeigen, dass der echte Zusatzeffekt viel kleiner ist.</div>
<p>[[Market share]] vs. [[Market growth rate]]: Der Anteil ist, wie groß dein Stück ist, das Wachstum, wie schnell der ganze Markt wächst. Wächst du um 5 %, der Markt aber um 15 %, verlierst du Anteil.</p>
<p>Ein guter [[KPI]] ist mit dem Geschäftsziel verbunden, nicht mit der Zahl, die am besten aussieht.</p>`);

// ───── m10
TH("m10", "Aufbau des Marketingplans", `
<p>Der [[Marketing plan]] beantwortet 4 Fragen: Wo stehen wir, wohin wollen wir, wie kommen wir dahin, und woran merken wir, dass wir angekommen sind?</p>
<ol><li><b>[[Situation analysis]]</b> — Markt, Kunden, Wettbewerber, PESTEL, [[SWOT]].</li><li><b>Ziele</b> — [[Marketing objective]], formuliert als [[SMART goals]].</li><li><b>Strategie</b> — [[Marketing strategy]]: STP, Position, Wertversprechen.</li><li><b>[[Tactics]]</b> — 4P/7P, Kanäle, Kalender.</li><li><b>Budget</b> — [[Marketing budget]].</li><li><b>Kontrolle</b> — [[KPI]], Berichte, Korrekturen.</li></ol>
<p>[[SWOT]]: [[Strength]] und [[Weakness]] sind intern, [[Opportunity]] und [[Threat]] extern. [[TOWS]] kombiniert sie zu Strategien (SO, WO, ST, WT).</p>
<p>Das [[Mission statement]] sagt, warum es dich gibt. Die [[Go-to-market strategy]] ist der Plan für den Start eines neuen Produkts.</p>`, { dia: "swot" });
TH("m10", "Wachstumsstrategien und Portfolio", `
<p>[[Ansoff matrix]] (Ansoff, 1957) — wohin wachsen:</p>
<ul><li>[[Market penetration]] — mehr vom Gleichen bei den Gleichen (geringstes Risiko);</li><li>[[Market development]] — dasselbe auf neuen Märkten;</li><li>[[Product development]] — neue Produkte für dieselben Kunden;</li><li>[[Diversification]] — Neues auf neuen Märkten (höchstes Risiko).</li></ul>
<p>[[BCG matrix]] (Boston Consulting Group, ~1970) — wie Geld auf Produkte verteilt wird: [[Star]], [[Cash cow]], [[Question mark]], [[Dog]]. Die Logik: Cash Cows finanzieren Stars und ausgewählte Question Marks.</p>
<p>Porters generische Strategien: [[Cost leadership]], Differenzierung, [[Focus strategy]]. [[Porter's five forces]] bewertet, wie attraktiv die Branche ist.</p>
<div class="ex"><b>Beispiel Marktentwicklung:</b> McDonald's ging in Indien mit lokalen Produkten an den Start (z. B. McAloo Tikki). So kombinierte das Unternehmen Marktentwicklung mit Anpassung des Produkts an die Kultur.</div>`, { dia: "ansoff" });
TH("m10", "Wie das Budget festgelegt wird", `
<p>Vier Methoden für das [[Marketing budget]]:</p>
<ul><li>[[Affordable method]] — „was übrig bleibt“ (am schwächsten);</li><li>[[Percentage-of-sales method]] — % vom Umsatz (einfach, vertauscht aber Ursache und Wirkung);</li><li>[[Competitive parity method]] — so viel wie die Konkurrenz;</li><li>[[Objective-and-task method]] — vom Ziel über die Aufgaben zu den Kosten (am logischsten).</li></ul>
<div class="ex"><b>Beispiel Ziel-Aufgaben-Methode:</b> Ziel — 200 Neukunden im Quartal. Historischer CPA 30 € → 6000 € Werbung. Plus 1500 € Content und 500 € Tools → 8000 €. Kann sich das Unternehmen das nicht leisten, ändert man das Ziel oder verbessert den CPA. Man kürzt das Budget nicht blind.</div>
<p>Die Verteilung auf Kanäle folgt dem Funnel: ein Teil für Branding (künftige Nachfrage), ein Teil für Performance (heutige Verkäufe), ein kleiner Teil für Tests (5–10 %).</p>`);

// ───── m11
TH("m11", "Der Forschungsprozess", `
<p>[[Marketing research]]: 1) Problem und zu treffende Entscheidung definieren ([[Research brief]]); 2) Plan; 3) Erhebung; 4) Analyse; 5) Bericht mit Empfehlungen.</p>
<p>Beginne mit [[Secondary data]] und [[Desk research]] (günstig und schnell). Erhebe [[Primary data]] nur für das, was fehlt.</p>
<p>[[Qualitative research]] (warum?) — [[In-depth interview]], [[Focus group]], [[Ethnography]] → Hypothesen. [[Quantitative research]] (wie viel?) — [[Survey]], [[Experiment]] → Prüfung und Zahlen.</p>
<p>[[Observation]] erfasst den Unterschied zwischen Gesagtem und Getanem. [[Mystery shopping]] prüft den Service. [[Social listening]] hört Online-Gespräche ab.</p>
<div class="ex"><b>Lehre aus der Geschichte:</b> Vor „New Coke“ (1985) führte Coca-Cola Hunderttausende Blindverkostungen durch, und der neue Geschmack gewann. Niemand fragte aber, wie sich die Menschen fühlen würden, wenn die alte Rezeptur verschwindet. Die emotionale Bindung an die Marke löste Proteste aus, und nach 79 Tagen kam das alte Rezept als „Coca-Cola Classic“ zurück.</div>`);
TH("m11", "Stichprobe und Fehler", `
<p>Die [[Sample]] repräsentiert die Grundgesamtheit. [[Probability sampling]] (jeder hat eine bekannte Chance) erlaubt die Berechnung der [[Margin of error]]. Die [[Convenience sample]] ist schnell, die Schlüsse gelten aber nicht für den ganzen Markt.</p>
<p><b>Richtwert für die Fehlerspanne</b> (95 % Konfidenz, bei 50/50-Verteilung): n = 100 → ±~10 Punkte; n = 400 → ±~5; n = 1000 → ±~3. Der Fehler sinkt mit der Quadratwurzel der Stichprobe: Für halb so großen Fehler braucht man die vierfache Stichprobe.</p>
<p>[[Sampling bias]] lässt sich nicht mit größerer Stichprobe heilen — 10 000 Antworten von den falschen Leuten führen weiter zum falschen Schluss.</p>
<p>[[Correlation vs causation]]: gemeinsam ≠ deswegen. Kausalität belegt man mit einem [[Experiment]].</p>`);
TH("m11", "Der Fragebogen und Kundenkennzahlen", `
<p>[[Questionnaire]]: kurz, logische Reihenfolge (allgemein → konkret → Demografie), vorab getestet.</p>
<ul><li>[[Closed question]] — leicht auszuwerten; [[Open-ended question]] — deckt Unerwartetes auf.</li><li>[[Likert scale]] — ausgewogene Zustimmungsskala.</li><li>Vermeide [[Leading question]] und Doppelfragen („War die Bedienung schnell und freundlich?“ — und wenn sie schnell, aber unhöflich war?).</li></ul>
<p>[[NPS]] = % Promotoren (9–10) − % Kritiker (0–6). Beispiel: 55 % Promotoren, 25 % Passive, 20 % Kritiker → NPS = +35. [[CSAT]] misst die Zufriedenheit mit einer konkreten Interaktion.</p>`);

// ───── m12
TH("m12", "Personenbezogene Daten und DSGVO", `
<p>Die [[GDPR]] (DSGVO, Verordnung 2016/679, seit 25.05.2018) gilt für alle, die [[Personal data]] von Menschen in der EU verarbeiten. Bußgelder bis 20 Mio. € oder 4 % des weltweiten Umsatzes. 2023 verhängte die irische Datenschutzbehörde gegen Meta 1,2 Mrd. € Bußgeld wegen Datenübermittlung in die USA.</p>
<p>Grundsätze, die das Marketing täglich betreffen:</p>
<ul><li>Rechtsgrundlage — [[Consent]] (aktiv, informiert, widerrufbar) oder [[Legitimate interest]] (mit Interessenabwägung);</li><li>[[Data minimization]] — nur das Nötige;</li><li>Betroffenenrechte — Auskunft, Berichtigung, [[Right to erasure]], Widerspruch;</li><li>Sicherheit — bei einer [[Data breach]] wird die Aufsichtsbehörde binnen 72 Stunden informiert.</li></ul>
<p>E-Mail-Marketing erfordert eine Einwilligung (oder die enge Ausnahme für Bestandskunden und ähnliche Produkte nach §7 Abs. 3 UWG), [[Double opt-in]] als in Deutschland faktischen Standard und ein [[Opt-out]] in jeder Mail. Gekaufte Listen sind [[Spam]]. Werbe-[[Cookies]] erfordern vorherige Einwilligung.</p>`);
TH("m12", "Werbung, Verbraucher und Wettbewerb", `
<p>[[Misleading advertising]] und [[Unfair commercial practices]] sind verboten (Richtlinie 2005/29/EG, in Deutschland das [[UWG]]). Ein Teil der Praktiken steht auf der „schwarzen Liste“ — immer verboten: [[Bait and switch]], falsches „nur heute“, direkte Kaufaufforderung an Kinder ([[Marketing to children]]).</p>
<p>[[Comparative advertising]] ist erlaubt (§6 UWG), wenn sie objektiv und nachprüfbar ist und nicht herabsetzt. [[Hidden advertising]] ist verboten — bezahlte Inhalte werden gekennzeichnet ([[Influencer disclosure]]).</p>
<p>[[Greenwashing]]: Die EU verschärft die Regeln für allgemeine Umweltaussagen („öko“, „grün“) ohne Belege. [[Dark patterns]] — manipulatives Design — stehen ebenfalls unter verschärfter Kontrolle.</p>
<p>Akteure in Deutschland: [[Verbraucherzentrale]] (Verbraucher, Abmahnungen, Klagen), Wettbewerber und die Wettbewerbszentrale (Abmahnungen nach UWG), [[Bundeskartellamt]] (Kartelle, Marktmacht), Datenschutzbehörden der Länder, [[Self-regulation]] (Deutscher Werberat). Geistiges Eigentum: [[Trademark]] und [[Copyright]]. Rund um [[Unfair competition]] gilt: Deutschland setzt stark auf private Durchsetzung per Abmahnung.</p>
<div class="ex"><b>Beispiel für Folgen:</b> Der „Dieselgate“-Skandal (2015) um Volkswagen — Software, die die Emissionstests manipulierte — führte zu Milliarden an Strafen und Entschädigungen. Die Werbung für „Clean Diesel“ wurde zum Beispiel für irreführende Aussagen.</div>`);
TH("m12", "Verantwortungsvolles Marketing", `
<p>[[CSR]], [[Cause marketing]] und [[Sustainability marketing]] funktionieren, wenn sie mit dem Geschäft verbunden und durch Taten gedeckt sind. Sonst erkennt das Publikum sie als „Imagewäsche“.</p>
<div class="ex"><b>Beispiel:</b> Patagonia schaltete 2011 am Black Friday die Anzeige „Don't Buy This Jacket“ („Kauf diese Jacke nicht“). Sie rief dazu auf, weniger zu kaufen und zu reparieren. Die Botschaft war konsistent mit den Reparatur- und Second-Hand-Programmen der Marke.</div>
<p>[[PAngV]]: Bei Preisermäßigungen wird der niedrigste Preis der letzten 30 Tage angegeben.</p>
<p><b>Ethik-Check vor einer Kampagne:</b> 1) Ist es wahr und belegbar? 2) Wäre es unangenehm, wenn der Kunde die ganze Wahrheit sähe? 3) Nutzt es eine Verletzlichkeit aus (Kinder, Sucht, finanzielle Not)? 4) Wärst du stolz, wenn es auf der Titelseite stünde?</p>`);
