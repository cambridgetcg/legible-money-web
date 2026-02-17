import { cn } from '@/lib/utils'

type CalloutProps = {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'tip'
  title?: string
  className?: string
}

const styles = {
  info: 'border-[#00ffff]/30 bg-[#00ffff]/5',
  warning: 'border-[#ffb000]/30 bg-[#ffb000]/5',
  tip: 'border-[#00ff41]/30 bg-[#00ff41]/5',
}

const prefixes = {
  info: 'INFO',
  warning: 'WARN',
  tip: 'TIP',
}

const prefixColors = {
  info: 'text-[#00ffff]',
  warning: 'text-[#ffb000]',
  tip: 'text-[#00ff41]',
}

export function Callout({ children, type = 'info', title, className }: CalloutProps) {
  return (
    <div className={cn('border-l-2 pl-4 py-3 my-4 rounded-r-[4px]', styles[type], className)}>
      <div className={cn('text-xs font-bold uppercase tracking-wider mb-1', prefixColors[type])}>
        [{prefixes[type]}] {title}
      </div>
      <div className="text-sm text-[#e0e0e0]">
        {children}
      </div>
    </div>
  )
}
