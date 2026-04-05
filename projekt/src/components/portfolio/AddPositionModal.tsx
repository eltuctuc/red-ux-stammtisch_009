import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { PortfolioPosition } from '@/data/coinRegistry'
import { AddPositionForm } from './AddPositionForm'

interface AddPositionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (position: Omit<PortfolioPosition, 'id'>) => void
}

export function AddPositionModal({ isOpen, onClose, onSubmit }: AddPositionModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Trap focus inside modal when open
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    first?.focus()

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    window.addEventListener('keydown', handleTab)
    return () => window.removeEventListener('keydown', handleTab)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      aria-hidden="false"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-[480px] bg-slate-900 rounded-xl p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="text-base font-semibold text-slate-50">
            Position hinzufügen
          </h2>
          <button
            onClick={onClose}
            aria-label="Modal schließen"
            className="p-2 text-slate-500 hover:text-slate-200 transition-colors rounded"
          >
            <X className="w-4 h-4" aria-hidden />
          </button>
        </div>

        <AddPositionForm onSubmit={onSubmit} onCancel={onClose} />
      </div>
    </div>
  )
}
