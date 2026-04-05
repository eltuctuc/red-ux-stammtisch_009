---
id: BUG-FEAT1-UX-009
feature: FEAT-1
severity: Low
status: Open
---

# BUG-FEAT1-UX-009: formatPercent gibt negatives Vorzeichen nicht korrekt aus – Edge Case negative G/V

**Severity:** Low
**Bereich:** Copy / Flow
**Gefunden von:** UX Reviewer

## Beschreibung

Die Funktion `formatPercent` in `format.ts` hat eine Logik-Lücke beim negativen Vorzeichen:

```ts
const sign = showSign && value > 0 ? '+' : ''
return `${sign}${value.toFixed(2)}%`
```

Bei negativem Wert (z.B. `-1.87`) erzeugt `value.toFixed(2)` den String `-1.87`. Das ergibt korrekt `-1.87%`. Soweit funktional.

**Das Problem:** Die Symmetrie ist gebrochen. Positiv → `+2.68%` (explizites Plus). Negativ → `-1.87%` (implizites Minus aus der Zahl). Das funktioniert, aber es ist keine saubere Implementierung: Das negative Vorzeichen kommt aus `toFixed()`, nicht aus der kontrollierten Format-Logik. Wenn `Math.abs()` verwendet würde (wie in `formatCurrencyWithSign`), würde `-1.87%` zu `1.87%` ohne Vorzeichen werden – ein Bug wäre sofort sichtbar.

Die Inkonsistenz zu `formatCurrencyWithSign` ist das eigentliche Problem: Diese Funktion verwendet explizit `Math.abs()` und kontrolliertes Vorzeichen. `formatPercent` tut das nicht. Das ist technische Inkonsistenz, die bei einer zukünftigen Anpassung zu einem echten Ausgabe-Bug führen kann.

Aus Nutzerperspektive (Mia): Sie erwartet bei einem Verlust-Tag klares `-$1,500 / -1.2%`. Wenn durch einen Refactor das Minus aus `formatPercent` verschwindet und nur `1.2%` bleibt, fehlt das Signal.

## Erwartetes Verhalten (aus UX-Spec)

"Gewinn/Verlust wird in zwei Formaten angezeigt: absolut und prozentual" mit konsistenter Vorzeichen-Logik in beiden Format-Funktionen.

## Tatsächliches Verhalten

`formatPercent` verlässt sich auf `toFixed()` für das negative Vorzeichen statt es explizit zu kontrollieren – inkonsistent mit `formatCurrencyWithSign`.

## Fix-Vorschlag

`formatPercent` auf konsistente explizite Vorzeichen-Logik umstellen:

```ts
// Aktuell (fragil):
export function formatPercent(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

// Robuster und konsistent mit formatCurrencyWithSign:
export function formatPercent(value: number, showSign = true): string {
  if (showSign) {
    const sign = value >= 0 ? '+' : '-'
    return `${sign}${Math.abs(value).toFixed(2)}%`
  }
  return `${value.toFixed(2)}%`
}
```
