export const ASSET_COLORS: Record<string, string> = {
  BTC: '#f97316', // orange-500
  ETH: '#8b5cf6', // violet-500
  SOL: '#06b6d4', // cyan-500
  BNB: '#eab308', // yellow-500
  ADA: '#3b82f6', // blue-500
  XRP: '#94a3b8', // slate-400
}

export interface Asset {
  symbol: string
  name: string
  quantity: number
  valueUSD: number
  portfolioPercent: number
  color: string
}

export interface PortfolioData {
  totalValue: number
  change24hAbsolute: number  // positive = gain, negative = loss
  change24hPercent: number
  assets: Asset[]
}

export const portfolioData: PortfolioData = {
  totalValue: 124382.47,
  change24hAbsolute: 3241.18,
  change24hPercent: 2.68,
  assets: [
    { symbol: 'BTC', name: 'Bitcoin',  quantity: 0.842,  valueUSD: 71570.00, portfolioPercent: 57.5, color: ASSET_COLORS.BTC },
    { symbol: 'ETH', name: 'Ethereum', quantity: 8.5,    valueUSD: 23800.00, portfolioPercent: 19.1, color: ASSET_COLORS.ETH },
    { symbol: 'SOL', name: 'Solana',   quantity: 82,     valueUSD: 14760.00, portfolioPercent: 11.9, color: ASSET_COLORS.SOL },
    { symbol: 'BNB', name: 'BNB',      quantity: 18,     valueUSD: 10440.00, portfolioPercent: 8.4,  color: ASSET_COLORS.BNB },
    { symbol: 'ADA', name: 'Cardano',  quantity: 3800,   valueUSD: 3116.00,  portfolioPercent: 2.5,  color: ASSET_COLORS.ADA },
    { symbol: 'XRP', name: 'XRP',      quantity: 1200,   valueUSD: 696.00,   portfolioPercent: 0.6,  color: ASSET_COLORS.XRP },
  ],
}
