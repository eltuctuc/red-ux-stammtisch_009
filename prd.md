---
status: approved
---

# Product Requirements Document
*Erstellt: 2026-04-05*

## Scope-Typ
Klickbarer Prototyp

## Vision
Ein visuell ansprechendes Krypto-Portfolio-Dashboard als Single Page App, das Designern und Entwicklern als Showcase dient – ohne echtes Backend, mit realistischen Mock-Daten.

## Zielgruppe
Primär: Designer, Entwickler und potenzielle Auftraggeber, denen das Dashboard als Referenz oder Demo gezeigt wird.
Sekundär: UX-Stammtisch-Teilnehmer als Feedback-Publikum.

## Kernproblem
Es gibt keinen klassischen Nutzerproblem-Fit – das Dashboard ist ein Showcase. Das "Problem" ist: Es fehlt ein überzeugender, moderner Referenz-Build für ein Krypto-Dashboard, der zeigt, wie gut gestaltete Finanz-UIs aussehen können.

## Scope (In)
- Portfolio-Übersicht: Gesamtwert, Gewinn/Verlust, Verteilung der Assets (z.B. als Donut-Chart oder Liste)
- Interaktives Preis-Chart: Zeitreihe für mindestens eine Kryptowährung, mit wählbaren Zeiträumen (1T, 1W, 1M, 1J)
- Watchlist: Bis zu 6 Kryptowährungen mit aktuellem Preis und 24h-Änderung
- Letzte Transaktionen: Liste der letzten 5–10 Mock-Transaktionen (Kauf/Verkauf, Datum, Betrag)
- Alle Daten: statisch/mock – keine API-Anbindung
- Responsive Layout (Desktop-first, mobile-fähig)

## Out-of-Scope
- Login / Authentifizierung
- Echte API-Anbindung (CoinGecko, Binance, etc.)
- Wallet-Integration (MetaMask etc.)
- Portfolio-Bearbeitung durch den User (kein Hinzufügen/Löschen von Assets)
- Push-Notifications oder Preis-Alerts
- Multi-User-Fähigkeit

## Erfolgskriterien
- Das Dashboard wirkt auf den ersten Blick wie ein echtes, produktionsreifes Produkt
- Alle vier Kernbereiche (Übersicht, Chart, Watchlist, Transaktionen) sind sichtbar und visuell konsistent
- Das Preis-Chart ist interaktiv (Zeitraum wechselbar, Hover-Tooltip)
- Die UI ist in einem Browser ohne Fehler lauffähig

## Offene Fragen
- Welches Farbschema / welcher Stil? (Dark Mode, Light Mode, oder beides?)
- Soll das Chart für mehrere Assets wechselbar sein oder immer nur eine Krypto zeigen?
- Gibt es eine bestimmte Design-Referenz oder soll der Stil frei gewählt werden?
