import Link from 'next/link'
import { cn } from '@/lib/utils'

type FeatureCardProps = {
  title: string
  description: string
  href: string
  command: string
  className?: string
}

export function FeatureCard({ title, description, href, command, className }: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'block p-6 border border-[#333] rounded-[4px] transition-all duration-200',
        'hover:border-[#00ff41]/50 hover:shadow-[0_0_20px_#00ff4110]',
        'group',
        className,
      )}
    >
      <h3 className="text-lg font-bold text-[#00ff41] mb-2" style={{ textShadow: '0 0 4px #00ff4140' }}>
        {title}
      </h3>
      <p className="text-sm text-[#e0e0e0]/70 mb-4">{description}</p>
      <div className="text-xs font-mono text-[#00cc33]">
        <span className="text-[#666]">$</span> {command}
      </div>
    </Link>
  )
}
