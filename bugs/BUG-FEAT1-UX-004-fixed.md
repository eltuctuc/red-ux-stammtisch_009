---
id: BUG-FEAT1-UX-004
feature: FEAT-1
severity: High
status: Fixed
---

# BUG-FEAT1-UX-004: Asset-Menge fehlt in der Spec-Anforderung – Acceptance Criteria AC-4 nicht erfüllt

**Severity:** High
**Bereich:** Layout
**Gefunden von:** UX Reviewer

## Beschreibung

Acceptance Criterion 4 (AC-4) verlangt: "Die Asset-Verteilung zeigt mindestens 4, maximal 6 Assets mit Name, Symbol, **Menge**, aktuellem Wert und prozentualer Gewichtung im Portfolio."

Die `AssetListRow` zeigt: Farb-Dot + Name + (Menge + Symbol in einer Zeile) + Wert + %. Das klingt vollständig – ist es aber nicht für Persona Kai.

Das eigentliche Problem: Die Menge wird als sekundäre Zeile unter dem Name angezeigt (`text-xs text-slate-400`), zusammen mit dem Symbol. Das ist `formatQuantity(asset.quantity)` + ` ` + `asset.symbol`. Der Asset-Name "BNB" in den Mock-Daten hat jedoch `name: 'BNB'` und `symbol: 'BNB'` – identische Werte. Die zweite Zeile zeigt also "18 BNB" unter "BNB", was redundant wirkt und Kai sofort als Datensatz-Inkonsistenz auffallen wird.

Separat: `formatQuantity(asset.quantity)` wird in `AssetListRow` aufgerufen mit nur einem Argument (kein Symbol-Parameter), dann wird `{asset.symbol}` separat daneben gerendert. In `format.ts` gibt `formatQuantity` ohne Symbol-Parameter nur die Zahl zurück – das Rendering im JSX (`{formatQuantity(asset.quantity)} {asset.symbol}`) ist korrekt, aber das Format der Funktion stimmt nicht mit der Spec überein: Die Spec-Tabelle zeigt `formatQuantity(n, sym)` → "0.842 BTC" als Einheit. Die Implementierung trennt Zahl und Symbol im JSX statt die Util-Funktion korrekt zu verwenden.

## Erwartetes Verhalten (aus UX-Spec)

Asset-Liste zeigt pro Asset: Name, Symbol, Menge (in einer sinnvollen Formatierung), aktueller Wert, prozentualer Anteil. Die Mock-Daten in `portfolio.ts` definieren `name: 'BNB'` – das ist inhaltlich ein Problem, da Name und Symbol identisch sind und die Zeile redundant wirkt.

## Tatsächliches Verhalten

`AssetListRow` zeigt für BNB:
- Hauptzeile: "BNB" (name)
- Unterzeile: "18 BNB" (quantity + symbol)

Für Kai, der glaubwürdige Daten erwartet, wirkt "BNB / 18 BNB" wie ein Mock-Datenfehler. Die korrekte Darstellung wäre "BNB Chain" oder "Binance Coin" als Name, und "BNB" als Symbol – analog zu Bitcoin/BTC, Ethereum/ETH.

## Fix-Vorschlag

Zwei separate Korrekturen:

1. In `portfolio.ts`: `name: 'BNB'` zu `name: 'BNB Chain'` ändern (der gebräuchliche Langname). Das ist eine Daten-Korrektur, die Kai sofort als realistischer empfinden wird.

```ts
// Aktuell:
{ symbol: 'BNB', name: 'BNB', ... }

// Korrekt (glaubwürdig für Kai):
{ symbol: 'BNB', name: 'BNB Chain', ... }
```

2. Optional: `formatQuantity` in `AssetListRow` mit dem Symbol-Parameter aufrufen, um die Util-Funktion konsistent mit ihrer Spec zu nutzen:
```tsx
{formatQuantity(asset.quantity, asset.symbol)}
```
