// Handgeschriebene Aufgaben. Jede hat eine Erklärung „warum“.
// TF(Modul, Aussage, wahr?, warum)
// ERR(Modul, fehlerhafte Aussage, richtige Korrektur, [falsche Korrekturen], warum)
// SEQ(Modul, Titel, [Schritte in richtiger Reihenfolge], warum)
// CAT(Modul, Frage, [Kategorien], [[Element, Kategorie-Index, warum]...])
// DEC(Modul, Briefing, Frage, [[Option, richtig?, Feedback]...])
// OPEN(Modul, Frage, Musterantwort, [Schlüsselwörter — jedes kann „a|b“ für Synonyme sein])
const TFS = [], ERRS = [], SEQS = [], CATS = [], DECS = [], OPENS = [];
const TF = (m, s, v, why) => TFS.push({ m, s, v, why });
const ERR = (m, s, fix, bad, why) => ERRS.push({ m, s, fix, bad, why });
const SEQ = (m, title, steps, why) => SEQS.push({ m, title, steps, why });
const CAT = (m, q, cats, items) => CATS.push({ m, q, cats, items });
const DEC = (m, brief, q, opts) => DECS.push({ m, brief, q, opts });
const OPEN = (m, q, model, kw) => OPENS.push({ m, q, model, kw });

// ═════ m1
TF("m1", "Marketing erschafft die Bedürfnisse der Menschen.", false, "Bedürfnisse (Hunger, Sicherheit, Zugehörigkeit) existieren vor dem Marketing. Marketing beeinflusst die Wünsche — die konkrete Form, in der Menschen ein Bedürfnis befriedigen — und macht aus Wünschen Nachfrage.");
TF("m1", "Nachfrage ist ein Wunsch, der durch Kaufkraft gedeckt ist.", true, "Genau: Viele wollen ein teures Auto (Wunsch), Nachfrage haben aber nur die, die zahlen können und wollen.");
TF("m1", "Promotion in den 4P bedeutet nur Rabatte und Coupons.", false, "Promotion ist die gesamte Kommunikation: Werbung, PR, persönlicher Verkauf, digital. Rabatte (Sales Promotion) sind nur eines der Instrumente.");
TF("m1", "Der leere Flugzeugsitz von heute lässt sich morgen nicht verkaufen — das ist die Vergänglichkeit der Dienstleistung.", true, "Dienstleistungen lassen sich nicht lagern: Unverkaufte Kapazität ist verloren. Deshalb nutzen Airlines dynamische Preise.");
TF("m1", "Die 7P ergänzen die 4P um People, Process und Physical evidence.", true, "Booms & Bitner erweitern den Mix für Dienstleistungen, weil Menschen, Prozess und Umfeld Teil der Leistung selbst sind.");
TF("m1", "Das Verkaufskonzept geht von den Bedürfnissen der Kunden aus.", false, "Das Verkaufskonzept geht vom Produkt aus („verkaufen, was man gemacht hat“). Vom Kunden geht das Marketingkonzept aus.");
TF("m1", "Zufriedenheit hängt vom Verhältnis zwischen Erwartung und tatsächlichem Erlebnis ab.", true, "Liegt das Erlebnis unter den Erwartungen — Unzufriedenheit, darüber — Begeisterung. Versprechen müssen daher realistisch sein.");
ERR("m1", "„Marketing ist die Abteilung, die die Werbung macht.“", "Marketing beginnt mit dem Verständnis des Kunden und umfasst Produkt, Preis, Kanal und Kommunikation. Werbung ist nur ein Teil der Kommunikation.",
  ["Marketing ist die Abteilung, die den Verkauf macht.", "Marketing ist nur Marktforschung.", "Kein Fehler — Marketing ist Werbung."],
  "Kotler: Marketing schafft Kundenwert und baut Beziehungen auf. Werbung ist ein Instrument im vierten P.");
ERR("m1", "„Ein guter Service ist immer gleich, egal welcher Mitarbeiter ihn erbringt.“", "Dienstleistungen schwanken: Die Qualität hängt davon ab, wer, wann und wie sie erbringt. Deshalb führt man Standards und Schulungen ein.",
  ["Dienstleistungen sind immateriell, deshalb können sie nicht gleich sein.", "Dienstleistungen sind vergänglich, deshalb können sie nicht gleich sein.", "Kein Fehler."],
  "Das ist die Besonderheit Variability (Heterogenität). Immaterialität ist etwas anderes — dass man die Leistung vor dem Kauf nicht anfassen kann.");
ERR("m1", "„Die 4C sind eine neuere Version der 4P und ersetzen sie vollständig.“", "Die 4C ersetzen die 4P nicht — sie sind die Kundensicht auf dieselben Entscheidungen (Lösung, Kosten, Bequemlichkeit, Kommunikation).",
  ["Die 4C sind ein Rahmen nur für Dienstleistungen.", "Die 4C sind ein Rahmen für digitales Marketing.", "Kein Fehler."],
  "Lauterborn (1990) schlug die 4C als Spiegel der 4P aus Kundensicht vor. Beide werden zusammen genutzt.");
SEQ("m1", "Ordne: vom Bedürfnis zur Nachfrage", ["Bedürfnis (ich habe Hunger)", "Wunsch (ich will eine Brezel)", "Nachfrage (ich will und kann zahlen)", "Austausch (ich kaufe)"],
  "Das Bedürfnis ist grundlegend; die Kultur formt es zum Wunsch; Geld und Bereitschaft machen daraus Nachfrage; der Austausch ist das Geschäft selbst.");
SEQ("m1", "Ordne die Konzepte in der historischen Reihenfolge ihres Aufkommens", ["Produktionskonzept", "Produktkonzept", "Verkaufskonzept", "Marketingkonzept", "gesellschaftsorientiertes Marketingkonzept"],
  "Die Entwicklung: von effizienter Produktion über Qualität und aggressiven Verkauf hin zum Kundenfokus und schließlich auch zur Gesellschaft.");
CAT("m1", "Zu welchem P des Marketing-Mix gehört diese Entscheidung?", ["Product", "Price", "Place", "Promotion"], [
  ["Garantie von 2 auf 5 Jahre verlängern", 0, "Die Garantie ist Teil des Produkts (erweitertes Produkt)."],
  ["Ratenzahlung ohne Zinsen", 1, "Zahlungsbedingungen sind eine Preisentscheidung."],
  ["Das Produkt in eine Apothekenkette bringen", 2, "Die Wahl der Händler ist eine Kanalentscheidung (Place)."],
  ["Videoanzeige auf YouTube", 3, "Werbung ist Kommunikation (Promotion)."],
  ["Neues Verpackungsdesign", 0, "Die Verpackung ist Teil des Produkts."],
  ["15 % Rabatt auf das Jahresabo", 1, "Rabatt ist eine Preisentscheidung."],
  ["Eigener Onlineshop mit Lieferung in 24 Stunden", 2, "Kanal und Lieferung sind Place."],
  ["Zeitungsartikel über den Gründer", 3, "PR ist Teil der Kommunikation."],
  ["Vegane Variante auf der Karte ergänzen", 0, "Eine neue Variante erweitert das Produkt."],
  ["Preis 19,99 statt 20 €", 1, "Psychologische Preisgestaltung ist eine Preisentscheidung."],
  ["Kühlregale mit dem Produkt in Tankstellen", 2, "Die Verfügbarkeit in Verkaufsstellen ist Distribution."],
  ["Proben, die an der Uni verteilt werden", 3, "Proben sind Verkaufsförderung — Teil der Kommunikation."],
]);
CAT("m1", "Welche Besonderheit von Dienstleistungen beschreibt die Situation?", ["Immaterialität", "Untrennbarkeit", "Heterogenität", "Vergänglichkeit"], [
  ["Man kann den Englischkurs vor dem Kauf nicht ausprobieren", 0, "Immaterialität: Die Leistung kann vorher nicht gesehen oder getestet werden."],
  ["Die Friseurin wechselt den Salon und die Kunden gehen mit", 1, "Untrennbarkeit: Der Anbieter ist Teil der Leistung."],
  ["Im selben Café schmeckt der Kaffee je nach Barista anders", 2, "Heterogenität: Die Qualität hängt vom Ausführenden ab."],
  ["Die leeren Tische im Restaurant am Montag sind verlorener Umsatz", 3, "Vergänglichkeit: Kapazität lässt sich nicht lagern."],
  ["Ein Patient schaut auf die Diplome an der Wand, um den Arzt einzuschätzen", 0, "Er sucht materielle Signale für die immaterielle Leistung."],
  ["Das Konzert findet genau dann statt, wenn das Publikum zuhört", 1, "Produktion und Konsum sind gleichzeitig."],
  ["Eine Hotelkette führt eine 25-Punkte-Checkliste für die Reinigung ein", 2, "Standards sind die Antwort auf die Heterogenität."],
  ["Ein Kino mit günstigen Tickets am Montagnachmittag", 3, "Der Preis füllt Kapazität, die sonst verloren ginge."],
]);
DEC("m1", "Ein Fitnessstudio im Viertel verliert Kunden. Die Umfrage zeigt: Die Geräte sind gut, aber die Trainer sind unfreundlich und die Terminbuchung per Telefon ist eine Qual.", "Welche P der 7P müssen zuerst verbessert werden?", [
  ["People und Process", true, "Das Problem liegt bei den Menschen (unfreundliche Trainer) und dem Prozess (Buchung). Die Geräte — das Produkt — sind in Ordnung. In neue Geräte oder Werbung zu investieren, löst die Ursache nicht."],
  ["Product und Price", false, "Die Geräte werden gut bewertet und über den Preis beschwert sich niemand. Du gibst Geld aus, wo kein Problem ist."],
  ["Promotion", false, "Mehr Werbung bringt neue Kunden zum selben schlechten Erlebnis — sie gehen ebenfalls. Erst wird die Leistung repariert."],
  ["Physical evidence", false, "Das Umfeld wurde nicht als Problem genannt. Die Umfrage zeigt auf Menschen und Prozess."],
]);
DEC("m1", "Ein Möbelhersteller hat ein Lager voller unverkaufter Sofas im alten Stil. Der neue Manager schlägt eine aggressive Kampagne mit Callcenter und „letzten Stücken“ vor.", "Was ist das Hauptrisiko dieses Ansatzes?", [
  ["Es ist das Verkaufskonzept: drückt ein Produkt, das der Markt nicht will, und riskiert unzufriedene Kunden und schlechten Ruf", true, "Das Verkaufskonzept beginnt beim Lager, nicht beim Kunden. Besser verstehen, warum sich die Sofas nicht verkaufen — Stil, Preis, Kanal — und für die nächste Kollektion lernen."],
  ["Kein Risiko — aggressiver Verkauf funktioniert immer", false, "Aggressiver Druck bringt kurzfristig Umsatz, aber auch Retouren, schlechte Bewertungen und enttäuschte Kunden."],
  ["Das Risiko ist, dass Werbung zu teuer ist", false, "Die Kampagnenkosten sind nebensächlich; das Hauptproblem ist die Logik „verkaufen, was man hat“ statt „liefern, was gewünscht wird“."],
  ["Das Risiko ist ein DSGVO-Verstoß", false, "Der Anruf kann rechtliche Aspekte haben, das strategische Hauptproblem ist aber das Verkaufskonzept."],
]);
OPEN("m1", "Erkläre den Unterschied zwischen Bedürfnis, Wunsch und Nachfrage mit einem Beispiel.", "Das Bedürfnis ist ein empfundener Mangel (Hunger). Der Wunsch ist die Form, die das Bedürfnis durch Kultur und Persönlichkeit annimmt (ich will eine Brezel). Die Nachfrage ist ein Wunsch, gedeckt durch Kaufkraft (ich kann und will 2 € für eine Brezel zahlen).", ["bedürfnis", "wunsch", "nachfrage", "kaufkraft|geld|zahl", "kultur|persönlichkeit"]);
OPEN("m1", "Warum nutzt man bei Dienstleistungen die 7P statt der 4P? Nenne ein Beispiel.", "Dienstleistungen sind immateriell, untrennbar, heterogen und vergänglich — der Kunde ist am Prozess beteiligt und bewertet Menschen und Umfeld. Deshalb ergänzt man die 4P um People (Mitarbeitende), Process (wie die Leistung erbracht wird) und Physical evidence (Umgebung, Website, Uniformen). Beispiel: Im Hotel sind freundliche Rezeption, schneller Check-in und saubere Lobby Teil des Produkts.", ["people|menschen|personal|mitarbeit", "process|prozess", "physical|physisch|umfeld|umgebung", "immateriell|untrennbar|heterogen|vergänglich"]);
OPEN("m1", "Was ist der Unterschied zwischen Marketingkonzept und Verkaufskonzept?", "Das Verkaufskonzept geht vom Produkt und der Fabrik nach außen — „verkaufe, was du gemacht hast“ durch aggressiven Verkauf und Promotion; Fokus auf kurzfristige Abschlüsse. Das Marketingkonzept geht vom Kunden nach innen — erkenne die Bedürfnisse des Zielmarkts und befriedige sie besser als die Konkurrenz; Fokus auf langfristige Beziehungen und Zufriedenheit.", ["produkt|hergestellt", "kunde|bedürfnis", "konkurren|wettbewerb", "langfristig|beziehung|zufrieden"]);

// ═════ m2
TF("m2", "PESTEL analysiert die internen Stärken und Schwächen des Unternehmens.", false, "PESTEL betrifft nur die externe Makroumwelt. Interne Stärken und Schwächen stehen in der SWOT (S und W).");
TF("m2", "Lieferanten gehören zur Mikroumwelt des Unternehmens.", true, "Die Mikroumwelt ist der enge Kreis: Lieferanten, Absatzmittler, Kunden, Wettbewerber, Öffentlichkeiten.");
TF("m2", "Kognitive Dissonanz tritt vor dem Kauf auf.", false, "Sie tritt nach einem größeren Kauf auf — der Zweifel, ob die Wahl richtig war. Deshalb senden Marken nach dem Kauf bestätigende Botschaften.");
TF("m2", "Bei Käufen mit geringem Involvement durchlaufen Kunden meist ausführlich alle Entscheidungsphasen.", false, "Bei geringem Involvement (Salz, Streichhölzer) werden die Phasen fast übersprungen — Gewohnheit und Verfügbarkeit im Regal entscheiden.");
TF("m2", "Eine Buyer Persona sollte auf Daten und Interviews beruhen, nicht nur auf Vorstellungskraft.", true, "Eine ohne Daten erfundene Persona spiegelt die Annahmen des Teams, nicht die echten Kunden.");
TF("m2", "Inflation ist ein Faktor der Mikroumwelt.", false, "Inflation ist ein ökonomischer Faktor der Makroumwelt — sie betrifft alle am Markt.");
ERR("m2", "„Ein neuer Wettbewerber hat gegenüber eröffnet — das ist eine Schwäche in unserer SWOT-Analyse.“", "Der neue Wettbewerber ist ein externer Faktor → Risiko (T), keine interne Schwäche (W).",
  ["Der neue Wettbewerber ist eine Chance (O).", "Der neue Wettbewerber ist eine Stärke (S), weil er uns motiviert.", "Kein Fehler."],
  "Schwächen und Stärken sind intern (unter deiner Kontrolle); Chancen und Risiken kommen von außen.");
