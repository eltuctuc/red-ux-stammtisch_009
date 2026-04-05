---
status: approved
---

# Product Flows
*Erstellt von: /red:proto-flows — 2026-04-05*
*Letzte Aktualisierung: 2026-04-05*

> Dieses Dokument ist die verbindliche Navigations-Referenz.
> Kein Screen darf ohne Eintrag hier mit einem anderen verbunden werden.
> Änderungen erfordern eine explizite Entscheidung des UX Designers.

---

## Architektur-Hinweis

Dies ist eine **Single Page App (SPA) ohne Routing**. Es gibt nur einen Screen (Dashboard) unter Route `/`. Alle Features sind Sektionen innerhalb dieses einen Screens. Es gibt keine echten Screen-Transitions im klassischen Sinne – nur In-Page-Interaktionen (State Changes).

---

## Screens

| Screen-ID | Screen-Name | Route | Feature | Typ |
|-----------|-------------|-------|---------|-----|
| S-01 | Dashboard | / | FEAT-1, FEAT-2, FEAT-3, FEAT-4 | Single Page |

### Sektionen innerhalb S-01

| Sektions-ID | Sektions-Name | Feature | Position |
|-------------|---------------|---------|----------|
| S-01-A | Portfolio-Übersicht | FEAT-1 | Oben – Hero (erste sichtbare Sektion) |
| S-01-B | Preis-Chart | FEAT-2 | Mitte – zweite Sektion |
| S-01-C | Watchlist | FEAT-3 | Rechts oder unterhalb Chart |
| S-01-D | Transaktionshistorie | FEAT-4 | Unten – letzte Sektion |

---

## Einstiegspunkte

| Kontext | Einstiegs-Screen | Bedingung |
|---------|------------------|-----------|
| App-Start / Direktlink | S-01 Dashboard | – (kein Login, kein Redirect) |
| Browser-Reload | S-01 Dashboard | Seite lädt von oben (S-01-A sichtbar) |

---

## Screen Transitions

Da es sich um eine SPA ohne Routing handelt, gibt es keine Seitenwechsel. Alle Interaktionen sind **In-Page State Changes**.

| Von | Trigger | Wohin / Effekt | Bedingung | Feature |
|-----|---------|----------------|-----------|---------|
| S-01-B Preis-Chart | Klick auf "1T"-Button | Chart-Daten wechseln auf 24 Stunden-Datenpunkte | Button "1T" war nicht aktiv | FEAT-2 |
| S-01-B Preis-Chart | Klick auf "1W"-Button | Chart-Daten wechseln auf 7 Tages-Datenpunkte | Button "1W" war nicht aktiv | FEAT-2 |
| S-01-B Preis-Chart | Klick auf "1M"-Button | Chart-Daten wechseln auf 30 Tages-Datenpunkte | Button "1M" war nicht aktiv | FEAT-2 |
| S-01-B Preis-Chart | Klick auf "1J"-Button | Chart-Daten wechseln auf 52 Wochen-Datenpunkte | Button "1J" war nicht aktiv | FEAT-2 |
| S-01-B Preis-Chart | Hover über Chart-Bereich | Tooltip erscheint mit Datum + Preis des nächsten Datenpunkts | Maus innerhalb Chart-Grenzen | FEAT-2 |
| S-01-B Preis-Chart | Hover verlässt Chart-Bereich | Tooltip verschwindet | Maus außerhalb Chart-Grenzen | FEAT-2 |

---

## Sektions-Reihenfolge (Layout-Referenz)

Die vertikale und horizontale Anordnung der Sektionen auf S-01 ist für das Layout bindend:

```
Desktop (1280px+):
┌─────────────────────────────────────────────┐
│  S-01-A  Portfolio-Übersicht (Hero, oben)   │
├──────────────────────┬──────────────────────┤
│  S-01-B  Preis-Chart │  S-01-C  Watchlist   │
│          (links,     │          (rechts,     │
│           breit)     │           schmal)     │
├─────────────────────────────────────────────┤
│  S-01-D  Transaktionshistorie (unten, full) │
└─────────────────────────────────────────────┘

Mobile (375px):
┌────────────────────┐
│  S-01-A Portfolio  │
├────────────────────┤
│  S-01-B Chart      │
├────────────────────┤
│  S-01-C Watchlist  │
├────────────────────┤
│  S-01-D Transakt.  │
└────────────────────┘
```

---

## Offene Transitions

| Gemeldet von | Von Screen | Situation | Status |
|--------------|-----------|-----------|--------|
| – | – | – | – |

*(Wird vom `frontend-developer` befüllt wenn eine Transition fehlt.)*
