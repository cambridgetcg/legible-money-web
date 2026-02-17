import { cn } from '@/lib/utils'

type GlowTextProps = {
  children: React.ReactNode
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
  className?: string
  intensity?: 'sm' | 'md' | 'lg'
}

export function GlowText({ children, as: Tag = 'span', className, intensity = 'sm' }: GlowTextProps) {
  const glowMap = {
    sm: '0 0 4px #00ff4140',
    md: '0 0 8px #00ff4160, 0 0 16px #00ff4120',
    lg: '0 0 12px #00ff4180, 0 0 24px #00ff4140, 0 0 48px #00ff4110',
  }

  return (
    <Tag
      className={cn('text-[#00ff41]', className)}
      style={{ textShadow: glowMap[intensity] }}
    >
      {children}
    </Tag>
  )
}