ERR("m2", "„Die Kunden, die unsere Anzeige gesehen haben, sind schon über die Informationssuche hinaus.“", "Die gesehene Anzeige kann die Problemerkennung auslösen, aber der Kunde sucht und vergleicht womöglich noch.",
  ["Die Anzeige ist die Kaufphase.", "Die Anzeige ist das Nachkaufverhalten.", "Kein Fehler."],
  "Werbung wirkt meist in den Phasen Problemerkennung und Suche. Gesehen zu haben heißt nicht, dass die Person schon entscheidet.");
SEQ("m2", "Ordne die Phasen des Kaufentscheidungsprozesses", ["Problemerkennung", "Informationssuche", "Bewertung der Alternativen", "Kaufentscheidung", "Nachkaufverhalten"],
  "Das klassische Fünf-Phasen-Modell: vom Erkennen des Problems bis zur Erfahrung nach dem Kauf (Zufriedenheit, Empfehlung oder Rückgabe).");
SEQ("m2", "Ordne die Ebenen der Maslowschen Pyramide (von der grundlegendsten)", ["physiologische Bedürfnisse", "Sicherheit", "soziale Bedürfnisse (Zugehörigkeit)", "Wertschätzung und Anerkennung", "Selbstverwirklichung"],
  "Maslow (1943): Grundbedürfnisse werden meist vor höheren befriedigt. In der Realität verfolgen Menschen mehrere Ebenen zugleich.");
CAT("m2", "Zu welchem PESTEL-Faktor gehört das?", ["Politisch", "Ökonomisch", "Sozial", "Technologisch", "Ökologisch", "Rechtlich"], [
  ["Steigende Kreditzinsen", 1, "Zinsen und Inflation sind ökonomische Faktoren."],
  ["Alterung der Bevölkerung", 2, "Demografie ist ein sozialer Faktor."],
  ["Neues Gesetz zur Allergenkennzeichnung", 5, "Gesetzliche Anforderungen sind ein rechtlicher Faktor."],
  ["KI, die Werbetexte schreibt", 3, "Neue Technologie."],
  ["Häufigere Hitzewellen im Sommer", 4, "Das Klima ist ein ökologischer Faktor."],
  ["Staatliche Förderung für Solaranlagen", 0, "Staatliche Politik und Förderung sind ein politischer Faktor."],
  ["Wachsendes Interesse an gesunder Ernährung", 2, "Wandel von Werten und Lebensstil ist ein sozialer Faktor."],
  ["Die Arbeitslosigkeit in der Region sinkt", 1, "Arbeitslosigkeit und Einkommen sind ökonomische Faktoren."],
  ["Einwilligungspflicht für Werbe-Cookies", 5, "Regulierung — rechtlicher Faktor."],
  ["Massenhaftes Bezahlen per Handy", 3, "Technologischer Wandel."],
]);
CAT("m2", "Mikro- oder Makroumwelt?", ["Mikroumwelt", "Makroumwelt"], [
  ["Ein großer Lieferant erhöht die Preise um 15 %", 0, "Ein konkreter Lieferant — naher Akteur."],
  ["Kultureller Wandel hin zur Sharing Economy", 1, "Breiter gesellschaftlicher Trend."],
  ["Ein Lokalmedium schreibt einen negativen Artikel über die Firma", 0, "Medien sind eine „Öffentlichkeit“ der Mikroumwelt."],
  ["Der Wechselkurs ändert sich", 1, "Ökonomischer Faktor, der alle betrifft."],
  ["Ein neuer Wettbewerber im selben Viertel", 0, "Ein konkreter Wettbewerber — Mikroumwelt."],
  ["Neue EU-Verpackungsrichtlinie", 1, "Rechtlicher Faktor der Makroumwelt."],
]);
DEC("m2", "Ein Laden für teure Matratzen merkt, dass viele Kunden nach dem Kauf schreiben: „Hoffentlich habe ich mich nicht vertan, die andere war billiger…“. Die Retouren steigen.", "Welche Maßnahme adressiert das Problem am besten?", [
  ["E-Mail-Serie nach dem Kauf: warum die Wahl richtig ist, wie man sich an die neue Matratze gewöhnt, und 100 Nächte Probeschlafen", true, "Das ist klassische kognitive Dissonanz nach einem großen Kauf. Bestätigende Kommunikation und Garantie verringern Zweifel und Retouren."],
  ["Mehr Werbung für Neukunden", false, "Das Problem liegt nach dem Kauf; mehr Neukunden heißt mehr zweifelnde Kunden."],
  ["Den Preis senken", false, "Kann den Absatz erhöhen, beseitigt aber nicht die Zweifel bereits Kaufender; außerdem verlierst du Marge."],
  ["Die Rückgabemöglichkeit abschaffen", false, "Verstößt beim Onlinekauf gegen das Widerrufsrecht und verstärkt nur das Misstrauen."],
]);
DEC("m2", "B2B-Lagersoftware. Die Demo mit dem Lagerleiter läuft hervorragend, aber der Deal stockt ohne Erklärung.", "Was ist die wahrscheinlichste Ursache und der nächste Schritt?", [
  ["Wir haben nicht das ganze Buying Center erreicht — es braucht Antworten für den Finanzvorstand (Rendite) und die IT (Sicherheit, Integration)", true, "Im B2B entscheidet eine Gruppe. Der Nutzer (Lagerleiter) ist zufrieden, aber Finanzen und IT haben eigene Fragen und können den Deal blockieren."],
  ["Der Preis ist zu hoch — sofort 30 % Rabatt geben", false, "Rabatt ohne Kenntnis der Ursache verbrennt Marge und löst das Problem vielleicht nicht."],
  ["Der Lagerleiter lügt — anderen Kunden suchen", false, "Die Ursache liegt meist bei den anderen Entscheidungsbeteiligten, nicht in einer Lüge."],
  ["Social-Media-Werbung an den Lagerleiter schalten", false, "Er ist schon überzeugt; man muss die anderen im Buying Center erreichen."],
]);
OPEN("m2", "Was ist der Unterschied zwischen PESTEL und SWOT?", "PESTEL analysiert nur die externe Makroumwelt in 6 Gruppen (politisch, ökonomisch, sozial, technologisch, ökologisch, rechtlich). SWOT kombiniert interne Faktoren (Stärken und Schwächen — unter Kontrolle des Unternehmens) und externe (Chancen und Risiken). PESTEL ist oft Input für O und T in der SWOT.", ["extern", "intern", "stärke|schwäche", "chance|risik", "politisch|ökonomisch|sozial|technolog"]);
OPEN("m2", "Beschreibe die fünf Phasen des Kaufentscheidungsprozesses und wie der Marketer in jeder helfen kann.", "1) Problemerkennung — Werbung, die an das Problem erinnert. 2) Informationssuche — SEO, Bewertungen, Content. 3) Bewertung der Alternativen — Vergleiche, Belege, Garantien. 4) Kaufentscheidung — einfacher Kauf, Verfügbarkeit, Gratisversand. 5) Nachkaufverhalten — Bestätigung, Support, Bitte um Bewertung, Abbau kognitiver Dissonanz.", ["problem|bedarf", "suche|information", "bewert|vergleich|alternativ", "entscheid|kauf", "nach|bewertung|dissonanz"]);
OPEN("m2", "Was ist eine Buyer Persona und wie wird sie erstellt?", "Die Persona ist ein halb fiktives Bild eines typischen Kunden aus dem Segment mit Name, Demografie, Zielen, Problemen, Einwänden und bevorzugten Kanälen. Sie entsteht aus echten Daten: Kundeninterviews, Befragungen, Verkaufs- und Verhaltensdaten, Gespräche mit dem Vertrieb. Sie wird für Botschaften und Produktentscheidungen genutzt.", ["bild|typisch", "daten|interview|befrag", "ziel|problem|einwand", "kanal"]);

// ═════ m3
TF("m3", "Positionierung ist der Platz des Produkts im Kopf der Kunden im Vergleich zur Konkurrenz.", true, "Die Position ist im Kopf des Kunden; Werbung und Branding sind die Mittel, sie aufzubauen.");
TF("m3", "Je größer ein Segment, desto attraktiver ist es für jedes Unternehmen.", false, "Große Segmente sind oft die umkämpftesten und passen nicht unbedingt zu den Ressourcen einer kleinen Firma. Attraktivität umfasst auch Konkurrenz und Passung zu den Zielen.");
TF("m3", "Points of Parity sind der Grund, warum Kunden die Marke der Konkurrenz vorziehen.", false, "Points of Parity sind die „Eintrittskarte“ in die Kategorie. Der Grund für die Wahl sind die Points of Difference.");
TF("m3", "Nutzensegmentierung ist eine Form der verhaltensorientierten Segmentierung.", true, "Nutzen, Anlässe, Nutzungsintensität und Loyalität sind verhaltensbezogene Merkmale.");
TF("m3", "Der SOM ist normalerweise größer als der SAM.", false, "Umgekehrt: TAM ≥ SAM ≥ SOM. Der SOM ist der realistisch erreichbare Teil des bedienbaren Marktes.");
TF("m3", "Die Positionierungsaussage ist vor allem für den internen Gebrauch im Team gedacht.", true, "Sie ist ein strategischer Kompass für das Team; der Kunde sieht den Slogan und die Werbung, die daraus entstehen.");
ERR("m3", "„Unsere Zielgruppe sind alle Menschen zwischen 18 und 65 Jahren.“", "Das ist kein Targeting: zu breit, ohne gemeinsame Bedürfnisse, und man kann keine relevante Botschaft für alle bauen.",
  ["Die Altersgrenze sollte 18–75 sein.", "Man sollte noch das Geschlecht ergänzen.", "Kein Fehler — eine breite Zielgruppe bringt mehr Umsatz."],
  "Ein Segment braucht ähnliche Bedürfnisse und Reaktionen. „Alle“ heißt, dass sich niemand angesprochen fühlt.");
ERR("m3", "„Wir haben die Kunden nach Alter segmentiert, also kennen wir ihre Werte und ihren Lebensstil.“", "Alter ist ein demografisches Merkmal; Werte und Lebensstil sind psychografisch und können bei gleichem Alter sehr verschieden sein.",
  ["Alter ist ein geografisches Merkmal.", "Alter ist ein verhaltensbezogenes Merkmal.", "Kein Fehler."],
  "Zwei 30-Jährige mit gleichem Gehalt können völlig andere Werte haben. Deshalb kombiniert man demografische und psychografische Merkmale.");
SEQ("m3", "Ordne die Schritte von STP", ["Segmentierungsmerkmale bestimmen", "Segmente beschreiben", "Attraktivität der Segmente bewerten", "Zielsegmente auswählen", "Positionierung festlegen", "Marketing-Mix für die Position gestalten"],
  "Erst teilen, dann auswählen, dann positionieren — und erst dann die 4P entscheiden.");
SEQ("m3", "Ordne die Märkte vom breitesten zum engsten", ["TAM — gesamter adressierbarer Markt", "SAM — bedienbarer verfügbarer Markt", "SOM — realistisch erreichbarer Markt"],
  "Jeder folgende ist eine Teilmenge des vorherigen.");
