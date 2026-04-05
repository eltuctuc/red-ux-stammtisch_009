import type { Asset } from '@/data/portfolio'
import { formatCurrency, formatQuantity } from '@/utils/format'

interface AssetListRowProps {
  asset: Asset
  isLast: boolean
}

export function AssetListRow({ asset, isLast }: AssetListRowProps) {
  return (
    <div
      className={`flex items-center justify-between h-10 ${!isLast ? 'border-b border-slate-800' : ''}`}
    >
      {/* Left: color dot + name/symbol */}
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: asset.color }}
          aria-hidden
        />
        <div className="min-w-0">
          <span className="text-sm font-semibold text-slate-100 truncate block leading-tight">
            {/* Edge case: truncate long names */}
            {asset.name}
          </span>
          <span className="text-xs text-slate-400 leading-tight">
            {formatQuantity(asset.quantity)} {asset.symbol}
          </span>
        </div>
      </div>

      {/* Right: value + portfolio percent */}
      <div className="text-right shrink-0 ml-3">
        <span className="text-sm font-semibold text-slate-50 block leading-tight">
          {formatCurrency(asset.valueUSD)}
        </span>
        <span className="text-xs text-slate-400 leading-tight">
          {asset.portfolioPercent.toFixed(1)}%
        </span>
      </div>
    </div>
  )
}
