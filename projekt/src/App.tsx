import { useReducer } from 'react'
import './App.css'
import { PortfolioSection } from './components/portfolio/PortfolioSection'
import { AddPositionModal } from './components/portfolio/AddPositionModal'
import { ChartSection } from './components/chart/ChartSection'
import { WatchlistSection } from './components/watchlist/WatchlistSection'
import { TransactionSection } from './components/transactions/TransactionSection'
import type { PortfolioPosition } from './data/coinRegistry'
import { INITIAL_POSITIONS } from './data/coinRegistry'

// ── State & Reducer ────────────────────────────────────────────────────────

interface AppState {
  positions: PortfolioPosition[]
  isModalOpen: boolean
}

type AppAction =
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_POSITION'; payload: Omit<PortfolioPosition, 'id'> }
  | { type: 'REMOVE_POSITION'; id: string }

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true }
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false }
    case 'ADD_POSITION':
      return {
        ...state,
        isModalOpen: false,
        positions: [
          ...state.positions,
          { ...action.payload, id: crypto.randomUUID() },
        ],
      }
    case 'REMOVE_POSITION':
      return {
        ...state,
        positions: state.positions.filter((p) => p.id !== action.id),
      }
  }
}

const INITIAL_STATE: AppState = {
  positions: INITIAL_POSITIONS,
  isModalOpen: false,
}

// ── App ───────────────────────────────────────────────────────────────────

export default function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE)

  const portfolioSymbols = new Set(state.positions.map((p) => p.symbol))

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="max-w-[1440px] mx-auto px-4 py-6 sm:px-6 space-y-6">

        {/* S-01-A: Portfolio Overview */}
        <PortfolioSection
          positions={state.positions}
          onOpenModal={() => dispatch({ type: 'OPEN_MODAL' })}
          onRemovePosition={(id) => dispatch({ type: 'REMOVE_POSITION', id })}
        />

        {/* S-01-B + S-01-C: Price Chart + Watchlist */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
          <ChartSection />
          <WatchlistSection portfolioSymbols={portfolioSymbols} />
        </div>

        {/* S-01-D: Transaction History */}
        <TransactionSection />

      </div>

      {/* S-02: Add Position Modal */}
      <AddPositionModal
        isOpen={state.isModalOpen}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        onSubmit={(payload) => dispatch({ type: 'ADD_POSITION', payload })}
      />
    </div>
  )
}