CAT("m3", "Welches Segmentierungsmerkmal ist das?", ["Geografisch", "Demografisch", "Psychografisch", "Verhaltensbezogen"], [
  ["Menschen, die in Bergregionen leben", 0, "Der Ort ist ein geografisches Merkmal."],
  ["Familien mit Kindern unter 3 Jahren", 1, "Die Lebensphase ist demografisch."],
  ["Menschen, die Abenteuer und Spontaneität schätzen", 2, "Werte und Persönlichkeit sind psychografisch."],
  ["Kunden, die jede Woche kaufen", 3, "Die Kaufhäufigkeit ist verhaltensbezogen."],
  ["Haushaltseinkommen über 5000 €", 1, "Einkommen ist ein demografisches Merkmal."],
  ["Kaufen Weihnachtsgeschenke", 3, "Der Anlass ist ein verhaltensbezogenes Merkmal."],
  ["Umweltaktivisten, die Plastik meiden", 2, "Lebensstil und Werte."],
  ["Städte mit über 100 000 Einwohnern", 0, "Größe des Ortes — geografisch."],
  ["Suchen weiße Zähne, nicht frischen Atem", 3, "Gesuchter Nutzen — verhaltensbezogen."],
  ["Rentner", 1, "Alter/Lebensphase — demografisch."],
]);
CAT("m3", "Welche Targeting-Strategie ist das?", ["Undifferenziert (Massenmarketing)", "Differenziert", "Konzentriert (Nische)", "Mikromarketing"], [
  ["Dasselbe Salz für alle, mit einer Werbung", 0, "Ignoriert Unterschiede zwischen Segmenten."],
  ["Kosmetikhersteller mit Linien für Teenager, reife Haut und Männer", 1, "Mehrere Segmente — eigenes Angebot für jedes."],
  ["Software nur für Zahnarztpraxen", 2, "Ein enges Segment."],
  ["Ein Onlineshop zeigt jedem Kunden persönliche Empfehlungen", 3, "Individuelles Marketing."],
  ["Laden nur für Schuhe in Übergrößen", 2, "Nische."],
  ["Kette mit unterschiedlichem Sortiment in verschiedenen Vierteln", 3, "Lokales Marketing."],
  ["Hotel mit Paketen für Familien, Geschäftsreisende und Hochzeitspaare", 1, "Unterschiedliche Programme für unterschiedliche Segmente."],
]);
DEC("m3", "Neue Proteinriegelmarke mit kleinem Budget. Den Markt dominieren zwei große Marken, die auf „alle, die Sport treiben“ zielen.", "Welche Strategie ist am vernünftigsten?", [
  ["Konzentriertes Marketing auf eine klare Nische (z. B. Langstreckenläuferinnen) mit Produkt und Botschaft genau für sie", true, "Mit kleinem Budget ist es besser, Nummer 1 in einer Nische zu sein als unsichtbar im Massenmarkt. Die Nische gibt eine klare Position und effiziente Kommunikation."],
  ["Massenmarketing an alle Sportler, um einen möglichst großen Markt zu haben", false, "Gegen die großen Marken bleibst du mit kleinem Budget unsichtbar und deine Botschaft ununterscheidbar."],
  ["Differenziertes Marketing mit 5 Linien für 5 Segmente", false, "Erfordert viele Ressourcen für Produkte und Kommunikation, die die neue Marke nicht hat."],
  ["Die Positionierung des Marktführers zum niedrigeren Preis kopieren", false, "Einen Preiskampf gegen Größere mit niedrigeren Kosten gewinnt man selten."],
]);
DEC("m3", "Café im Geschäftsviertel. Drumherum: 3 Ketten (schnell, mittlere Qualität) und 1 Spezialitätencafé (exzellente Qualität, aber langsam und teuer).", "Welche Position ist laut Wahrnehmungslandkarte am vielversprechendsten?", [
  ["„Spezialitätenkaffee in 3 Minuten“ — Qualität wie das Spezialitätencafé, Tempo wie die Ketten, für Büroangestellte", true, "Die freie Position ist „hohe Qualität + Tempo“. Büroangestellte schätzen morgens beides. Die Position ist unterscheidbar und wichtig für sie."],
  ["„Der billigste Kaffee im Viertel“", false, "Die Ketten haben niedrigere Kosten; ein Preiskampf ist riskant und „am billigsten“ ist keine nachhaltige Position."],
  ["„Das luxuriöseste Café“", false, "Diese Position ist schon vom Spezialitätencafé besetzt."],
  ["Ohne konkrete Position — „guter Kaffee für jeden“", false, "Ohne Unterschied haben Kunden keinen Grund, ihre Gewohnheit zu ändern."],
]);
OPEN("m3", "Was ist STP und warum kommt es vor den 4P?", "STP ist Segmentierung (Aufteilung des Marktes in Gruppen mit ähnlichen Bedürfnissen), Targeting (Auswahl der Segmente, die wir bedienen) und Positionierung (der Platz, den wir in ihrem Kopf im Vergleich zur Konkurrenz einnehmen wollen). Es kommt vor den 4P, weil man ohne zu wissen, für wen das Produkt ist und wie es sich unterscheidet, nicht über Produkt, Preis, Kanal und Kommunikation entscheiden kann.", ["segment", "target|auswahl|auswähl", "position", "konkurren|wettbewerb", "4p|mix|produkt|preis"]);
OPEN("m3", "Erkläre den Unterschied zwischen Points of Parity und Points of Difference mit einem Beispiel.", "Points of Parity sind Eigenschaften, die Kunden von jeder Marke der Kategorie erwarten (z. B. eine App bei einer Bank) — ohne sie wird man nicht in Betracht gezogen. Points of Difference sind das, worin die Marke anders und besser ist und was Kunden schätzen (z. B. Kontoeröffnung in 5 Minuten ohne Filialbesuch) — sie sind der Grund für die Wahl.", ["parity|erwart|gleich", "differen|unterschied", "beispiel|z. b|z.b", "wahl|grund"]);
OPEN("m3", "Welche Kriterien muss ein brauchbares Segment erfüllen?", "Das Segment muss messbar sein (Größe und Kaufkraft lassen sich schätzen), erreichbar (wir können es über Kanäle ansprechen), substanziell (groß und profitabel genug), unterscheidbar (reagiert anders auf Marketing) und umsetzbar (wir können ein wirksames Programm dafür bauen).", ["messbar", "erreichbar", "substanz|groß|profitab", "unterscheid", "umsetzbar|programm"]);

// ═════ m4
TF("m4", "Garantie und Gratislieferung gehören zum erweiterten Produkt.", true, "Das erweiterte Produkt umfasst Leistungen und Zusatznutzen rund um das reale Produkt.");
TF("m4", "Markenerweiterung bedeutet eine neue Geschmacksrichtung desselben Produkts.", false, "Eine neue Sorte in derselben Kategorie ist eine Linienerweiterung. Markenerweiterung ist eine neue Kategorie unter demselben Namen.");
TF("m4", "In der Reifephase ist der Umsatz meist hoch, aber das Wachstum stoppt.", true, "Die Reife ist die längste Phase: Umsatz auf Plateau, Konkurrenz stark.");
TF("m4", "Das Markenimage ist das, was das Unternehmen in sein Brand Book schreibt.", false, "Das Brand Book beschreibt die Identität (wie man gesehen werden will). Das Image ist die tatsächliche Wahrnehmung in den Köpfen der Kunden.");
TF("m4", "Ein MVP ist die einfachste Version des Produkts, mit der man von echten Kunden lernen kann.", true, "Ziel ist, Hypothesen mit minimalen Kosten zu prüfen, bevor man in ein vollständiges Produkt investiert.");
TF("m4", "Eine Lebensversicherung ist typischerweise ein Gut des täglichen Bedarfs.", false, "Sie ist ein typisches ungesuchtes Gut — Menschen denken selten aktiv an den Kauf, es braucht aktiven Verkauf.");
ERR("m4", "„Unser Produkt ist in der Einführungsphase, deshalb müssen wir uns auf die Verteidigung des Marktanteils konzentrieren.“", "In der Einführung sind Bekanntheit und Probieren das Ziel; die Verteidigung des Anteils ist typisch für die Reife.",
  ["In der Einführung muss man das Produkt sofort einstellen.", "In der Einführung muss der Preis immer der niedrigste sein.", "Kein Fehler."],
  "Die Strategie folgt der Phase: Einführung — bekannt werden und probieren lassen; Wachstum — ausbauen; Reife — Anteil verteidigen; Rückgang — abernten oder einstellen.");
ERR("m4", "„Wir haben das Logo geändert, also haben wir das Markenimage geändert.“", "Das Image entsteht aus dem gesamten Erlebnis und den Handlungen der Marke; ein neues Logo allein ändert es selten.",
  ["Das Logo ist das Image.", "Das Image ändert man mit einem neuen Slogan.", "Kein Fehler."],
  "Image ist Wahrnehmung. Bleiben Produkt und Service gleich, denken die Menschen mit neuem Logo dasselbe.");
SEQ("m4", "Ordne die Phasen des Produktlebenszyklus", ["Entwicklung", "Einführung", "Wachstum", "Reife", "Rückgang"],
  "Die klassische Kurve: Umsatz wächst langsam in der Einführung, schnell im Wachstum, erreicht in der Reife ein Plateau und sinkt im Rückgang.");
SEQ("m4", "Ordne die Phasen der Neuproduktentwicklung", ["Ideenfindung", "Ideenauswahl", "Konzeptentwicklung und -test", "Marketingstrategie und Wirtschaftlichkeitsanalyse", "Produktentwicklung", "Testmarkt", "Markteinführung"],
  "Die Reihenfolge senkt das Risiko: Jeder Schritt ist teurer, daher werden schwache Ideen früh aussortiert.");
CAT("m4", "Welche Art Konsumgut ist das?", ["Gut des täglichen Bedarfs", "Vergleichsgut", "Spezialgut", "Ungesuchtes Gut"], [
  ["Zahnpasta", 0, "Häufig, schnell, ohne viel Vergleich gekauft."],
  ["Waschmaschine", 1, "Kunden vergleichen Preis, Qualität, Eigenschaften."],
  ["Handgefertigte Gitarre eines bestimmten Meisters", 2, "Der Kunde sucht genau diese Marke und nimmt Mühe auf sich."],
  ["Bestattungsleistungen", 3, "Werden nicht aktiv gesucht, bis Bedarf entsteht."],
  ["Kaugummi an der Kasse", 0, "Impulsartikel des täglichen Bedarfs."],
  ["Winterjacken", 1, "Stil, Preis und Qualität werden verglichen."],
  ["Luxusuhr mit Warteliste", 2, "Käufer akzeptieren keinen Ersatz."],
  ["Blutspende", 3, "Erfordert aktive Kommunikation."],
]);
CAT("m4", "Welche Produktebene ist das?", ["Kernnutzen", "Reales Produkt", "Erweitertes Produkt"], [
  ["Ruhiger Schlaf für den Hotelgast", 0, "Das ist der Nutzen — was der Kunde wirklich kauft."],
  ["Zimmer mit Doppelbett und schallisolierten Fenstern", 1, "Die konkreten Eigenschaften."],
  ["Kostenlose Stornierung bis 24 Stunden vor Anreise", 2, "Zusatzleistung rund ums Produkt."],
  ["Das Telefon mit konkretem Design und Kamera", 1, "Das reale Produkt."],
  ["5 Jahre Garantie", 2, "Erweitertes Produkt."],
  ["Ein Regal aufhängen (beim Kauf einer Bohrmaschine)", 0, "Der Kern — das Bedürfnis, das das Produkt löst."],
]);
CAT("m4", "Wo in der BCG-Matrix steht das Produkt?", ["Star", "Cash Cow", "Question Mark", "Poor Dog"], [
  ["Großer Anteil, Markt wächst um 20 % pro Jahr", 0, "Hoher Anteil + hohes Wachstum."],
  ["Großer Anteil, Markt wächst um 1 % pro Jahr", 1, "Hoher Anteil + geringes Wachstum = bringt Geld."],
  ["Kleiner Anteil, Markt wächst um 25 % pro Jahr", 2, "Geringer Anteil + hohes Wachstum = Investitionen nötig."],
  ["Kleiner Anteil, Markt schrumpft", 3, "Geringer Anteil + geringes Wachstum."],
  ["Marktführer bei Waschmitteln", 1, "Reifer Markt, großer Anteil."],
  ["Neue Marke in einer schnell wachsenden Kategorie mit 2 % Anteil", 2, "Typisches Question Mark."],
]);
DEC("m4", "Eine bekannte Babynahrungsmarke überlegt, einen Energydrink für Erwachsene unter demselben Namen herauszubringen.", "Was ist das größte Risiko?", [
  ["Eine Markenerweiterung in eine Kategorie, die den Assoziationen widerspricht („sicher für Kinder“), kann der Kernmarke schaden", true, "Die Erweiterung spart Geld für Bekanntheit, aber passt die neue Kategorie nicht — oder floppt sie — leidet das Vertrauen ins Kernprodukt."],
  ["Energydrinks haben keinen Markt", false, "Der Markt existiert; die Frage ist, ob die Marke passt."],
  ["Linienerweiterungen sind verboten", false, "Das ist eine Markenerweiterung (neue Kategorie), keine Linienerweiterung, und nicht verboten."],
  ["Kein Risiko, weil die Marke bekannt ist", false, "Bekanntheit hilft, aber unpassende Assoziationen sind ein echtes Risiko."],
]);
DEC("m4", "Ein Start-up will eine App für gemeinsames Einkaufen unter Nachbarn bauen. Es hat eine Idee, weiß aber nicht, ob jemand sie nutzt.", "Was ist der beste erste Schritt?", [
  ["Ein einfaches MVP — z. B. eine Chatgruppe und ein Bestellformular in einem Viertel — um zu prüfen, ob die Leute wirklich bestellen", true, "Das MVP prüft die Kernhypothese (bestellen sie?) mit minimalen Kosten. Monate Entwicklung vorher sind riskant."],
  ["Eine vollständige App mit allen Funktionen in 8 Monaten", false, "Hohe Kosten, bevor man weiß, ob es Nachfrage gibt."],
  ["Eine große Werbekampagne, bevor es ein Produkt gibt", false, "Du lockst Menschen zu einem Produkt, das es nicht gibt, und lernst nichts über echtes Verhalten."],
  ["Umfrage „Würden Sie so eine App nutzen?“ und bei 70 % „ja“ — entwickeln", false, "Menschen sagen oft „ja“, handeln aber nicht. Echtes Verhalten (MVP) ist ein stärkerer Beleg als erklärte Absicht."],
]);
OPEN("m4", "Beschreibe die Phasen des Produktlebenszyklus und das Marketingziel in jeder.", "Einführung — langsamer Umsatz, hohe Kosten; Ziel: Bekanntheit und Probieren. Wachstum — schnell steigender Umsatz, neue Wettbewerber; Ziel: maximaler Marktanteil, Ausbau von Distribution und Varianten. Reife — Umsatzplateau, starke Konkurrenz; Ziel: Anteil und Gewinn verteidigen, Markt/Produkt modifizieren. Rückgang — sinkender Umsatz; Ziel: Kosten senken, abernten oder einstellen.", ["einführung", "wachstum", "reife", "rückgang", "bekanntheit|probier", "anteil"]);
OPEN("m4", "Was ist der Unterschied zwischen Markenidentität und Markenimage?", "Die Identität ist, wie das Unternehmen die Marke wahrgenommen sehen will — Werte, Persönlichkeit, Logo, Farben, Tonalität; sie wird vom Unternehmen geschaffen und gesteuert. Das Image ist die tatsächliche Wahrnehmung und die Assoziationen in den Köpfen der Kunden, die von der gewünschten abweichen können. Aufgabe des Marketings ist es, das Image durch Handeln und konsistente Kommunikation an die Identität anzunähern.", ["identität", "image", "wahrnehm|assoziation", "unternehmen|firma|steuer", "kunde"]);
OPEN("m4", "Erkläre die drei Produktebenen mit einem Beispiel.", "Kernnutzen — das Bedürfnis, das das Produkt löst (beim Hotel: ruhiger Schlaf). Reales Produkt — die konkreten Eigenschaften, Design, Marke, Verpackung (Zimmer mit bequemem Bett, Schallschutz). Erweitertes Produkt — Zusatzleistungen und -nutzen (kostenlose Stornierung, 24-Stunden-Rezeption, Treueprogramm).", ["kern|nutzen", "real|eigenschaft", "erweitert|garantie|leistung"]);

