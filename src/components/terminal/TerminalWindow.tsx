import { cn } from '@/lib/utils'

type TerminalWindowProps = {
  title?: string
  children: React.ReactNode
  className?: string
  glowing?: boolean
}

export function TerminalWindow({ title = 'lgm', children, className, glowing }: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'terminal-window',
        glowing && 'glow-box',
        className,
      )}
    >
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot--red" />
        <span className="terminal-dot terminal-dot--yellow" />
        <span className="terminal-dot terminal-dot--green" />
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  )
}
