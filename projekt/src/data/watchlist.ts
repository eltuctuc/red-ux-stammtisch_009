export interface WatchlistAsset {
  symbol: string
  name: string
  priceUSD: number
  change24hPercent: number
  iconColor: string
}

export const watchlistData: WatchlistAsset[] = [
  { symbol: 'LINK', name: 'Chainlink',  priceUSD: 18.42, change24hPercent:  4.21, iconColor: '#2563eb' },
  { symbol: 'DOT',  name: 'Polkadot',   priceUSD:  7.83, change24hPercent: -1.87, iconColor: '#e91e8c' },
  { symbol: 'MATIC',name: 'Polygon',    priceUSD:  0.92, change24hPercent:  2.45, iconColor: '#8247e5' },
  { symbol: 'AVAX', name: 'Avalanche',  priceUSD: 38.17, change24hPercent: -0.63, iconColor: '#e84142' },
  { symbol: 'ATOM', name: 'Cosmos',     priceUSD:  9.54, change24hPercent:  1.12, iconColor: '#6f7390' },
  { symbol: 'LTC',  name: 'Litecoin',   priceUSD: 92.30, change24hPercent: -3.44, iconColor: '#345d9d' },
]