// ═════ m5
TF("m5", "Ein Aufschlag von 50 % bedeutet eine Marge von 50 %.", false, "Der Aufschlag bezieht sich auf die Selbstkosten, die Marge auf den Preis. 50 % Aufschlag (10 → 15 €) = Marge 5/15 = 33,3 %.");
TF("m5", "Bei unelastischer Nachfrage erhöht eine Preiserhöhung meist den Gesamtumsatz.", true, "Die Menge sinkt prozentual weniger als der Preis steigt, daher wächst der Umsatz.");
TF("m5", "Skimming beginnt mit einem niedrigen Preis, um schnell Marktanteil zu gewinnen.", false, "Das ist die Penetrationsstrategie. Skimming beginnt mit einem hohen Preis für die zahlungsbereitesten Kunden.");
TF("m5", "Billiger Drucker und teure Patronen sind ein Beispiel für Preisbildung mit Folgeprodukten.", true, "Das Hauptprodukt ist billig, die zwingend nötigen Verbrauchsmaterialien bringen den Gewinn.");
TF("m5", "Break-even = Fixkosten / (Preis − variable Stückkosten).", true, "Jedes Stück trägt „Preis − variable Kosten“ bei; deckt die Summe die Fixkosten, ist man bei null.");
TF("m5", "Der Preis ist das einzige Element der 4P, das Erlöse bringt.", true, "Produkt, Distribution und Kommunikation sind Kosten; der Preis ist der Erlös.");
ERR("m5", "„Selbstkosten 40 €, wir wollen 40 % Marge, also ist der Preis 40 × 1,4 = 56 €.“", "40 % Marge beziehen sich auf den Preis: Preis = 40 / (1 − 0,4) = 66,67 €. Der Preis 56 € ergibt 40 % Aufschlag, aber nur 28,6 % Marge.",
  ["Der Preis muss 40 × 0,4 = 16 € sein.", "Der Preis muss 40 + 40 = 80 € sein.", "Kein Fehler."],
  "Ist die Marge das Ziel, teilt man durch (1 − Marge). Multiplizieren mit (1 + %) ergibt den Aufschlag.");
ERR("m5", "„Wir senken den Preis um 20 % — der Absatz springt und der Gewinn wächst.“", "Die Senkung erhöht den Gewinn nur, wenn die Zusatzmenge den kleineren Deckungsbeitrag pro Stück ausgleicht. Die nötige Menge muss berechnet werden.",
  ["Eine Preissenkung senkt immer den Absatz.", "Preissenkungen sind gesetzlich verboten.", "Kein Fehler."],
  "Bei 10 € Deckungsbeitrag und 4 € Rabatt bleiben 6 € — es braucht 67 % mehr Stück für denselben Gewinn.");
SEQ("m5", "Ordne die Schritte zur Berechnung des Break-even-Punkts", ["Fixkosten des Zeitraums erfassen", "Preis pro Stück bestimmen", "Variable Kosten pro Stück bestimmen", "Deckungsbeitrag = Preis − variable Kosten berechnen", "Fixkosten durch den Deckungsbeitrag teilen"],
  "Der Deckungsbeitrag zeigt, was jedes Stück „abdeckt“; die Division ergibt die Stückzahl bis null.");
CAT("m5", "Welche Preisstrategie ist das?", ["Penetration", "Skimming", "Psychologisch", "Folgeprodukt", "Bündel"], [
  ["Eine neue Konsole kostet zum Start 550 €, später 380 €", 1, "Hoher Startpreis, dann sinkend für weitere Segmente."],
  ["Neuer Anbieter: halber Preis für 2 Jahre", 0, "Niedriger Preis für schnellen Anteil."],
  ["Preis 49,90 statt 50 €", 2, "Der Effekt der linken Ziffer."],
  ["Kapselkaffeemaschine zum niedrigen Preis", 3, "Der Gewinn kommt aus den Kapseln."],
  ["Burger + Pommes + Getränk für 12 € statt 15 €", 4, "Paket unter der Summe der Einzelpreise."],
  ["Internet + TV + Mobilfunk im Paket", 4, "Bündelpreis."],
  ["Rasierer billig, Klingen teuer", 3, "Klassisches Folgeprodukt."],
  ["Ein Streamingdienst startet mit sehr niedrigem Preis", 0, "Schnelle Nutzergewinnung."],
]);
CAT("m5", "Fixe oder variable Kosten (für ein Café)?", ["Fix", "Variabel"], [
  ["Miete des Ladens", 0, "Hängt nicht von der Kaffeemenge ab."],
  ["Kaffeebohnen", 1, "Steigen mit jedem Kaffee."],
  ["Pappbecher", 1, "Einer pro Verkauf."],
  ["Gehalt der Filialleitung", 0, "Fester Monatsbetrag."],
  ["Milch", 1, "Hängt von der Zahl verkaufter Getränke ab."],
  ["Leasing der Kaffeemaschine", 0, "Feste Rate."],
  ["Provision der Lieferplattform", 1, "Prozentsatz jeder Bestellung."],
  ["Abo für die Kassensoftware", 0, "Fester Monatsbetrag."],
]);
DEC("m5", "Neues Smartphone mit einzigartiger Kamera, die Wettbewerber mindestens ein Jahr nicht kopieren können. Technikbegeisterte Early Adopters sind bereit, viel zu zahlen.", "Welche Strategie für den Startpreis passt am besten?", [
  ["Skimming — hoher Startpreis, dann schrittweise Senkung", true, "Es gibt Einzigartigkeit, Prestige und ein zahlungsbereites Segment, und Kopieren ist schwer — die klassischen Bedingungen für Skimming."],
  ["Penetration — niedriger Preis für schnellen Marktanteil", false, "Passt bei preissensiblem Markt und leichter Kopierbarkeit; hier lässt du Geld liegen."],
  ["Preis nach Selbstkosten + 10 %", false, "Ignoriert den hohen wahrgenommenen Wert."],
  ["Gratis-Handy mit Abo", false, "Passt weder zur Situation noch zur Positionierung."],
]);
DEC("m5", "Pizzeria: Pizza 15 €, variable Kosten 6 €, Absatz 1000 Pizzen/Monat. Der Inhaber will eine „−20 %“-Aktion.", "Wie viele Pizzen muss sie monatlich verkaufen, um denselben Gesamtdeckungsbeitrag zu halten?", [
  ["1500 Pizzen", true, "Aktueller Deckungsbeitrag: 15 − 6 = 9 € → 9000 €. Neuer Preis 12 € → Deckungsbeitrag 6 € → 9000 / 6 = 1500 Pizzen, also +50 % Menge für −20 % Preis."],
  ["1200 Pizzen", false, "+20 % Menge reichen nicht: 1200 × 6 = 7200 € < 9000 €."],
  ["1000 Pizzen", false, "Bei gleicher Menge sinkt der Deckungsbeitrag von 9000 auf 6000 €."],
  ["1250 Pizzen", false, "1250 × 6 = 7500 € — immer noch unter 9000 €."],
]);
OPEN("m5", "Erkläre den Unterschied zwischen Aufschlag und Marge mit einem Zahlenbeispiel.", "Der Aufschlag ist ein Prozentsatz auf die Selbstkosten, die Marge auf den Verkaufspreis. Beispiel: Selbstkosten 60 €, Preis 100 €. Der Gewinn ist 40 €. Aufschlag = 40 / 60 = 66,7 %. Marge = 40 / 100 = 40 %. Deshalb ist bei gleichem Gewinn der Aufschlag in Prozent immer größer als die Marge.", ["selbstkosten|einstand", "preis", "aufschlag", "marge", "%|prozent"]);
OPEN("m5", "Wann passt eine Penetrationsstrategie und wann Skimming?", "Penetration: preissensibler Markt, Skaleneffekte (mehr Menge → niedrigere Kosten), starke Konkurrenz oder leichte Kopierbarkeit, Ziel — schneller Marktanteil. Skimming: einzigartiges/prestigeträchtiges Produkt, Segment mit hoher Zahlungsbereitschaft, schwer zu kopieren, Ziel — maximaler Erlös bei frühen Käufern, dann schrittweise Senkung.", ["penetration", "skimming|abschöpf", "preissensib|preisempfind", "skalen|menge", "einzigartig|prestige|kopier"]);
OPEN("m5", "Was ist die Preiselastizität der Nachfrage und warum ist sie bei Preisentscheidungen wichtig?", "Die Elastizität zeigt, wie stark sich die Nachfragemenge bei einer Preisänderung ändert: % Mengenänderung / % Preisänderung. Ist |E| > 1 (elastisch), erhöht eine Preissenkung den Umsatz, eine Erhöhung senkt ihn. Ist |E| < 1 (unelastisch), erhöht eine Preiserhöhung den Umsatz. So schätzt man die Wirkung der Preisentscheidung auf den Umsatz.", ["menge", "preis", "elastisch", "umsatz|erlös", "%|prozent"]);

// ═════ m6
TF("m6", "Der Großhändler verkauft hauptsächlich an Endverbraucher.", false, "Der Großhändler verkauft an Unternehmen (Händler, Firmen). An Endverbraucher verkauft der Einzelhändler.");
TF("m6", "Luxusmarken nutzen meist intensive Distribution.", false, "Sie nutzen exklusive oder selektive Distribution, um Prestige und Kontrolle zu wahren.");
TF("m6", "Omnichannel bedeutet, dass die Kanäle zu einem Erlebnis verbunden sind.", true, "Gemeinsamer Bestand, Warenkorb, Rückgabe und Treue über alle Kanäle — das ist der Unterschied zu bloß „vielen Kanälen“.");
TF("m6", "Bei der Pull-Strategie richtet der Hersteller die Kommunikation vor allem an Endkunden.", true, "Die Kunden fragen nach dem Produkt und „ziehen“ den Handel, es zu listen.");
TF("m6", "Ein Handelsvertreter wird Eigentümer der Ware, die er verkauft.", false, "Vertreter/Makler vermitteln gegen Provision, ohne Eigentümer zu werden — anders als der Großhändler.");
ERR("m6", "„Wir verkaufen im Laden und online, also sind wir Omnichannel.“", "Das ist Multichannel. Omnichannel liegt vor, wenn die Kanäle verbunden sind: gemeinsamer Bestand, Onlinebestellung mit Rückgabe im Laden, gemeinsame Treuepunkte.",
  ["Man braucht mindestens 5 Kanäle für Omnichannel.", "Omnichannel ist nur der Onlineverkauf.", "Kein Fehler."],
  "„Viele Kanäle“ ≠ „verbundene Kanäle“. Der Kunde muss nahtlos von einem Kanal in den anderen wechseln können.");
ERR("m6", "„Je mehr Absatzmittler im Kanal, desto billiger ist das Produkt für den Kunden.“", "Meist ist es umgekehrt: Jeder Absatzmittler schlägt eine eigene Marge auf. Absatzmittler bringen aber Reichweite und Effizienz.",
  ["Die Zahl der Absatzmittler beeinflusst nichts.", "Absatzmittler sind bei Lebensmitteln verboten.", "Kein Fehler."],
  "Absatzmittler verringern die Zahl der Kontakte und die Kosten für Reichweite, aber jeder nimmt Marge.");
SEQ("m6", "Ordne den klassischen indirekten Kanal (ab Hersteller)", ["Hersteller", "Großhändler", "Einzelhändler", "Endverbraucher"],
  "Zweistufiger Kanal: zwei Absatzmittler zwischen Hersteller und Kunde.");
CAT("m6", "Welche Abdeckungsstrategie ist das?", ["Intensiv", "Selektiv", "Exklusiv"], [
  ["Softdrinks in jedem Laden und Kiosk", 0, "Maximale Abdeckung für ein Gut des täglichen Bedarfs."],
  ["Möbelmarke in 20 ausgewählten Studios", 1, "Begrenzte Zahl gut ausgewählter Händler."],
  ["Ein offizieller Händler für Luxusautos in der Stadt", 2, "Exklusivität für Prestige und Kontrolle."],
  ["Kosmetik nur in Apotheken", 1, "Ausgewählter Händlertyp."],
  ["Kaugummi an jeder Kasse", 0, "Intensive Distribution."],
  ["Uhr nur in der eigenen Boutique der Marke", 2, "Exklusiv."],
]);
CAT("m6", "Push oder Pull?", ["Push", "Pull"], [
  ["Bonus für Läden, die das Produkt auf einer Stirnseite platzieren", 0, "Anreiz für den Absatzmittler."],
  ["Nationale TV-Kampagne an Endkunden", 1, "Erzeugt Nachfrage bei den Kunden."],
  ["Schulung von Apothekern, das Produkt zu empfehlen", 0, "Wirkt über den Kanal."],
  ["Virale Kampagne, nach der Kunden im Laden nach dem Produkt fragen", 1, "Kunden „ziehen“ das Produkt."],
  ["Rabatte für Großhändler bei großer Bestellung", 0, "Trade Promotion — Push."],
  ["Influencer zeigen das Produkt ihren Followern", 1, "Kommunikation an Endkunden."],
]);
DEC("m6", "Kleiner Hersteller von Naturkosmetik: verkauft auf Märkten und über Instagram. Will schnell bundesweit wachsen, ohne eigene Läden.", "Welcher Kanal ist der sinnvollste nächste Schritt?", [
  ["Marktplatz + eigener Onlineshop (D2C), plus einige ausgewählte Bioläden", true, "Der Marktplatz bringt schnell Traffic, der eigene Shop Daten und höhere Marge, ausgewählte Läden physische Präsenz ohne eigene Filialen."],
  ["Intensive Distribution in allen Supermarktketten", false, "Erfordert Kapazitäten, Regalbudget und Vertriebsteam, die der kleine Hersteller nicht hat; passt auch nicht zur Premium-Naturposition."],
  ["Nur Märkte, weil dort der persönliche Kontakt ist", false, "Ermöglicht kein bundesweites Wachstum."],
  ["Eigene Boutiquen in 10 Städten", false, "Zu teuer und riskant für einen kleinen Hersteller."],
]);
DEC("m6", "Die Kampagne für eine neue Eissorte läuft hervorragend, aber am 3. Tag ist das Produkt in den meisten Läden ausverkauft.", "Was ist die wichtigste Lehre?", [
  ["Marketing und Logistik müssen gemeinsam geplant werden — die Verfügbarkeit ist Teil der Kampagne", true, "Ein Fehlbestand verbrennt Budget und schickt Kunden zur Konkurrenz. Die Nachfrageprognose gehört in den Mediaplan."],
  ["Die Kampagne war zu erfolgreich — nächstes Mal mit kleinerem Budget", false, "Das Problem ist nicht der Erfolg, sondern die Bestandsplanung."],
  ["Den Preis erhöhen, damit es langsamer ausverkauft ist", false, "Behandelt das Symptom und schadet der Kampagne."],
  ["Ausverkauf ist gut, weil er Knappheit erzeugt", false, "Bewusste Knappheit ist nur in Sonderfällen Strategie (limitierte Editionen); hier verlierst du Verkäufe und Kunden."],
]);
OPEN("m6", "Was ist der Unterschied zwischen Push- und Pull-Strategie? Nenne je ein Beispiel.", "Push: Der Hersteller „drückt“ das Produkt mit Promotion an die Absatzmittler durch den Kanal — Rabatte, Boni, Außendienst, Schulungen. Beispiel: Bonus für die Kette für eine Stirnseitenplatzierung. Pull: Der Hersteller kommuniziert direkt mit Endkunden (Werbung, digital), diese fragen nach dem Produkt und der Handel listet es. Beispiel: nationale Kampagne, nach der Kunden nach dem Produkt fragen. Die meisten Marken kombinieren beides.", ["push|drück", "pull|zieh", "absatzmittler|händler|kanal", "kunde", "beispiel|z. b|z.b"]);
OPEN("m6", "Warum gibt es Absatzmittler in der Distribution?", "Absatzmittler verringern die Zahl nötiger Kontakte (5 Hersteller × 20 Läden = 100 Verbindungen; über einen Großhändler 25), bieten Reichweite, Sortiment, Lagerung, Finanzierung und Kenntnis des lokalen Marktes. Dafür nehmen sie Marge und der Hersteller verliert Kontrolle.", ["kontakt|verbindung", "reichweite|zugang", "marge", "kontrolle", "lager|logist|sortiment"]);

