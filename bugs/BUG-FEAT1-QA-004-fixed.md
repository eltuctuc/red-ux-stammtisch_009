---
id: BUG-FEAT1-QA-004
feature: FEAT-1
severity: Low
status: Fixed
---

# BUG-FEAT1-QA-004: AssetListRow ruft formatQuantity ohne symbol-Parameter auf und hängt Symbol manuell an

**Severity:** Low
**Bereich:** Logic
**Gefunden von:** QA Engineer

## Beschreibung

`AssetListRow.tsx` Zeile 27 ruft `formatQuantity(asset.quantity)` ohne den `symbol`-Parameter auf und kombiniert das Symbol anschließend via JSX-String-Interpolation:

```tsx
{formatQuantity(asset.quantity)} {asset.symbol}
```

Die Funktion `formatQuantity` akzeptiert explizit einen optionalen `symbol`-Parameter, der genau für diesen Zweck existiert:

```ts
export function formatQuantity(value: number, symbol?: string): string
```

Das erzeugt aktuell identische Ausgabe (z.B. `"0.842 BTC"`). Aber: Der JSX-Ansatz umgeht die API-Kontrolle der Hilfsfunktion. Wenn `formatQuantity` in Zukunft das Spacing zwischen Zahl und Symbol ändert — etwa ein Narrow No-Break Space (U+202F) für typografisch korrektes Einheiten-Spacing einzusetzen — wird `AssetListRow` dieses Update nicht erhalten und zeigt inkonsistente Formatierung im Vergleich zu anderen Stellen die `formatQuantity(value, symbol)` korrekt aufrufen.

## Erwartetes Verhalten

`formatQuantity` wird mit beiden Parametern aufgerufen:
```tsx
{formatQuantity(asset.quantity, asset.symbol)}
```

## Tatsächliches Verhalten

```tsx
// AssetListRow.tsx, Zeile 27:
{formatQuantity(asset.quantity)} {asset.symbol}
// Erzeugt: "0.842 BTC" (mit normalem ASCII-Space, am JSX-Rendering hängend)
```

Aktuell identisches Ergebnis, aber inkonsistente API-Nutzung.

## Schritte zur Reproduktion

1. `format.ts`: `formatQuantity` so anpassen, dass bei übergebenem Symbol ein Narrow No-Break Space (U+202F) eingefügt wird
2. Alle Aufrufe mit `formatQuantity(value, symbol)` zeigen korrektes Spacing
3. `AssetListRow` zeigt weiterhin normalen Leerzeichen — visuell inkonsistent

## Fix-Vorschlag

In `AssetListRow.tsx`, Zeile 27: symbol-Parameter übergeben.

```tsx
// Aktuell:
<span className="text-xs text-slate-400 leading-tight">
  {formatQuantity(asset.quantity)} {asset.symbol}
</span>

// Korrekt:
<span className="text-xs text-slate-400 leading-tight">
  {formatQuantity(asset.quantity, asset.symbol)}
</span>
```
