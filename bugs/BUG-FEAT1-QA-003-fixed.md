---
id: BUG-FEAT1-QA-003
feature: FEAT-1
severity: Medium
status: Fixed
---

# BUG-FEAT1-QA-003: AssetList verwendet keine Listen-Semantik – Screen Reader kündigt keine Liste an

**Severity:** Medium
**Bereich:** A11y
**Gefunden von:** QA Engineer

## Beschreibung

`AssetList.tsx` und `AssetListRow.tsx` verwenden ausschließlich `<div>`-Elemente ohne semantische Rollen. Screen Reader (NVDA, VoiceOver) können bei einem `<div>`-Container keinen Listenkontext ankündigen — der User hört keine Information wie "Liste mit 6 Einträgen" und kann nicht mit Listennavigations-Shortcuts durch die Assets springen.

Die WCAG-Technik G115 (Semantic elements to identify purpose) verlangt, dass Gruppen von gleichartigen Elementen mit angemessener Semantik versehen werden. Die Asset-Zeilen sind inhaltlich eine Liste und sollten als solche kommuniziert werden.

## Erwartetes Verhalten

Screen Reader sollte beim Fokussieren der Asset-Liste ankündigen: "Liste mit 6 Einträgen" (oder ähnlich, je nach SR). Die sechs Asset-Zeilen sollten navigierbar sein.

## Tatsächliches Verhalten

`AssetList.tsx` rendert:
```html
<div class="flex-1 min-w-0 overflow-y-auto ...">
  <div class="flex items-center ...">…</div>  <!-- BTC -->
  <div class="flex items-center ...">…</div>  <!-- ETH -->
  …
</div>
```

Kein semantisches `<ul>`/`<li>`, kein `role="list"` / `role="listitem"`. VoiceOver/NVDA behandelt dies als generischen Container — kein Listenkontext, keine Navigations-Shortcuts.

## Schritte zur Reproduktion

1. Safari + VoiceOver aktivieren
2. Dashboard laden, VO auf die Asset-Sektion navigieren
3. VO liest die Zeilen einzeln, kündigt keine "Liste" an
4. Listennavigations-Taste (VoiceOver: L) findet keine Liste in diesem Bereich

## Fix-Vorschlag

Option A (HTML-semantisch, bevorzugt): `<div>` in `<ul>`/`<li>` umwandeln.

```tsx
// AssetList.tsx
<ul className="flex-1 min-w-0 overflow-y-auto max-h-[300px] sm:max-h-none list-none p-0 m-0">
  {visible.map((asset, i) => (
    <AssetListRow key={asset.symbol} asset={asset} isLast={i === visible.length - 1} />
  ))}
</ul>

// AssetListRow.tsx: äußeres <div> zu <li> ändern
<li className={`flex items-center justify-between h-10 ...`}>
```

Option B (ARIA): `role="list"` und `role="listitem"` hinzufügen, wenn HTML-Element-Änderung aus Style-Gründen vermieden werden soll.

```tsx
// AssetList.tsx
<div role="list" className="flex-1 min-w-0 overflow-y-auto ...">

// AssetListRow.tsx
<div role="listitem" className="flex items-center ...">
```

Option A ist vorzuziehen, da sie native Semantik nutzt und keinen zusätzlichen ARIA-Overhead hat.
