import type { Asset } from '@/data/portfolio'
import { AssetListRow } from './AssetListRow'

interface AssetListProps {
  assets: Asset[]
}

export function AssetList({ assets }: AssetListProps) {
  // Edge case: skip 0% assets
  const visible = assets.filter((a) => a.portfolioPercent > 0)

  return (
    // FIX QA-003: <ul role="list"> statt <div> – korrekte Listen-Semantik für Screen Reader
    // FIX UX-007: xl:max-h-none statt sm:max-h-none – passt zum xl-Breakpoint des Layouts
    <ul
      role="list"
      aria-label="Asset-Positionen"
      className="flex-1 min-w-0 w-full overflow-y-auto max-h-[300px] xl:max-h-none"
    >
      {visible.map((asset, i) => (
        <AssetListRow key={asset.symbol} asset={asset} isLast={i === visible.length - 1} />
      ))}
    </ul>
  )
}
