import type { WatchlistAsset } from '@/data/watchlist'
import { formatCurrency } from '@/utils/format'
import { AssetIcon } from '@/components/shared/AssetIcon'
import { PriceChangeBadge } from '@/components/shared/PriceChangeBadge'

interface WatchlistRowProps {
  asset: WatchlistAsset
  isLast: boolean
}

export function WatchlistRow({ asset, isLast }: WatchlistRowProps) {
  return (
    <div
      role="listitem"
      className={`flex items-center justify-between h-12 px-1 ${!isLast ? 'border-b border-slate-800' : ''}`}
    >
      {/* Left: Icon + Name/Symbol */}
      <div className="flex items-center gap-3 min-w-0">
        <AssetIcon symbol={asset.symbol} name={asset.name} color={asset.iconColor} />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-slate-100 truncate leading-tight">{asset.name}</p>
          <p className="text-[11px] text-slate-400 leading-tight">{asset.symbol}</p>
        </div>
      </div>

      {/* Right: Price + Change */}
      <div className="flex flex-col items-end flex-shrink-0 ml-2">
        <p className="text-[13px] font-semibold text-slate-50 leading-tight">{formatCurrency(asset.priceUSD)}</p>
        <PriceChangeBadge value={asset.change24hPercent} size="sm" />
      </div>
    </div>
  )
}
