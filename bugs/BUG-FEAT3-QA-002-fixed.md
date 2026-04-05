---
feature: FEAT-3
severity: Low
status: Fixed
---

# BUG-FEAT3-QA-002: PriceChangeBadge aria-label für 0.00% enthält führendes Leerzeichen

**Severity:** Low
**Bereich:** A11y
**Status:** Open

## Beschreibung

In `projekt/src/components/shared/PriceChangeBadge.tsx` wird das `aria-label` wie folgt gebaut:

```tsx
aria-label={`${isPositive ? 'Plus' : isNegative ? 'Minus' : ''} ${Math.abs(value).toFixed(2)} Prozent`}
```

Wenn `value === 0` ist weder `isPositive` noch `isNegative` true. Der erste Ausdruck ergibt einen leeren String `''`. Das Ergebnis ist `" 0.00 Prozent"` – mit führendem Leerzeichen und ohne semantischen Qualifier.

Ein Screen Reader liest diesen String als Pause gefolgt von "0.00 Prozent" – ohne Kontext, ob der Wert neutral ist. Die Spec definiert: `value === 0 → slate-400, kein Icon, "0.00%"` und dokumentiert den Neutral-State explizit. Das aria-label sollte diesem State entsprechen.

Kein aktuelles Watchlist-Asset hat `change24hPercent: 0`, daher ist der Bug in der laufenden App nicht reproduzierbar – er liegt aber im live-deployten Code und wird aktiv, sobald ein 0.00%-Asset in die Daten aufgenommen wird oder `PriceChangeBadge` für FEAT-1/FEAT-2 mit 0-Wert genutzt wird.

## Schritte zur Reproduktion

1. In `projekt/src/data/watchlist.ts` ein Asset auf `change24hPercent: 0` setzen
2. Mit Screen Reader (z.B. VoiceOver macOS) über den Eintrag navigieren
3. Den vorgelesenen Wert für die Prozentänderung hören

## Erwartetes Verhalten

`aria-label` liest sich sauber als `"0.00 Prozent"` (ohne führendes Leerzeichen) oder mit explizitem Neutral-Qualifier wie `"Neutral 0.00 Prozent"`.

## Tatsächliches Verhalten

`aria-label` ist `" 0.00 Prozent"` (führendes Leerzeichen, kein semantischer Qualifier). Einige Screen Reader kündigen das Leerzeichen als Pause an; der fehlende Qualifier macht den Neutral-State für assistive Technologien nicht eindeutig lesbar.

## Fix-Vorschlag

Den neutralen Fall explizit benennen:

```tsx
aria-label={`${isPositive ? 'Plus' : isNegative ? 'Minus' : 'Neutral'} ${Math.abs(value).toFixed(2)} Prozent`}
```

Das ergibt `"Neutral 0.00 Prozent"` – klar, kein führendes Leerzeichen, Screen-Reader-freundlich.
