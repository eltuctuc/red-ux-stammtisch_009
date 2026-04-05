---
status: approved
---

# FEAT-6: Watchlist-Portfolio-Integration
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Die Watchlist zeigt an, welche ihrer Coins der User aktuell im Portfolio hält. Coins die sowohl in der Watchlist als auch im Portfolio (FEAT-5) sind, werden visuell hervorgehoben – zum Beispiel durch ein kleines Badge oder eine Farbmarkierung. So sieht der User auf einen Blick: "Diesen Coin beobachte ich und halte ihn bereits."

## Abhängigkeiten
- **FEAT-5 (Portfolio-Verwaltung)** muss implementiert und freigegeben sein. FEAT-6 liest den Portfolio-State aus FEAT-5.

## Zielgruppe
- **Kai (Krypto-Trader):** Hat in seiner Watchlist bewusst auch Coins, die er hält, um sie gegen andere zu vergleichen. Oder er schaut in die Watchlist ob er einen Coin noch nicht im Portfolio hat.
- **Mia (pragmatische Investorin):** Weniger relevant – sie schaut kaum auf die Watchlist. Für sie ist das Feature ein dezentes Extra.

## Kernwert
Die Watchlist verliert ihren künstlichen "nur Beobachtungsliste"-Charakter. Wenn BTC zufällig in beiden Listen ist, sieht der User das sofort – und versteht die Zusammenhänge zwischen Portfolio und Marktbeobachtung.

## Nicht im Scope
- Die Watchlist-Zusammensetzung durch den User veränderbar machen
- G/V-Werte direkt in der Watchlist anzeigen (das bleibt FEAT-5 / Portfolio-Übersicht)
- Coins automatisch zur Watchlist hinzufügen wenn sie ins Portfolio aufgenommen werden

## User Stories

1. Als Kai möchte ich in der Watchlist auf einen Blick sehen welche Coins ich bereits im Portfolio halte, damit ich meine Watchlist als "noch nicht gekauft" vs. "bereits im Bestand" lesen kann.
2. Als Showcase-Betrachter möchte ich sehen dass Watchlist und Portfolio miteinander kommunizieren, damit das Dashboard als kohärentes System statt als Sammlung isolierter Widgets wahrgenommen wird.

## Acceptance Criteria

1. Watchlist-Einträge, deren Coin-Symbol im aktuellen Portfolio (FEAT-5 State) vorhanden ist, werden visuell hervorgehoben.
2. Die Hervorhebung ist dezent und bricht das bestehende Watchlist-Layout nicht (kein Layout-Shift, keine Größenänderung der Rows).
3. Wenn der User einen Coin aus dem Portfolio entfernt (FEAT-5), verschwindet die Hervorhebung in der Watchlist sofort (reaktiv).
4. Wenn kein Watchlist-Coin im Portfolio ist, sieht die Watchlist exakt wie vor FEAT-6 aus (kein leerer Zustand, keine störenden Elemente).

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Alle Watchlist-Coins sind im Portfolio | Alle 6 Einträge hervorgehoben – kein visueller Bruch |
| Kein Watchlist-Coin im Portfolio | Watchlist sieht exakt aus wie vor FEAT-6 |
| Portfolio ist leer (alle Positionen entfernt) | Keine Hervorhebung in der Watchlist |
| Coin mehrfach im Portfolio (verschiedene Einträge) | Hervorhebung erscheint sobald der Coin mindestens einmal im Portfolio ist |

## Fortschritt
- Status: Freigegeben
- Aktueller Schritt: Req ✓ → UX
