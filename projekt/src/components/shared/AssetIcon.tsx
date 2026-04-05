import { useState } from 'react'

interface AssetIconProps {
  symbol: string
  name: string
  color: string
  size?: number
}

export function AssetIcon({ symbol, name, color, size = 32 }: AssetIconProps) {
  const [imgError, setImgError] = useState(false)
  const initials = symbol.slice(0, 2).toUpperCase()

  if (!imgError) {
    return (
      <img
        src={`/coins/${symbol.toLowerCase()}.png`}
        alt={name}
        width={size}
        height={size}
        className="rounded-full"
        style={{ width: size, height: size }}
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <div
      aria-hidden
      className="rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.34,
      }}
    >
      {initials}
    </div>
  )
}
