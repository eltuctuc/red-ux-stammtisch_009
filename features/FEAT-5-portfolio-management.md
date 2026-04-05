---
status: approved
---


# FEAT-5: Portfolio-Verwaltung
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Der User kann im Dashboard sein persönliches Portfolio verwalten: Coins mit Menge und Kaufpreis hinzufügen oder entfernen. Das Dashboard berechnet daraus Gesamtwert (Menge × aktueller Mock-Preis), Gewinn/Verlust pro Position (Kaufpreis vs. aktueller Preis) und hebt Positionen mit >10% Verlust visuell hervor. Alle Daten leben im React State (in-memory, kein Persist).

## Zielgruppe
- **Kai (Krypto-Trader):** Will seine realen Positionen und Cost-Basis eintragen, um G/V auf einen Blick zu sehen. Erwartet korrekte Berechnung und klare Darstellung.
- **Mia (pragmatische Investorin):** Will wissen, ob sie im Plus oder Minus ist. Braucht keine Details – nur das Gesamtbild und Warnsignale bei starken Verlusten.
- **Showcase-Betrachter:** Sieht interaktive Portfolio-Verwaltung als Kernkompetenz-Beweis – die Interaktion muss smooth und die Berechnung sofort sichtbar sein.

## Kernwert
Das Dashboard wird von einer statischen Anzeige zu einer echten Portfolio-Verwaltung. Der User sieht sein individuelles Portfolio und bekommt sofort Feedback ob eine Position in der Verlustzone ist.

## Nicht im Scope
- Persistenz über Browser-Sessions (kein localStorage, kein Backend)
- Kurs-API-Anbindung (aktueller Preis bleibt Mock-Daten)
- Coins außerhalb der vordefinierten Mock-Preis-Liste (BTC, ETH, SOL, BNB, ADA, XRP)
- Transaktionshistorie automatisch aktualisieren bei Portfolio-Änderungen
- Mehrere Portfolios verwalten
- Import aus CSV oder anderen Quellen

## User Stories

1. Als Kai möchte ich einen neuen Coin mit Menge und Kaufpreis in mein Portfolio eintragen, damit das Dashboard meinen tatsächlichen Bestand widerspiegelt.
2. Als Kai möchte ich eine Position aus meinem Portfolio entfernen, damit gelöste Positionen nicht mehr angezeigt werden.
3. Als Mia möchte ich auf einen Blick sehen wie viel ich für jede Position bezahlt habe und was sie heute wert ist, damit ich meinen Gewinn oder Verlust ohne Rechnen kenne.
4. Als Mia möchte ich sofort erkennen wenn eine meiner Positionen mehr als 10% im Minus ist, damit ich das ohne Lesen der Zahlen wahrnehme.
5. Als Showcase-Betrachter möchte ich die Portfolio-Verwaltung ausprobieren und sehen wie das Dashboard sofort auf meine Eingaben reagiert, damit das Showcase als interaktiv und realistisch wahrgenommen wird.

## Acceptance Criteria

1. Es gibt eine Möglichkeit, eine neue Position hinzuzufügen: Coin (aus vordefinierter Liste), Menge (positive Zahl), Kaufpreis pro Einheit (positive Zahl in USD).
2. Die Portfolio-Übersicht zeigt den berechneten Gesamtwert aller Positionen (Summe: Menge × aktueller Mock-Preis pro Coin).
3. Jede Position zeigt: Coin-Name, Menge, Kaufpreis, aktueller Wert, Gewinn/Verlust in USD und Prozent.
4. Positionen mit >10% Verlust ((aktueller Preis − Kaufpreis) / Kaufpreis < −0.10) sind visuell rot hervorgehoben.
5. Eine Position kann aus dem Portfolio entfernt werden.
6. Nach dem Hinzufügen oder Entfernen einer Position aktualisieren sich Gesamtwert und alle Kennzahlen sofort (reaktiv).
7. Das Portfolio ist beim Laden mit realistischen Beispieleinträgen vorbelegt (Pre-Seed), damit das Dashboard nicht leer startet.
8. Die vordefinierte Coin-Auswahl umfasst mindestens: BTC, ETH, SOL, BNB, ADA, XRP.

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Kaufpreis = 0 eingegeben | Eingabe wird abgelehnt / Validierungsfeedback |
| Menge = 0 oder negative Zahl | Eingabe wird abgelehnt / Validierungsfeedback |
| Gleicher Coin zweimal hinzugefügt | Zweiter Eintrag wird als separate Position angelegt (verschiedene Cost-Basis erlaubt) |
| Portfolio leer (alle Positionen entfernt) | Leerzustand mit Hinweis "Keine Positionen – füge deinen ersten Coin hinzu" |
| G/V exakt 0% (Kaufpreis = aktueller Preis) | Neutral dargestellt (weder grün noch rot), kein Warnsignal |
| Sehr kleiner Kaufpreis (z.B. ADA $0.10) | Korrekte Dezimalformatierung, kein Runden auf $0.00 |
| Gesamtwert berechnet auf >$1.000.000 | Korrekte Tausenderformatierung, kein Layout-Bruch |

## 2. UX Entscheidungen
*Erstellt: 2026-04-05*

### Einbettung
**S-02 Typ: Modal (zentriert)**

Begründung: Focused task (3 Felder + 2 Buttons), klar abgegrenzter Einstieg und Ausstieg, keine Kontext-Zerstörung im Dashboard. Drawer würde eine Sidebar-Annex-Metapher suggerieren, die hier nicht passt. Inline-Expansion würde das Portfolio-Hero-Layout fragmentieren.

