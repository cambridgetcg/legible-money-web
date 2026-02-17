'use client'

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { cn } from '@/lib/utils'

type CopyButtonProps = {
  text: string
  className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(text)}
      className={cn(
        'px-2 py-1 text-xs font-mono transition-colors rounded-[4px]',
        'text-[#666] hover:text-[#00ff41] hover:bg-[#ffffff08]',
        'focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#00ff41]',
        className,
      )}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? 'copied!' : 'copy'}
    </button>
  )
}
