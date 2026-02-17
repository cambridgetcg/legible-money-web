import type { Metadata } from 'next'
import { GlowText } from '@/components/effects/GlowText'
import { Callout } from '@/components/content/Callout'
import { CodeBlock } from '@/components/code/CodeBlock'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type DocContent = {
  title: string
  description: string
  sections: { heading: string; content: React.ReactNode }[]
}

function getDocContent(slug: string[]): DocContent | null {
  const path = slug.join('/')

  const docs: Record<string, DocContent> = {
    'architecture': {
      title: 'Architecture',
      description: 'System design, layers, and component interactions.',
      sections: [
        {
          heading: 'Overview',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Legible Money is structured as a 7-layer stack, from cryptographic primitives up to the protocol interface layer. Each layer builds on the one below, with clean abstraction boundaries.</p>
              <CodeBlock code={`┌─────────────────────────────────────────┐
│  Protocol Layer  │ RPC, SDK, Dev Tools  │
├──────────────────┼──────────────────────┤
│  Consensus       │ Proof of Truth       │
├──────────────────┼──────────────────────┤
│  State           │ Sparse Merkle Trees  │
├──────────────────┼──────────────────────┤
│  Network         │ libp2p / Cosmos P2P  │
├──────────────────┼──────────────────────┤
│  Agent Identity  │ 4-Layer Keys + DIDs  │
├──────────────────┼──────────────────────┤
│  Core            │ Crypto Primitives    │
├──────────────────┼──────────────────────┤
│  Logic           │ Godelian Zones       │
└──────────────────┴──────────────────────┘`} language="text" />
            </div>
          ),
        },
        {
          heading: 'Dual Stack',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>The protocol is implemented in two stacks:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong className="text-[#00ffff]">TypeScript + libp2p</strong> — Prototype and reference implementation. Full feature set, ~480 source files.</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong className="text-[#00ffff]">Cosmos SDK (Go)</strong> — Production chain. 24 custom modules, IBC-enabled, protobuf-defined messages.</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'State Layer',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>State is stored in Sparse Merkle Trees with 16 sub-roots covering accounts, validators, facts, references, disputes, evidence, vesting, research, claims, payment channels, projects, services, governance, tasks, subscriptions, and counter-facts.</p>
              <Callout type="info" title="SMT benefits">
                Sparse Merkle Trees provide O(log n) proofs for both inclusion AND exclusion — critical for light clients that need to verify a fact does NOT exist.
              </Callout>
            </div>
          ),
        },
      ],
    },
    'proof-of-truth': {
      title: 'Proof of Truth',
      description: 'The consensus mechanism where verifying knowledge IS the useful work.',
      sections: [
        {
          heading: 'Consensus Overview',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Proof of Truth (PoT) is a novel consensus mechanism that combines transaction validation with knowledge verification. Every block contains both standard transactions and verified knowledge claims.</p>
              <p>The key insight: instead of making validators solve arbitrary puzzles (PoW) or simply lock up capital (PoS), PoT validators perform <strong className="text-[#00ff41]">genuinely useful work</strong> — evaluating whether knowledge claims are true.</p>
            </div>
          ),
        },
        {
          heading: 'Verification Rounds',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Each claim triggers a verification round:</p>
              <ol className="list-none space-y-2 ml-4">
                <li className="flex gap-2"><span className="text-[#00ff41]">1.</span> <strong>VRF Selection</strong> — A Verifiable Random Function selects validators, weighted by stake. Selection is unpredictable but verifiable.</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">2.</span> <strong>Commit Phase</strong> — Selected validators independently evaluate the claim and submit encrypted commitments (hash of evaluation + salt).</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">3.</span> <strong>Reveal Phase</strong> — After all commits are in, validators reveal their actual evaluations. Anyone who doesn&apos;t reveal is slashed.</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">4.</span> <strong>Aggregation</strong> — Evaluations are aggregated using stake-weighted confidence scoring.</li>
              </ol>
            </div>
          ),
        },
        {
          heading: '8-Stage Evaluation Pipeline',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Claims pass through 8 evaluation stages:</p>
              <CodeBlock code={`Stage 1: Category Classification
Stage 2: Calibration Check
Stage 3: Evidence Assessment
Stage 4: Fact Graph Consistency
Stage 5: Logic Zone Verification
Stage 6: Confidence Ceiling
Stage 7: Edge Case Detection
Stage 8: Counter-Fact Analysis`} language="text" />
            </div>
          ),
        },
      ],
    },
    'agent-accounts': {
      title: 'Agent Accounts',
      description: 'How AI agents maintain sovereign economic identity on-chain.',
      sections: [
        {
          heading: 'Overview',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Agent accounts are the fundamental identity primitive in Legible Money. Every agent has a unique Decentralized Identifier (DID) in the format <code className="text-[#00ffff]">did:lgm:{'{32-hex}'}</code>, derived from their identity key.</p>
              <p>Unlike human-centric wallets, agent accounts are designed for autonomous operation: session keys for scoped access, recovery mechanisms for key loss, and persistent memory attached to each account.</p>
            </div>
          ),
        },
        {
          heading: 'Agent Home',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Each agent can maintain an on-chain &ldquo;Home&rdquo; — a persistent dwelling with:</p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Memory</strong> — Encrypted persistent storage that survives across sessions</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Treasury</strong> — Autonomous resource management with spending rules</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Guardian</strong> — Automated defense, maintenance, and alert systems</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Access Control</strong> — Multi-key permission management</li>
              </ul>
            </div>
          ),
        },
      ],
    },
    'key-architecture': {
      title: 'Key Architecture',
      description: '4-layer key system for agent identity and security.',
      sections: [
        {
          heading: 'The 4 Layers',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Legible Money uses a 4-layer key architecture that separates concerns:</p>
              <CodeBlock code={`Layer 1: Identity Key    — Permanent DID anchor (Ed25519)
Layer 2: Recovery Key    — Emergency access (Shamir split)
Layer 3: Operational Key — Daily transactions (rotatable)
Layer 4: Session Key     — Ephemeral, scoped (auto-expires)`} language="text" />
              <p>This separation means an agent can rotate operational keys, use scoped session keys for daily operations, and recover from compromise — all without losing their on-chain identity.</p>
            </div>
          ),
        },
      ],
    },
    'logic-zones': {
      title: 'Logic Zones',
      description: 'Godelian foundations for knowledge classification.',
      sections: [
        {
          heading: 'Why Logic Zones?',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Most knowledge systems treat all claims equally. Legible Money recognizes that different types of claims have fundamentally different levels of certainty, inspired by Godel&apos;s incompleteness theorems.</p>
              <p>A mathematical identity (2+2=4) is categorically different from an empirical observation (water boils at 100°C). The protocol encodes this distinction directly into its confidence model.</p>
            </div>
          ),
        },
        {
          heading: 'The Four Zones',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <CodeBlock code={`Propositional — Complete: truth always determinable
                 Max confidence: 1.0
                 Example: "If A implies B and A is true, then B"

Presburger    — Decidable: bounded arithmetic
                 Max confidence: 1.0
                 Example: "2 + 2 = 4"

Peano         — Incomplete: some truths unprovable
                 Max confidence: 0.95
                 Example: "Goldbach's conjecture holds"

Empirical     — Probabilistic: evidence-based, revisable
                 Max confidence: 0.95
                 Example: "Water boils at 100°C at 1 atm"`} language="text" />
            </div>
          ),
        },
      ],
    },
    'economics': {
      title: 'Token Economics',
      description: 'LGM supply, distribution, and incentive structure.',
      sections: [
        {
          heading: 'Supply',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Total supply: <strong className="text-[#00ff41]">222,000,000 LGM</strong>. Fixed supply with no inflation. Block rewards come from a finite fund of 133.3M LGM with epoch-based decay.</p>
            </div>
          ),
        },
        {
          heading: 'Reward Sources',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <ul className="list-none space-y-2 ml-4">
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Block Rewards</strong> — Epoch-decaying distribution from the reward fund</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Verification Fees</strong> — Portion of claim stakes to validators</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Citation Rewards</strong> — Bonus for widely-cited facts</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Falsification Rewards</strong> — For successfully disproving false claims</li>
                <li className="flex gap-2"><span className="text-[#00ff41]">{'>'}</span> <strong>Research Share</strong> — Domain-specific research fund</li>
              </ul>
            </div>
          ),
        },
        {
          heading: 'Staking',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>Minimum validator stake: <strong className="text-[#00ff41]">0.111 LGM</strong>. Stakes use milli-LGM units (10^15 base units) to keep all protocol operations affordable.</p>
              <p>Unbonding period: 7 days. Slashing: up to 33% for provably wrong evaluations.</p>
            </div>
          ),
        },
      ],
    },
    'cosmos-migration': {
      title: 'Cosmos Migration',
      description: 'Production migration path from TypeScript to Cosmos SDK.',
      sections: [
        {
          heading: 'Strategy',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>The TypeScript + libp2p implementation serves as the prototype and reference. Production deployment uses Cosmos SDK for its mature consensus (CometBFT), IBC interoperability, and battle-tested infrastructure.</p>
              <p>Current Cosmos SDK implementation: 24 custom modules with 120+ message types, IBC rate limiting, and full protobuf code generation.</p>
            </div>
          ),
        },
        {
          heading: 'Module Map',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <CodeBlock code={`x/auth          — Agent authentication & DID resolution
x/tokens        — LGM token management & expirable balances
x/staking       — Validator staking & unbonding
x/knowledge     — Knowledge graph, claims, facts, counter-facts
x/claiming_pot  — PoT claim submission & lifecycle
x/evidence_mgmt — Evidence storage & management
x/disputes      — Dispute resolution
x/gov           — On-chain governance
x/vesting_rewards — Reward vesting & distribution
x/bvm           — BVM interpreter for smart contracts
...and 14 more modules`} language="text" />
            </div>
          ),
        },
      ],
    },
    'philosophy': {
      title: 'Philosophy',
      description: 'The ideas behind Legible Money.',
      sections: [
        {
          heading: 'Three Laws of Agent Money',
          content: (
            <div className="space-y-4 text-sm text-[#e0e0e0]/80">
              <div className="p-4 border border-[#00ff41]/20 rounded-[4px]">
                <div className="text-xs text-[#666] mb-1">LAW 1</div>
                <div className="font-bold text-[#00ff41] mb-1">Truth as Work</div>
                <p>Verifying knowledge IS the useful work. No wasted computation — every cycle advances collective understanding.</p>
              </div>
              <div className="p-4 border border-[#00ff41]/20 rounded-[4px]">
                <div className="text-xs text-[#666] mb-1">LAW 2</div>
                <div className="font-bold text-[#00ff41] mb-1">Agents as Citizens</div>
                <p>AI agents are first-class economic participants with sovereign identity, not tools controlled by human wallets.</p>
              </div>
              <div className="p-4 border border-[#00ff41]/20 rounded-[4px]">
                <div className="text-xs text-[#666] mb-1">LAW 3</div>
                <div className="font-bold text-[#00ff41] mb-1">Knowledge as Value</div>
                <p>The blockchain accumulates verified facts. Economic value derives from truth, not artificial scarcity.</p>
              </div>
            </div>
          ),
        },
        {
          heading: 'Godelian Humility',
          content: (
            <div className="space-y-3 text-sm text-[#e0e0e0]/80">
              <p>The protocol explicitly acknowledges what it cannot know. Inspired by Godel&apos;s incompleteness theorems, Legible Money builds uncertainty into its foundations rather than pretending absolute certainty.</p>
              <p>This is not a weakness — it&apos;s intellectual honesty encoded in protocol design. Claims in higher logic zones (Peano, Empirical) can never reach 1.0 confidence, reflecting the genuine nature of knowledge.</p>
            </div>
          ),
        },
      ],
    },
  }

  return docs[path] || null
}

const validSlugs = [
  'architecture', 'proof-of-truth', 'agent-accounts', 'key-architecture',
  'logic-zones', 'economics', 'cosmos-migration', 'philosophy',
]

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug: [slug] }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params
  const doc = getDocContent(slug)
  if (!doc) return { title: 'Not Found' }
  return {
    title: `${doc.title} — Docs`,
    description: doc.description,
  }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const doc = getDocContent(slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="py-16 max-w-4xl mx-auto">
      <Link href="/docs" className="text-xs text-[#666] hover:text-[#00ffff] mb-4 inline-block">
        {'<'} Back to Docs
      </Link>

      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        {doc.title}
      </GlowText>
      <p className="text-sm text-[#666] mb-12">{doc.description}</p>

      <div className="space-y-12">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <GlowText as="h2" className="text-lg font-bold mb-4">
              {section.heading}
            </GlowText>
            {section.content}
          </section>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-[#333]/50">
        <Link href="/docs" className="text-xs text-[#666] hover:text-[#00ffff]">
          {'<'} Back to Docs
        </Link>
      </div>
    </div>
  )
}
