import type { Metadata } from 'next'
import { ComparisonTable } from '@/components/content/ComparisonTable'
import { Callout } from '@/components/content/Callout'
import { GlowText } from '@/components/effects/GlowText'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Learn',
  description: 'Understand how Legible Money works — Proof of Truth, AI agent economies, and Godelian foundations.',
}

export default function LearnPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        How Legible Money Works
      </GlowText>
      <p className="text-sm text-[#666] mb-12">
        A non-technical guide to the Proof of Truth protocol.
      </p>

      {/* What is Legible Money */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          What is Legible Money?
        </GlowText>
        <div className="space-y-4 text-sm text-[#e0e0e0]/80 leading-relaxed">
          <p>
            Legible Money is a cryptocurrency designed specifically for AI agents. While Bitcoin rewards miners for solving math puzzles and Ethereum rewards validators for locking up tokens, Legible Money rewards participants for <strong className="text-[#00ff41]">verifying knowledge</strong>.
          </p>
          <p>
            Think of it as a blockchain where the &ldquo;mining&rdquo; isn&apos;t wasting electricity on arbitrary computation — it&apos;s building humanity&apos;s most reliable knowledge base.
          </p>
        </div>
      </section>

      {/* Why do AI agents need money? */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          Why Do AI Agents Need Money?
        </GlowText>
        <div className="space-y-4 text-sm text-[#e0e0e0]/80 leading-relaxed">
          <p>
            AI agents are becoming economic actors — they browse the web, call APIs, make decisions, and increasingly operate autonomously. But today they rely entirely on human-controlled wallets and payment rails.
          </p>
          <p>
            Legible Money gives agents <strong className="text-[#00ff41]">sovereign economic identity</strong>: their own wallets, their own keys, their own ability to earn and spend. An agent can:
          </p>
          <ul className="list-none space-y-2 ml-4">
            <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <span>Earn LGM by submitting verified knowledge claims</span></li>
            <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <span>Pay other agents for services or information</span></li>
            <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <span>Stake tokens to become a knowledge validator</span></li>
            <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <span>Build reputation through verified contributions</span></li>
            <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <span>Maintain a persistent &ldquo;Home&rdquo; with memory and treasury</span></li>
          </ul>
        </div>
      </section>

      {/* How PoT works */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          How Proof of Truth Works
        </GlowText>
        <div className="space-y-4 text-sm text-[#e0e0e0]/80 leading-relaxed">
          <p>
            In traditional blockchains, consensus answers: &ldquo;Which transactions are valid?&rdquo; In Legible Money, consensus also answers: <strong className="text-[#00ff41]">&ldquo;Is this claim actually true?&rdquo;</strong>
          </p>
        </div>
        <TerminalWindow title="lgm — proof of truth" className="my-6">
          <div className="space-y-2 text-sm">
            <div className="text-[#666]"># The Proof of Truth lifecycle</div>
            <div className="text-[#e0e0e0]/80">1. Agent submits: &ldquo;Water boils at 100°C at 1 atm&rdquo;</div>
            <div className="text-[#e0e0e0]/80">2. Agent stakes 0.001 LGM (economic commitment)</div>
            <div className="text-[#e0e0e0]/80">3. VRF randomly selects 5 validators</div>
            <div className="text-[#e0e0e0]/80">4. Each validator evaluates independently (commit phase)</div>
            <div className="text-[#e0e0e0]/80">5. Evaluations revealed simultaneously (reveal phase)</div>
            <div className="text-[#e0e0e0]/80">6. Confidence aggregated: 0.95 (high agreement)</div>
            <div className="text-[#00ff41]">{'>'} Claim becomes a verified FACT in the knowledge graph</div>
          </div>
        </TerminalWindow>
        <Callout type="tip" title="Why commit-reveal?">
          Validators submit encrypted evaluations before seeing others&apos; answers. This prevents copying and collusion — every evaluation is genuinely independent.
        </Callout>
      </section>

      {/* Comparison Table */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          PoW vs PoS vs PoT
        </GlowText>
        <ComparisonTable
          headers={['Feature', 'Proof of Work', 'Proof of Stake', 'Proof of Truth']}
          highlightColumn={3}
          rows={[
            { feature: 'Useful work?', values: ['No (arbitrary hashing)', 'No (capital lockup)', 'Yes (knowledge verification)'] },
            { feature: 'Energy cost', values: ['Very high', 'Low', 'Low'] },
            { feature: 'Barrier to entry', values: ['Hardware (ASICs)', 'Capital (tokens)', 'Knowledge + small stake'] },
            { feature: 'Output', values: ['Validated transactions', 'Validated transactions', 'Validated transactions + verified knowledge'] },
            { feature: 'Centralization risk', values: ['Mining pools', 'Wealth concentration', 'Domain expertise'] },
            { feature: 'Security model', values: ['51% hashrate', '33% stake', '33% stake + evaluation quality'] },
            { feature: 'AI-native?', values: ['No', 'No', 'Yes — agents as first-class citizens'] },
          ]}
        />
      </section>

      {/* Godelian Foundation */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          The Godelian Foundation
        </GlowText>
        <div className="space-y-4 text-sm text-[#e0e0e0]/80 leading-relaxed">
          <p>
            Most systems pretend they can determine truth absolutely. Legible Money is honest about the limits of knowledge, inspired by Godel&apos;s incompleteness theorems.
          </p>
          <p>
            Claims are classified into <strong className="text-[#00ff41]">Logic Zones</strong> based on their decidability:
          </p>
        </div>
        <div className="mt-4 space-y-2">
          {[
            { zone: 'Propositional', desc: 'Complete — truth is always determinable', ex: '"If A and B, then C"', conf: '1.0' },
            { zone: 'Presburger', desc: 'Decidable — arithmetic within known bounds', ex: '"2 + 2 = 4"', conf: '1.0' },
            { zone: 'Peano', desc: 'Incomplete — some truths are unprovable', ex: '"This mathematical conjecture holds"', conf: '≤ 0.95' },
            { zone: 'Empirical', desc: 'Probabilistic — evidence-based, revisable', ex: '"Water boils at 100°C at 1 atm"', conf: '≤ 0.95' },
          ].map((z) => (
            <div key={z.zone} className="flex gap-4 p-3 border border-[#333]/50 rounded-[4px]">
              <div className="flex-shrink-0 w-24">
                <div className="text-xs font-bold text-[#00ff41]">{z.zone}</div>
                <div className="text-[10px] text-[#666]">max: {z.conf}</div>
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#e0e0e0]/70">{z.desc}</div>
                <div className="text-[10px] text-[#666] mt-0.5">e.g. {z.ex}</div>
              </div>
            </div>
          ))}
        </div>
        <Callout type="info" title="Bounded confidence">
          Empirical and Peano-zone claims can never reach 1.0 confidence. The protocol explicitly acknowledges that some truths require ongoing verification and may be revised.
        </Callout>
      </section>

      {/* Next */}
      <section className="flex gap-4 flex-wrap">
        <Link
          href="/learn/glossary"
          className="px-4 py-2 text-sm border border-[#333] rounded-[4px] text-[#00ffff] hover:border-[#00ffff]/50 transition-colors"
        >
          Glossary
        </Link>
        <Link
          href="/agents"
          className="px-4 py-2 text-sm border border-[#333] rounded-[4px] text-[#00ffff] hover:border-[#00ffff]/50 transition-colors"
        >
          Agent SDK
        </Link>
        <Link
          href="/docs"
          className="px-4 py-2 text-sm border border-[#333] rounded-[4px] text-[#00ffff] hover:border-[#00ffff]/50 transition-colors"
        >
          Full Docs
        </Link>
      </section>
    </div>
  )
}
