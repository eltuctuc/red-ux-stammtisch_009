---
feature: FEAT-4
severity: Low
status: Open
---

# BUG-FEAT4-UX-004: Doppeltes aria-label auf verschachtelten Elementen (Screen Reader Redundanz)

**Severity:** Low
**Bereich:** A11y / Accessibility
**Status:** Open

## Beschreibung

`TransactionSection` trägt `aria-label="Transaktionshistorie"` auf dem `<section>`-Element. `TransactionTable` setzt zusätzlich `aria-label="Letzte Transaktionen"` auf dem `<table>`-Element und ein weiteres `aria-label="Letzte Transaktionen"` auf dem mobilen `<div role="list">`. Screen Reader kündigen beim Betreten der Section die Label beider verschachtelten Elemente sequenziell an – der Nutzer hört das Label zweimal mit leicht unterschiedlichem Text ("Transaktionshistorie" vs. "Letzte Transaktionen"), was verwirrend wirkt.

WCAG 4.1.2: Redundante Labels auf verschachtelten Landmark/Role-Elementen erzeugen unnötige Verbalausgabe.

## Schritte zur Reproduktion

1. VoiceOver (macOS) oder NVDA (Windows) aktivieren
2. Dashboard aufrufen und zur Transaktionshistorie navigieren
3. Screen Reader kündigt "Transaktionshistorie" (section) an, dann unmittelbar "Letzte Transaktionen Tabelle" – zwei Labels für denselben Inhaltsblock

## Erwartetes Verhalten (aus Spec)

Die Spec definiert in Abschnitt "A11y-Architektur":
> `<table>` → `aria-label="Letzte Transaktionen"`

Implizit: Ein einzelnes, klares Label für die Tabelle. Die `<section>` mit `aria-label` ist eine zusätzliche Implementierungs-Entscheidung, die so nicht in der Spec steht.

## Tatsächliches Verhalten (im Code)

`TransactionSection.tsx`, Zeile 5:
```tsx
<section aria-label="Transaktionshistorie" ...>
```

`TransactionTable.tsx`, Zeile 9:
```tsx
<table aria-label="Letzte Transaktionen" ...>
```

`TransactionTable.tsx`, Zeile 37:
```tsx
<div role="list" aria-label="Letzte Transaktionen" ...>
```

Drei separate aria-labels auf verschachtelten Elementen, zwei davon identisch.

## Fix-Vorschlag

Das `aria-label` auf dem `<table>` und dem mobilen `<div role="list">` entfernen. Die `<section>` mit einem einheitlichen `aria-label="Letzte Transaktionen"` reicht für die Landmark-Navigation. Der `<h2>` "Letzte Transaktionen" innerhalb der Section stellt den Kontext für Screen Reader über die Überschriften-Navigation her – dafür kann alternativ auch `aria-labelledby` genutzt werden:

```tsx
// TransactionSection.tsx
<section aria-labelledby="tx-section-heading" className="bg-slate-900 rounded-xl p-6">
  <h2 id="tx-section-heading" className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-4">
    Letzte Transaktionen
  </h2>
  <TransactionTable />
</section>
```

```tsx
// TransactionTable.tsx
<table className="w-full hidden md:table">  {/* kein aria-label */}
  ...
</table>
<div className="md:hidden" role="list">  {/* kein aria-label */}
  ...
</div>
```

Das ist die sauberste Lösung: `<h2>` beschriftet die Section über `aria-labelledby`, Tabelle und Liste erben den Kontext.
