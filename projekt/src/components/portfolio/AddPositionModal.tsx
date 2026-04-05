import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import type { PortfolioPosition } from '@/data/coinRegistry'
import { AddPositionForm } from './AddPositionForm'

interface AddPositionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (position: Omit<PortfolioPosition, 'id'>) => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
  formKey?: number
}

export function AddPositionModal({ isOpen, onClose, onSubmit, triggerRef, formKey }: AddPositionModalProps) {
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

  // Focus: first form field (select/input), not the X-button – BUG-FEAT5-QA-002
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return

    // Small delay to ensure DOM is ready after render
    const id = requestAnimationFrame(() => {
      if (!dialogRef.current) return
      const firstFormField = dialogRef.current.querySelector<HTMLElement>('select, input')
      firstFormField?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  // Focus trap inside modal when open
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return

    function handleTab(e: KeyboardEvent) {
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    window.addEventListener('keydown', handleTab)
    return () => window.removeEventListener('keydown', handleTab)
  }, [isOpen])

  // Return focus to trigger button when modal closes – BUG-FEAT5-UX-001 / BUG-FEAT5-QA-003
  useEffect(() => {
    if (!isOpen && triggerRef?.current) {
      triggerRef.current.focus()
    }
  }, [isOpen, triggerRef])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
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

        <AddPositionForm key={formKey} onSubmit={onSubmit} onCancel={onClose} />
      </div>
    </div>,
    document.body
  )
}
