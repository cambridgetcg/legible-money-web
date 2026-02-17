'use client'

import { useInView } from '@/hooks/useInView'
import { tiers } from '@/data/tiers'
import { cn } from '@/lib/utils'

export function TierProgress() {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="space-y-4">
      {tiers.map((tier, i) => (
        <div
          key={tier.name}
          className={cn(
            'flex gap-4 p-4 border border-[#333] rounded-[4px] transition-all duration-500',
            'hover:border-opacity-50',
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
          style={{
            transitionDelay: isInView ? `${i * 80}ms` : '0ms',
            borderColor: `${tier.color}30`,
          }}
        >
          <div
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-[4px] text-sm font-bold"
            style={{ color: tier.color, border: `1px solid ${tier.color}40`, backgroundColor: `${tier.color}08` }}
          >
            T{tier.level}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold" style={{ color: tier.color }}>{tier.name}</span>
              <span className="text-xs text-[#666]">{tier.rewards}</span>
            </div>
            <ul className="space-y-0.5">
              {tier.requirements.map((req) => (
                <li key={req} className="text-xs text-[#e0e0e0]/60 flex items-center gap-1.5">
                  <span style={{ color: tier.color }}>{'>'}</span> {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
