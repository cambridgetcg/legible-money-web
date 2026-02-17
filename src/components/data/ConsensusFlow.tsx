'use client'

import { useInView } from '@/hooks/useInView'
import { CONSENSUS_STEPS } from '@/data/constants'
import { cn } from '@/lib/utils'

export function ConsensusFlow() {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="w-full overflow-x-auto py-4">
      {/* Horizontal layout for md+ */}
      <div className="hidden md:flex items-center gap-2 min-w-[700px] px-4">
        {CONSENSUS_STEPS.map((step, i) => (
          <div key={step.name} className="flex items-center">
            <div
              className={cn(
                'flex flex-col items-center transition-all duration-500',
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4',
              )}
              style={{ transitionDelay: isInView ? `${i * 150}ms` : '0ms' }}
            >
              <div
                className={cn(
                  'w-16 h-16 flex items-center justify-center',
                  'border border-[#00ff41]/40 rounded-[4px]',
                  'text-[#00ff41] font-bold text-lg',
                  'bg-[#00ff41]/5',
                )}
              >
                {step.step}
              </div>
              <div className="mt-2 text-xs font-bold text-[#00ff41] text-center">
                {step.name}
              </div>
              <div className="mt-1 text-[10px] text-[#666] text-center max-w-[100px]">
                {step.description}
              </div>
            </div>
            {i < CONSENSUS_STEPS.length - 1 && (
              <div
                className={cn(
                  'flex-shrink-0 mx-1 transition-all duration-300',
                  isInView ? 'opacity-100' : 'opacity-0',
                )}
                style={{ transitionDelay: isInView ? `${i * 150 + 75}ms` : '0ms' }}
              >
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                  <path d="M0 6h20M16 1l5 5-5 5" stroke="#00ff41" strokeWidth="1" strokeOpacity="0.4" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vertical layout for mobile */}
      <div className="md:hidden space-y-3 px-4">
        {CONSENSUS_STEPS.map((step, i) => (
          <div key={step.name}>
            <div
              className={cn(
                'flex items-center gap-4 transition-all duration-500',
                isInView
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4',
              )}
              style={{ transitionDelay: isInView ? `${i * 100}ms` : '0ms' }}
            >
              <div
                className={cn(
                  'w-12 h-12 flex items-center justify-center flex-shrink-0',
                  'border border-[#00ff41]/40 rounded-[4px]',
                  'text-[#00ff41] font-bold text-base',
                  'bg-[#00ff41]/5',
                )}
              >
                {step.step}
              </div>
              <div>
                <div className="text-xs font-bold text-[#00ff41]">{step.name}</div>
                <div className="text-[10px] text-[#666]">{step.description}</div>
              </div>
            </div>
            {i < CONSENSUS_STEPS.length - 1 && (
              <div className="ml-6 h-3 border-l border-[#00ff41]/20" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
