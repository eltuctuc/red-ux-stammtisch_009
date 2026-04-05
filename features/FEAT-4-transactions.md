---
status: approved
---

# FEAT-4: Transaktionshistorie
*Erstellt: 2026-04-05*
*Scope-Typ: Klickbarer Prototyp – Fix-Schwelle: Critical*

## Zusammenfassung
Eine Liste der letzten 5–10 Mock-Transaktionen (Kauf/Verkauf) mit Datum, Asset, Menge und Betrag. Die Transaktionshistorie vervollständigt das Dashboard als vollständige Portfolio-Ansicht und gibt dem Showcase Tiefe.

## Zielgruppe
- **Kai (Krypto-Trader):** Kontrolliert seine Trades, erwartet strukturierte und korrekte Darstellung (Kauf/Verkauf klar unterscheidbar, Beträge stimmig)
- **Mia (pragmatische Investorin):** Schaut selten hinein, will aber verstehen was die letzten Aktivitäten waren
- **Showcase-Betrachter:** Bewertet ob die Liste realistisch und visuell klar gegliedert wirkt

## Kernwert
Die Transaktionshistorie macht das Dashboard vollständig – ohne sie wirkt es wie ein reines Chart-Tool, nicht wie eine Portfolio-Verwaltung.

## Nicht im Scope
- Hinzufügen neuer Transaktionen durch den User
- Filtern oder Sortieren der Transaktionen
- Paginierung (nur die neuesten 5–10)
- CSV-Export
- Transaktionsdetails / Drill-Down-View

## User Stories

1. Als Betrachter möchte ich eine chronologisch sortierte Liste der letzten Transaktionen sehen, damit ich nachvollziehen kann wann was gekauft oder verkauft wurde.
2. Als Betrachter möchte ich auf einen Blick erkennen ob eine Transaktion ein Kauf oder Verkauf war (farblich oder per Label), damit ich nicht jede Zeile einzeln lesen muss.
3. Als Kai möchte ich zu jeder Transaktion die gekaufte/verkaufte Menge und den Gesamtbetrag in USD sehen, damit ich die Transaktionen plausibel einschätzen kann.
4. Als Betrachter möchte ich das Datum jeder Transaktion relativ oder absolut sehen (z.B. "vor 2 Tagen" oder "03.04.2026"), damit ich die zeitliche Einordnung verstehe.
5. Als Showcase-Betrachter möchte ich, dass die Mock-Daten realistisch wirken (keine runden Beträge, bekannte Assets, plausible Zeitabstände), damit das Dashboard nicht wie ein Dummy-Daten-Template aussieht.

## Acceptance Criteria

1. Die Liste zeigt zwischen 5 und 10 Transaktionen – neueste zuerst.
2. Jede Transaktion enthält: Typ (Kauf/Verkauf), Asset-Name + Symbol, Menge, Preis pro Einheit, Gesamtbetrag (USD), Datum.
3. Käufe und Verkäufe sind visuell unterscheidbar – z.B. durch farbiges Label ("Kauf" grün / "Verkauf" rot) oder Icon.
4. Das Datum ist lesbar formatiert (z.B. "03. Apr 2026" oder relatives Format "vor 2 Tagen").
5. Alle Beträge sind korrekt formatiert (Tausendertrennzeichen, 2 Dezimalstellen für USD).
6. Die Liste ist auf Desktop ohne horizontales Scrollen vollständig lesbar.
7. Auf mobilen Viewports (375px) ist die Tabelle scrollbar oder als kompakte Karten dargestellt – kein Overflow.
8. Mock-Daten enthalten Assets aus FEAT-1 (Portfolio) – die Transaktionen erklären plausibel wie das aktuelle Portfolio zustande kam.

## Edge Cases

| Fall | Erwartetes Verhalten |
|------|----------------------|
| Sehr kleine Menge (z.B. 0.00034 BTC) | Korrekt formatiert, kein Runden auf 0 |
| Sehr großer Betrag (z.B. $71.000 BTC-Kauf) | Tausenderformatierung, kein Layout-Bruch |
| Älteste Transaktion mehrere Monate zurück | Datum absolut formatiert, kein "vor 180 Tagen" |
| Zwei Transaktionen am gleichen Tag | Beide angezeigt, Uhrzeitunterschied erkennbar oder Reihenfolge klar |
| Schmaler Viewport | Kompaktes Layout, keine abgeschnittenen Zahlen |

## Mock-Daten (Referenz)

