import { useState, useId, useRef } from 'react'
import { COIN_REGISTRY } from '@/data/coinRegistry'
import type { PortfolioPosition } from '@/data/coinRegistry'

interface AddPositionFormProps {
  onSubmit: (position: Omit<PortfolioPosition, 'id'>) => void
  onCancel: () => void
}

interface FormErrors {
  coin?: string
  quantity?: string
  purchasePrice?: string
}

export function AddPositionForm({ onSubmit, onCancel }: AddPositionFormProps) {
  const [coin, setCoin] = useState('')
  const [quantity, setQuantity] = useState('')
  const [purchasePrice, setPurchasePrice] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const coinId = useId()
  const quantityId = useId()
  const purchasePriceId = useId()

  // BUG-FEAT5-UX-003: Refs für Fokus auf erstes fehlerhaftes Feld
  const coinSelectRef = useRef<HTMLSelectElement>(null)
  const quantityInputRef = useRef<HTMLInputElement>(null)
  const priceInputRef = useRef<HTMLInputElement>(null)

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!coin) errs.coin = 'Bitte einen Coin auswählen'

    const qty = parseFloat(quantity)
    if (!quantity.trim() || isNaN(qty) || qty <= 0) {
      errs.quantity = 'Menge muss eine positive Zahl sein'
    }

    const price = parseFloat(purchasePrice)
    if (!purchasePrice.trim() || isNaN(price) || price <= 0) {
      errs.purchasePrice = 'Kaufpreis muss größer als 0 sein'
    }

    return errs
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // BUG-FEAT5-UX-003: Fokus auf erstes fehlerhaftes Feld
      if (errs.coin) coinSelectRef.current?.focus()
      else if (errs.quantity) quantityInputRef.current?.focus()
      else if (errs.purchasePrice) priceInputRef.current?.focus()
      return
    }

    const selected = COIN_REGISTRY.find((c) => c.symbol === coin)!
    onSubmit({
      symbol: selected.symbol,
      name: selected.name,
      color: selected.color,
      quantity: parseFloat(quantity),
      purchasePricePerUnit: parseFloat(purchasePrice),
    })
  }

  const inputBase =
    'w-full bg-slate-800 text-slate-100 rounded-lg px-3 h-11 text-sm border border-slate-700 focus:outline-none focus:border-slate-500 placeholder:text-slate-500'
  const inputError = 'border-red-500 focus:border-red-400'

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Coin */}
      <div className="mb-4">
        <label htmlFor={coinId} className="block text-sm font-medium text-slate-300 mb-1.5">
          Coin
        </label>
        <select
          ref={coinSelectRef}
          id={coinId}
          value={coin}
          onChange={(e) => { setCoin(e.target.value); setErrors((p) => ({ ...p, coin: undefined })) }}
          className={`${inputBase} ${errors.coin ? inputError : ''} appearance-none`}
          aria-describedby={errors.coin ? `${coinId}-error` : undefined}
          aria-invalid={!!errors.coin}
        >
          <option value="">Coin wählen…</option>
          {COIN_REGISTRY.map((c) => (
            <option key={c.symbol} value={c.symbol}>
              {c.name} ({c.symbol})
            </option>
          ))}
        </select>
        {errors.coin && (
          <p id={`${coinId}-error`} className="mt-1 text-sm text-red-400" role="alert">
            {errors.coin}
          </p>
        )}
      </div>

      {/* Menge */}
      <div className="mb-4">
        <label htmlFor={quantityId} className="block text-sm font-medium text-slate-300 mb-1.5">
          Menge
        </label>
        <input
          ref={quantityInputRef}
          id={quantityId}
          type="number"
          min="0"
          step="any"
          value={quantity}
          onChange={(e) => { setQuantity(e.target.value); setErrors((p) => ({ ...p, quantity: undefined })) }}
          placeholder="z. B. 0.5"
          className={`${inputBase} ${errors.quantity ? inputError : ''}`}
          aria-describedby={errors.quantity ? `${quantityId}-error` : undefined}
          aria-invalid={!!errors.quantity}
        />
        {errors.quantity && (
          <p id={`${quantityId}-error`} className="mt-1 text-sm text-red-400" role="alert">
            {errors.quantity}
          </p>
        )}
      </div>

      {/* Kaufpreis */}
      <div className="mb-6">
        <label htmlFor={purchasePriceId} className="block text-sm font-medium text-slate-300 mb-1.5">
          Kaufpreis pro Einheit (USD)
        </label>
        <input
          ref={priceInputRef}
          id={purchasePriceId}
          type="number"
          min="0"
          step="any"
          value={purchasePrice}
          onChange={(e) => { setPurchasePrice(e.target.value); setErrors((p) => ({ ...p, purchasePrice: undefined })) }}
          placeholder="z. B. 84000"
          className={`${inputBase} ${errors.purchasePrice ? inputError : ''}`}
          aria-describedby={errors.purchasePrice ? `${purchasePriceId}-error` : undefined}
          aria-invalid={!!errors.purchasePrice}
        />
        {errors.purchasePrice && (
          <p id={`${purchasePriceId}-error`} className="mt-1 text-sm text-red-400" role="alert">
            {errors.purchasePrice}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors rounded-lg"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className="flex-1 py-3 text-sm font-semibold bg-slate-50 text-slate-900 rounded-lg hover:bg-white transition-colors"
        >
          Hinzufügen
        </button>
      </div>
    </form>
  )
}
