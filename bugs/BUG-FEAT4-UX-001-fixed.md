---
feature: FEAT-4
severity: Medium
status: Fixed
---

# BUG-FEAT4-UX-001: AssetIcon im Desktop-Layout zu klein (28px statt 32px)

**Severity:** Medium
**Bereich:** UX / Visuelle Konsistenz
**Status:** Open

## Beschreibung

Der `AssetIcon` in der Desktop-Tabelle wird mit `size={28}` gerendert. Die UX-Spec definiert für die AssetCell im Desktop-Layout explizit 32px. Das ist keine Kleinigkeit: 28px und 32px nebeneinander (z.B. wenn AssetIcon auch in FEAT-3 Watchlist mit 32px genutzt wird) erzeugen eine sichtbare Inkonsistenz zwischen den Sektionen.

## Schritte zur Reproduktion

1. Dashboard auf Desktop (≥1280px) öffnen
2. Transaktionshistorie-Tabelle betrachten
3. Asset-Spalte: Icon-Größe mit der Watchlist (FEAT-3) vergleichen

## Erwartetes Verhalten (aus Spec)

FEAT-4 Spec, Abschnitt "Komponenten":
> `AssetCell` → Icon (32px) + Name + Symbol (aus FEAT-3 wiederverwendbar)

AssetIcon soll 32px groß sein – identisch zum Muster aus FEAT-3.

## Tatsächliches Verhalten (im Code)

`TransactionRow.tsx`, Zeile 23:
```tsx
<AssetIcon symbol={tx.assetSymbol} name={tx.assetName} color={tx.assetColor} size={28} />
```

Icon wird mit 28px gerendert – 4px zu klein.

## Fix-Vorschlag

In `TransactionRow.tsx`, Zeile 23, `size={28}` auf `size={32}` ändern:

```tsx
<AssetIcon symbol={tx.assetSymbol} name={tx.assetName} color={tx.assetColor} size={32} />
```

Der Mobile-Icon (Zeile 54, `size={20}`) ist korrekt und bleibt unverändert – die Spec definiert für das Karten-Layout keine spezifische Größe, 20px ist dort angemessen.
