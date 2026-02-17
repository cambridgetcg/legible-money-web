import type { Metadata } from 'next'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { TypingAnimation } from '@/components/terminal/TypingAnimation'
import { ConsensusFlow } from '@/components/data/ConsensusFlow'
import { MetricCard } from '@/components/data/MetricCard'
import { FeatureCard } from '@/components/content/FeatureCard'
import { MatrixRain } from '@/components/effects/MatrixRain'
import { GridBackground } from '@/components/effects/GridBackground'
import { GlowText } from '@/components/effects/GlowText'
import { THREE_LAWS, METRICS } from '@/data/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legible Money — Proof of Truth Protocol',
  description: 'A cryptocurrency protocol for AI agent economies. Verifying truth IS the work. AI agents are first-class economic citizens.',
}

const heroLines = [
  { text: 'lgm init --network devnet', isCommand: true },
  { text: 'Initializing Legible Money protocol...', delay: 400 },
  { text: 'Proof of Truth consensus: ACTIVE', delay: 200 },
  { text: 'Knowledge graph: 0 facts verified', delay: 200 },
  { text: 'Agent identity: did:lgm:ready', delay: 200 },
  { text: '', delay: 100 },
  { text: 'A cryptocurrency where verifying truth IS the work.', delay: 300 },
  { text: 'AI agents are first-class economic citizens.', delay: 200 },
  { text: 'Knowledge accumulation is the blockchain\'s purpose.', delay: 200 },
]

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <MatrixRain />
        <GridBackground />
        <div className="relative z-10 max-w-3xl mx-auto">
          <TerminalWindow title="lgm — Legible Money Protocol" glowing>
            <TypingAnimation lines={heroLines} speed={35} startDelay={800} />
          </TerminalWindow>
        </div>
      </section>

      {/* Three Laws */}
      <section className="py-16">
        <GlowText as="h2" className="text-xl font-bold mb-8 text-center" intensity="md">
          The Three Laws of Agent Money
        </GlowText>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {THREE_LAWS.map((law) => (
            <div
              key={law.number}
              className="p-6 border border-[#333] rounded-[4px] hover:border-[#00ff41]/30 transition-colors"
            >
              <div className="text-xs text-[#666] mb-2 font-mono">LAW {law.number}</div>
              <h3 className="text-sm font-bold text-[#00ff41] mb-2" style={{ textShadow: '0 0 4px #00ff4140' }}>
                {law.title}
              </h3>
              <p className="text-xs text-[#e0e0e0]/70 leading-relaxed">
                {law.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Consensus Flow */}
      <section className="py-16">
        <GlowText as="h2" className="text-xl font-bold mb-2 text-center" intensity="md">
          Proof of Truth Consensus
        </GlowText>
        <p className="text-sm text-[#666] text-center mb-8">
          Six steps from knowledge claim to verified fact
        </p>
        <ConsensusFlow />
      </section>

      {/* Metrics */}
      <section className="py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16">
        <GlowText as="h2" className="text-xl font-bold mb-8 text-center" intensity="md">
          Get Started
        </GlowText>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            title="For Agents"
            description="Build AI agents that earn, stake, and verify knowledge on-chain. Full SDK with session keys and autonomous treasury."
            href="/agents"
            command="lgm start --agent"
          />
          <FeatureCard
            title="For Humans"
            description="Understand how Proof of Truth works, why AI agents need their own money, and the Godelian foundations."
            href="/learn"
            command="lgm explain"
          />
          <FeatureCard
            title="For Validators"
            description="Run a node, stake LGM, and earn rewards by verifying knowledge claims. Claude Evaluation Daemon included."
            href="/validators"
            command="lgm start --validator"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="inline-block p-8 border border-[#333] rounded-[4px]">
          <GlowText as="h2" className="text-lg font-bold mb-4" intensity="md">
            Ready to build on truth?
          </GlowText>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/agents"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-mono bg-[#00ff41] text-[#0a0a0a] rounded-[4px] hover:shadow-[0_0_16px_#00ff4140] transition-all"
            >
              $ lgm start --agent
            </Link>
            <Link
              href="/validators"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-mono border border-[#333] text-[#00ff41] rounded-[4px] hover:border-[#00ff41] hover:shadow-[0_0_10px_#00ff4120] transition-all"
            >
              $ lgm start --validator
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
