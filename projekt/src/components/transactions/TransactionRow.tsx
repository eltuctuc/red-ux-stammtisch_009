import type { Transaction } from '@/data/transactions'
import { formatCurrency, formatQuantity, formatDate } from '@/utils/format'
import { AssetIcon } from '@/components/shared/AssetIcon'
import { TxTypeBadge } from './TxTypeBadge'

interface TransactionRowProps {
  tx: Transaction
  isEven: boolean
}

/** Desktop: valid <tr> for use inside <tbody> */
export function DesktopTransactionRow({ tx, isEven }: TransactionRowProps) {
  const zebraClass = isEven ? 'bg-slate-800/30' : ''
  return (
    <tr className={`border-b border-slate-800/60 ${zebraClass}`}>
      <td className="py-3 pl-2 pr-4 w-20">
        <TxTypeBadge type={tx.type} />
      </td>
      <td className="py-3 pr-4 w-44">
        <div className="flex items-center gap-2">
          <AssetIcon symbol={tx.assetSymbol} name={tx.assetName} color={tx.assetColor} size={32} />
          <div>
            <p className="text-sm font-semibold text-slate-100 leading-tight">{tx.assetName}</p>
            <p className="text-xs text-slate-400 leading-tight">{tx.assetSymbol}</p>
          </div>
        </div>
      </td>
      <td className="py-3 pr-4 w-28 text-right tabular-nums text-sm text-slate-300">
        {formatQuantity(tx.quantity, tx.assetSymbol)}
      </td>
      <td className="py-3 pr-4 w-32 text-right tabular-nums text-sm text-slate-300">
        {formatCurrency(tx.pricePerUnit)}
      </td>
      <td className="py-3 pr-4 w-32 text-right tabular-nums text-sm font-semibold text-slate-50">
        {formatCurrency(tx.totalUSD)}
      </td>
      <td className="py-3 pr-2 w-28 text-right tabular-nums text-[13px] text-slate-400">
        {formatDate(tx.date)}
      </td>
    </tr>
  )
}

/** Mobile: valid <div role="listitem"> for use inside <div role="list"> */
export function MobileTransactionCard({ tx, isEven }: TransactionRowProps) {
  const zebraClass = isEven ? 'bg-slate-800/30' : ''
  return (
    <div role="listitem" className={`border-b border-slate-800/60 py-3 px-1 ${zebraClass}`}>
      <div className="flex items-center justify-between gap-2 mb-1">
        <div className="flex items-center gap-2 min-w-0">
          <TxTypeBadge type={tx.type} />
          <div className="flex items-center gap-1.5 min-w-0">
            <AssetIcon symbol={tx.assetSymbol} name={tx.assetName} color={tx.assetColor} size={20} />
            <span className="text-sm font-semibold text-slate-100 truncate">{tx.assetName}</span>
            <span className="text-xs text-slate-400 flex-shrink-0">{tx.assetSymbol}</span>
          </div>
        </div>
        <span className="text-[13px] text-slate-400 flex-shrink-0">{formatDate(tx.date)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="tabular-nums text-sm text-slate-300">
          {formatQuantity(tx.quantity, tx.assetSymbol)} @ {formatCurrency(tx.pricePerUnit)}
        </span>
        <span className="tabular-nums text-sm font-semibold text-slate-50">
          {formatCurrency(tx.totalUSD)}
        </span>
      </div>
    </div>
  )
}