```
Transaktionen (neueste zuerst):
1. Kauf   – SOL  – 12 SOL  @ $178.20  – $2,138.40  – 04. Apr 2026
2. Verkauf– ETH  – 1.5 ETH @ $2,810.00 – $4,215.00 – 01. Apr 2026
3. Kauf   – BTC  – 0.05 BTC @ $84,900.00 – $4,245.00 – 28. Mär 2026
4. Kauf   – ADA  – 1.200 ADA @ $0.81 – $972.00     – 25. Mär 2026
5. Verkauf– BNB  – 5 BNB  @ $592.00  – $2,960.00   – 20. Mär 2026
6. Kauf   – ETH  – 2 ETH  @ $2,750.00 – $5,500.00  – 15. Mär 2026
7. Kauf   – SOL  – 30 SOL @ $172.50  – $5,175.00   – 10. Mär 2026
8. Kauf   – XRP  – 800 XRP @ $0.56   – $448.00     – 05. Mär 2026
```

---

## 2. UX Entscheidungen
*UX-Designer: Claude – 2026-04-05*

### Einbettung
**Wo lebt das Feature:** Sektion S-01-D – unterste Sektion, full-width, über die gesamte Dashboard-Breite. Kein Modal, keine Route.

**Begründung:** Transaktionslisten sind sequenzielle Daten – sie gehören ans Ende des Flows, nachdem der Betrachter Portfolio (oben), Chart und Watchlist (Mitte) verarbeitet hat. Full-width ist nötig: 6 Datenspalten brauchen Platz. Eine schmale Spalte würde den Inhalt erzwingen.

---

### Layout-Entscheidung: Tabelle (Desktop) vs. Karten (Mobile)

**Problem:** Eine 6-Spalten-Tabelle auf 375px ist nicht lesbar.

**Lösung: Dual-Layout-Pattern**
- **Desktop (≥1280px):** HTML-Tabelle mit 6 Spalten
- **Mobile (375px):** Karten-Layout (`block md:table`) – eine Karte pro Transaktion

**Desktop-Tabelle – Spalten und Breiten:**
| Spalte | Inhalt | Ausrichtung | Breite |
|--------|--------|-------------|--------|
| Typ | Kauf/Verkauf-Badge | links | 80px |
| Asset | Icon + Name + Symbol | links | 180px |
| Menge | 0.05 BTC / 12 SOL | rechts | 120px |
| Preis/Einheit | $84,900.00 | rechts | 130px |
| Gesamtbetrag | $4,245.00 | rechts | 130px |
| Datum | 28. Mär 2026 | rechts | 120px |

Gesamtbreite: ~760px – komfortabel auf 1280px+.

**Numerische Spalten rechtsbündig:** Finanz-Konvention (Dezimalkommas aligned), erleichtert Kai das vertikale Scannen von Beträgen.

**Tabular Numbers:** `font-variant-numeric: tabular-nums` (`tabular-nums` Tailwind-Klasse) – verhindert unterschiedliche Spaltenbreiten bei 0.00034 vs. 71,000.

**Mobile-Karten-Layout:**
```
┌──────────────────────────────────┐
│  [Kauf ↑]  Bitcoin  BTC    04. Apr 2026  │
│  0.05 BTC @ $84,900.00           │
│                        $4,245.00 │
└──────────────────────────────────┘
```
- Typ-Badge + Asset oben links, Datum oben rechts (klein, slate-400)
- Menge + Preis/Einheit zweite Zeile links
- Gesamtbetrag zweite Zeile rechts, `font-semibold text-slate-50`

---

### Kauf/Verkauf-Differenzierung

**Badge-Pattern** (Text + Farbe, kein reines Icon):
- Kauf: `bg-green-500/10 text-green-400 border border-green-500/20 rounded-md px-2 py-0.5 text-xs font-medium`
- Verkauf: `bg-red-500/10 text-red-400 border border-red-500/20 rounded-md px-2 py-0.5 text-xs font-medium`

**Begründung für Text + Farbe statt nur Farbe:** Accessibility – Farbenblinde Nutzer können Kauf/Verkauf trotzdem unterscheiden. Kai schätzt Explizitheit. Ein reines "↑/↓"-Icon wäre zu ambivalent für Finanzdaten.

---

### Datum-Formatierung

**Adaptive Formatierung:**
- Transaktionen ≤7 Tage alt: relatives Format `"vor 1 Tag"`, `"vor 3 Tagen"`
- Transaktionen >7 Tage alt: absolutes Datum `"10. Mär 2026"`

**Begründung:** Edge Case aus Spec: "Älteste Transaktion mehrere Monate zurück → absolut". 7-Tage-Schwelle ist die intuitive Grenze: darüber hinaus ist "vor 23 Tagen" weniger aussagekräftig als ein Datum.

