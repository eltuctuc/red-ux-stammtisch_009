export type TxType = 'buy' | 'sell'

export interface Transaction {
  id: string
  type: TxType
  assetSymbol: string
  assetName: string
  assetColor: string
  quantity: number
  pricePerUnit: number
  totalUSD: number
  date: string  // ISO-String
}

export const transactionsData: Transaction[] = [
  {
    id: 'tx-1',
    type: 'buy',
    assetSymbol: 'SOL',
    assetName: 'Solana',
    assetColor: '#06b6d4',
    quantity: 12,
    pricePerUnit: 178.20,
    totalUSD: 2138.40,
    date: '2026-04-04T10:30:00',
  },
  {
    id: 'tx-2',
    type: 'sell',
    assetSymbol: 'ETH',
    assetName: 'Ethereum',
    assetColor: '#8b5cf6',
    quantity: 1.5,
    pricePerUnit: 2810.00,
    totalUSD: 4215.00,
    date: '2026-04-01T14:15:00',
  },
  {
    id: 'tx-3',
    type: 'buy',
    assetSymbol: 'BTC',
    assetName: 'Bitcoin',
    assetColor: '#f97316',
    quantity: 0.05,
    pricePerUnit: 84900.00,
    totalUSD: 4245.00,
    date: '2026-03-28T09:45:00',
  },
  {
    id: 'tx-4',
    type: 'buy',
    assetSymbol: 'ADA',
    assetName: 'Cardano',
    assetColor: '#3b82f6',
    quantity: 1200,
    pricePerUnit: 0.81,
    totalUSD: 972.00,
    date: '2026-03-25T16:20:00',
  },
  {
    id: 'tx-5',
    type: 'sell',
    assetSymbol: 'BNB',
    assetName: 'BNB Chain',
    assetColor: '#eab308',
    quantity: 5,
    pricePerUnit: 592.00,
    totalUSD: 2960.00,
    date: '2026-03-20T11:00:00',
  },
  {
    id: 'tx-6',
    type: 'buy',
    assetSymbol: 'ETH',
    assetName: 'Ethereum',
    assetColor: '#8b5cf6',
    quantity: 2,
    pricePerUnit: 2750.00,
    totalUSD: 5500.00,
    date: '2026-03-15T08:30:00',
  },
  {
    id: 'tx-7',
    type: 'buy',
    assetSymbol: 'SOL',
    assetName: 'Solana',
    assetColor: '#06b6d4',
    quantity: 30,
    pricePerUnit: 172.50,
    totalUSD: 5175.00,
    date: '2026-03-10T13:55:00',
  },
  {
    id: 'tx-8',
    type: 'buy',
    assetSymbol: 'XRP',
    assetName: 'XRP',
    assetColor: '#94a3b8',
    quantity: 800,
    pricePerUnit: 0.56,
    totalUSD: 448.00,
    date: '2026-03-05T17:40:00',
  },
]
