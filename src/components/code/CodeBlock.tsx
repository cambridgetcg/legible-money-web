'use client'

import { CopyButton } from '@/components/ui/CopyButton'
import { cn } from '@/lib/utils'

type CodeBlockProps = {
  code: string
  language?: string
  filename?: string
  className?: string
  showLineNumbers?: boolean
}

export function CodeBlock({ code, language = 'typescript', filename, className, showLineNumbers }: CodeBlockProps) {
  const lines = code.trim().split('\n')

  return (
    <div className={cn('terminal-window', className)}>
      {filename && (
        <div className="terminal-header">
          <span className="terminal-dot terminal-dot--red" />
          <span className="terminal-dot terminal-dot--yellow" />
          <span className="terminal-dot terminal-dot--green" />
          <span className="terminal-title">{filename}</span>
          <CopyButton text={code.trim()} />
        </div>
      )}
      {!filename && (
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#151515] border-b border-[#333]">
          <span className="text-[10px] text-[#666] uppercase tracking-wider">{language}</span>
          <CopyButton text={code.trim()} />
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              {showLineNumbers && (
                <span className="select-none text-[#333] w-8 text-right pr-4 flex-shrink-0">
                  {i + 1}
                </span>
              )}
              <span className="text-[#e0e0e0]">{line || '\u00A0'}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
