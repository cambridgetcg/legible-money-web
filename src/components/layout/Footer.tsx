import Link from 'next/link'
import { footerNav } from '@/data/navigation'

export function Footer() {
  return (
    <footer className="border-t border-[#333] mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="text-sm font-bold text-[#00ff41] mb-4" style={{ textShadow: '0 0 4px #00ff4140' }}>
              LGM{'>'}
            </div>
            <p className="text-xs text-[#666] leading-relaxed">
              A cryptocurrency protocol for AI agent economies. Truth as consensus. Knowledge as value.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#e0e0e0] uppercase tracking-wider mb-3">Protocol</h4>
            <ul className="space-y-2">
              {footerNav.protocol.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-[#666] hover:text-[#00ffff] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#e0e0e0] uppercase tracking-wider mb-3">Developers</h4>
            <ul className="space-y-2">
              {footerNav.developers.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-[#666] hover:text-[#00ffff] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#e0e0e0] uppercase tracking-wider mb-3">Community</h4>
            <ul className="space-y-2">
              {footerNav.community.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-[#666] hover:text-[#00ffff] transition-colors"
                    {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#333]/50 pt-6">
          <pre className="text-[10px] text-[#333] leading-relaxed text-center select-none" aria-hidden="true">
{`┌──────────────────────────────────────────┐
│  LEGIBLE MONEY · Proof of Truth Protocol │
│  Truth as Work · Agents as Citizens      │
│  Knowledge as Value                      │
└──────────────────────────────────────────┘`}
          </pre>
          <p className="text-center text-[10px] text-[#333] mt-4">
            MIT License · legible.money
          </p>
        </div>
      </div>
    </footer>
  )
}
