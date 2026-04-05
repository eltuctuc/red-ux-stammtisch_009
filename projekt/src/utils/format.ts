/**
 * Format a number as USD currency: 124382.47 → "$124,382.47"
 * Sub-penny values (< $0.01) use up to 6 decimal places to avoid "$0.00".
 */
export function formatCurrency(value: number): string {
  const maxFractionDigits = value > 0 && value < 0.01 ? 6 : 2
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: maxFractionDigits,
  }).format(value)
}

/**
 * Format a signed currency delta: 3241.18 → "+$3,241.18", -500 → "-$500.00"
 */
export function formatCurrencyWithSign(value: number): string {
  const abs = formatCurrency(Math.abs(value))
  return value >= 0 ? `+${abs}` : `-${abs}`
}

/**
 * Format a percentage with sign and 2 decimal places: 2.68 → "+2.68%", -1.87 → "-1.87%"
 * Edge case: 0.01 stays "+0.01%" (no rounding to 0%)
 */
export function formatPercent(value: number, showSign = true): string {
  const sign = showSign && value > 0 ? '+' : ''
  const formatted = value.toFixed(2)
  // Prevent "-0.00%" display for very small negative values
  const display = formatted === '-0.00' ? '0.00' : formatted
  return `${sign}${display}%`
}

/**
 * Format asset quantity with appropriate precision:
 * 3800 → "3,800" | 82 → "82" | 8.5 → "8.5" | 0.842 → "0.842" | 0.00034 → "0.00034"
 */
export function formatQuantity(value: number, symbol?: string): string {
  let formatted: string
  if (value >= 1000) {
    formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)
  } else if (value >= 1) {
    // Remove trailing zeros after decimal
    formatted = value.toFixed(3).replace(/\.?0+$/, '')
  } else if (value >= 0.0001) {
    formatted = value.toFixed(5).replace(/\.?0+$/, '')
  } else {
    formatted = value.toFixed(8).replace(/\.?0+$/, '')
  }
  return symbol ? `${formatted} ${symbol}` : formatted
}

/**
 * Format a compact currency value for chart Y-axis: 84230 → "$84k"
 */
export function formatCurrencyCompact(value: number): string {
  if (value >= 1000) {
    return '$' + (value / 1000).toFixed(0) + 'k'
  }
  return '$' + value.toFixed(0)
}

/**
 * Format date: ≤7 days ago → relative ("vor 2 Tagen"), else absolute ("28. Mär 2026")
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Heute'
  if (diffDays === 1) return 'vor 1 Tag'
  if (diffDays <= 7) return `vor ${diffDays} Tagen`

  return new Intl.DateTimeFormat('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
