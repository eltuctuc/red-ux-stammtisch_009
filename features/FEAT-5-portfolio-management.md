---
status: approved
---

# FEAT-5: Portfolio-Verwaltung
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Der User kann im Dashboard sein persönliches Portfolio verwalten: Coins mit Menge und Kaufpreis hinzufügen oder entfernen. Das Dashboard berechnet daraus Gesamtwert (Menge × aktueller Mock-Preis), Gewinn/Verlust pro Position (Kaufpreis vs. aktueller Preis) und hebt Positionen mit >10% Verlust visuell hervor. Alle Daten leben im React State (in-memory, kein Persist).

## Zielgruppe
- **Kai (Krypto-Trader):** Will seine realen Positionen und Cost-Basis eintragen, um G/V auf einen Blick zu sehen. Erwartet korrekte Berechnung und klare Darstellung.
- **Mia (pragmatische Investorin):** Will wissen, ob sie im Plus oder Minus ist. Braucht keine Details – nur das Gesamtbild und Warnsignale bei starken Verlusten.
- **Showcase-Betrachter:** Sieht interaktive Portfolio-Verwaltung als Kernkompetenz-Beweis – die Interaktion muss smooth und die Berechnung sofort sichtbar sein.

## Kernwert
Das Dashboard wird von einer statischen Anzeige zu einer echten Portfolio-Verwaltung. Der User sieht sein individuelles Portfolio und bekommt sofort Feedback ob eine Position in der Verlustzone ist.

## Nicht im Scope
- Persistenz über Browser-Sessions (kein localStorage, kein Backend)
- Kurs-API-Anbindung (aktueller Preis bleibt Mock-Daten)
- Coins außerhalb der vordefinierten Mock-Preis-Liste (BTC, ETH, SOL, BNB, ADA, XRP)
- Transaktionshistorie automatisch aktualisieren bei Portfolio-Änderungen
- Mehrere Portfolios verwalten
- Import aus CSV oder anderen Quellen

## User Stories

1. Als Kai möchte ich einen neuen Coin mit Menge und Kaufpreis in mein Portfolio eintragen, damit das Dashboard meinen tatsächlichen Bestand widerspiegelt.
2. Als Kai möchte ich eine Position aus meinem Portfolio entfernen, damit gelöste Positionen nicht mehr angezeigt werden.
3. Als Mia möchte ich auf einen Blick sehen wie viel ich für jede Position bezahlt habe und was sie heute wert ist, damit ich meinen Gewinn oder Verlust ohne Rechnen kenne.
4. Als Mia möchte ich sofort erkennen wenn eine meiner Positionen mehr als 10% im Minus ist, damit ich das ohne Lesen der Zahlen wahrnehme.
5. Als Showcase-Betrachter möchte ich die Portfolio-Verwaltung ausprobieren und sehen wie das Dashboard sofort auf meine Eingaben reagiert, damit das Showcase als interaktiv und realistisch wahrgenommen wird.

## Acceptance Criteria

1. Es gibt eine Möglichkeit, eine neue Position hinzuzufügen: Coin (aus vordefinierter Liste), Menge (positive Zahl), Kaufpreis pro Einheit (positive Zahl in USD).
2. Die Portfolio-Übersicht zeigt den berechneten Gesamtwert aller Positionen (Summe: Menge × aktueller Mock-Preis pro Coin).
3. Jede Position zeigt: Coin-Name, Menge, Kaufpreis, aktueller Wert, Gewinn/Verlust in USD und Prozent.
4. Positionen mit >10% Verlust ((aktueller Preis − Kaufpreis) / Kaufpreis < −0.10) sind visuell rot hervorgehoben.
5. Eine Position kann aus dem Portfolio entfernt werden.
6. Nach dem Hinzufügen oder Entfernen einer Position aktualisieren sich Gesamtwert und alle Kennzahlen sofort (reaktiv).
7. Das Portfolio ist beim Laden mit realistischen Beispieleinträgen vorbelegt (Pre-Seed), damit das Dashboard nicht leer startet.
8. Die vordefinierte Coin-Auswahl umfasst mindestens: BTC, ETH, SOL, BNB, ADA, XRP.

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Kaufpreis = 0 eingegeben | Eingabe wird abgelehnt / Validierungsfeedback |
| Menge = 0 oder negative Zahl | Eingabe wird abgelehnt / Validierungsfeedback |
| Gleicher Coin zweimal hinzugefügt | Zweiter Eintrag wird als separate Position angelegt (verschiedene Cost-Basis erlaubt) |
| Portfolio leer (alle Positionen entfernt) | Leerzustand mit Hinweis "Keine Positionen – füge deinen ersten Coin hinzu" |
| G/V exakt 0% (Kaufpreis = aktueller Preis) | Neutral dargestellt (weder grün noch rot), kein Warnsignal |
| Sehr kleiner Kaufpreis (z.B. ADA $0.10) | Korrekte Dezimalformatierung, kein Runden auf $0.00 |
| Gesamtwert berechnet auf >$1.000.000 | Korrekte Tausenderformatierung, kein Layout-Bruch |

## Fortschritt
- Status: Freigegeben
- Aktueller Schritt: Req ✓ → UX