// ═════ m7
TF("m7", "Die Reichweite zählt jede Einblendung, auch wiederholte bei derselben Person.", false, "Das sind die Impressionen. Die Reichweite zählt eindeutige Personen.");
TF("m7", "Impressionen = Reichweite × durchschnittliche Frequenz.", true, "Beispiel: 25 000 Personen × 4 Kontakte = 100 000 Impressionen.");
TF("m7", "PR-Inhalte werden wie Werbung direkt an das Medium bezahlt.", false, "PR zielt auf verdiente Aufmerksamkeit — das Medium entscheidet selbst. Ist es bezahlt, ist es Werbung und muss gekennzeichnet sein.");
TF("m7", "Im unteren Funnel (BOFU) sind Conversions und CPA die Hauptkennzahlen.", true, "Dort sind Menschen kaufbereit — man misst Aktionen und ihren Preis.");
TF("m7", "300 GRP können 60 % Reichweite bei durchschnittlicher Frequenz 5 bedeuten.", true, "GRP = Reichweite % × Frequenz = 60 × 5 = 300.");
TF("m7", "Eine Anzeige sollte mindestens 4–5 Kernbotschaften enthalten, um zu überzeugen.", false, "Umgekehrt: Eine klare Kernbotschaft bleibt hängen; viele Botschaften gehen unter.");
ERR("m7", "„Die CTA der Kampagne lag bei 2,3 %.“", "Gemeint ist die CTR (Klickrate). Die CTA ist die Handlungsaufforderung — der Button oder Text „Jetzt kaufen“.",
  ["Es muss CPA heißen, nicht CTA.", "Es muss CPM heißen.", "Kein Fehler."],
  "CTA (Call to Action) ist ein Element der Anzeige; CTR (Click-through-Rate) eine Kennzahl.");
ERR("m7", "„Unsere Bekanntheitskampagne ist gescheitert, weil sie in der ersten Woche keine Verkäufe gebracht hat.“", "Eine Bekanntheitskampagne (TOFU) bewertet man an Reichweite, Wiedererkennung und Markensuchen; Verkäufe kommen später und über andere Kanäle.",
  ["Man hätte sie an der Zahl der Likes messen sollen.", "Bekanntheit lässt sich nicht messen.", "Kein Fehler."],
  "Ziel und Kennzahl müssen zur Funnel-Stufe passen.");
SEQ("m7", "Ordne die Stufen von AIDA", ["Aufmerksamkeit (Attention)", "Interesse (Interest)", "Verlangen (Desire)", "Handlung (Action)"],
  "Modell dafür, wie eine Botschaft Menschen vom Bemerken zur Handlung führt.");
SEQ("m7", "Ordne die Stufen des Marketing-Funnels", ["Bekanntheit", "Interesse / Erwägung", "Conversion (Kauf)", "Loyalität und Empfehlung"],
  "Auf jeder Stufe fällt ein Teil der Menschen ab; Ziele und Kennzahlen wechseln.");
SEQ("m7", "Ordne den Prozess der Kampagnenentwicklung", ["Ziele und Zielgruppe", "Kreativ-Briefing", "Big Idea und Konzept", "Produktion der Materialien", "Mediaplan und Start", "Messung und Optimierung"],
  "Von der Strategie zur Kreation, dann Medien und zum Schluss die Messung.");
CAT("m7", "Paid, Owned oder Earned Media?", ["Paid", "Owned", "Earned"], [
  ["Videoanzeige auf YouTube", 0, "Du zahlst für die Einblendung."],
  ["E-Mail-Newsletter an die Abonnenten", 1, "Die Liste gehört dir."],
  ["Artikel eines Journalisten über den Gründer", 2, "Das Medium entscheidet selbst."],
  ["Der Blog der Marke", 1, "Eigener Kanal."],
  ["Ein Kunde teilt ein Video mit dem Produkt", 2, "Verdiente Aufmerksamkeit."],
  ["Bezahlter Influencer-Post", 0, "Bezahlter Inhalt."],
  ["Die App der Marke", 1, "Eigener Kanal."],
  ["Positive Google-Bewertung", 2, "Verdient."],
]);
CAT("m7", "Welche Funnel-Stufe bedient dieser Inhalt?", ["TOFU (Bekanntheit)", "MOFU (Erwägung)", "BOFU (Entscheidung)"], [
  ["Unterhaltsames Kurzvideo für ein neues Publikum", 0, "Aufmerksamkeit und Reichweite."],
  ["Vergleichstabelle der Tarife", 1, "Hilft beim Vergleich."],
  ["Retargeting: „Gratisversand für das Produkt im Warenkorb“", 2, "Stößt zum Kauf an."],
  ["Kostenloser Leitfaden gegen E-Mail", 1, "Sammelt Leads von Interessierten."],
  ["Artikel „5 Fehler bei der Matratzenwahl“", 0, "Breit nützlicher Inhalt."],
  ["Einladung zu einer kostenlosen Demo", 2, "Nah an der Entscheidung."],
  ["Webinar mit Kundenfallstudie", 1, "Baut Vertrauen in der Erwägung auf."],
]);
CAT("m7", "Welches Instrument des Kommunikationsmix ist das?", ["Werbung", "PR", "Verkaufsförderung", "Persönlicher Verkauf", "Direktmarketing"], [
  ["Plakat an der Autobahn", 0, "Bezahlt, unpersönlich, mit erkennbarem Absender."],
  ["Pressekonferenz zu einem neuen Werk", 1, "Zielt auf Medienberichterstattung."],
  ["Kauf 2, nimm 3", 2, "Kurzfristiger Anreiz."],
  ["Ein Vertriebler macht eine Demo im Büro des Kunden", 3, "Persönliche Präsentation."],
  ["Persönliche E-Mail mit Rabattcode", 4, "Direkte Verbindung zu ausgewählten Kunden."],
  ["Proben im Supermarkt", 2, "Anreiz zum Probieren."],
  ["SMS-Erinnerung an eine auslaufende Versicherung", 4, "Direktmarketing."],
]);
DEC("m7", "Ein Online-Möbelhändler gibt 100 % des Budgets für Retargeting und Anzeigen auf Markensuchen aus. Der ROAS sieht großartig aus, aber der Umsatz wächst seit einem Jahr nicht.", "Was ist die wahrscheinlichste Ursache?", [
  ["Der Funnel wird nicht gefüllt: Das gesamte Budget „erntet“ Menschen, die die Marke schon kennen, ohne neue Kunden zu gewinnen", true, "Retargeting und Markensuche erreichen bereits Interessierte. Ohne Investition im oberen Funnel (Reichweite bei neuen Menschen) wächst die Basis nicht. Der hohe ROAS ist hier irreführend."],
  ["Der ROAS ist zu hoch — man muss ihn senken", false, "Hoher ROAS ist nicht das Problem; das Problem ist, dass keine neuen Menschen in den Funnel kommen."],
  ["Retargeting funktioniert nicht", false, "Es funktioniert, aber nur bei bereits Interessierten; es schafft keine neue Nachfrage."],
  ["Die gesamte Werbung stoppen", false, "Dann fallen auch die Verkäufe aus dem unteren Funnel weg. Nötig ist Umverteilung, kein Stopp."],
]);
DEC("m7", "Neue Sportgetränkemarke will in 3 Monaten Bekanntheit bei 18–30-Jährigen. Das Budget ist begrenzt, die Zielgruppe schaut wenig Fernsehen.", "Welcher Mix ist am besten?", [
  ["Kurze Social-Media-Videos + Micro-Influencer aus dem Sport + Proben bei Events", true, "Erreicht die Zielgruppe dort, wo sie ist, mit authentischer Stimme und Produktprobe. Effizient bei begrenztem Budget."],
  ["Nationale TV-Kampagne zur Primetime", false, "Teuer und mit hohem Streuverlust außerhalb der Zielgruppe, die wenig fernsieht."],
  ["Nur Suchmaschinenanzeigen", false, "Niemand sucht nach einer Marke, die er nicht kennt; Suche erntet Nachfrage, schafft sie aber nicht."],
  ["Nur Plakate in Schulen", false, "Ungeeignet für 18–30 und mit begrenzter Reichweite."],
]);
OPEN("m7", "Was ist der Unterschied zwischen Reichweite, Frequenz und Impressionen?", "Die Reichweite ist die Zahl eindeutiger Personen, die die Werbung mindestens einmal gesehen haben. Die Frequenz ist, wie oft eine Person sie durchschnittlich gesehen hat. Impressionen sind die Gesamtzahl der Einblendungen = Reichweite × Frequenz. Beispiel: 20 000 Personen × 3 Kontakte = 60 000 Impressionen.", ["eindeutig|einzig|unique", "durchschnitt", "einblendung", "×|multipli|mal"]);
OPEN("m7", "Was ist IMC und warum ist es wichtig?", "Integrierte Marketingkommunikation koordiniert alle Kanäle — Werbung, PR, digital, Vertrieb, Verpackung — so, dass sie eine klare und einheitliche Botschaft senden. Wichtig, weil der Kunde die Marke an vielen Kontaktpunkten trifft; widersprüchliche Botschaften verwirren und senken Vertrauen, konsistente verstärken sich gegenseitig.", ["kanal", "botschaft", "einheitlich|konsistent|eine", "vertrauen|verwirr|verstärk"]);
OPEN("m7", "Warum müssen Branding und Performance-Marketing kombiniert werden?", "Branding baut Bekanntheit und Präferenz auf und füllt den oberen Funnel — es schafft künftige Nachfrage. Performance-Marketing „erntet“ bestehende Nachfrage mit messbaren Aktionen. Nur Performance erschöpft den Funnel und die Kosten pro Kunde steigen; nur Branding lässt die kurzfristigen Verkäufe leiden.", ["bekanntheit|präferenz", "funnel|trichter", "nachfrage", "messbar|conversion|verkäuf"]);

// ═════ m8
TF("m8", "SEO bringt bezahlten Traffic aus Suchmaschinen.", false, "SEO bringt kostenlosen (organischen) Traffic. Bezahlter kommt aus Anzeigen (SEA/PPC).");
TF("m8", "Ein höherer Quality Score kann den Klickpreis senken.", true, "Die Plattform belohnt relevante Anzeigen mit besserer Position zu niedrigerem Preis.");
TF("m8", "Retargeting zeigt Anzeigen Menschen, die nie von der Marke gehört haben.", false, "Das macht die Lookalike-Zielgruppe. Retargeting richtet sich an Menschen, die schon mit der Marke interagiert haben.");
TF("m8", "Beim A/B-Test ist es gut, Headline, Bild und Preis gleichzeitig zu ändern.", false, "Ändert man vieles auf einmal, weiß man nicht, was den Unterschied gemacht hat. Man ändert eine Variable.");
TF("m8", "UTM-Parameter zeigen, aus welcher Quelle ein Besuch kam.", true, "utm_source, utm_medium und utm_campaign kennzeichnen den Link für die Analyse.");
TF("m8", "Die Suche „Laufschuhe Größe 43 kaufen Preis“ hat eine transaktionale Absicht.", true, "Wörter wie „kaufen“ und „Preis“ zeigen Kaufbereitschaft.");
ERR("m8", "„Wir schicken den Newsletter an alle gekauften E-Mail-Adressen — je mehr, desto besser.“", "Werbe-E-Mails ohne Einwilligung sind Spam und verstoßen gegen DSGVO und §7 UWG; außerdem schaden sie der Zustellbarkeit.",
  ["Man sollte noch mehr Adressen kaufen.", "Das einzige Problem ist, dass der Newsletter langweilig ist.", "Kein Fehler."],
  "E-Mail-Marketing braucht eine Rechtsgrundlage (meist Einwilligung) und eine Abmeldemöglichkeit. Gekaufte Listen sind ineffektiv und rechtswidrig.");
ERR("m8", "„Unsere Anzeige hat eine CTR von 8 %, also ist die Kampagne erfolgreich.“", "Eine hohe CTR zeigt eine attraktive Anzeige, belegt aber keine Verkäufe — man muss Conversions, CPA und ROAS ansehen.",
  ["8 % CTR sind zu niedrig.", "Die CTR wird nicht in Prozent gemessen.", "Kein Fehler."],
  "Irreführende Werbung kann eine hohe CTR und null Verkäufe haben. Erfolg misst man am Geschäftsziel.");
SEQ("m8", "Ordne die Schritte eines A/B-Tests", ["Hypothese formulieren", "Eine Variable zum Ändern wählen", "Kennzahl und Stichprobengröße festlegen", "Traffic zufällig auf A und B aufteilen", "Genügend Daten abwarten", "Auswerten und den Gewinner umsetzen"],
  "Hypothese → Kontrolle der Variablen → ausreichende Stichprobe → zufällige Aufteilung → Entscheidung.");
