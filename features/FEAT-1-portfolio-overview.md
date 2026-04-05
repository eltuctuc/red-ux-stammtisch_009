---
status: approved
---

# FEAT-1: Portfolio-Übersicht
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Der visuell dominierende Hero-Bereich des Dashboards. Zeigt dem Betrachter auf den ersten Blick: Gesamtwert des Portfolios, Performance (Gewinn/Verlust absolut und prozentual) und die Verteilung der gehaltenen Assets.

## Zielgruppe
- **Mia (pragmatische Investorin):** Will in unter 5 Sekunden sehen "Wie stehe ich?"
- **Kai (Krypto-Trader):** Erwartet präzise Zahlen und glaubwürdige Asset-Verteilung
- **Showcase-Betrachter:** Beurteilt im ersten Moment ob das Dashboard "echt" wirkt

## Kernwert
Ohne diesen Bereich ist das Dashboard wertlos – er ist das erste was der Blick sucht und entscheidet über den ersten Eindruck.

## Nicht im Scope
- Bearbeiten oder Hinzufügen von Assets durch den User
- Echtzeit-Kurse oder API-Anbindung
- Historische Portfolio-Performance über Zeit (das ist FEAT-2)
- Mehr als 6 dargestellte Assets in der Verteilung

## User Stories

1. Als Betrachter möchte ich den Gesamtwert meines Portfolios prominent sehen, damit ich sofort weiß wie viel mein Portfolio wert ist.
2. Als Betrachter möchte ich den Gewinn/Verlust (absolut + prozentual) farblich kodiert sehen (grün = Plus, rot = Minus), damit ich ohne Rechnen verstehe ob ich profitabel bin.
3. Als Mia möchte ich die Asset-Verteilung als visuelles Element (Donut-Chart oder Liste mit Balken) sehen, damit ich erkenne welche Kryptowährung den größten Anteil hat.
4. Als Kai möchte ich realistische Zahlen und bekannte Asset-Namen (BTC, ETH, SOL etc.) sehen, damit der Showcase nicht als "Fake" wirkt.
5. Als Showcase-Betrachter möchte ich den Portfolio-Bereich als erstes Element beim Laden sehen, damit der erste Eindruck sofort überzeugt.

## Acceptance Criteria

1. Der Gesamtportfoliowert wird als formatierte Zahl angezeigt (z.B. "$124,382.47") – prominent, large type, oben im Dashboard.
2. Gewinn/Verlust wird in zwei Formaten angezeigt: absolut (z.B. "+$8.241,12") und prozentual (z.B. "+7,12%").
3. Positiver Gewinn/Verlust wird grün dargestellt, negativer rot – konsistent in Zahl und Icon.
4. Die Asset-Verteilung zeigt mindestens 4, maximal 6 Assets mit Name, Symbol, Menge, aktuellem Wert und prozentualer Gewichtung im Portfolio.
5. Alle Daten basieren auf realistischen Mock-Werten (BTC, ETH, SOL, BNB, ADA, XRP mit glaubwürdigen Preisen für 2026).
6. Der Bereich ist ohne Scrollen auf Desktop (1280px+) vollständig sichtbar.
7. Auf mobilen Viewports (375px) ist der Gesamtwert und G/V sichtbar, die Asset-Liste ist scrollbar.

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Alle Assets im Minus | Gesamtwert rot, G/V-Wert negativ, kein visueller Bruch |
| Ein Asset hat 0% Gewichtung | Wird nicht in der Verteilung angezeigt |
| Sehr langer Asset-Name | Wird abgekürzt (truncate), kein Layout-Bruch |
| Sehr kleine prozentuale Änderung (z.B. +0.01%) | Wird korrekt formatiert angezeigt, kein Runden auf 0% |
| Viewport unter 375px | Kein Layout-Bruch, horizontales Scroll möglich |

## Mock-Daten (Referenz)

```
Portfolio-Gesamtwert: $124,382.47
24h-Änderung: +$3,241.18 (+2.68%)

Assets:
- BTC: 0.842 BTC = $71,570.00 (57.5%)
- ETH: 8.5 ETH = $23,800.00 (19.1%)
- SOL: 82 SOL = $14,760.00 (11.9%)
- BNB: 18 BNB = $10,440.00 (8.4%)
- ADA: 3.800 ADA = $3,116.00 (2.5%)
- XRP: 1.200 XRP = $696.00 (0.6%)
```

## Fortschritt
- Status: Freigegeben
