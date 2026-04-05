---
feature: FEAT-4
severity: Low
status: Open
---

# BUG-FEAT4-QA-003: `isEven`-Prop ist semantisch falsch benannt (true für ungerade Indizes)

**Severity:** Low
**Bereich:** Functional / Code-Qualität
**Status:** Open

## Beschreibung

In `TransactionTable.tsx` wird das Zebra-Striping so übergeben:

```tsx
<TransactionRow key={tx.id} tx={tx} isEven={index % 2 === 1} />
```

`isEven` ist `true`, wenn `index % 2 === 1` – also für Indizes 1, 3, 5, 7. Diese sind mathematisch **ungerade** (odd). Der Prop-Name `isEven` ist damit das Gegenteil seiner semantischen Bedeutung.

Das visuelle Ergebnis ist korrekt: die 2., 4., 6., 8. Zeile (CSS-"even") bekommt den Zebra-Hintergrund. Aber der Name `isEven` bedeutet im Code "ist ungerade" – wer `TransactionRow` liest, erwartet `isEven=true` für Index 0 (erstes Element = gerade Zahl), nicht für Index 1.

Das ist kein vissueller Bug, aber ein Logik-Bug in der Benennung, der Folgefehler riskiert, wenn:
- jemand die Logik anpasst und `index % 2 === 0` erwartet
- der Prop in anderem Kontext wiederverwendet wird

## Schritte zur Reproduktion

1. `TransactionTable.tsx` Line 31 lesen: `isEven={index % 2 === 1}`
2. `TransactionRow.tsx` Line 12 lesen: `const zebraClass = isEven ? 'bg-slate-800/30' : ''`
3. Für `index=0` (erste Zeile): `isEven=false` → kein Zebra (macht Sinn visuell)
4. Aber `index=0` ist mathematisch even (gerade), trotzdem `isEven=false`

## Erwartetes Verhalten

Entweder:
- Option A: `isEven={index % 2 === 0}` und erster Row bekommt Zebra (visuell andere Entscheidung)
- Option B: Prop umbenennen in `isOdd` oder `hasZebraBackground` – semantisch korrekt

## Tatsächliches Verhalten

`isEven` ist `true` für ungerade Indizes. Visuelles Ergebnis stimmt, aber Naming ist irreführend.

## Fix-Vorschlag

Prop umbenennen zu `isOdd` (korrekte Semantik) und die Übergabe behalten:

```tsx
// TransactionTable.tsx
<TransactionRow key={tx.id} tx={tx} isOdd={index % 2 === 1} />

// TransactionRow.tsx Interface
interface TransactionRowProps {
  tx: Transaction
  isOdd: boolean
}
const zebraClass = isOdd ? 'bg-slate-800/30' : ''
```
