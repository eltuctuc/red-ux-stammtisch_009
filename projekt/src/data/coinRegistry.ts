/**
 * Canonical registry of all supported coins.
 * Mock prices are consistent with the pre-existing portfolioData values
 * (quantity × mockPrice ≈ original valueUSD).
 */

export interface CoinInfo {
  symbol: string
  name: string
  mockPrice: number  // USD
  color: string
}

export const COIN_REGISTRY: CoinInfo[] = [
  { symbol: 'BTC', name: 'Bitcoin',   mockPrice: 85000,  color: '#f97316' },
  { symbol: 'ETH', name: 'Ethereum',  mockPrice: 2800,   color: '#8b5cf6' },
  { symbol: 'SOL', name: 'Solana',    mockPrice: 180,    color: '#06b6d4' },
  { symbol: 'BNB', name: 'BNB Chain', mockPrice: 580,    color: '#eab308' },
  { symbol: 'ADA', name: 'Cardano',   mockPrice: 0.82,   color: '#3b82f6' },
  { symbol: 'XRP', name: 'XRP',       mockPrice: 0.58,   color: '#94a3b8' },
]

export const COIN_MAP: Record<string, CoinInfo> = Object.fromEntries(
  COIN_REGISTRY.map((c) => [c.symbol, c])
)

/**
 * A single portfolio position as entered by the user.
 */
export interface PortfolioPosition {
  id: string
  symbol: string
  name: string
  color: string
  quantity: number
  purchasePricePerUnit: number  // USD
}

/**
 * Pre-seeded positions so the dashboard doesn't start empty.
 * ADA is intentionally at −13.7% loss → triggers the >10% loss highlight (AC-4).
 */
export const INITIAL_POSITIONS: PortfolioPosition[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin',   color: '#f97316', quantity: 0.842,  purchasePricePerUnit: 62000 },
  { id: '2', symbol: 'ETH', name: 'Ethereum',  color: '#8b5cf6', quantity: 8.5,    purchasePricePerUnit: 2400  },
  { id: '3', symbol: 'SOL', name: 'Solana',    color: '#06b6d4', quantity: 82,     purchasePricePerUnit: 155   },
  { id: '4', symbol: 'BNB', name: 'BNB Chain', color: '#eab308', quantity: 18,     purchasePricePerUnit: 520   },
  { id: '5', symbol: 'ADA', name: 'Cardano',   color: '#3b82f6', quantity: 3800,   purchasePricePerUnit: 0.95  },
  { id: '6', symbol: 'XRP', name: 'XRP',       color: '#94a3b8', quantity: 1200,   purchasePricePerUnit: 0.52  },
]
