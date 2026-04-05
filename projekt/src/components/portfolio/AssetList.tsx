import type { Asset } from '@/data/portfolio'
import { AssetListRow } from './AssetListRow'

interface AssetListProps {
  assets: Asset[]
}

export function AssetList({ assets }: AssetListProps) {
  // Edge case: skip 0% assets
  const visible = assets.filter((a) => a.portfolioPercent > 0)

  return (
    <div className="flex-1 min-w-0 overflow-y-auto max-h-[300px] sm:max-h-none">
      {visible.map((asset, i) => (
        <AssetListRow key={asset.symbol} asset={asset} isLast={i === visible.length - 1} />
      ))}
    </div>
  )
}
