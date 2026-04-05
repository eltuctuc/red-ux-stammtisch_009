---
feature: FEAT-3
severity: Medium
status: Fixed
---

# BUG-FEAT3-QA-001: formatCurrency zeigt $0.00 für Sub-Penny-Preise

**Severity:** Medium
**Bereich:** Functional
**Status:** Open

## Beschreibung

`formatCurrency` in `projekt/src/utils/format.ts` verwendet `maximumFractionDigits: 2`, was Preise kleiner als $0.005 auf `$0.00` rundet. Die Spec definiert explizit als Edge Case: "Preis sehr klein (z.B. $0.0004 für DOGE-ähnlich) | Korrekte Dezimalformatierung, kein Runden auf $0.00".

Die Funktion erfüllt diesen Edge Case nicht. Ein Asset mit `priceUSD: 0.0004` würde als `$0.00` angezeigt – und damit einen Preis vortäuschen, der schlicht falsch ist.

Die aktuellen 6 Watchlist-Assets sind nicht betroffen (kleinster Preis: MATIC $0.92). Das Problem schlägt jedoch zu, sobald ein zukünftiger Asset mit Sub-Penny-Preis in `watchlistData` eingetragen wird – oder dieselbe Funktion in FEAT-4 (Transaktionshistorie) für solche Assets genutzt wird.

## Schritte zur Reproduktion

1. `watchlistData` in `projekt/src/data/watchlist.ts` um einen Eintrag ergänzen: `{ symbol: 'DOGE', name: 'Dogecoin', priceUSD: 0.0004, change24hPercent: 1.0, iconColor: '#c3a634' }`
2. App im Browser öffnen
3. Watchlist-Eintrag für DOGE beobachten

## Erwartetes Verhalten

Der Preis wird korrekt mit ausreichend Dezimalstellen angezeigt, z.B. `$0.0004` – kein Runden auf `$0.00`.

## Tatsächliches Verhalten

`formatCurrency(0.0004)` gibt `$0.00` zurück. Der Preis ist damit faktisch falsch.

## Fix-Vorschlag

`formatCurrency` um adaptive Dezimalstellen erweitern. Für Werte < $0.01 mehr Nachkommastellen zulassen:

```ts
export function formatCurrency(value: number): string {
  const fractionDigits = value > 0 && value < 0.01 ? 6 : 2
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: fractionDigits,
  }).format(value)
}
```

Alternativ: eine separate `formatCurrencyPrecise`-Funktion für Watchlist/Sub-Penny-Kontexte.

Da `formatCurrency` eine geteilte Utility ist, muss der Fix auf Regression in FEAT-1 und FEAT-2 geprüft werden (beide nutzen diese Funktion für Werte >> $1).
