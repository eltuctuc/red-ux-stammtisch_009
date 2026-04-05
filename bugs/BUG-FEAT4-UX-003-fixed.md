---
feature: FEAT-4
severity: Medium
status: Fixed
---

# BUG-FEAT4-UX-003: Keine Spaltenbreiten definiert – Tabellen-Layout instabil bei variablen Daten

**Severity:** Medium
**Bereich:** UX / Layout-Stabilität
**Status:** Open

## Beschreibung

Die UX-Spec definiert für den Desktop-Table explizite Spaltenbreiten (Typ 80px, Asset 180px, Menge 120px, Preis/Einheit 130px, Gesamtbetrag 130px, Datum 120px). Die Implementierung setzt keine dieser Breiten – weder als `w-[80px]`-Klassen noch als `min-w-*` auf den `<th>`-Elementen. Der Browser verteilt die Breiten automatisch nach Inhalt.

Das ist ein Problem für den Showcase-Kontext: Bei variablen Inhalten (z.B. "Solana" vs. "XRP", "$84,900.00" vs. "$0.56") kann die automatische Tabellenbreiten-Verteilung dazu führen, dass die Asset-Spalte zu schmal wird und Asset-Namen abgeschnitten erscheinen, oder dass die Typ-Spalte mit dem "Verkauf"-Badge breiter zieht als nötig. Kai, der die Beträge vertikal scannt, verlässt sich auf stabile Spaltenbreiten.

## Schritte zur Reproduktion

1. Desktop-Tabelle mit den 8 Mock-Transaktionen öffnen
2. Typ-Spalte beobachten: "Kauf" (4 Zeichen) vs. "Verkauf" (7 Zeichen) – ohne feste Breite zieht die Spalte nach dem breitesten Badge-Text
3. Preis/Einheit-Spalte: "$0.81" vs. "$84,900.00" – ohne `min-w` kann die Spalte bei den teuren Assets stauchen und Zeilenumbrüche auslösen

## Erwartetes Verhalten (aus Spec)

FEAT-4 Spec, Abschnitt "Desktop-Tabelle – Spalten und Breiten":
| Spalte | Breite |
|--------|--------|
| Typ | 80px |
| Asset | 180px |
| Menge | 120px |
| Preis/Einheit | 130px |
| Gesamtbetrag | 130px |
| Datum | 120px |

Gesamtbreite: ~760px. Die Spec begründet dies mit "komfortabel auf 1280px+".

## Tatsächliches Verhalten (im Code)

`TransactionTable.tsx`, Zeilen 14–23: Die `<th>`-Elemente haben ausschließlich Padding- und Textausrichtungs-Klassen, keine Breitenangaben. Die Tabelle nutzt nur `w-full` auf dem `<table>`-Element.

## Fix-Vorschlag

Mindestbreiten auf die `<th>`-Zellen setzen. Da Tailwind keine beliebigen px-Werte für `w-` ohne Config hat, empfiehlt sich `min-w-[...]`:

```tsx
const headerConfig = [
  { label: 'Typ',          align: 'text-left',  width: 'w-[80px]'  },
  { label: 'Asset',        align: 'text-left',  width: 'w-[180px]' },
  { label: 'Menge',        align: 'text-right', width: 'w-[120px]' },
  { label: 'Preis/Einheit',align: 'text-right', width: 'w-[130px]' },
  { label: 'Gesamtbetrag', align: 'text-right', width: 'w-[130px]' },
  { label: 'Datum',        align: 'text-right', width: 'w-[120px]' },
]
```

Alternativ: `<colgroup>` mit `<col>`-Elementen und expliziten `style={{ width: '80px' }}`-Angaben – das ist die semantisch sauberste Lösung für HTML-Tabellen.
