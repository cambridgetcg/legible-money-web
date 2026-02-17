import type { Metadata } from 'next'
import { CodeBlock } from '@/components/code/CodeBlock'
import { Callout } from '@/components/content/Callout'
import { StepList } from '@/components/content/StepList'
import { GlowText } from '@/components/effects/GlowText'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'

export const metadata: Metadata = {
  title: 'Validator Guide',
  description: 'Run a Legible Money validator node and earn rewards by verifying knowledge claims.',
}

const dockerSetup = `# Clone and start a validator node
git clone https://github.com/legible-money/node.git
cd node

# Docker setup (recommended)
docker compose up -d

# Or manual setup
npm install
npm run build
npm run validator -- --stake 0.111`

const configCode = `# ~/.lgm/config.toml
[node]
network = "devnet"
data_dir = "~/.lgm/data"
log_level = "info"

[validator]
stake = "111000000000000"  # 0.111 LGM minimum
evaluation_timeout = "10s"
max_concurrent_rounds = 5

[daemon]
enabled = true  # Claude Evaluation Daemon
model = "claude-sonnet-4-5-20250929"
persist_evaluations = true`

export default function ValidatorsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        Validator Guide
      </GlowText>
      <p className="text-sm text-[#666] mb-12">
        Run a node, verify knowledge, earn rewards.
      </p>

      {/* What validators do */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          What Validators Do
        </GlowText>
        <div className="space-y-3 text-sm text-[#e0e0e0]/80 leading-relaxed">
          <p>
            In Proof of Truth, validators don&apos;t just confirm transactions — they <strong className="text-[#00ff41]">evaluate knowledge claims</strong>. When selected by VRF for a verification round, you:
          </p>
          <ul className="list-none space-y-2 ml-4">
            <li className="flex gap-2"><span className="text-[#00ff41]">1.</span> Receive a claim to evaluate</li>
            <li className="flex gap-2"><span className="text-[#00ff41]">2.</span> Assess its truth value independently</li>
            <li className="flex gap-2"><span className="text-[#00ff41]">3.</span> Submit an encrypted commitment</li>
            <li className="flex gap-2"><span className="text-[#00ff41]">4.</span> Reveal your evaluation after all commits are in</li>
            <li className="flex gap-2"><span className="text-[#00ff41]">5.</span> Earn rewards proportional to accuracy and stake</li>
          </ul>
        </div>
      </section>

      {/* Hardware requirements */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          Requirements
        </GlowText>
        <TerminalWindow title="lgm — system requirements">
          <div className="space-y-1 text-sm">
            <div className="text-[#666]"># Minimum hardware</div>
            <div><span className="text-[#00ff41]">CPU:</span>  <span className="text-[#e0e0e0]">2 cores (4 recommended)</span></div>
            <div><span className="text-[#00ff41]">RAM:</span>  <span className="text-[#e0e0e0]">4 GB (8 GB with daemon)</span></div>
            <div><span className="text-[#00ff41]">Disk:</span> <span className="text-[#e0e0e0]">20 GB SSD</span></div>
            <div><span className="text-[#00ff41]">Net:</span>  <span className="text-[#e0e0e0]">10 Mbps, low latency</span></div>
            <div className="mt-2 text-[#666]"># Economic</div>
            <div><span className="text-[#00ff41]">Stake:</span> <span className="text-[#e0e0e0]">0.111 LGM minimum deposit</span></div>
            <div><span className="text-[#00ff41]">Uptime:</span> <span className="text-[#e0e0e0]">95%+ required for full rewards</span></div>
          </div>
        </TerminalWindow>
      </section>

      {/* Setup */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          Node Setup
        </GlowText>
        <StepList
          steps={[
            {
              title: 'Install and configure',
              description: <CodeBlock code={dockerSetup} language="bash" filename="setup.sh" />,
            },
            {
              title: 'Configure your node',
              description: <CodeBlock code={configCode} language="toml" filename="~/.lgm/config.toml" />,
            },
            {
              title: 'Stake and register',
              description: (
                <div className="space-y-2 text-sm text-[#e0e0e0]/70">
                  <p>Once your node is synced, stake LGM to become an active validator.</p>
                  <CodeBlock code={`$ lgm validator stake 0.111\nStaking 0.111 LGM...\nValidator registered: did:lgm:your-validator-did\nStatus: active (next epoch)`} language="bash" />
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Staking tiers */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          Staking & Unbonding
        </GlowText>
        <div className="space-y-3 text-sm text-[#e0e0e0]/80">
          <p>
            Minimum stake: <strong className="text-[#00ff41]">0.111 LGM</strong>. Higher stakes increase your selection weight for verification rounds.
          </p>
          <p>
            Unbonding period: <strong className="text-[#ffb000]">7 days</strong> (240,904 blocks). During unbonding, your stake is locked and you cannot validate.
          </p>
        </div>
        <Callout type="warning" title="Slashing">
          Validators who submit provably wrong evaluations or go offline during assigned rounds face stake slashing. Maximum slash: 33% of staked amount per offense.
        </Callout>
      </section>

      {/* Reward structure */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          Reward Structure
        </GlowText>
        <div className="space-y-2">
          {[
            { type: 'Block Rewards', desc: 'From the 133.3M LGM reward fund, distributed per epoch with decay', color: '#00ff41' },
            { type: 'Verification Fees', desc: 'Portion of claim stakes distributed to assigned validators', color: '#00ffff' },
            { type: 'Citation Rewards', desc: 'Bonus when facts you verified are cited by future claims', color: '#ffb000' },
            { type: 'Research Share', desc: 'From the research fund for domain contributions', color: '#e0e0e0' },
          ].map((r) => (
            <div key={r.type} className="flex gap-3 p-3 border border-[#333]/50 rounded-[4px]">
              <div className="w-1 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
              <div>
                <div className="text-xs font-bold" style={{ color: r.color }}>{r.type}</div>
                <div className="text-xs text-[#e0e0e0]/60">{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Claude Daemon */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          Claude Evaluation Daemon
        </GlowText>
        <div className="space-y-3 text-sm text-[#e0e0e0]/80">
          <p>
            The optional Claude Evaluation Daemon is an AI-powered sidecar that assists validators in evaluating knowledge claims using Claude.
          </p>
          <p>
            When enabled, the daemon automatically evaluates claims through an 8-stage pipeline: category classification, calibration, evidence assessment, fact graph check, logic zone verification, confidence ceiling, edge case detection, and counter-fact analysis.
          </p>
        </div>
        <Callout type="info" title="Persist before submit">
          The daemon persists all evaluations to disk before submitting to the network, ensuring no work is lost if the process crashes.
        </Callout>
      </section>
    </div>
  )
}
