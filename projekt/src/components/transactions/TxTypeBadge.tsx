import type { TxType } from '@/data/transactions'

interface TxTypeBadgeProps {
  type: TxType
}

export function TxTypeBadge({ type }: TxTypeBadgeProps) {
  const isBuy = type === 'buy'
  return (
    <span
      className={
        isBuy
          ? 'inline-block rounded-md px-2 py-0.5 text-xs font-medium border bg-green-500/10 text-green-400 border-green-500/20'
          : 'inline-block rounded-md px-2 py-0.5 text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/20'
      }
    >
      {isBuy ? 'Kauf' : 'Verkauf'}
    </span>
  )
}
