import { useReducer, useRef, useState, useEffect } from 'react'
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
  | { type: 'RE_ADD_POSITION'; position: PortfolioPosition }

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
    case 'RE_ADD_POSITION':
      return {
        ...state,
        positions: [...state.positions, action.position],
      }
  }
}

const INITIAL_STATE: AppState = {
  positions: INITIAL_POSITIONS,
  isModalOpen: false,
}

// ── Undo Toast ────────────────────────────────────────────────────────────

interface UndoToast {
  position: PortfolioPosition
  timeoutId: ReturnType<typeof setTimeout>
}

// ── App ───────────────────────────────────────────────────────────────────

export default function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE)
  const [undoToast, setUndoToast] = useState<UndoToast | null>(null)
  const [formKey, setFormKey] = useState(0)
  const triggerRef = useRef<React.RefObject<HTMLButtonElement> | null>(null)

  const portfolioSymbols = new Set(state.positions.map((p) => p.symbol))

  // BUG-FEAT5-UX-005: Position entfernen mit Undo-Möglichkeit
  function handleRemovePosition(id: string) {
    const position = state.positions.find((p) => p.id === id)
    if (!position) return

    // Bestehenden Undo-Toast abbrechen falls vorhanden
    if (undoToast) {
      clearTimeout(undoToast.timeoutId)
    }

    dispatch({ type: 'REMOVE_POSITION', id })

    const timeoutId = setTimeout(() => {
      setUndoToast(null)
    }, 5000)

    setUndoToast({ position, timeoutId })
  }

  function handleUndo() {
    if (!undoToast) return
    clearTimeout(undoToast.timeoutId)
    dispatch({ type: 'RE_ADD_POSITION', position: undoToast.position })
    setUndoToast(null)
  }

  // BUG-FEAT5-UX-006: aria-hidden cleanup bei Unmount
  useEffect(() => {
    return () => {
      if (undoToast) clearTimeout(undoToast.timeoutId)
    }
  }, [undoToast])

  // BUG-FEAT5-UX-001 + BUG-FEAT5-UX-002: Modal öffnen mit triggerRef + formKey reset
  function handleOpenModal(ref: React.RefObject<HTMLButtonElement>) {
    triggerRef.current = ref
    setFormKey((k) => k + 1)
    dispatch({ type: 'OPEN_MODAL' })
  }

  function handleCloseModal() {
    dispatch({ type: 'CLOSE_MODAL' })
  }

  return (
    <>
      {/* BUG-FEAT5-UX-006: aria-hidden auf App-Wrapper wenn Modal offen (Portal außerhalb) */}
      <div
        id="app-root"
        aria-hidden={state.isModalOpen ? true : undefined}
        className="min-h-screen bg-slate-950 text-slate-50"
      >
        <div className="max-w-[1440px] mx-auto px-4 py-6 sm:px-6 space-y-6">

          {/* S-01-A: Portfolio Overview */}
          <PortfolioSection
            positions={state.positions}
            onOpenModal={handleOpenModal}
            onRemovePosition={handleRemovePosition}
          />

          {/* S-01-B + S-01-C: Price Chart + Watchlist */}
          <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
            <ChartSection />
            <WatchlistSection portfolioSymbols={portfolioSymbols} />
          </div>

          {/* S-01-D: Transaction History */}
          <TransactionSection />

        </div>
      </div>

      {/* S-02: Add Position Modal – außerhalb app-root via Portal (in AddPositionModal) */}
      <AddPositionModal
        isOpen={state.isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(payload) => dispatch({ type: 'ADD_POSITION', payload })}
        triggerRef={triggerRef.current ?? undefined}
        formKey={formKey}
      />

      {/* BUG-FEAT5-UX-005: Undo Toast */}
      {undoToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl text-sm text-slate-200 whitespace-nowrap"
        >
          <span>
            <span className="font-medium">{undoToast.position.name}</span> entfernt
          </span>
          <button
            onClick={handleUndo}
            className="text-slate-50 font-semibold underline underline-offset-2 hover:text-white transition-colors"
          >
            Rückgängig
          </button>
        </div>
      )}
    </>
  )
}
