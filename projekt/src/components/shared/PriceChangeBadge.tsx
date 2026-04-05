import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { formatPercent } from '@/utils/format'

interface PriceChangeBadgeProps {
  value: number
  size?: 'sm' | 'md'
  className?: string
}

/**
 * Shared badge for percentage price changes.
 * positive → green + TrendingUp icon
 * negative → red + TrendingDown icon
 * zero     → slate (neutral, no icon)
 */
export function PriceChangeBadge({ value, size = 'sm', className }: PriceChangeBadgeProps) {
  const isPositive = value > 0
  const isNegative = value < 0

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 font-medium',
        size === 'sm' ? 'text-xs' : 'text-sm',
        isPositive && 'text-green-500',
        isNegative && 'text-red-500',
        !isPositive && !isNegative && 'text-slate-400',
        className,
      )}
      aria-label={`${isPositive ? 'Plus' : isNegative ? 'Minus' : 'Neutral'} ${Math.abs(value).toFixed(2)} Prozent`}
    >
      {isPositive && <TrendingUp className="w-3 h-3" aria-hidden />}
      {isNegative && <TrendingDown className="w-3 h-3" aria-hidden />}
      {formatPercent(value)}
    </span>
  )
}
