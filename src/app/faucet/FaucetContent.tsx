'use client'

import { useState } from 'react'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { GlowText } from '@/components/effects/GlowText'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/content/Callout'

type FaucetState = 'idle' | 'requesting' | 'success' | 'error'

const DID_REGEX = /^did:lgm:[0-9a-f]{32,64}$/

export function FaucetContent() {
  const [did, setDid] = useState('')
  const [state, setState] = useState<FaucetState>('idle')
  const [txHash, setTxHash] = useState('')

  const isValidDid = DID_REGEX.test(did)

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidDid) return

    setState('requesting')

    // Simulate faucet request
    await new Promise(r => setTimeout(r, 2000))
    const hash = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    setTxHash(hash)
    setState('success')
  }

  const reset = () => {
    setState('idle')
    setDid('')
    setTxHash('')
  }

  const didError = did.length > 0 && !did.startsWith('did:lgm:')
    ? 'DID must start with did:lgm:'
    : did.startsWith('did:lgm:') && did.length > 8 && !isValidDid
      ? 'DID must be did:lgm: followed by 32-64 lowercase hex characters'
      : null

  return (
    <div className="py-16 max-w-2xl mx-auto">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        DevNet Faucet
      </GlowText>
      <p className="text-sm text-[#666] mb-8">
        Request test tokens on the Legible Money DevNet. 0.222 LGM per request.
      </p>

      <Callout type="info" title="DevNet only">
        Faucet tokens have no real value. They are for testing and development purposes only.
        Rate limited to 1 request per DID per hour.
      </Callout>

      <div className="mt-8">
        <TerminalWindow title="lgm faucet --request">
          {state === 'idle' && (
            <form onSubmit={handleRequest} className="space-y-4">
              <div>
                <label className="block text-xs text-[#666] mb-2">
                  <span className="text-[#00ff41]">$</span> Enter your Agent DID
                </label>
                <input
                  type="text"
                  value={did}
                  onChange={(e) => setDid(e.target.value)}
                  placeholder="did:lgm:a1b2c3d4e5f6..."
                  className="w-full bg-[#0a0a0a] border border-[#333] rounded-[4px] px-3 py-2 text-sm text-[#e0e0e0] font-mono placeholder:text-[#333] focus:outline-none focus:border-[#00ff41] transition-colors"
                />
                {didError && (
                  <div className="text-xs text-[#ffb000] mt-1">{didError}</div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  size="sm"
                  disabled={!isValidDid}
                >
                  Request 0.222 LGM
                </Button>
              </div>
            </form>
          )}

          {state === 'requesting' && (
            <div className="space-y-2 text-sm">
              <div className="text-[#666]">Requesting tokens...</div>
              <div className="flex items-center gap-2">
                <span className="animate-pulse text-[#00ff41]">{'>'}</span>
                <span className="text-[#e0e0e0]/70">Broadcasting transaction to devnet</span>
              </div>
            </div>
          )}

          {state === 'success' && (
            <div className="space-y-2 text-sm">
              <div className="text-[#00ff41]">Tokens sent successfully.</div>
              <div className="space-y-1 text-xs">
                <div className="flex gap-2">
                  <span className="text-[#666]">To:</span>
                  <span className="text-[#00ffff]">{did}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#666]">Amount:</span>
                  <span className="text-[#00ff41]">0.222 LGM</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#666]">Amount (base):</span>
                  <span className="text-[#e0e0e0]/70">222000000000000000</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#666]">Tx hash:</span>
                  <span className="text-[#e0e0e0]/70">{txHash}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#666]">Status:</span>
                  <span className="text-[#00ff41]">confirmed</span>
                </div>
              </div>
              <div className="pt-2">
                <Button size="sm" variant="secondary" onClick={reset}>
                  Request again
                </Button>
              </div>
            </div>
          )}

          {state === 'error' && (
            <div className="space-y-2 text-sm">
              <div className="text-[#ff3333]">Error: Rate limit exceeded.</div>
              <div className="text-xs text-[#666]">Please wait 1 hour before requesting again.</div>
              <div className="pt-2">
                <Button size="sm" variant="secondary" onClick={reset}>
                  Try again
                </Button>
              </div>
            </div>
          )}
        </TerminalWindow>
      </div>

      {/* Info Section */}
      <div className="mt-12 space-y-8">
        <section>
          <GlowText as="h2" className="text-lg font-bold mb-3">
            Faucet Details
          </GlowText>
          <div className="border border-[#333] rounded-[4px] overflow-hidden">
            <table className="w-full text-xs">
              <tbody>
                {[
                  ['Network', 'lgm-devnet-1'],
                  ['Amount per request', '0.222 LGM (222,000,000,000,000,000 base units)'],
                  ['Rate limit', '1 request / DID / hour'],
                  ['Source', 'did:lgm:protocol-treasury (FOUNDATION)'],
                  ['Min stake (validator)', '0.111 LGM'],
                  ['Min stake (claim)', '0.001 LGM'],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-[#333]/30">
                    <td className="py-2 px-3 text-[#666] w-48">{label}</td>
                    <td className="py-2 px-3 text-[#e0e0e0]">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <GlowText as="h2" className="text-lg font-bold mb-3">
            Programmatic Access
          </GlowText>
          <TerminalWindow title="curl">
            <pre className="text-xs text-[#e0e0e0]/80 whitespace-pre-wrap">{`curl -X POST https://devnet.legible.money/faucet \\
  -H "Content-Type: application/json" \\
  -d '{"did": "did:lgm:your-did-here"}'

# Response:
# {
#   "txHash": "0xabc...",
#   "amount": "222000000000000000",
#   "status": "confirmed"
# }`}</pre>
          </TerminalWindow>
        </section>
      </div>
    </div>
  )
}
