'use client'

import { useState, useEffect } from 'react'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'
import { GlowText } from '@/components/effects/GlowText'
import { Badge } from '@/components/ui/Badge'

type NodeStatus = {
  id: string
  role: string
  peers: number
  syncing: boolean
  uptime: string
  version: string
}

const mockNodes: NodeStatus[] = [
  { id: 'validator-1', role: 'Block Producer', peers: 23, syncing: false, uptime: '99.7%', version: '0.1.0' },
  { id: 'validator-2', role: 'Verifier', peers: 21, syncing: false, uptime: '99.2%', version: '0.1.0' },
  { id: 'validator-3', role: 'Verifier', peers: 19, syncing: false, uptime: '98.8%', version: '0.1.0' },
]

export function StatusContent() {
  const [time, setTime] = useState<string>('')
  const [blockHeight, setBlockHeight] = useState(847291)

  useEffect(() => {
    const tick = () => setTime(new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC')
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setBlockHeight(h => h + 1)
    }, 2521)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="py-16 max-w-4xl mx-auto">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        Network Status
      </GlowText>
      <p className="text-sm text-[#666] mb-4">
        Live DevNet dashboard. Block time: 2.521s | Finality: 19 blocks.
      </p>

      {/* Simulated banner */}
      <div className="mb-8 px-3 py-2 border border-[#ffb000]/30 rounded-[4px] bg-[#ffb000]/5 text-xs text-[#ffb000]">
        Simulated data — Connect to a live DevNet node for real-time metrics.
      </div>

      {/* Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'Block Height', value: blockHeight.toLocaleString(), color: '#00ff41' },
          { label: 'Chain ID', value: 'lgm-devnet-1', color: '#00ffff' },
          { label: 'Network', value: 'Healthy', color: '#00ff41' },
          { label: 'Time', value: time, color: '#666' },
        ].map((m) => (
          <div key={m.label} className="border border-[#333] rounded-[4px] p-3">
            <div className="text-[10px] uppercase tracking-wider text-[#666] mb-1">{m.label}</div>
            <div className="text-sm font-bold" style={{ color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Protocol Metrics */}
      <section className="mb-12">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          Protocol Metrics
        </GlowText>
        <TerminalWindow title="lgm status --metrics">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-[#e0e0e0]/50">Block time (avg)</span>
              <span className="text-[#00ff41]">2.521s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e0e0e0]/50">Finality depth</span>
              <span className="text-[#00ff41]">19 blocks (~47.9s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e0e0e0]/50">Confirmation time</span>
              <span className="text-[#00ff41]">~28s (11 blocks)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e0e0e0]/50">Active validators</span>
              <span className="text-[#00ff41]">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e0e0e0]/50">Pending claims</span>
              <span className="text-[#ffb000]">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e0e0e0]/50">Verified facts</span>
              <span className="text-[#00ff41]">12,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e0e0e0]/50">Total supply</span>
              <span className="text-[#00ffff]">222,000,000 LGM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#e0e0e0]/50">Block reward fund</span>
              <span className="text-[#00ffff]">133,300,000 LGM</span>
            </div>
          </div>
        </TerminalWindow>
      </section>

      {/* Nodes */}
      <section className="mb-12">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          Node Status
        </GlowText>
        <div className="space-y-3">
          {mockNodes.map((node) => (
            <div key={node.id} className="border border-[#333] rounded-[4px] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
                  <span className="text-sm font-bold text-[#00ff41]">{node.id}</span>
                  <Badge variant="cyan">{node.role}</Badge>
                </div>
                <span className="text-xs text-[#666]">v{node.version}</span>
              </div>
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[#666]">Height: </span>
                  <span className="text-[#e0e0e0]">{(blockHeight + (node.id === 'validator-3' ? -1 : 0)).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#666]">Peers: </span>
                  <span className="text-[#e0e0e0]">{node.peers}</span>
                </div>
                <div>
                  <span className="text-[#666]">Uptime: </span>
                  <span className="text-[#00ff41]">{node.uptime}</span>
                </div>
                <div>
                  <span className="text-[#666]">Sync: </span>
                  <span className={node.syncing ? 'text-[#ffb000]' : 'text-[#00ff41]'}>
                    {node.syncing ? 'syncing' : 'synced'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RPC Endpoints */}
      <section className="mb-12">
        <GlowText as="h2" className="text-lg font-bold mb-4">
          RPC Endpoints
        </GlowText>
        <TerminalWindow title="lgm config --endpoints">
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[#666]"># JSON-RPC</span>
            </div>
            <div>
              <span className="text-[#00ffff]">https://devnet.legible.money/rpc</span>
            </div>
            <div className="mt-2">
              <span className="text-[#666]"># WebSocket</span>
            </div>
            <div>
              <span className="text-[#00ffff]">wss://devnet.legible.money/ws</span>
            </div>
            <div className="mt-2">
              <span className="text-[#666]"># REST API</span>
            </div>
            <div>
              <span className="text-[#00ffff]">https://devnet.legible.money/api/v1</span>
            </div>
            <div className="mt-2">
              <span className="text-[#666]"># gRPC (Cosmos)</span>
            </div>
            <div>
              <span className="text-[#00ffff]">grpc://devnet.legible.money:9090</span>
            </div>
          </div>
        </TerminalWindow>
      </section>

      {/* Recent Blocks */}
      <section>
        <GlowText as="h2" className="text-lg font-bold mb-4">
          Recent Blocks
        </GlowText>
        <div className="border border-[#333] rounded-[4px] overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#333] bg-[#0d0d0d]">
                <th className="text-left py-2 px-3 text-[#666] font-normal">Height</th>
                <th className="text-left py-2 px-3 text-[#666] font-normal">Hash</th>
                <th className="text-left py-2 px-3 text-[#666] font-normal">Txs</th>
                <th className="text-left py-2 px-3 text-[#666] font-normal">Producer</th>
                <th className="text-left py-2 px-3 text-[#666] font-normal">Time</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-[#333]/30">
                  <td className="py-2 px-3 text-[#00ff41]">{(blockHeight - i).toLocaleString()}</td>
                  <td className="py-2 px-3 text-[#e0e0e0]/60 font-mono">
                    0x{((blockHeight - i) * 7919).toString(16).slice(0, 12)}...
                  </td>
                  <td className="py-2 px-3 text-[#e0e0e0]">{[3, 1, 5, 0, 2][i]}</td>
                  <td className="py-2 px-3 text-[#00ffff]">validator-1</td>
                  <td className="py-2 px-3 text-[#666]">{(i * 2.521).toFixed(1)}s ago</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
