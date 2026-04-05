import type { Transaction } from '@/data/transactions'
import { formatCurrency, formatQuantity, formatDate } from '@/utils/format'
import { AssetIcon } from '@/components/shared/AssetIcon'
import { TxTypeBadge } from './TxTypeBadge'

interface TransactionRowProps {
  tx: Transaction
  isEven: boolean
}

export function TransactionRow({ tx, isEven }: TransactionRowProps) {
  const zebraClass = isEven ? 'bg-slate-800/30' : ''

  return (
    <>
      {/* Desktop: table row (hidden on mobile) */}
      <tr className={`hidden md:table-row border-b border-slate-800/60 ${zebraClass}`}>
        <td className="py-3 pl-2 pr-4">
          <TxTypeBadge type={tx.type} />
        </td>
        <td className="py-3 pr-4">
          <div className="flex items-center gap-2">
            <AssetIcon symbol={tx.assetSymbol} name={tx.assetName} color={tx.assetColor} size={28} />
            <div>
              <p className="text-sm font-semibold text-slate-100 leading-tight">{tx.assetName}</p>
              <p className="text-xs text-slate-400 leading-tight">{tx.assetSymbol}</p>
            </div>
          </div>
        </td>
        <td className="py-3 pr-4 text-right tabular-nums text-sm text-slate-300">
          {formatQuantity(tx.quantity, tx.assetSymbol)}
        </td>
        <td className="py-3 pr-4 text-right tabular-nums text-sm text-slate-300">
          {formatCurrency(tx.pricePerUnit)}
        </td>
        <td className="py-3 pr-4 text-right tabular-nums text-sm font-semibold text-slate-50">
          {formatCurrency(tx.totalUSD)}
        </td>
        <td className="py-3 pr-2 text-right text-[13px] text-slate-400">
          {formatDate(tx.date)}
        </td>
      </tr>

      {/* Mobile: card layout (hidden on md+) */}
      <div
        role="listitem"
        className={`md:hidden border-b border-slate-800/60 py-3 px-1 ${zebraClass}`}
      >
        {/* Top row: Badge + Asset + Datum */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <TxTypeBadge type={tx.type} />
            <div className="flex items-center gap-1.5">
              <AssetIcon symbol={tx.assetSymbol} name={tx.assetName} color={tx.assetColor} size={20} />
              <span className="text-sm font-semibold text-slate-100">{tx.assetName}</span>
              <span className="text-xs text-slate-400">{tx.assetSymbol}</span>
            </div>
          </div>
          <span className="text-[13px] text-slate-400 flex-shrink-0">{formatDate(tx.date)}</span>
        </div>
        {/* Bottom row: Menge + Preis | Betrag */}
        <div className="flex items-center justify-between">
          <span className="tabular-nums text-sm text-slate-300">
            {formatQuantity(tx.quantity, tx.assetSymbol)} @ {formatCurrency(tx.pricePerUnit)}
          </span>
          <span className="tabular-nums text-sm font-semibold text-slate-50">
            {formatCurrency(tx.totalUSD)}
          </span>
        </div>
      </div>
    </>
  )
}
