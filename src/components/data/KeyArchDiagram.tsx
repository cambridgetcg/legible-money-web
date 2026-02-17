'use client'

import { useInView } from '@/hooks/useInView'
import { KEY_LAYERS } from '@/data/constants'
import { cn } from '@/lib/utils'

export function KeyArchDiagram() {
  const { ref, isInView } = useInView()

  return (
    <div ref={ref} className="w-full max-w-lg mx-auto space-y-3">
      {KEY_LAYERS.map((layer, i) => (
        <div
          key={layer.name}
          className={cn(
            'flex items-center gap-4 p-4 border border-[#333] rounded-[4px] transition-all duration-500',
            'hover:border-[#00ff41]/30',
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
          )}
          style={{ transitionDelay: isInView ? `${i * 100}ms` : '0ms' }}
        >
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center border border-[#00ff41]/20 rounded-[4px] text-lg">
            {layer.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666]">L{layer.layer}</span>
              <span className="text-sm font-bold text-[#00ff41]">{layer.name}</span>
            </div>
            <div className="text-xs text-[#e0e0e0]/70 mt-0.5">{layer.purpose}</div>
            <div className="text-[10px] text-[#666] mt-0.5">{layer.rotation}</div>
          </div>
        </div>
      ))}
      <div className="text-center text-xs text-[#666] mt-4">
        <span className="text-[#00ff41]">did:lgm:</span>{'{32-hex}'} — Derived from L1 identity key
      </div>
    </div>
  )
}
