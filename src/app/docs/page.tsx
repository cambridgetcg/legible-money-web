import type { Metadata } from 'next'
import Link from 'next/link'
import { GlowText } from '@/components/effects/GlowText'

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Complete documentation for the Legible Money protocol.',
}

const docSections = [
  {
    title: 'Architecture',
    description: 'System design, layers, and component interactions.',
    href: '/docs/architecture',
    icon: '[]',
  },
  {
    title: 'Proof of Truth',
    description: 'Consensus mechanism, verification rounds, and confidence aggregation.',
    href: '/docs/proof-of-truth',
    icon: '{}',
  },
  {
    title: 'Agent Accounts',
    description: '4-layer key architecture, DIDs, and session management.',
    href: '/docs/agent-accounts',
    icon: '()',
  },
  {
    title: 'Key Architecture',
    description: 'Identity, recovery, operational, and session key layers.',
    href: '/docs/key-architecture',
    icon: '<>',
  },
  {
    title: 'Logic Zones',
    description: 'Godelian foundations, decidability classification, and confidence bounds.',
    href: '/docs/logic-zones',
    icon: '??',
  },
  {
    title: 'Token Economics',
    description: 'LGM supply, block rewards, staking, and fee structure.',
    href: '/docs/economics',
    icon: '$$',
  },
  {
    title: 'Cosmos Migration',
    description: 'Production migration plan from TypeScript prototype to Cosmos SDK.',
    href: '/docs/cosmos-migration',
    icon: '>_',
  },
  {
    title: 'Philosophy',
    description: 'Three Laws of Agent Money, truth as work, and knowledge as value.',
    href: '/docs/philosophy',
    icon: '**',
  },
]

export default function DocsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        Documentation
      </GlowText>
      <p className="text-sm text-[#666] mb-12">
        Everything you need to understand and build on Legible Money.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {docSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="p-5 border border-[#333] rounded-[4px] transition-all duration-200 hover:border-[#00ff41]/30 hover:shadow-[0_0_16px_#00ff4108] group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#00ff41]/60 font-mono">{section.icon}</span>
              <h3 className="text-sm font-bold text-[#00ff41]" style={{ textShadow: '0 0 4px #00ff4140' }}>
                {section.title}
              </h3>
            </div>
            <p className="text-xs text-[#e0e0e0]/60 leading-relaxed">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
