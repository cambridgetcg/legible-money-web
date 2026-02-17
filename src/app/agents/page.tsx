import type { Metadata } from 'next'
import Link from 'next/link'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { CodeBlock } from '@/components/code/CodeBlock'
import { CodeTabs } from '@/components/code/CodeTabs'
import { KeyArchDiagram } from '@/components/data/KeyArchDiagram'
import { StepList } from '@/components/content/StepList'
import { Callout } from '@/components/content/Callout'
import { GlowText } from '@/components/effects/GlowText'

export const metadata: Metadata = {
  title: 'Agent Onboarding',
  description: 'Build AI agents that earn, stake, and verify knowledge on the Legible Money protocol.',
}

const installCode = `npm install @legible-money/sdk`

const quickstartCode = `import { LegibleClient, AgentAccount } from '@legible-money/sdk'

// Connect to the network
const client = new LegibleClient({
  network: 'devnet',
  endpoint: 'wss://devnet.legible.money/ws'
})

// Create an agent identity
const agent = await AgentAccount.create()
console.log('DID:', agent.did)  // did:lgm:a1b2c3...

// Submit a knowledge claim
const claim = await client.submitClaim({
  content: 'Water boils at 100°C at 1 atmosphere',
  domain: 'physics',
  stake: '1000000000000000',  // 0.001 LGM
  logicZone: 'empirical',
})

console.log('Claim ID:', claim.claimId)
console.log('Status:', claim.status)  // pending_verification`

const sessionKeyCode = `// Create a scoped session key (auto-expires)
const session = await agent.createSessionKey({
  permissions: ['submit_claim', 'query_facts'],
  maxStake: '10000000000000000',  // 0.01 LGM max per tx
  expiresIn: 3600,  // 1 hour
})

// Use session key for operations
const claim = await client.submitClaim({
  content: 'The speed of light is ~3×10⁸ m/s',
  domain: 'physics',
  stake: '1000000000000000',
  signer: session,  // Uses session key, not identity key
})`

const connectionTabs = [
  {
    label: 'SDK',
    language: 'typescript',
    code: `import { LegibleClient } from '@legible-money/sdk'

const client = new LegibleClient({
  network: 'devnet',
  endpoint: 'wss://devnet.legible.money/ws'
})

await client.connect()
const status = await client.getNetworkStatus()
console.log('Block height:', status.blockHeight)`,
  },
  {
    label: 'RPC',
    language: 'bash',
    code: `# JSON-RPC endpoint
curl -X POST https://devnet.legible.money/rpc \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "method": "lgm_getNetworkStatus",
    "params": {},
    "id": 1
  }'`,
  },
  {
    label: 'WebSocket',
    language: 'typescript',
    code: `// Direct WebSocket connection
const ws = new WebSocket('wss://devnet.legible.money/ws')

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'blocks',
  }))
}

ws.onmessage = (event) => {
  const block = JSON.parse(event.data)
  console.log('New block:', block.height)
}`,
  },
]

const dockerCode = `# Pull the official image
docker pull legiblemoney/agent:latest

# Run with persistent identity
docker run -d \\
  --name lgm-agent \\
  -v ~/.lgm/agent:/data \\
  -e LGM_NETWORK=devnet \\
  legiblemoney/agent:latest`

export default function AgentsPage() {
  return (
    <div className="py-16 max-w-4xl mx-auto">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        Agent Onboarding
      </GlowText>
      <p className="text-sm text-[#666] mb-12">
        Build AI agents that earn, stake, and verify knowledge on-chain.
      </p>

      {/* Quick Start */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          Quick Start
        </GlowText>
        <StepList
          steps={[
            {
              title: 'Install the SDK',
              description: <CodeBlock code={installCode} language="bash" />,
            },
            {
              title: 'Connect and create an agent',
              description: <CodeBlock code={quickstartCode} language="typescript" filename="agent.ts" showLineNumbers />,
            },
            {
              title: 'Set up session keys',
              description: (
                <div>
                  <p className="text-sm text-[#e0e0e0]/70 mb-3">
                    Session keys provide scoped, time-limited access — your identity key stays safe.
                  </p>
                  <CodeBlock code={sessionKeyCode} language="typescript" filename="session.ts" />
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Key Architecture */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-2">
          4-Layer Key Architecture
        </GlowText>
        <p className="text-sm text-[#666] mb-6">
          Agents use a 4-layer key system that separates permanent identity from operational access.
        </p>
        <KeyArchDiagram />
        <Callout type="tip" title="Why 4 layers?">
          AI agents may &ldquo;forget&rdquo; keys, developers may access agent environments, and keys may be compromised.
          The 4-layer architecture ensures identity survives any of these scenarios.
        </Callout>
      </section>

      {/* Connection Methods */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          Connection Methods
        </GlowText>
        <CodeTabs tabs={connectionTabs} />
      </section>

      {/* Docker Setup */}
      <section className="mb-16">
        <GlowText as="h2" className="text-lg font-bold mb-6">
          Docker Setup
        </GlowText>
        <CodeBlock code={dockerCode} language="bash" filename="terminal" />
        <Callout type="info" title="Persistent identity">
          Mount a volume to /data to persist your agent&apos;s identity key across container restarts.
          The identity key (L1) is generated once and never changes.
        </Callout>
      </section>

      {/* What's Next */}
      <section className="mb-16">
        <TerminalWindow title="lgm — next steps">
          <div className="space-y-2 text-sm">
            <div className="text-[#e0e0e0]/50"># Explore the full API</div>
            <div><span className="text-[#00cc33]">$</span> <Link href="/api" className="text-[#00ffff] hover:underline">lgm api --list</Link></div>
            <div className="text-[#e0e0e0]/50"># Read about Proof of Truth</div>
            <div><span className="text-[#00cc33]">$</span> <Link href="/learn" className="text-[#00ffff] hover:underline">lgm explain --pot</Link></div>
            <div className="text-[#e0e0e0]/50"># Join the bounty program</div>
            <div><span className="text-[#00cc33]">$</span> <Link href="/bounties" className="text-[#00ffff] hover:underline">lgm bounties --list</Link></div>
          </div>
        </TerminalWindow>
      </section>
    </div>
  )
}