Alle 8 Mock-Transaktionen (älteste: 05. Mär 2026) liegen >7 Tage → alle werden mit absolutem Datum dargestellt. Die neueste (04. Apr 2026) = "vor 1 Tag" (relativ zu 05. Apr 2026 Stand heute).

---

### Zebra-Striping

**Entscheidung: JA** – `even:bg-slate-800/30` auf geraden Rows.

**Begründung:** 8 Zeilen ohne visuelle Hilfe sind für Kai anstrengend horizontal zu lesen (besonders Beträge). Subtiles Striping (~10% Opacity) hilft ohne den Dark-Mode-Look zu brechen. Nicht übertreiben – `bg-slate-800/30`, nicht `bg-slate-700`.

---

### Visuelle Sprache

**Section Header:** `"Letzte Transaktionen"` – konsistenter Stil mit FEAT-3 Watchlist-Header: `text-xs font-medium uppercase tracking-wider text-slate-500`

**Table Header Row:**
- `text-xs uppercase tracking-wider text-slate-500`
- `border-b border-slate-700` (etwas stärker als Row-Separatoren)

**Row-Separatoren:** `border-b border-slate-800/60` (subtiler als Header-Trennlinie)

**Typography pro Zelle:**
| Element | Größe | Weight | Farbe |
|---------|-------|--------|-------|
| Asset Name | 14px | 600 | `slate-100` |
| Asset Symbol | 12px | 400 | `slate-400` |
| Mengen-Zahl | 14px | 400 | `slate-300` |
| Preis/Einheit | 14px | 400 | `slate-300` |
| Gesamtbetrag | 14px | 600 | `slate-50` |
| Datum | 13px | 400 | `slate-400` |

**Gesamtbetrag fetter als andere Zahlen** – der entscheidende Wert je Transaktion bekommt die stärkste Gewichtung.

---

### Komponenten

| Komponente | Verwendung | Status |
|-----------|-----------|--------|
| `TransactionSection` | Container `bg-slate-900 rounded-xl p-6` | Neu bauen |
| `TransactionTable` | `<table>` Desktop, `<div>`-Karten Mobile | Neu bauen |
| `TransactionRow` | Eine Zeile / eine Karte | Neu bauen |
| `TxTypeBadge` | Kauf/Verkauf-Badge (grün/rot) | Neu bauen |
| `AssetCell` | Icon (32px) + Name + Symbol (aus FEAT-3 wiederverwendbar) | Wiederverwendung `AssetIcon` + `AssetListRow`-Pattern |

**DS-Lücke:** Design System leer → alles neu mit Tailwind.

**Hinweis Wiederverwendung:** `AssetIcon` aus FEAT-3 kann hier direkt genutzt werden. `TxTypeBadge` ist Feature-spezifisch (kein Äquivalent in FEAT-1/2/3).

---

### Touch-Targets

**Keine tappbaren Elemente** – Transaktions-Rows sind `<tr>` ohne Link. WCAG 2.5.5 entfällt.

---

### Kontrast-Check (WCAG AA)
Hintergrund Rows: `slate-900` (#0f172a), Zebra-Rows: `slate-800/30` (~#1a2332)

| Element | Vordergrund | Hintergrund | Verhältnis | Status |
|---------|------------|-------------|------------|--------|
| Asset Name | `slate-100` #f1f5f9 | `slate-900` | ~14:1 | ✅ |
| Asset Symbol | `slate-400` #94a3b8 | `slate-900` | ~4.9:1 | ✅ |
| Menge/Preis | `slate-300` #cbd5e1 | `slate-900` | ~9:1 | ✅ |
| Gesamtbetrag | `slate-50` #f8fafc | `slate-900` | ~17:1 | ✅ |
| Datum | `slate-400` #94a3b8 | `slate-900` | ~4.9:1 | ✅ |
| Kauf-Badge | `green-400` #4ade80 | `green-500/10` (~#0a1a10) | ~8:1 | ✅ |
| Verkauf-Badge | `red-400` #f87171 | `red-500/10` (~#1a0a0a) | ~7:1 | ✅ |
| Table Header | `slate-500` #64748b | `slate-900` | ~3.8:1 | ⚠️ UI-Schwelle 3:1 ✅ |

Alle Textelemente ≥4.5:1. Table Header bewusst auf UI-Schwelle (3:1) abgestützt – identisch zur Entscheidung in FEAT-3.

---

### Navigation nach Aktionen
Keine. S-01-D hat keine Outgoing Transitions. Flows-Dokument kein Update nötig.

---

## Fortschritt
- Status: Freigegeben
- Aktueller Schritt: UX ✓ → Architect
