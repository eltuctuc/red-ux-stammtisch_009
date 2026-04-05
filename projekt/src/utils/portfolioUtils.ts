import type { PortfolioPosition } from '@/data/coinRegistry'
import { COIN_MAP } from '@/data/coinRegistry'
import type { Asset } from '@/data/portfolio'

export interface PositionMetrics {
  currentValueUSD: number
  gainLossUSD: number
  gainLossPercent: number
  isLossTen: boolean  // true if loss > 10%
}

export interface PortfolioTotals {
  totalValue: number
  totalGainLossUSD: number
  totalGainLossPercent: number
}

/**
 * Compute derived metrics for a single position.
 */
export function computePositionMetrics(position: PortfolioPosition): PositionMetrics {
  const coin = COIN_MAP[position.symbol]
  const mockPrice = coin?.mockPrice ?? 0
  const currentValueUSD = position.quantity * mockPrice
  const purchaseCost = position.quantity * position.purchasePricePerUnit
  const gainLossUSD = currentValueUSD - purchaseCost
  const gainLossPercent = purchaseCost > 0 ? (gainLossUSD / purchaseCost) * 100 : 0
  const isLossTen = gainLossPercent < -10

  return { currentValueUSD, gainLossUSD, gainLossPercent, isLossTen }
}

/**
 * Compute aggregate portfolio totals from all positions.
 */
export function computePortfolioTotals(positions: PortfolioPosition[]): PortfolioTotals {
  let totalValue = 0
  let totalGainLossUSD = 0
  let totalPurchaseCost = 0

  for (const pos of positions) {
    const { currentValueUSD, gainLossUSD } = computePositionMetrics(pos)
    totalValue += currentValueUSD
    totalGainLossUSD += gainLossUSD
    totalPurchaseCost += pos.quantity * pos.purchasePricePerUnit
  }

  const totalGainLossPercent =
    totalPurchaseCost > 0 ? (totalGainLossUSD / totalPurchaseCost) * 100 : 0

  return { totalValue, totalGainLossUSD, totalGainLossPercent }
}

/**
 * Derive Asset[] from positions for the PortfolioDonut.
 * Positions with 0 value are excluded (edge case: mockPrice = 0).
 */
export function deriveAssets(positions: PortfolioPosition[]): Asset[] {
  const totals = computePortfolioTotals(positions)
  if (totals.totalValue === 0) return []

  return positions
    .map((pos) => {
      const { currentValueUSD } = computePositionMetrics(pos)
      return {
        symbol: pos.symbol,
        name: pos.name,
        quantity: pos.quantity,
        valueUSD: currentValueUSD,
        portfolioPercent: (currentValueUSD / totals.totalValue) * 100,
        color: pos.color,
      } satisfies Asset
    })
    .filter((a) => a.portfolioPercent > 0)
}