- Desktop: zentriertes Modal ~480px breit, dark backdrop `bg-black/60`
- Mobile: Modal füllt Bildschirm vollständig (100vw/100vh), Scrollbar wenn Tastatur sichtbar

### Komponenten

| Komponente | Einsatz | Begründung |
|-----------|---------|------------|
| Modal Overlay | S-02 Wrapper | Fokussierter Dialog, ESC + Backdrop schließt |
| Select / Dropdown | Coin-Auswahl | 6 fixed Optionen mit Coin-Icon + Name |
| Number Input | Menge + Kaufpreis | `type="number"` mit `min="0"`, `step="any"` |
| Primary Button | "Hinzufügen" Submit | `bg-slate-50 text-slate-900` — einzige starke CTA im Modal |
| Ghost/Text Button | "Abbrechen" | `text-slate-400 hover:text-slate-200` — secondary, kein visual weight |
| Inline Validation | Fehlermeldungen | `text-red-400 text-sm`, `border-red-500` auf invalidem Feld |
| Trash Icon Button | Position entfernen | `lucide-react Trash2`, 44px touch target via padding |

### Portfolio-Positionszeile (Desktop)

Spalten: Coin (Icon + Name + Symbol) | Menge | Kaufpreis | Akt. Wert | G/V USD | G/V % | Entfernen-Button

- G/V positiv: `text-green-400` mit `+`-Prefix
- G/V negativ: `text-red-400` mit `−`-Prefix
- G/V exakt 0: `text-slate-400`, kein Präfix
- Zeile mit >10% Verlust: `bg-red-500/10` Hintergrund-Wash — kein Border, kein Icon, nur subtile Tönung
- Entfernen-Button: `text-slate-500 hover:text-red-400` Trash2-Icon, right-aligned, immer sichtbar (kein Hover-only auf Mobile)

### Portfolio-Positionszeile (Mobile)

- Row 1: Coin-Icon (32px) + Name + Symbol
- Row 2: 3-Spalten-Grid: Kaufpreis | Akt. Wert | G/V (USD + %)
- G/V-Zeile: grün/rot/neutral wie Desktop
- >10% Verlust: `bg-red-500/10` auf der gesamten Card
- Entfernen-Button: kleines Trash2-Icon rechtsbündig in Row 1

### "Position hinzufügen" Button

Positionierung: Unterhalb der Positions-Liste in S-01-A (immer sichtbar, auch bei gefüllter Liste)

```
[+ Position hinzufügen]
```

Style: Outlined Button — `border border-dashed border-slate-600 text-slate-400 hover:border-slate-400 hover:text-slate-200 rounded-lg py-2 px-4 text-sm w-full`

Mit `Plus`-Icon (lucide) links des Labels. Full-width auf Mobile, `w-full` auch Desktop für einfaches Klicken.

### Leerzustand (alle Positionen entfernt)

Ersetzt die Positions-Liste, "Position hinzufügen"-Button bleibt unterhalb:

```
[Briefcase-Icon 40px, slate-600]
Keine Positionen
Füge deinen ersten Coin hinzu
```

Zentriert im S-01-A Bereich, `text-slate-500` für den Beschreibungstext.

### Gesamtwert-Berechnung in S-01-A

- Anzeige: wie bisheriger `totalValue` — wird jetzt dynamisch aus Portfolio-State berechnet
- Headline-Label bleibt "Portfolio-Gesamtwert"
- G/V-Zeile (24h) wird aus den Portfolio-Positionen aggregiert (Summe aller einzelnen G/V absolut + prozentual als gewichteter Durchschnitt vs. Gesamtkaufwert)
- Der bestehende Donut-Chart bleibt erhalten, wird aus State gefüllt

### Touch-Target-Prüfung

| Element | Mindestgröße | Umsetzung |
|---------|-------------|-----------|
| Trash2 Button | 44px | `p-2` um 16px Icon → 40px, `p-3` → 48px ✅ |
| "Hinzufügen" Submit | 44px | `py-3` → 48px ✅ |
| Select Dropdown | 44px | `h-11` (44px) ✅ |
| Number Inputs | 44px | `h-11` (44px) ✅ |
| "Abbrechen" Button | 44px | `py-3` → 48px ✅ |

### State-Komplexität

State Machine erforderlich (Modal-Lifecycle + Form-Validation):

```
States: idle | modal_open | submitting | error
Events: OPEN_MODAL | CLOSE_MODAL | SUBMIT_VALID | SUBMIT_INVALID | REMOVE_POSITION
Transitionen:
  idle + OPEN_MODAL → modal_open
  modal_open + CLOSE_MODAL → idle (kein State-Change in Portfolio)
  modal_open + SUBMIT_VALID → idle (Position added)
  modal_open + SUBMIT_INVALID → modal_open (Inline errors sichtbar)
  idle + REMOVE_POSITION → idle (Position removed, State aktualisiert)
```

Umsetzung: `useReducer` in App.tsx (Portfolio-State + Modal-State)

### Navigation nach Aktionen

Per `flows/product-flows.md`:
- Submit valid → Modal schließt, S-01-A aktualisiert
- Submit invalid → Modal bleibt offen, Inline-Fehler
- Abbrechen / ESC / Backdrop → Modal schließt, kein State-Change
- Entfernen → S-01-A aktualisiert sofort

## Fortschritt
- Status: Freigegeben
- Aktueller Schritt: Req ✓ → UX ✓
