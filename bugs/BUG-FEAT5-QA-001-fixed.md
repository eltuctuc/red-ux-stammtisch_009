# BUG-FEAT5-QA-001: G/V USD fehlt Minuszeichen bei Verlust-Positionen

**Severity:** High
**Bereich:** Berechnung / Darstellung
**Feature:** FEAT-5
**Gefunden:** 2026-04-05

## Beschreibung

Die Funktion `gainLossSign()` in `PortfolioPositionRow.tsx` gibt für negative Werte einen leeren String zurück, weil der Kommentar im Code ("negative sign comes from the number itself") davon ausgeht, dass die Zahl selbst das Minuszeichen trägt. Gleichzeitig wird `Math.abs(gainLossUSD)` übergeben, was das Vorzeichen entfernt. Das Ergebnis: Verlust-Positionen zeigen den absoluten Dollar-Betrag ohne Minuszeichen — die rote Farbe ist der einzige Hinweis auf einen Verlust.

Betroffen: Desktop-Layout (Zeile 64–65) und Mobile-Layout (Zeile 119).

```tsx
// Aktueller Code in PortfolioPositionRow.tsx (Zeile 19–22):
function gainLossSign(value: number): string {
  if (value > 0) return '+'
  return ''  // negative sign comes from the number itself ← FALSCH: Math.abs() entfernt es
}

// Zeile 64-65 (Desktop) und Zeile 119 (Mobile):
{gainLossSign(gainLossUSD)}{formatCurrency(Math.abs(gainLossUSD))}
// Ergebnis bei ADA (gainLossUSD = -494): "$494.00" statt "-$494.00"
```

Der G/V%-Wert (`formatPercent`) ist hingegen korrekt: `-13.68%` wird korrekt mit Minus angezeigt, da `value.toFixed(2)` das Vorzeichen erhält. Das erzeugt eine inkonsistente Darstellung: `%` mit Minus, USD-Betrag ohne Minus.

## Schritte zur Reproduktion

1. App laden (Pre-Seed-Daten sind aktiv)
2. ADA-Position in der Portfolio-Liste suchen (ist als Verlust markiert, roter Hintergrund)
3. Spalte "G/V USD" beobachten: zeigt `$494.00` statt `-$494.00`
4. Spalte "G/V %" beobachten: zeigt `-13.68%` korrekt mit Minus

## Erwartetes Verhalten

AC-3: "Jede Position zeigt Gewinn/Verlust in USD". Bei Verlust muss ein Minuszeichen vor dem Betrag stehen: `-$494.00`.

## Tatsächliches Verhalten

Verlust-Positionen zeigen `$494.00` (ohne Minus). Nur die rote Textfarbe signalisiert den Verlust — der numerische Wert selbst ist nicht eindeutig lesbar, insbesondere in schwarz-weiß oder für Farbenblinde.

## Fix

```tsx
function gainLossSign(value: number): string {
  if (value > 0) return '+'
  if (value < 0) return '-'
  return ''
}
```

## Referenz

AC-3 direkt verletzt / Edge Case "sehr kleiner Kaufpreis" tangiert (formatierung muss korrekt sein)

## Priority

Fix before release

**Status:** Fixed – gainLossSign() gibt jetzt '-' für negative Werte zurück; Math.abs() bleibt erhalten
