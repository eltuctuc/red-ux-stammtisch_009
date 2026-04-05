---
status: approved
---

# FEAT-3: Watchlist
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Eine kompakte Liste von bis zu 6 beobachteten Kryptowährungen mit aktuellem Preis und 24h-Performance. Die Watchlist ergänzt die Portfolio-Übersicht um Assets, die der User beobachtet aber nicht zwingend hält.

## Zielgruppe
- **Kai (Krypto-Trader):** Hält mehrere Assets im Auge, will relevante Coins ohne eigene Position tracken
- **Mia (pragmatische Investorin):** Will ausgewählte Assets auf dem Schirm haben, ohne die Portfolio-Ansicht zu überladen
- **Showcase-Betrachter:** Bewertet ob die Watchlist kompakt und lesbar ist

## Kernwert
Die Watchlist zeigt auf einen Blick welche Assets sich bewegen – positiv wie negativ – ohne das Hauptportfolio zu überladen.

## Nicht im Scope
- Hinzufügen / Entfernen von Assets durch den User
- Mehr als 6 Einträge
- Detailansicht oder Drill-Down pro Asset
- Alerts oder Benachrichtigungen bei Kursänderungen
- Sortierung durch den User

## User Stories

1. Als Betrachter möchte ich eine kompakte Liste von bis zu 6 Kryptowährungen sehen, damit ich schnell mehrere Assets im Blick habe ohne scrollen zu müssen.
2. Als Betrachter möchte ich zu jedem Asset den aktuellen Preis (in USD) sehen, damit ich ohne weiteren Aufwand die Marktpreise kenne.
3. Als Betrachter möchte ich die 24h-Preisänderung als Prozentsatz farblich kodiert sehen (grün = gestiegen, rot = gefallen), damit ich sofort erkenne welche Assets sich positiv oder negativ entwickelt haben.
4. Als Kai möchte ich bekannte Assets in der Watchlist sehen (z.B. Assets die ich nicht halte aber verfolge), damit die Watchlist ihren eigenständigen Mehrwert gegenüber der Portfolio-Ansicht hat.
5. Als Showcase-Betrachter möchte ich das Logo/Icon jeder Kryptowährung sehen, damit die Liste visuell ansprechend und schnell scanbar ist.

## Acceptance Criteria

1. Die Watchlist zeigt genau 6 Einträge mit realistischen Mock-Assets.
2. Jeder Eintrag zeigt: Asset-Logo/Icon, Name, Symbol, aktueller Preis (USD, formatiert), 24h-Änderung in Prozent.
3. Positive 24h-Änderung wird grün dargestellt (+X.XX%), negative rot (−X.XX%).
4. Die Liste enthält mindestens 2 Assets die NICHT im Portfolio (FEAT-1) vorhanden sind – um den Watchlist-Mehrwert zu zeigen.
5. Alle 6 Einträge sind ohne horizontales Scrollen auf Desktop (1280px+) sichtbar.
6. Auf mobilen Viewports (375px) ist die Liste vertikal scrollbar oder als Grid dargestellt – kein Layout-Bruch.
7. Die Watchlist ist klar vom Portfolio-Bereich (FEAT-1) visuell getrennt (eigener Abschnitt, Überschrift "Watchlist" o.ä.).

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Alle 6 Assets im Minus | Alle Einträge rot – kein visueller Bruch |
| 24h-Änderung exakt 0.00% | Wird neutral dargestellt (kein Grün/Rot) |
| Asset-Name sehr lang (z.B. "Wrapped Bitcoin") | Wird abgekürzt (truncate), Layout bleibt stabil |
| Preis sehr klein (z.B. $0.0004 für DOGE-ähnlich) | Korrekte Dezimalformatierung, kein Runden auf $0.00 |
| Preis über $100.000 (BTC) | Korrekte Tausenderformatierung ($104,230.50) |

## Mock-Daten (Referenz)

```
Watchlist (6 Assets):
1. LINK  – Chainlink     – $18.42  – +4.21%
2. DOT   – Polkadot      – $7.83   – -1.87%
3. MATIC – Polygon       – $0.92   – +2.45%
4. AVAX  – Avalanche     – $38.17  – -0.63%
5. ATOM  – Cosmos        – $9.54   – +1.12%
6. LTC   – Litecoin      – $92.30  – -3.44%
```
*(Intentional: Diese Assets überschneiden sich nicht mit den Portfolio-Assets aus FEAT-1)*

## Fortschritt
- Status: Freigegeben
