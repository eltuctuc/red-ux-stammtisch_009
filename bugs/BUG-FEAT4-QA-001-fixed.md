---
feature: FEAT-4
severity: High
status: Fixed
---

# BUG-FEAT4-QA-001: Invalides HTML – `<div>` und `<tr>` im falschen Kontext durch Dual-Layout-Fragment

**Severity:** High
**Bereich:** Functional / HTML-Validität
**Status:** Open

## Beschreibung

`TransactionRow` rendert ein React Fragment, das **immer** beide Elemente gleichzeitig ausgibt: ein `<tr>` (Desktop) und ein `<div>` (Mobile). Das Fragment wird an zwei Stellen eingebettet:

1. In `<tbody>` (Desktop-Pfad in `TransactionTable`)
2. In `<div role="list">` (Mobile-Pfad in `TransactionTable`)

Das erzeugt zwei HTML-Spec-Verletzungen:

**Verletzung 1 – `<tbody>` enthält `<div>`:**
```html
<tbody>
  <tr class="hidden md:table-row">...</tr>  <!-- valid -->
  <div class="md:hidden" role="listitem">...</div>  <!-- INVALID in tbody -->
</tbody>
```
Per HTML-Spec sind in `<tbody>` nur `<tr>`-Elemente erlaubt. Browser-Verhalten: Chrome und Firefox verschieben die `<div>`-Elemente automatisch aus der Tabellenstruktur heraus (table fixing algorithm). Das bedeutet, die 8 mobilen Karten-Divs landen im DOM außerhalb des `<table>`-Tags, was zu Race Conditions mit Tailwind-Klassen (`md:hidden`) und unvorhersehbarer DOM-Position führen kann.

**Verletzung 2 – `<div role="list">` enthält `<tr>`:**
```html
<div role="list">
  <tr class="hidden md:table-row">...</tr>  <!-- INVALID in div -->
  <div class="md:hidden" role="listitem">...</div>  <!-- valid -->
</div>
```
`<tr>`-Elemente außerhalb eines Table-Kontexts sind ungültig. Browser rendern sie als `display: block`, was visuell unproblematisch ist (da `hidden` greift), aber Screenreader könnten unerwartete Semantik produzieren.

## Schritte zur Reproduktion

1. App im Browser öffnen (beliebiger Viewport)
2. Devtools öffnen → Elements-Tab
3. Die gerenderte DOM-Struktur von `<tbody>` inspizieren
4. Alternativ: HTML-Validator auf dem gerenderten Output laufen lassen

## Erwartetes Verhalten

Valides HTML: Kein `<div>` innerhalb von `<tbody>`, kein orphanes `<tr>` außerhalb von Tabellenkontext.

## Tatsächliches Verhalten

`TransactionRow` rendert ein Fragment mit beiden Elementen. Im `<tbody>`-Kontext enthält das DOM invalid platzierte `<div>` Elemente. Browser-eigenes Table Fixing repariert den DOM still, aber das Endergebnis der DOM-Position ist implementierungsabhängig.

## Fix-Vorschlag

`TransactionTable` trennt das Rendering der beiden Layouts komplett:

```tsx
// Desktop table tbody: nur <tr> rendern
<tbody>
  {transactionsData.map((tx, index) => (
    <DesktopTransactionRow key={tx.id} tx={tx} isEven={index % 2 === 1} />
  ))}
</tbody>

// Mobile list: nur <div> rendern
<div className="md:hidden" role="list" aria-label="Letzte Transaktionen">
  {transactionsData.map((tx, index) => (
    <MobileTransactionCard key={tx.id} tx={tx} isEven={index % 2 === 1} />
  ))}
</div>
```

`TransactionRow` aufteilen in `DesktopTransactionRow` (gibt `<tr>` zurück) und `MobileTransactionCard` (gibt `<div>` zurück). Alternativ: `TransactionRow` erhält ein `variant: 'desktop' | 'mobile'` Prop.
