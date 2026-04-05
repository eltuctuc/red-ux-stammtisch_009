# BUG-FEAT5-UX-005: Keine Bestätigungsabfrage beim Entfernen einer Position (destruktive Aktion ohne Undo)

**Severity:** Medium
**Bereich:** Flow, Fehlerbehandlung
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung
Ein Klick auf den Trash-Button entfernt die Position sofort und unwiderruflich aus dem Portfolio – ohne Bestätigung und ohne Undo-Möglichkeit. Da kein Persist (localStorage/Backend) vorhanden ist, ist die Aktion zwar per Seitenreload reversibel, aber im laufenden Kontext nicht. Für einen Showcase-Kontext ist dieser Pfad besonders heikel: Ein versehentlicher Klick (auf Mobile sehr wahrscheinlich, s. BUG-004) zerstört sofort einen Eintrag, den der Nutzer gerade eingegeben hat.

Der UX-Standard für destruktive Aktionen ohne Undo (laut ui-ux-pro-max: `confirmation-dialogs` und `undo-support`) ist entweder:
- a) Confirmation-Dialog ("Bist du sicher?"), oder
- b) Kurzes Undo-Toast ("Bitcoin entfernt – Rückgängig", 5s)

Die Spec nennt zwar keine explizite Confirmation, aber auch kein Undo. Das ist eine Lücke in der UX-Spezifikation, die hier als Bug erfasst wird.

## Reproduktion / Szenario
1. BTC-Position in der Liste sehen
2. Versehentlich (oder absichtlich) Trash-Button klicken
3. Position ist sofort weg – keine Chance zur Korrektur

## Erwartetes Verhalten
Option B (Undo-Toast) ist hier die bessere Wahl als ein Confirmation-Dialog – es ist weniger Reibung, entspricht dem Showcase-Kontext ("smooth und reaktiv") und schützt trotzdem vor versehentlichem Löschen. Toast: "[Coin] entfernt – Rückgängig" mit 5s Auto-Dismiss.

## Tatsächliches Verhalten
`REMOVE_POSITION`-Action wird im Reducer direkt ausgeführt, kein Zwischenzustand, kein Undo-Mechanismus.

## Impact
Betrifft primär Showcase-Betrachter und Mia (pragmatische Investorin), die weniger präzise klicken und nicht mit dem Datenverlust rechnen. Auf Mobile (BUG-004 kombiniert) ist das Risiko eines versehentlichen Löschens erhöht.

**Status:** Fixed – RE_ADD_POSITION Reducer-Action; handleRemovePosition hält lastRemovedPosition für 5s im undoToast-State; Toast mit Rückgängig-Button fixed unten zentriert
