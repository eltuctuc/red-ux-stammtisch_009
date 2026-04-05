---
id: BUG-FEAT1-QA-001
feature: FEAT-1
severity: Medium
status: Fixed
---

# BUG-FEAT1-QA-001: formatPercent gibt "-0.00%" aus bei sehr kleinen negativen Werten

**Severity:** Medium
**Bereich:** Logic
**Gefunden von:** QA Engineer

## Beschreibung

`formatPercent()` in `projekt/src/utils/format.ts` erzeugt bei sehr kleinen negativen Eingabewerten die Ausgabe `-0.00%`. Das passiert, weil `value.toFixed(2)` in JavaScript für Werte zwischen -0.004 und -0.001 den String `"-0.00"` zurückgibt — die Dezimalstellen runden auf null, aber das negative Vorzeichen bleibt erhalten.

Das Ergebnis ist visuell irreführend: Die rote Farbe und das `TrendingDown`-Icon signalisieren Verlust, die angezeigte Zahl lautet aber `-0.00%`. Für einen User ist unklar ob ein Verlust vorliegt oder nicht.

## Erwartetes Verhalten

Bei Werten die betragsmäßig kleiner als `0.005` sind und negativ: Ausgabe `"0.00%"` (ohne Vorzeichen) oder `"-0.01%"` (nächsthöhere darstellbare negative Stufe), aber kein `"-0.00%"`.

## Tatsächliches Verhalten

```
formatPercent(-0.004)  → "-0.00%"
formatPercent(-0.001)  → "-0.00%"
```

Reproduzierbarer JavaScript-Beweis:
```js
(-0.004).toFixed(2)  // → "-0.00"
(-0.001).toFixed(2)  // → "0.00"   (JS-Engine-abhängig, V8 gibt "-0.00")
```

## Schritte zur Reproduktion

1. `change24hPercent` in `portfolio.ts` auf `-0.003` setzen
2. Dashboard im Browser laden
3. G/V-Zeile zeigt: `TrendingDown`-Icon (rot) + `-0.00%` — widersprüchliches Signal

## Fix-Vorschlag

In `format.ts`, Funktion `formatPercent`: Negative-Zero-Fall explizit abfangen.

```typescript
export function formatPercent(value: number, showSign = true): string {
  const rounded = parseFloat(value.toFixed(2))
  const sign = showSign && rounded > 0 ? '+' : ''
  return `${sign}${rounded.toFixed(2)}%`
}
```

`parseFloat(value.toFixed(2))` normalisiert `-0.004` zu `0` (da parseFloat("-0.00") = -0 in JS, aber `rounded > 0` ist false und `rounded < 0` ist false für -0). Sichererer Fix: explizite Null-Prüfung:

```typescript
export function formatPercent(value: number, showSign = true): string {
  const fixed = value.toFixed(2)
  const numeric = parseFloat(fixed)
  const sign = showSign && numeric > 0 ? '+' : ''
  // Normalize -0 to 0
  const display = numeric === 0 ? '0.00' : fixed
  return `${sign}${display}%`
}
```