SEQ("m8", "Ordne den Weg bei einer Suche", ["Die Person tippt ein Keyword", "Die Suchmaschine zeigt die SERP", "Die Person klickt auf ein Ergebnis", "Die Zielseite öffnet sich", "Die Person führt eine Conversion aus"],
  "Von der Absicht in der Suche zur Aktion auf der Website.");
CAT("m8", "Welche Suchintention liegt vor?", ["Informational", "Navigational", "Vergleichend", "Transaktional"], [
  ["„Wie reinige ich eine Kaffeemaschine“", 0, "Sucht Wissen."],
  ["„Facebook Login“", 1, "Sucht eine bestimmte Website."],
  ["„Beste Kopfhörer bis 100 €“", 2, "Vergleicht Optionen."],
  ["„iPhone 15 kaufen Preis“", 3, "Ist kaufbereit."],
  ["„Was ist eine Hypothek“", 0, "Informational."],
  ["„Vergleich Spotify oder YouTube Music“", 2, "Vergleichend."],
  ["„Pizza bestellen Ehrenfeld“", 3, "Transaktional."],
]);
CAT("m8", "Welches Instrument ist das?", ["SEO", "PPC/SEA", "Retargeting", "Lookalike", "E-Mail-Automatisierung"], [
  ["Bilder komprimieren, damit die Seite in der Suche schneller ist", 0, "On-Page-SEO."],
  ["Gebote auf „Waschmaschine Reparatur Köln“", 1, "Bezahlte Suchanzeige."],
  ["Anzeige für das Produkt, das du gestern angesehen hast", 2, "Wird bekannten Besuchern gezeigt."],
  ["Neue Menschen, die den besten Kunden ähneln", 3, "Die Plattform findet ähnliche Profile."],
  ["Mail eine Stunde nach verlassenem Warenkorb", 4, "Automatisch, verhaltensbasiert."],
  ["Artikel, der eine häufig gesuchte Frage beantwortet", 0, "Inhalt für die organischen Ergebnisse."],
]);
DEC("m8", "Lokale Zahnarztpraxis in Leipzig. Budget 600 €/Monat. Ziel: mehr gebuchte Termine.", "Welcher Kanal hat Priorität?", [
  ["Suchanzeigen für „Zahnarzt Leipzig“ + optimiertes Google-Maps-Profil mit Bewertungen", true, "Wer einen Zahnarzt sucht, hat hohe Absicht — genau dann muss man dich finden. Lokale Ergebnisse und Bewertungen sind entscheidend."],
  ["Videoanzeigen auf YouTube bundesweit", false, "Riesiger Streuverlust außerhalb Leipzigs und ohne Absicht."],
  ["Programmatic-Banner auf Nachrichtenseiten", false, "Niedrige CTR und keine Absicht; geeignet für Bekanntheit bei größerem Budget."],
  ["TikTok-Influencer mit 2 Mio. Followern", false, "Teuer und zielt nicht auf die Menschen vor Ort, die jetzt einen Zahnarzt brauchen."],
]);
DEC("m8", "Onlineshop: 10 000 Besuche/Monat, Conversion 0,8 %, der Marktdurchschnitt liegt bei etwa 2 %. Der Inhaber will das Werbebudget verdoppeln.", "Was ist der klügere erste Schritt?", [
  ["CRO: Funnel analysieren (wo springen Leute ab), Checkout vereinfachen, Bewertungen, Ladezeit — und A/B-Tests", true, "Bei niedriger Conversion bringt doppeltes Budget doppelte Kosten bei schlechter Wirkung. Steigt die Conversion auf 1,6 %, verdoppelt sich der Umsatz ohne zusätzliches Werbebudget."],
  ["Doppeltes Budget — mehr Traffic, mehr Umsatz", false, "Mehr Traffic auf eine Seite, die nicht konvertiert, verdoppelt die Kosten und hilft kaum."],
  ["Alle Anzeigen durch neue ersetzen", false, "Das Problem kann in der Website liegen, nicht in den Anzeigen — erst Diagnose."],
  ["Alle Preise um 30 % senken", false, "Teure Lösung ohne Diagnose der Ursache."],
]);
OPEN("m8", "Was ist der Unterschied zwischen SEO und SEA/PPC? Wann würdest du was wählen?", "SEO optimiert die Website für die kostenlosen Ergebnisse — langsam (Monate), aber dauerhaft und ohne Klickkosten. SEA/PPC sind bezahlte Suchanzeigen — schneller, steuerbarer Traffic, man zahlt jeden Klick und es stoppt mit dem Budget. PPC für schnellen Start, Keyword-Tests, saisonale Kampagnen; SEO für langfristigen Zustrom. Am besten kombiniert man beides.", ["organisch|kostenlos", "bezahl|klick", "langsam|langfristig|monat", "schnell|sofort", "kombin"]);
OPEN("m8", "Erkläre den Unterschied zwischen Retargeting und Lookalike-Zielgruppe.", "Retargeting zeigt Anzeigen Menschen, die bereits mit der Marke interagiert haben (Website besucht, in den Warenkorb gelegt), aber nicht gekauft haben — höhere Conversion, aber kleine Zielgruppe. Die Lookalike-Zielgruppe sind neue Menschen, die den besten Kunden ähneln — dient der Skalierung und Neukundengewinnung.", ["interagiert|besucht|bekannt", "neu", "ähnl", "conversion|skalier"]);
OPEN("m8", "Wie würdest du einen A/B-Test einer Landingpage durchführen?", "1) Hypothese (z. B. ein kürzeres Formular erhöht die Anmeldungen). 2) Nur eine Variable ändern. 3) Hauptkennzahl (Anmelderate) und nötige Stichprobe festlegen. 4) Traffic zufällig 50/50 aufteilen. 5) Genügend Daten abwarten, den Test nicht zu früh stoppen. 6) Prüfen, ob der Unterschied statistisch signifikant ist, und den Gewinner umsetzen.", ["hypothese", "eine|variable", "kennzahl|metrik", "zufällig|50", "stichprobe|signifikan|genügend"]);

// ═════ m9
TF("m9", "CPA = CPC / Conversion-Rate.", true, "Kostet der Klick 0,50 € und kaufen 2 % der Klickenden, braucht man 50 Klicks pro Kauf → 25 €.");
TF("m9", "Ein ROAS von 3 bedeutet immer eine profitable Kampagne.", false, "Hängt von der Marge ab. Bei 25 % Marge braucht man mindestens ROAS 4, um die Werbekosten zu decken (1 / 0,25).");
TF("m9", "Der CAC enthält auch die Gehälter des Marketing- und Vertriebsteams.", true, "CAC sind die Gesamtkosten der Gewinnung — nicht nur das Werbebudget.");
TF("m9", "Der Marktanteil kann wachsen, obwohl der Umsatz des Unternehmens sinkt.", true, "Schrumpft der Markt schneller als der Umsatz des Unternehmens, wächst dessen Anteil.");
TF("m9", "Last-Click-Attribution beweist, welcher Kanal die Verkäufe verursacht.", false, "Attribution verteilt nur den Verdienst. Kausalität belegt man mit einem Experiment (Kontrollgruppe).");
TF("m9", "CPM ist der Preis für 1 000 000 Einblendungen.", false, "„Mille“ heißt tausend — CPM ist der Preis für 1000 Einblendungen.");
TF("m9", "Bei 5 % monatlichem Churn bleibt ein Kunde im Schnitt etwa 20 Monate.", true, "Vereinfacht: durchschnittliche Dauer ≈ 1 / Churn = 1 / 0,05 = 20 Monate.");
ERR("m9", "„ROI = Umsatz / Werbekosten.“", "Das ist der ROAS. ROI = (Gewinn − Investition) / Investition; im Marketing rechnet man mit dem Gewinn nach Wareneinsatz.",
  ["ROI = Kosten / Umsatz.", "ROI = Klicks / Impressionen.", "Kein Fehler."],
  "ROAS schaut auf den Umsatz; ROI auf den Nettogewinn. Eine Kampagne mit ROAS 3 kann bei niedriger Marge einen negativen ROI haben.");
ERR("m9", "„LTV ist 500 €, CAC ist 600 € — wir wachsen gut, jeder Neukunde ist Gewinn.“", "Ist der CAC größer als der LTV, bringt jeder Neukunde Verlust; Wachstum beschleunigt die Verluste.",
  ["Der LTV muss kleiner als der CAC sein.", "CAC wird nicht mit LTV verglichen.", "Kein Fehler."],
  "LTV:CAC unter 1:1 heißt Verlust pro Kunde. Ein oft zitierter Richtwert für gesunde Abo-Geschäfte liegt bei etwa 3:1.");
ERR("m9", "„Wir haben 50 000 Follower, also ist unser Marketing erfolgreich.“", "Die Followerzahl ist eine Vanity Metric, wenn sie nicht mit Verkäufen, Leads oder Bindung zusammenhängt.",
  ["Wir brauchen mindestens 100 000.", "Follower sind der wichtigste KPI.", "Kein Fehler."],
  "Erfolg misst man am Geschäftsziel — Verkäufe, Kunden, Umsatz.");
SEQ("m9", "Ordne die Kennzahlen nach Funnel-Reihenfolge", ["Impressionen", "Klicks", "Besuche der Zielseite", "In den Warenkorb", "Bestellungen", "Wiederkäufe"],
  "Jeder folgende Schritt ist eine Teilmenge des vorherigen.");
CAT("m9", "Welche Kennzahl beantwortet die Frage?", ["CTR", "CPC", "CPA", "ROAS", "Churn"], [
  ["Wie attraktiv ist die Anzeige?", 0, "Klicks / Impressionen."],
  ["Was kostet uns ein Klick?", 1, "Kosten / Klicks."],
  ["Was kostet uns eine Bestellung?", 2, "Kosten / Conversions."],
  ["Wie viel Umsatz bringt jeder Werbe-Euro?", 3, "Umsatz / Werbekosten."],
  ["Wie viele Abonnenten verlieren wir jeden Monat?", 4, "Abwanderung."],
  ["Was kostet ein neuer Abonnent aus der Kampagne?", 2, "Kosten pro Aktion."],
]);
CAT("m9", "Vanity oder nützliche Kennzahl beim Ziel „mehr Onlineverkäufe“?", ["Vanity", "Nützlich"], [
  ["Anzahl der Likes der Seite", 0, "Nicht direkt mit Verkäufen verbunden."],
  ["Conversion-Rate", 1, "Direkt mit Verkäufen verbunden."],
  ["Anzahl der Follower", 0, "Ohne Bezug zu Verkäufen."],
  ["ROAS", 1, "Umsatz im Verhältnis zu Kosten."],
  ["Impressionen ohne Kontext", 0, "Nur Einblendungen."],
  ["Durchschnittlicher Bestellwert", 1, "Wirkt direkt auf den Umsatz."],
]);
DEC("m9", "Zwei Kampagnen: A — CPC 0,30 €, Conversion 0,5 %; B — CPC 1,20 €, Conversion 4 %. Durchschnittliche Bestellung 80 €.", "Welche Kampagne ist bei den Kosten pro Bestellung effizienter?", [
  ["B — CPA 30 € gegenüber 60 € bei A", true, "CPA = CPC / CVR. A: 0,30 / 0,005 = 60 €. B: 1,20 / 0,04 = 30 €. Der teurere Klick bringt eine halb so teure Bestellung."],
  ["A — weil der Klick viermal billiger ist", false, "Billiger Klick mit niedriger Conversion führt zu teurer Bestellung: 0,30 / 0,005 = 60 €."],
  ["Gleich", false, "Die CPA sind 60 € und 30 €."],
  ["Ohne Impressionen nicht zu beurteilen", false, "Für den CPA braucht man keine Impressionen — CPC und CVR reichen."],
]);
DEC("m9", "Kunde: „Instagram bringt uns keine Verkäufe — im Bericht kommen fast alle Verkäufe aus der Markensuche. Wir stoppen Instagram.“", "Was antwortest du am besten?", [
  ["„Der Bericht ist Last-Click — Instagram kann das Interesse wecken, und die Leute suchen dann nach der Marke. Ich schlage einen Test vor: Wir stoppen Instagram 4 Wochen in einer Region und vergleichen Suchen und Verkäufe.“", true, "Last-Click-Attribution unterschätzt den oberen Funnel. Das Experiment (Geo-Test) misst den echten Zusatzeffekt, statt über Meinungen zu streiten."],
  ["„Einverstanden — wir stoppen Instagram sofort.“", false, "Du riskierst, die Quelle der Nachfrage zu stoppen; die Verkäufe aus der Markensuche fallen dann nach Wochen."],
  ["„Instagram funktioniert immer, nicht stoppen.“", false, "Ohne Daten ist das eine Meinung; der Kunde hat das Recht, Belege zu verlangen."],
  ["„Lass uns das ganze Budget zu Instagram verschieben.“", false, "Ebenso unbegründet — es braucht einen Test."],
]);
OPEN("m9", "Was ist der Unterschied zwischen ROAS und ROI? Nenne ein Beispiel, in dem der ROAS gut aussieht, der ROI aber negativ ist.", "ROAS = Umsatz / Werbekosten (berücksichtigt keinen Wareneinsatz). ROI = (Gewinn − Investition) / Investition. Beispiel: 1000 € Werbung → 3000 € Umsatz → ROAS 3. Bei 30 % Marge ist der Gewinn 900 € → ROI = (900 − 1000) / 1000 = −10 %. Der Mindest-ROAS für Break-even ist 1 / Marge.", ["umsatz", "gewinn", "marge|wareneinsatz", "kosten", "1 / marge|1/marge|−|-"]);
OPEN("m9", "Was ist LTV:CAC und wie wird es genutzt?", "LTV ist der Wert (Gewinn) eines Kunden über die gesamte Dauer; CAC die gesamten Kosten seiner Gewinnung (Werbung, Gehälter, Tools). Das Verhältnis zeigt, ob Wachstum profitabel ist: unter 1:1 — Verlust mit jedem Kunden; etwa 3:1 gilt bei Abos als gesund; sehr hoch kann heißen, dass zu wenig in Wachstum investiert wird. Man betrachtet es zusammen mit der Amortisationsdauer.", ["wert|gewinn", "gewinnung|kosten", "3:1|3 zu 1|drei", "1:1|verlust", "amortis"]);
OPEN("m9", "Warum beweist Attribution keine Kausalität und wie misst man den echten Effekt?", "Attribution verteilt den Verdienst nur nach einer Regel auf die Kontaktpunkte (Last-Click, linear usw.). Sie sagt nicht, was ohne die Werbung passiert wäre — ein Teil hätte ohnehin gekauft. Den echten (zusätzlichen) Effekt misst man mit einem Experiment: Kontrollgruppe, die die Werbung nicht sieht, oder Geo-Test mit Regionen mit und ohne Kampagne.", ["verteil|verdienst", "kontroll|experiment|test", "ohne werbung|ohnehin", "zusätzlich|inkrement"]);

