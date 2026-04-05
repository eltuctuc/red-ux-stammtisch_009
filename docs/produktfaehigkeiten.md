# Produktfähigkeiten
*Dokumentiert abgeschlossene, production-ready Features*

---

## Watchlist *(FEAT-3, 2026-04-05)*

Die Watchlist-Sektion zeigt 6 beobachtete Kryptowährungen (LINK, DOT, MATIC, AVAX, ATOM, LTC) – ausschließlich Assets die nicht im Portfolio gehalten werden. Jeder Eintrag zeigt ein farbiges Icon, Asset-Name und Symbol, aktuellen Preis sowie die 24h-Änderung farbkodiert (grün/rot/neutral). Das Layout ist rein informational ohne Interaktion, kompakt auf `h-12` (48px) pro Zeile ausgelegt und passt sich auf Augenhöhe mit der danebenstehenden Chart-Sektion ein.

---

## Interaktives Preis-Chart *(FEAT-2, 2026-04-05)*

Das Dashboard zeigt einen interaktiven BTC-Preisverlauf als Area-Chart mit dynamischer Trend-Farbe (grün bei Aufwärtstrend, rot bei Abwärtstrend). Nutzer können zwischen vier Zeiträumen wechseln (1T / 1W / 1M / 1J), wobei das Chart sofort mit 300ms-Animation wechselt. Beim Hovern erscheint ein Tooltip mit zeitraumgerechtem Datum (Uhrzeit nur bei 1T) und formatiertem Preis. Der Y-Achsen-Bereich beginnt nahe am Datenminimum für optimale Lesbarkeit. Das Chart ist vollständig responsiv (200px mobil / 300px Desktop).

---

## Portfolio-Übersicht *(FEAT-1, 2026-04-05)*

Die Hero-Sektion des Dashboards zeigt auf einen Blick den Gesamtportfoliowert ($124.382,47), Gewinn/Verlust der letzten 24h in absoluter und prozentualer Form (farbkodiert grün/rot) sowie die Asset-Verteilung als Donut-Chart mit Legende für 6 Kryptowährungen (BTC, ETH, SOL, BNB Chain, ADA, XRP). Das Layout ist responsive: auf Desktop (≥1280px) zweispaltig, auf Mobile gestapelt mit scrollbarer Asset-Liste. Alle Werte basieren auf realistischen Mock-Daten. A11y: WCAG AA konform (Kontraste ≥4.9:1, role="img" auf Chart, ul/li-Semantik auf Asset-Liste).
