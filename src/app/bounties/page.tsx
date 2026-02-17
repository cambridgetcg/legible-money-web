import type { Metadata } from 'next'
import { TierProgress } from '@/components/data/TierProgress'
import { bugBountyRewards } from '@/data/tiers'
import { GlowText } from '@/components/effects/GlowText'
import { Callout } from '@/components/content/Callout'
import { StepList } from '@/components/content/StepList'

export const metadata: Metadata = {
  title: 'Bounty Program',
  description: 'Contribute to Legible Money and earn LGM through the 6-tier bounty program.',
}

export default function BountiesPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        Bounty Program
      </GlowText>
      <p className="text-sm text-[#666] mb-12">
        Contribute to the protocol. Earn LGM. Build reputation.
      </p>

      {/* 6-Tier Progression */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          6-Tier Progression
        </GlowText>
        <TierProgress />
      </section>

      {/* Bug Bounty */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          Bug Bounty Rewards
        </GlowText>
        <div className="border border-[#333] rounded-[4px] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#333] bg-[#0d0d0d]">
                <th className="text-left px-4 py-2.5 text-xs text-[#666] font-normal">Severity</th>
                <th className="text-left px-4 py-2.5 text-xs text-[#666] font-normal">Reward</th>
                <th className="text-left px-4 py-2.5 text-xs text-[#666] font-normal">Description</th>
              </tr>
            </thead>
            <tbody>
              {bugBountyRewards.map((row) => (
                <tr key={row.severity} className="border-b border-[#333]/30">
                  <td className="px-4 py-2.5 text-xs font-bold" style={{ color: row.color }}>
                    {row.severity}
                  </td>
                  <td className="px-4 py-2.5 text-xs text-[#00ff41]">{row.reward}</td>
                  <td className="px-4 py-2.5 text-xs text-[#e0e0e0]/60">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout type="warning" title="Responsible disclosure">
          Critical and High severity vulnerabilities must be reported privately before any public disclosure.
          Contact security@legible.money or submit via GitHub Security Advisories.
        </Callout>
      </section>

      {/* Current Bounties */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          Active Bounties
        </GlowText>
        <div className="space-y-3">
          {[
            { cat: 'Protocol', title: 'Optimize SMT proof generation for light clients', reward: '500 LGM', difficulty: 'Medium' },
            { cat: 'SDK', title: 'Add Python SDK bindings', reward: '1,000 LGM', difficulty: 'High' },
            { cat: 'Docs', title: 'Write integration guide for LangChain agents', reward: '200 LGM', difficulty: 'Low' },
            { cat: 'Testing', title: 'Fuzz testing for consensus edge cases', reward: '750 LGM', difficulty: 'High' },
            { cat: 'Research', title: 'Analyze counter-fact incentive equilibria', reward: '1,500 LGM', difficulty: 'High' },
          ].map((b) => (
            <div key={b.title} className="p-4 border border-[#333] rounded-[4px] hover:border-[#00ff41]/30 transition-colors flex justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-[#666] border border-[#333]/50 px-1.5 py-0.5 rounded-[2px]">{b.cat}</span>
                  <span className="text-[10px] text-[#ffb000]">{b.difficulty}</span>
                </div>
                <div className="text-sm text-[#e0e0e0]">{b.title}</div>
              </div>
              <div className="text-xs text-[#00ff41] font-bold flex-shrink-0">{b.reward}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How to submit */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          How to Submit
        </GlowText>
        <StepList
          steps={[
            { title: 'Find or claim a bounty', description: 'Browse active bounties above or identify an improvement yourself.' },
            { title: 'Fork the repository', description: 'Work on your solution in a fork of the legible-money repo.' },
            { title: 'Submit a pull request', description: 'Open a PR with a clear description, tests, and documentation.' },
            { title: 'Review and merge', description: 'Core contributors review your submission. Once merged, rewards are distributed.' },
          ]}
        />
      </section>
    </div>
  )
}
