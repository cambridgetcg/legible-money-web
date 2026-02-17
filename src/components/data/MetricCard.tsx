'use client'

import { useInView } from '@/hooks/useInView'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

type MetricCardProps = {
  label: string
  value: string
  unit: string
  description: string
  className?: string
}

export function MetricCard({ label, value, unit, description, className }: MetricCardProps) {
  const { ref, isInView } = useInView()
  const [displayed, setDisplayed] = useState(false)

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setDisplayed(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <div
      ref={ref}
      className={cn(
        'p-4 border border-[#333] rounded-[4px] transition-all duration-500',
        displayed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        'hover:border-[#00ff41]/30 hover:shadow-[0_0_10px_#00ff4108]',
        className,
      )}
    >
      <div className="text-xs text-[#666] uppercase tracking-wider mb-2">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold text-[#00ff41]" style={{ textShadow: '0 0 4px #00ff4140' }}>
          {value}
        </span>
        <span className="text-sm text-[#00cc33]">{unit}</span>
      </div>
      <div className="text-xs text-[#666] mt-2">{description}</div>
    </div>
  )
}
