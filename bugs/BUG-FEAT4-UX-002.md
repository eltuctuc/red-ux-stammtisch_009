---
feature: FEAT-4
severity: Low
status: Open
---

# BUG-FEAT4-UX-002: tabular-nums fehlt auf Datum-Zelle (Desktop)

**Severity:** Low
**Bereich:** UX / Typografie / Tabular Numbers
**Status:** Open

## Beschreibung

Die UX-Spec schreibt `tabular-nums` auf allen numerischen Spalten vor. In der Desktop-Tabelle haben Menge, Preis/Einheit und Gesamtbetrag korrekt `tabular-nums`. Die Datum-Spalte fehlt jedoch. Datumsangaben wie "04. Apr 2026" und "28. Mär 2026" haben unterschiedliche Zeichenbreiten – ohne `tabular-nums` können die Datumstexte je nach Schrift geringfügig in der Breite schwanken und die Spalte optisch unruhig wirken.

## Schritte zur Reproduktion

1. Desktop-Tabelle öffnen
2. Datum-Spalte vertikal scannen
3. Unterschiedliche Zeichenabstände bei verschiedenen Datumsstrings (Monatskürzel "Apr" vs. "Mär" etc.) beobachten

## Erwartetes Verhalten (aus Spec)

FEAT-4 Spec, Abschnitt "tabular-nums":
> Alle numerischen Zellen bekommen `tabular-nums`

Die Datum-Spalte ist als nummerische Spalte mit Zahlenbestandteilen definiert.

## Tatsächliches Verhalten (im Code)

`TransactionRow.tsx`, Zeile 39:
```tsx
<td className="py-3 pr-2 text-right text-[13px] text-slate-400">
  {formatDate(tx.date)}
</td>
```

`tabular-nums` fehlt in der Klassen-Liste.

## Fix-Vorschlag

`tabular-nums` zur Datum-Zelle hinzufügen:

```tsx
<td className="py-3 pr-2 text-right tabular-nums text-[13px] text-slate-400">
  {formatDate(tx.date)}
</td>
```
