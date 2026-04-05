---
status: approved
---

# FEAT-2: Interaktives Preis-Chart
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Ein interaktives Zeitreihen-Chart für Kryptowährungspreise mit wählbaren Zeiträumen (1T, 1W, 1M, 1J) und Hover-Tooltip. Das Chart ist das zentrale Interaktionselement des Dashboards und muss visuell hochwertig und smooth wirken.

## Zielgruppe
- **Kai (Krypto-Trader):** Erwartet Qualität auf TradingView-Niveau – smooth Animation, präziser Tooltip, sinnvolle Y-Achsen-Skalierung
- **Mia (pragmatische Investorin):** Will auf einen Blick sehen ob der Kurs gestiegen oder gefallen ist
- **Showcase-Betrachter:** Bewertet die Chart-Interaktion als Kernkompetenz-Beweis des Showcases

## Kernwert
Das Chart ist der einzige echte Interaktionspunkt des Dashboards. Ist es nicht smooth und glaubwürdig, verliert der gesamte Showcase seinen Überzeugungswert.

## Nicht im Scope
- Echte Kursdaten per API
- Candlestick-Charts / OHLCV-Daten
- Mehrere Charts gleichzeitig / Chart-Vergleich
- Zeichenwerkzeuge (wie TradingView)
- Zoom per Pinch oder Drag

## User Stories

1. Als Betrachter möchte ich den Kursverlauf einer Kryptowährung als Linien-Chart sehen, damit ich auf einen Blick erkenne ob der Preis gestiegen oder gefallen ist.
2. Als Betrachter möchte ich zwischen den Zeiträumen 1T, 1W, 1M und 1J wechseln können, damit ich kurzfristige und langfristige Trends vergleichen kann.
3. Als Betrachter möchte ich beim Hovern über das Chart einen Tooltip mit genauem Datum und Preis sehen, damit ich konkrete Werte ablesen kann.
4. Als Kai möchte ich, dass die Chart-Linie glatt animiert wenn ich den Zeitraum wechsle, damit das Dashboard professionell wirkt.
5. Als Betrachter möchte ich sehen für welches Asset das Chart gerade angezeigt wird (Name + Symbol), damit klar ist was dargestellt wird.

## Acceptance Criteria

1. Das Chart zeigt eine Preis-Zeitreihe als Linienchart mit Gradient-Fill unter der Linie.
2. Vier Zeitraum-Buttons sind vorhanden: 1T, 1W, 1M, 1J – der aktive Zeitraum ist visuell hervorgehoben.
3. Beim Klick auf einen Zeitraum-Button wechselt das Chart sofort auf die entsprechenden Mock-Daten.
4. Beim Hovern zeigt ein Tooltip: Datum (formatiert, z.B. "15. März 2026") und Preis (formatiert, z.B. "$84,230.50").
5. Die Y-Achse zeigt sinnvolle Intervalle (kein Sprung von $0 auf $100.000 – beginnt nahe am Minimum der Datenpunkte).
6. Das Chart passt sich responsiv an die Container-Breite an (kein Overflow auf mobilen Viewports).
7. Das dargestellte Asset (Name + Symbol) ist oberhalb des Charts erkennbar.
8. Mock-Daten für alle 4 Zeiträume sind vorhanden und erzeugen einen realistischen Kursverlauf (kein flaches oder gerades Linien-Muster).

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Kurs im gewählten Zeitraum nur gestiegen | Gradient grün, Linie grün |
| Kurs im gewählten Zeitraum gefallen | Gradient rot, Linie rot (oder neutral grau) |
| Hover außerhalb des Chart-Bereichs | Tooltip verschwindet, kein Fehler |
| Sehr schmaler Viewport (< 375px) | Chart scrollt horizontal oder skaliert ohne Bruch |
| Schnelles Klicken zwischen Zeiträumen | Kein visueller Glitch, Chart wechselt stabil |

## Mock-Daten Anforderungen

- Zeitraum 1T: 24 Datenpunkte (stündlich), realistische Intraday-Schwankungen (±1–3%)
- Zeitraum 1W: 7 Datenpunkte (täglich), Schwankungen ±3–8%
- Zeitraum 1M: 30 Datenpunkte (täglich), Trend erkennbar (z.B. Aufwärtstrend)
- Zeitraum 1J: 52 Datenpunkte (wöchentlich), deutlichere Volatilität sichtbar
- Asset: BTC als Standard (passt zur Portfolio-Übersicht in FEAT-1)

## Fortschritt
- Status: Freigegeben
