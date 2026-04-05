import type { Asset } from '@/data/portfolio'
import { formatCurrency, formatQuantity } from '@/utils/format'

interface AssetListRowProps {
  asset: Asset
  isLast: boolean
}

export function AssetListRow({ asset, isLast }: AssetListRowProps) {
  return (
    // FIX QA-003: <li> statt <div> – passt zur <ul> in AssetList
    <li
      className={`flex items-center justify-between h-10 list-none ${!isLast ? 'border-b border-slate-800' : ''}`}
    >
      {/* Left: color dot + name/symbol */}
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: asset.color }}
          aria-hidden
        />
        <div className="min-w-0">
          {/* Edge case: truncate long names */}
          <span className="text-sm font-semibold text-slate-100 truncate block leading-tight">
            {asset.name}
          </span>
          <span className="text-xs text-slate-400 leading-tight">
            {/* FIX QA-004: formatQuantity mit symbol-Parameter verwenden */}
            {formatQuantity(asset.quantity, asset.symbol)}
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
    </li>
  )
}