// ═════ m10
TF("m10", "„Den Umsatz steigern“ ist ein SMART-Ziel.", false, "Nicht spezifisch, nicht messbar, ohne Termin. SMART: „+15 % Onlineumsatz bis 31.12. gegenüber dem Vorjahr“.");
TF("m10", "Diversifikation ist die riskanteste Richtung in der Ansoff-Matrix.", true, "Neues Produkt auf neuem Markt — das Unternehmen hat mit beidem keine Erfahrung.");
TF("m10", "Cash Cows haben einen kleinen Marktanteil in einem schnell wachsenden Markt.", false, "Das sind Question Marks. Cash Cows haben einen großen Anteil in einem langsam wachsenden Markt.");
TF("m10", "Die Prozent-vom-Umsatz-Methode kehrt die Logik um: Der Umsatz bestimmt das Marketing, nicht umgekehrt.", true, "Sinkt der Umsatz, wird das Budget genau dann gekürzt, wenn es am meisten gebraucht wird.");
TF("m10", "Maßnahmen ändern sich seltener als die Strategie.", false, "Umgekehrt: Die Strategie ist die langfristige Wahl; Maßnahmen werden je nach Ergebnissen oft angepasst.");
ERR("m10", "„In der SWOT haben wir notiert: Chance — unser erfahrenes Team.“", "Das erfahrene Team ist eine interne Ressource → Stärke (S). Chancen sind externe Faktoren.",
  ["Das erfahrene Team ist ein Risiko.", "Das erfahrene Team ist eine Schwäche.", "Kein Fehler."],
  "S und W sind intern; O und T extern.");
ERR("m10", "„Wir bringen dieselben Produkte nach Österreich — das ist Diversifikation.“", "Dieselben Produkte auf einem neuen Markt sind Marktentwicklung. Diversifikation ist ein neues Produkt auf neuem Markt.",
  ["Das ist Marktdurchdringung.", "Das ist Produktentwicklung.", "Kein Fehler."],
  "In der Ansoff-Matrix: altes Produkt + neuer Markt = Marktentwicklung.");
SEQ("m10", "Ordne die Teile des Marketingplans", ["Situationsanalyse (SWOT, PESTEL)", "Marketingziele (SMART)", "Strategie (STP, Positionierung)", "Maßnahmen (4P/7P)", "Budget", "Umsetzung und Kontrolle (KPI)"],
  "Wo wir stehen → wohin wir wollen → wie → womit → mit wie viel Geld → woran wir es merken.");
SEQ("m10", "Ordne die Ziel-Aufgaben-Methode", ["Ziel festlegen", "Für das Ziel nötige Aufgaben bestimmen", "Kosten jeder Aufgabe berechnen", "Budget zusammenführen", "Mit den Möglichkeiten abgleichen und anpassen"],
  "Das Budget wird von unten aus den Zielen aufgebaut.");
CAT("m10", "Welche Ansoff-Strategie ist das?", ["Marktdurchdringung", "Marktentwicklung", "Produktentwicklung", "Diversifikation"], [
  ["Treueprogramm für die bestehenden Kunden", 0, "Gleiches Produkt, gleicher Markt — mehr Absatz."],
  ["Deutsche Kosmetik geht nach Polen", 1, "Gleiches Produkt, neuer Markt."],
  ["Fitnessstudio ergänzt Onlinetraining für seine Mitglieder", 2, "Neues Produkt für dieselben Kunden."],
  ["Möbelhersteller eröffnet ein Hotel", 3, "Neues Produkt, neuer Markt."],
  ["Software für kleine Firmen wird jetzt an Schulen verkauft", 1, "Neues Segment — Marktentwicklung."],
  ["Café bringt Sandwiches für Stammgäste", 2, "Neues Produkt, dieselben Kunden."],
  ["Aktion „2 für 1“ in den bestehenden Läden", 0, "Durchdringung."],
]);
CAT("m10", "Welches SWOT-Feld ist das (für ein lokales Café)?", ["Stärke", "Schwäche", "Chance", "Risiko"], [
  ["Erfahrene, preisgekrönte Baristas", 0, "Interne Ressource, Vorteil."],
  ["Nur 12 Sitzplätze", 1, "Interne Einschränkung."],
  ["Nebenan entsteht ein Bürogebäude für 2000 Menschen", 2, "Externe Chance."],
  ["Eine große Kette eröffnet in der Nachbarstraße", 3, "Externes Risiko."],
  ["Schwache Website, keine Onlinebestellung", 1, "Interne Schwäche."],
  ["Der Preis für Kaffeebohnen steigt", 3, "Externer Faktor."],
  ["Loyale Community von Stammgästen", 0, "Interne Stärke."],
  ["Wachsendes Interesse an Spezialitätenkaffee", 2, "Externer Trend."],
]);
CAT("m10", "Welche Budgetmethode ist das?", ["Was übrig bleibt", "Prozent vom Umsatz", "Konkurrenzorientiert", "Ziel-Aufgaben"], [
  ["„Was am Monatsende übrig ist“", 0, "Restgröße."],
  ["5 % vom Vorjahresumsatz", 1, "Prozent vom Umsatz."],
  ["„Wir geben so viel aus wie der Hauptwettbewerber“", 2, "Parität mit der Konkurrenz."],
  ["Ziel 200 Kunden × CPA 30 € + Content", 3, "Vom Ziel zu den Aufgaben."],
]);
DEC("m10", "Getränkehersteller: Produkt A — Marktführer im reifen Markt, bringt viel Geld; Produkt B — 3 % Anteil in schnell wachsendem Markt; Produkt C — kleiner Anteil in schrumpfendem Markt.", "Wie verteilst du die Investitionen nach BCG?", [
  ["Das Geld von A (Cash Cow) — für B (Question Mark), wenn es Chancen hat, ein Star zu werden; für C — minimale Investitionen oder Rückzug", true, "Klassische BCG-Logik: Cash Cows finanzieren vielversprechende Question Marks; Poor Dogs bekommen keine neuen Investitionen, außer aus strategischem Grund."],
  ["Das meiste Geld in A, weil es am profitabelsten ist", false, "A ist in einem reifen Markt — zusätzliche Investitionen bringen wenig Wachstum; es braucht nur Pflege."],
  ["Das meiste Geld in C, um es wiederzubeleben", false, "Schrumpfender Markt und kleiner Anteil — die schlechteste Kombination für eine Investition."],
  ["Gleichmäßig verteilen", false, "Ignoriert die unterschiedlichen Positionen und Potenziale."],
]);
DEC("m10", "Ein Start-up mit begrenztem Budget will das Marketingbudget für das erste Jahr festlegen.", "Welche Methode passt am besten?", [
  ["Ziel-Aufgaben-Methode: vom Ziel für die Kundenzahl und dem erwarteten CPA zum Budget, mit Prüfung der Machbarkeit", true, "Verknüpft Geld mit Ergebnis; neue Firmen haben keinen historischen Umsatz, von dem man einen Prozentsatz nehmen könnte."],
  ["Prozent vom Umsatz", false, "Das Start-up hat kaum Umsatz — das Budget wäre null."],
  ["So viel wie der größte Wettbewerber", false, "Der Wettbewerber hat andere Ziele und Ressourcen."],
  ["Was übrig bleibt", false, "Nicht strategisch und führt meist zu einem zu kleinen Budget."],
]);
OPEN("m10", "Was ist ein SMART-Ziel? Mache aus „wir wollen mehr Kunden“ ein SMART-Ziel.", "Ein SMART-Ziel ist spezifisch (Specific), messbar (Measurable), erreichbar (Achievable), relevant (Relevant) und terminiert (Time-bound). Beispiel: „Bis 30. Juni 150 neue Mitglieder für das Fitnessstudio aus Schwabing gewinnen, bei Akquisitionskosten bis 40 €, um die Vormittagsstunden auszulasten.“", ["spezifisch", "messbar", "erreichbar", "relevant", "termin|frist|bis"]);
OPEN("m10", "Erkläre die Ansoff-Matrix und das Risiko jeder Strategie.", "Die Matrix kombiniert bestehende/neue Produkte und bestehende/neue Märkte. Marktdurchdringung (altes Produkt, alter Markt) — geringstes Risiko. Marktentwicklung (altes Produkt, neuer Markt) und Produktentwicklung (neues Produkt, alter Markt) — mittleres Risiko. Diversifikation (neues Produkt, neuer Markt) — höchstes Risiko, weil Erfahrung mit Produkt und Kunden fehlt.", ["durchdring", "marktentwicklung", "produktentwicklung", "diversifi", "risiko"]);
OPEN("m10", "Was ist der Unterschied zwischen Strategie und Maßnahmen im Marketingplan?", "Die Strategie ist die langfristige Wahl, wie die Ziele erreicht werden: welche Segmente, welche Position, welcher Vorteil. Maßnahmen sind die konkreten Schritte zur Umsetzung — Kanäle, Kampagnen, Preise, Zeitplan, Verantwortliche, Budget. Die Strategie ändert sich selten; Maßnahmen werden je nach Ergebnissen oft angepasst.", ["langfrist", "segment|position", "konkret|schritt|aktivit", "kanal|kampagne|zeitplan"]);

// ═════ m11
TF("m11", "Fokusgruppen liefern statistisch repräsentative Ergebnisse für den gesamten Markt.", false, "6–10 Personen sind nicht repräsentativ. Fokusgruppen liefern Ideen und Hypothesen, die quantitativ geprüft werden.");
TF("m11", "Sekundärdaten gibt es schon — sie wurden von jemand anderem für einen anderen Zweck erhoben.", true, "Zum Beispiel Statistiken, Branchenberichte, interne Verkaufsdaten.");
TF("m11", "Eine größere Stichprobe behebt immer die Stichprobenverzerrung.", false, "Ist die Stichprobe systematisch verzerrt, liefern mehr Antworten derselben Leute denselben falschen Schluss — nur selbstsicherer.");
TF("m11", "Um den Stichprobenfehler zu halbieren, braucht man etwa die vierfache Stichprobe.", true, "Der Fehler sinkt mit der Quadratwurzel der Stichprobengröße.");
TF("m11", "Der NPS kann negativ sein.", true, "NPS = % Promotoren − % Kritiker; gibt es mehr Kritiker, ist das Ergebnis negativ (bis −100).");
TF("m11", "Das Experiment ist die Methode, die Ursache-Wirkung am besten belegt.", true, "Man ändert einen Faktor bei vergleichbaren Gruppen und misst die Wirkung.");
ERR("m11", "„Wir haben unsere Instagram-Follower gefragt und 85 % mögen das neue Produkt — also werden es 85 % des Marktes mögen.“", "Das ist eine bequeme, verzerrte Stichprobe — die Follower mögen die Marke schon. Der Schluss lässt sich nicht auf den ganzen Markt übertragen.",
  ["Wir hätten mehr Follower fragen sollen.", "85 % sind zu niedrig.", "Kein Fehler."],
  "Nicht zufällige Stichproben erlauben keine Verallgemeinerung auf die Grundgesamtheit.");
ERR("m11", "„Frage im Fragebogen: Wie sehr gefällt Ihnen unser wunderbarer und schneller Service?“", "Die Frage ist suggestiv („wunderbar“) und doppelt („wunderbar und schnell“). Besser: „Wie bewerten Sie die Geschwindigkeit des Service?“ getrennt von der Freundlichkeit.",
  ["Die Frage ist zu kurz.", "Es muss eine offene Frage sein.", "Kein Fehler."],
  "Suggestiv- und Doppelfragen verzerren die Antworten.");
ERR("m11", "„Kunden, die den Newsletter lesen, kaufen dreimal so viel — der Newsletter verdreifacht den Umsatz.“", "Das ist eine Korrelation, keine belegte Kausalität — vielleicht lesen die loyalsten Kunden den Newsletter. Es braucht ein Experiment.",
  ["Der Newsletter vervierfacht ihn.", "Zwischen Newsletter und Umsatz gibt es keinen Zusammenhang.", "Kein Fehler."],
  "Korrelation ist ein Hinweis für eine Hypothese; Kausalität erfordert eine Kontrollgruppe.");
SEQ("m11", "Ordne den Marktforschungsprozess", ["Problem und Ziele definieren", "Plan und Methoden wählen", "Stichprobe und Instrumente festlegen", "Daten erheben", "Analysieren", "Schlussfolgerungen und Empfehlungen präsentieren"],
  "Man beginnt mit der zu treffenden Entscheidung — nicht mit dem Fragebogen.");
SEQ("m11", "Ordne einen guten Fragebogen", ["Einleitung und Zweck", "Filterfragen (passt die befragte Person?)", "Allgemeine Fragen", "Konkrete Fragen zum Thema", "Demografische Fragen", "Dank"],
  "Leicht → schwer; persönliche/demografische Fragen kommen am Ende, wenn schon Vertrauen besteht.");
