# Dev Handoff – FEAT-4 Transaktionshistorie
*Erstellt: 2026-04-05*

## Was wurde gebaut

Transaktionshistorie (S-01-D) als full-width Sektion am Ende des Dashboards. 8 Transaktionen (Kauf/Verkauf) aller Portfolio-Assets, Dual-Layout: Tabelle auf Desktop (md+), Karten auf Mobile.

## Implementierte Dateien

| Datei | Zweck |
|-------|-------|
| `projekt/src/data/transactions.ts` | 8 Mock-Transaktionen, neueste zuerst |
| `projekt/src/components/transactions/TxTypeBadge.tsx` | Kauf (grün) / Verkauf (rot) Badge mit Text |
| `projekt/src/components/transactions/TransactionRow.tsx` | Desktop `<tr>` (hidden md:table-row) + Mobile `<div role="listitem">` (md:hidden) |
| `projekt/src/components/transactions/TransactionTable.tsx` | Desktop `<table hidden md:table>` + Mobile `<div md:hidden role="list">` |
| `projekt/src/components/transactions/TransactionSection.tsx` | Container-Card mit "Letzte Transaktionen"-Header |
| `projekt/src/App.tsx` | TransactionSection unter dem xl:-Grid |

## Wichtige Implementierungsdetails

- **Dual-Layout:** `TransactionRow` rendert *zwei* Elemente – ein `<tr>` (desktop) und ein `<div>` (mobile), jeweils mit Tailwind `hidden md:table-row` / `md:hidden`
- **Zebra-Striping:** `isEven` prop (basiert auf Index-Parität) → `bg-slate-800/30` auf geraden Rows
- **tabular-nums:** Auf allen numerischen `<td>`-Zellen (Menge, Preis/Einheit, Gesamtbetrag)
- **formatDate:** Bereits in `utils/format.ts` implementiert – ≤7 Tage relativ, >7 absolut
- **formatQuantity:** Für kleine Mengen (0.05 BTC, 1200 ADA) korrekt formatiert
- **formatCurrency:** Nach QA-Fix FEAT-3 adaptiv für Sub-Penny-Preise (0.81 ADA, 0.56 XRP)
- **AssetIcon:** Wiederverwendung aus FEAT-3 – Fallback-Circle für alle Assets (kein PNG-Verzeichnis)
- **Section Header:** Konsistenter Stil mit FEAT-3: `text-xs font-medium uppercase tracking-wider text-slate-500`

## Für QA relevant (Acceptance Criteria)

1. 8 Transaktionen, neueste zuerst ✓
2. Typ, Asset-Name+Symbol, Menge, Preis/Einheit, Gesamtbetrag, Datum vorhanden ✓
3. Kauf grün / Verkauf rot (Badge mit Text) ✓
4. Datum: tx-1 (2026-04-04) → "vor 1 Tag", tx-2 (2026-04-01) → "vor 4 Tagen", ab tx-3 absolut ✓
5. Beträge korrekt formatiert (Tausendertrennzeichen, 2 Dezimalstellen) ✓
6. Desktop: Tabelle ohne horizontales Scrollen ✓
7. Mobile: Karten-Layout, kein Overflow ✓
8. Alle Assets aus FEAT-1 Portfolio vorhanden (BTC, ETH, SOL, BNB, ADA, XRP) ✓

## Datum-Hinweis für QA

Heute = 2026-04-05. Die Datumsformatierung ist zeitabhängig:
- tx-1: 2026-04-04 → "vor 1 Tag" ✓
- tx-2: 2026-04-01 → "vor 4 Tagen" ✓
- tx-3 ff.: absolut (> 7 Tage) ✓

## Fix-Schwelle

Aktuell: `Critical` (aus FEAT-4 Spec). Wird beim ersten QA-Run bestätigt.
