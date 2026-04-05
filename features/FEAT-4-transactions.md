---
status: approved
---

# FEAT-4: Transaktionshistorie
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Eine Liste der letzten 5–10 Mock-Transaktionen (Kauf/Verkauf) mit Datum, Asset, Menge und Betrag. Die Transaktionshistorie vervollständigt das Dashboard als vollständige Portfolio-Ansicht und gibt dem Showcase Tiefe.

## Zielgruppe
- **Kai (Krypto-Trader):** Kontrolliert seine Trades, erwartet strukturierte und korrekte Darstellung (Kauf/Verkauf klar unterscheidbar, Beträge stimmig)
- **Mia (pragmatische Investorin):** Schaut selten hinein, will aber verstehen was die letzten Aktivitäten waren
- **Showcase-Betrachter:** Bewertet ob die Liste realistisch und visuell klar gegliedert wirkt

## Kernwert
Die Transaktionshistorie macht das Dashboard vollständig – ohne sie wirkt es wie ein reines Chart-Tool, nicht wie eine Portfolio-Verwaltung.

## Nicht im Scope
- Hinzufügen neuer Transaktionen durch den User
- Filtern oder Sortieren der Transaktionen
- Paginierung (nur die neuesten 5–10)
- CSV-Export
- Transaktionsdetails / Drill-Down-View

## User Stories

1. Als Betrachter möchte ich eine chronologisch sortierte Liste der letzten Transaktionen sehen, damit ich nachvollziehen kann wann was gekauft oder verkauft wurde.
2. Als Betrachter möchte ich auf einen Blick erkennen ob eine Transaktion ein Kauf oder Verkauf war (farblich oder per Label), damit ich nicht jede Zeile einzeln lesen muss.
3. Als Kai möchte ich zu jeder Transaktion die gekaufte/verkaufte Menge und den Gesamtbetrag in USD sehen, damit ich die Transaktionen plausibel einschätzen kann.
4. Als Betrachter möchte ich das Datum jeder Transaktion relativ oder absolut sehen (z.B. "vor 2 Tagen" oder "03.04.2026"), damit ich die zeitliche Einordnung verstehe.
5. Als Showcase-Betrachter möchte ich, dass die Mock-Daten realistisch wirken (keine runden Beträge, bekannte Assets, plausible Zeitabstände), damit das Dashboard nicht wie ein Dummy-Daten-Template aussieht.

## Acceptance Criteria

1. Die Liste zeigt zwischen 5 und 10 Transaktionen – neueste zuerst.
2. Jede Transaktion enthält: Typ (Kauf/Verkauf), Asset-Name + Symbol, Menge, Preis pro Einheit, Gesamtbetrag (USD), Datum.
3. Käufe und Verkäufe sind visuell unterscheidbar – z.B. durch farbiges Label ("Kauf" grün / "Verkauf" rot) oder Icon.
4. Das Datum ist lesbar formatiert (z.B. "03. Apr 2026" oder relatives Format "vor 2 Tagen").
5. Alle Beträge sind korrekt formatiert (Tausendertrennzeichen, 2 Dezimalstellen für USD).
6. Die Liste ist auf Desktop ohne horizontales Scrollen vollständig lesbar.
7. Auf mobilen Viewports (375px) ist die Tabelle scrollbar oder als kompakte Karten dargestellt – kein Overflow.
8. Mock-Daten enthalten Assets aus FEAT-1 (Portfolio) – die Transaktionen erklären plausibel wie das aktuelle Portfolio zustande kam.

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Sehr kleine Menge (z.B. 0.00034 BTC) | Korrekt formatiert, kein Runden auf 0 |
| Sehr großer Betrag (z.B. $71.000 BTC-Kauf) | Tausenderformatierung, kein Layout-Bruch |
| Älteste Transaktion mehrere Monate zurück | Datum absolut formatiert, kein "vor 180 Tagen" |
| Zwei Transaktionen am gleichen Tag | Beide angezeigt, Uhrzeitunterschied erkennbar oder Reihenfolge klar |
| Schmaler Viewport | Kompaktes Layout, keine abgeschnittenen Zahlen |

## Mock-Daten (Referenz)

```
Transaktionen (neueste zuerst):
1. Kauf   – SOL  – 12 SOL  @ $178.20  – $2,138.40  – 04. Apr 2026
2. Verkauf– ETH  – 1.5 ETH @ $2,810.00 – $4,215.00 – 01. Apr 2026
3. Kauf   – BTC  – 0.05 BTC @ $84,900.00 – $4,245.00 – 28. Mär 2026
4. Kauf   – ADA  – 1.200 ADA @ $0.81 – $972.00     – 25. Mär 2026
5. Verkauf– BNB  – 5 BNB  @ $592.00  – $2,960.00   – 20. Mär 2026
6. Kauf   – ETH  – 2 ETH  @ $2,750.00 – $5,500.00  – 15. Mär 2026
7. Kauf   – SOL  – 30 SOL @ $172.50  – $5,175.00   – 10. Mär 2026
8. Kauf   – XRP  – 800 XRP @ $0.56   – $448.00     – 05. Mär 2026
```

## Fortschritt
- Status: Freigegeben