CAT("m11", "Qualitative oder quantitative Methode?", ["Qualitativ", "Quantitativ"], [
  ["12 Tiefeninterviews", 0, "Wenige Personen, tiefes Verständnis."],
  ["Onlinebefragung mit 1000 Personen", 1, "Große Stichprobe, Zahlen."],
  ["Fokusgruppe mit 8 Eltern", 0, "Gruppendiskussion."],
  ["A/B-Test mit 20 000 Besuchern", 1, "Experiment mit Messung."],
  ["Ethnografische Beobachtung in Haushalten", 0, "Tiefe Beobachtung."],
  ["Analyse der Verkäufe nach Regionen", 1, "Numerische Daten."],
]);
CAT("m11", "Primär- oder Sekundärdaten?", ["Primär", "Sekundär"], [
  ["Befragung, die wir unter unseren Kunden durchführen", 0, "Für unseren Zweck erhoben."],
  ["Daten des Statistischen Bundesamts", 1, "Von anderen für andere Zwecke erhoben."],
  ["Branchenbericht zum Kaffeemarkt", 1, "Bereits vorhandene Information."],
  ["Testkäufer in unseren Filialen", 0, "Speziell für uns erhoben."],
  ["Veröffentlichte Jahresabschlüsse eines Wettbewerbers", 1, "Verfügbare Daten."],
  ["Fokusgruppe zu einer neuen Verpackung", 0, "Neue Daten für den konkreten Zweck."],
]);
DEC("m11", "Eine Restaurantkette will verstehen, warum Neukunden nicht wiederkommen. Es gibt keine Daten.", "Welche Reihenfolge ist am besten?", [
  ["Zuerst qualitativ (Interviews mit Kunden, die nicht wiederkamen) für Hypothesen, dann quantitativ (Befragung), um zu prüfen, wie verbreitet jeder Grund ist", true, "Qualitativ deckt das „Warum“ auf, quantitativ misst das „Wie viel“. Ohne Hypothesen fragt die Befragung die falschen Dinge."],
  ["Nur eine große Onlinebefragung mit vorgegebenen Antworten", false, "Kennt man die Gründe nicht, können vorgegebene Antworten den echten verfehlen."],
  ["Nur eine Fokusgruppe und Entscheidungen danach", false, "8 Personen sind nicht repräsentativ — es braucht eine Prüfung."],
  ["Kopieren, was die Konkurrenz macht", false, "Beantwortet nicht, warum deine Kunden nicht wiederkommen."],
]);
DEC("m11", "Befragung mit 200 Personen: 45 % kaufen das neue Produkt „sehr wahrscheinlich“. Der Fehler bei dieser Stichprobe liegt bei etwa ±7 Punkten.", "Wie präsentierst du das Ergebnis?", [
  ["„Zwischen etwa 38 % und 52 % der Zielgruppe geben eine hohe Kaufwahrscheinlichkeit an — erklärte Absicht liegt meist über dem echten Verhalten“", true, "Du nennst das Intervall und warnst, dass Absicht ≠ Kauf. Ehrlich und nützlich für die Entscheidung."],
  ["„45 % des Marktes werden das Produkt kaufen“", false, "Ignoriert den Fehler und den Unterschied zwischen Absicht und echtem Kauf."],
  ["„Fast die Hälfte der Menschen liebt das Produkt“", false, "Übertreibt und vertauscht die Frage (Kaufwahrscheinlichkeit ≠ Liebe)."],
  ["„Die Daten sind nutzlos, weil es einen Fehler gibt“", false, "Jede Stichprobe hat einen Fehler; wichtig ist, ihn zu berücksichtigen."],
]);
OPEN("m11", "Was ist der Unterschied zwischen qualitativer und quantitativer Forschung? Wann nutzt man welche?", "Qualitative Forschung sucht das „Warum“ und „Wie“ — Tiefeninterviews, Fokusgruppen, Beobachtung; kleine Stichproben, reiche Information, nicht repräsentativ. Man nutzt sie, um Motive zu entdecken und Hypothesen zu formulieren. Quantitative misst das „Wie viel“ — Befragungen mit großen Stichproben, Experimente, Statistik. Man nutzt sie, um Hypothesen zu prüfen und die Verbreitung zu schätzen.", ["warum", "wie viel", "interview|fokus", "befrag|statist", "hypothese"]);
OPEN("m11", "Wie berechnet man den NPS? Berechne ihn bei 50 % Promotoren, 30 % Passiven und 20 % Kritikern.", "Frage: „Wie wahrscheinlich ist es, dass Sie uns weiterempfehlen (0–10)?“ Promotoren — 9–10, Passive — 7–8, Kritiker — 0–6. NPS = % Promotoren − % Kritiker = 50 − 20 = +30. Passive werden nicht abgezogen, verringern aber den Anteil der anderen Gruppen. Spanne von −100 bis +100.", ["9|10", "0|6", "promotor", "kritiker", "30"]);
OPEN("m11", "Was ist Stichprobenverzerrung und wie vermeidet man sie?", "Systematischer Unterschied zwischen Stichprobe und Grundgesamtheit — manche Gruppen sind über- oder unterrepräsentiert (z. B. Befragung nur online, nur in Berlin, nur unter zufriedenen Kunden). Man vermeidet sie mit einer Zufallsstichprobe aus einer vollständigen Liste der Grundgesamtheit, Quoten/Schichtung nach Schlüsselmerkmalen, verschiedenen Erhebungskanälen und Gewichtung der Ergebnisse. Eine größere Stichprobe behebt sie nicht.", ["systematisch|repräsent", "zufall", "quote|schicht", "nicht|größere"]);

// ═════ m12
TF("m12", "Ein vorangekreuztes Kästchen ist eine gültige Einwilligung nach DSGVO.", false, "Die Einwilligung erfordert eine aktive Handlung — der Nutzer kreuzt das Kästchen selbst an.");
TF("m12", "Vergleichende Werbung ist in der EU verboten.", false, "Sie ist unter Bedingungen zulässig (§6 UWG): Vergleicht gleichartige Produkte objektiv und nachprüfbar, ohne herabzusetzen und ohne zu täuschen.");
TF("m12", "Bezahlte Influencer-Inhalte müssen klar gekennzeichnet sein.", true, "Schleichwerbung ist verboten; die Kennzeichnung muss sichtbar sein.");
TF("m12", "Bei einer angekündigten Preisermäßigung wird der niedrigste Preis der letzten 30 Tage angegeben.", true, "Regel aus der Omnibus-Richtlinie 2019/2161, in Deutschland in §11 PAngV umgesetzt.");
TF("m12", "Eine IP-Adresse ist niemals ein personenbezogenes Datum.", false, "Eine IP-Adresse kann personenbezogen sein, wenn sie einer bestimmten Person zugeordnet werden kann.");
TF("m12", "Das Bundeskartellamt ist die Hauptanlaufstelle für Verbraucher bei Problemen mit einem Onlinekauf.", false, "Für Verbraucherfragen sind vor allem die Verbraucherzentralen da. Das Bundeskartellamt schützt den Wettbewerb (Kartelle, Marktmacht).");
TF("m12", "DSGVO-Bußgelder können 4 % des weltweiten Jahresumsatzes erreichen.", true, "Bis 20 Mio. € oder 4 % des weltweiten Umsatzes — je nachdem, was höher ist.");
ERR("m12", "„Wir haben eine Liste mit 50 000 E-Mails gekauft — das ist legal, weil der Anbieter sagt, sie hätten eingewilligt.“", "Die Einwilligung muss konkret für dein Unternehmen und deinen Zweck, informiert und nachweisbar sein. Gekaufte Listen erfüllen das fast nie, der Versand ist Spam (§7 UWG).",
  ["Legal, wenn die Adressen deutsch sind.", "Legal, wenn man nur einmal sendet.", "Kein Fehler."],
  "Die Nachweispflicht für die Einwilligung liegt beim Absender. Eine allgemeine „Einwilligung für Angebote von Partnern“ reicht in der Regel nicht.");
ERR("m12", "„Wir schreiben „−50 %“ auf einen Preis, den wir letzte Woche erhöht haben.“", "Die Ermäßigung muss sich auf den niedrigsten Preis der letzten 30 Tage beziehen; eine künstliche Erhöhung vor dem Rabatt ist irreführend.",
  ["Wir sollten „−60 %“ schreiben.", "Geht, wenn es weniger als eine Woche ist.", "Kein Fehler."],
  "Die Regel zum niedrigsten Vorpreis (§11 PAngV) richtet sich genau gegen diesen Trick.");
ERR("m12", "„Unser Produkt ist 100 % öko“ — ohne jeden Beleg.", "Allgemeine Umweltaussagen ohne Belege sind riskant als Greenwashing und irreführende Werbung; die Aussage muss konkret und belegbar sein.",
  ["Es sollte „99 % öko“ heißen.", "Umweltaussagen sind nicht reguliert.", "Kein Fehler."],
  "Konkret: „Die Verpackung besteht zu 80 % aus recyceltem Karton (Zertifikat X)“.");
SEQ("m12", "Ordne die Schritte bei einer Datenpanne", ["Vorfall eindämmen (Abfluss stoppen)", "Risiko für die Betroffenen bewerten", "Aufsichtsbehörde binnen 72 Stunden informieren", "Betroffene bei hohem Risiko informieren", "Dokumentieren und Ursache beheben"],
  "Die DSGVO verlangt schnelles Eindämmen, Bewertung, fristgerechte Meldung und Lehren daraus.");
CAT("m12", "Wer ist zuständig?", ["Verbraucherzentrale", "Bundeskartellamt", "Datenschutzbehörde", "Selbstkontrolle (Werberat)"], [
  ["Ein Onlineshop verweigert die Rücknahme innerhalb der 14-tägigen Widerrufsfrist", 0, "Verbraucherrechte."],
  ["Hersteller und Händler sprechen Endverkaufspreise ab", 1, "Kartell — Wettbewerbsverstoß."],
  ["Ein Unternehmen sendet Mails ohne Einwilligung und löscht Daten nicht auf Antrag", 2, "Datenschutz."],
  ["Werbung mit diskriminierenden Stereotypen", 3, "Verhaltensregeln der Werbewirtschaft."],
  ["Falscher „Statt-Preis“ bei einer Rabattaktion", 0, "Unlautere Praxis gegenüber Verbrauchern (Abmahnung)."],
  ["Missbrauch einer marktbeherrschenden Stellung durch eine Plattform", 1, "Wettbewerbsrecht."],
]);
CAT("m12", "Zulässig oder problematisch?", ["Zulässig / gute Praxis", "Problematisch / Verstoß"], [
  ["Influencerin mit Label „Bezahlte Partnerschaft“", 0, "Klare Kennzeichnung."],
  ["Der Button zur Abo-Kündigung ist in 5 Menüs versteckt", 1, "Manipulatives Design (zudem Pflicht zum Kündigungsbutton)."],
  ["Objektiver Preisvergleich mit einem Wettbewerber anhand nachprüfbarer Daten", 0, "Zulässige vergleichende Werbung."],
  ["„Sag Mama, sie soll dir … kaufen“ in Kinderwerbung", 1, "Direkte Kaufaufforderung an Kinder — schwarze Liste."],
  ["Double-Opt-in bei der Newsletter-Anmeldung", 0, "Gute Praxis."],
  ["Werbung für ein Produkt, das es nicht gibt, um ein teureres anzubieten", 1, "Lockvogelwerbung."],
  ["Abmeldelink in jeder Mail", 0, "Pflicht und gute Praxis."],
  ["Vorangekreuztes Kästchen für Werbung", 1, "Ungültige Einwilligung."],
]);
DEC("m12", "Ein Agenturkunde will die Kampagne: „Hol dir ein Gratis-Handy!“ — das Handy ist nur mit einem 24-Monats-Vertrag für 40 €/Monat gratis.", "Was empfiehlst du?", [
  ["Die Botschaft muss die Bedingung klar zeigen („0 € für das Handy mit Tarif 40 €/Monat, 24 Monate“) — sonst ist es irreführende Werbung", true, "„Gratis“ bei Pflichtkosten ist typische Irreführung. Die klare Bedingung schützt den Kunden vor Abmahnungen und enttäuschten Verbrauchern."],
  ["So schalten — machen alle so", false, "„Machen alle so“ schützt nicht vor Abmahnung und schadet dem Vertrauen."],
  ["Die Bedingung im Kleingedruckten verstecken", false, "Eine versteckte wesentliche Bedingung bleibt irreführend."],
  ["Die Kampagne ganz absagen", false, "Die Kampagne kann bei ehrlicher Darstellung der Bedingungen legal sein."],
]);
DEC("m12", "Ein Onlineshop will Werbepixel und Analytics einbauen. Die Website hat keinen Cookie-Banner.", "Was ist richtig?", [
  ["Einwilligungsbanner mit gleich einfachen „Akzeptieren“ und „Ablehnen“; Analyse- und Werbeskripte laden erst nach Einwilligung", true, "Werbe- und Analyse-Cookies erfordern vorherige Einwilligung (§25 TDDDG, DSGVO); Ablehnen muss so leicht sein wie Akzeptieren."],
  ["Das Pixel ist ohne Einwilligung erlaubt, wenn es von einer großen Plattform kommt", false, "Die Größe der Plattform hebt die Einwilligungspflicht nicht auf."],
  ["Banner nur mit Button „Verstanden“", false, "Bietet keine echte Wahl — keine gültige Einwilligung."],
  ["Skripte sofort laden, das Banner dient nur der Information", false, "Tracking vor der Einwilligung ist ein Verstoß."],
]);
OPEN("m12", "Was sind die Voraussetzungen für eine gültige Einwilligung nach DSGVO? Nenne ein richtiges und ein falsches Beispiel.", "Die Einwilligung muss freiwillig, für den bestimmten Fall, informiert und unmissverständlich (aktive Handlung) sein und so leicht widerrufbar, wie sie erteilt wurde. Richtig: leeres Kästchen „Ich möchte Angebote per E-Mail“, das der Nutzer selbst ankreuzt, mit Link zur Datenschutzerklärung. Falsch: vorangekreuztes Kästchen oder eine in den AGB „versteckte“ Einwilligung als Bedingung für den Kauf.", ["freiwillig", "bestimmt|konkret", "informiert", "aktiv|unmissverständlich|ankreuz", "widerruf"]);
OPEN("m12", "Wann ist vergleichende Werbung zulässig?", "Wenn sie nicht irreführend ist; Waren/Dienstleistungen für denselben Bedarf vergleicht; objektiv wesentliche, nachprüfbare und typische Eigenschaften (inkl. Preis) vergleicht; den Wettbewerber und seine Marke nicht herabsetzt oder verunglimpft; keine Verwechslungen schafft und das Produkt nicht als Imitation einer fremden Marke darstellt.", ["irreführ", "gleich|bedarf", "objektiv|nachprüf", "herabsetz|verunglimpf"]);
OPEN("m12", "Was ist Greenwashing und wie vermeidet eine Marke es?", "Falsche, vage oder übertriebene Aussagen über die Umweltvorteile eines Produkts oder Unternehmens (z. B. „100 % öko“ ohne Belege oder das Hervorheben eines grünen Produkts bei ansonsten schädlichem Sortiment). Man vermeidet es durch konkrete und belegbare Aussagen (was genau, wie viel, Zertifikat), Transparenz über das gesamte Produkt/den Lebenszyklus und echte Veränderungen, nicht nur Kommunikation.", ["falsch|vage|übertrieb", "beleg|zertifik", "konkret", "transparen|echt"]);
