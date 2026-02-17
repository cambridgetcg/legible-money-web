'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Tab = {
  label: string
  content: React.ReactNode
}

type TabsProps = {
  tabs: Tab[]
  className?: string
}

export function Tabs({ tabs, className }: TabsProps) {
  const [active, setActive] = useState(0)

  return (
    <div className={cn('w-full', className)}>
      <div className="flex border-b border-[#333]" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 text-sm font-mono transition-colors',
              'focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#00ff41]',
              i === active
                ? 'text-[#00ff41] border-b border-[#00ff41] -mb-px'
                : 'text-[#666] hover:text-[#e0e0e0]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-4">
        {tabs[active].content}
      </div>
    </div>
  )
}
