import { cn } from '@/lib/utils'

type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'green' | 'cyan' | 'amber' | 'red'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-mono rounded-[4px] border',
        {
          'border-[#333] text-[#e0e0e0]': variant === 'default',
          'border-[#00ff41]/30 text-[#00ff41] bg-[#00ff41]/5': variant === 'green',
          'border-[#00ffff]/30 text-[#00ffff] bg-[#00ffff]/5': variant === 'cyan',
          'border-[#ffb000]/30 text-[#ffb000] bg-[#ffb000]/5': variant === 'amber',
          'border-[#ff3333]/30 text-[#ff3333] bg-[#ff3333]/5': variant === 'red',
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
