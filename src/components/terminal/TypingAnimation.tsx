'use client'

import { useTypingAnimation } from '@/hooks/useTypingAnimation'
import { CursorBlink } from './CursorBlink'

type Line = {
  text: string
  isCommand?: boolean
  delay?: number
}

type TypingAnimationProps = {
  lines: Line[]
  speed?: number
  startDelay?: number
}

export function TypingAnimation({ lines, speed, startDelay }: TypingAnimationProps) {
  const { displayedLines, isDone, currentLineIndex } = useTypingAnimation(lines, { speed, startDelay })

  return (
    <div className="space-y-1">
      {displayedLines.map((line, i) => {
        const lineConfig = lines[i]
        const isActive = i === displayedLines.length - 1 && !isDone

        return (
          <div key={i} className="font-mono text-sm leading-relaxed">
            {lineConfig?.isCommand && (
              <span className="text-[#00cc33]">$ </span>
            )}
            <span className={lineConfig?.isCommand ? 'text-[#00ff41]' : 'text-[#e0e0e0]'}>
              {line}
            </span>
            {isActive && <CursorBlink />}
          </div>
        )
      })}
      {isDone && (
        <div className="font-mono text-sm">
          <span className="text-[#00cc33]">$ </span>
          <CursorBlink />
        </div>
      )}
    </div>
  )
}
