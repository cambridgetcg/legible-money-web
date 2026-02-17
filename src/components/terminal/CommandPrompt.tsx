import { cn } from '@/lib/utils'

type CommandPromptProps = {
  command: string
  className?: string
}

export function CommandPrompt({ command, className }: CommandPromptProps) {
  return (
    <div className={cn('font-mono', className)}>
      <span className="text-[#00cc33]">$</span>{' '}
      <span className="text-[#00ff41]">{command}</span>
    </div>
  )
}
