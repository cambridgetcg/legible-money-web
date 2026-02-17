'use client'

import { useState } from 'react'
import { CodeBlock } from './CodeBlock'
import { cn } from '@/lib/utils'

type CodeTab = {
  label: string
  language: string
  code: string
  filename?: string
}

type CodeTabsProps = {
  tabs: CodeTab[]
  className?: string
}

export function CodeTabs({ tabs, className }: CodeTabsProps) {
  const [active, setActive] = useState(0)

  return (
    <div className={cn('w-full', className)}>
      <div className="flex border-b border-[#333] bg-[#0d0d0d] rounded-t-[4px]" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 text-xs font-mono transition-colors',
              i === active
                ? 'text-[#00ff41] border-b border-[#00ff41] -mb-px'
                : 'text-[#666] hover:text-[#e0e0e0]',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={tabs[active].code}
        language={tabs[active].language}
        filename={tabs[active].filename}
        className="rounded-t-none border-t-0"
      />
    </div>
  )
}
