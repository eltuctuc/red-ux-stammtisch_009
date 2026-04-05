# BUG-FEAT5-UX-001: Fokus-Rückgabe nach Modal-Schließen nicht implementiert

**Severity:** High
**Bereich:** A11y, Flow
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung
Wenn das Modal geschlossen wird (ESC, Backdrop-Klick oder "Abbrechen"), kehrt der Fokus nicht zum auslösenden "Position hinzufügen"-Button zurück. Für Tastatur-Nutzer und Screenreader-Nutzer ist nach dem Schließen unklar, wo sie sich im Dokument befinden. Der Fokus landet irgendwo im Dokument – wahrscheinlich auf dem `<body>` – und der Nutzer muss erneut durch die Seite tabben.

## Reproduktion / Szenario
1. Nutzer navigiert per Tab zum "Position hinzufügen"-Button
2. Drückt Enter → Modal öffnet, Fokus springt korrekt auf erstes Feld (Coin-Select)
3. Nutzer drückt ESC oder aktiviert "Abbrechen"
4. Fokus kehrt **nicht** zum Trigger-Button zurück

## Erwartetes Verhalten
Nach dem Schließen eines Modals muss der Fokus zur auslösenden Schaltfläche zurückkehren (WCAG 2.1, SC 2.4.3 – Focus Order; gängige Best Practice für alle modalen Dialoge). Die Spec dokumentiert dieses Verhalten explizit: "beim Schließen Fokus zurück auf Trigger-Button".

## Tatsächliches Verhalten
In `AddPositionModal.tsx` ist kein `useRef` auf den Trigger-Button vorhanden. `App.tsx` übergibt keinen `triggerRef`. Der Fokus-Return ist schlicht nicht implementiert, obwohl die Spec ihn fordert.

## Impact
Betrifft alle Tastatur-Nutzer und Screenreader-Nutzer direkt. Für Showcase-Betrachter, die per Tab durch die Demo navigieren, wirkt die Interaktion kaputt. Bei Kai (Krypto-Trader), der schnell mehrere Positionen hintereinander hinzufügen will, ist das besonders störend.

**Status:** Fixed – addButtonRef in PortfolioSection erstellt, als triggerRef an Modal weitergereicht
