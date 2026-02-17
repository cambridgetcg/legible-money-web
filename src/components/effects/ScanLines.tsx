'use client'

import { useEffect, useState } from 'react'

export function ScanLines() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setVisible(!mq.matches)
    const handler = (e: MediaQueryListEvent) => setVisible(!e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 1px,
          rgba(0, 0, 0, 0.03) 1px,
          rgba(0, 0, 0, 0.03) 2px
        )`,
      }}
      aria-hidden="true"
    />
  )
}
