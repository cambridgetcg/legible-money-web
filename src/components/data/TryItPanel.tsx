'use client'

import { useState } from 'react'
import type { ApiMethod } from '@/data/api-methods'
import { Button } from '@/components/ui/Button'
import { CodeBlock } from '@/components/code/CodeBlock'

type TryItPanelProps = {
  method: ApiMethod
}

export function TryItPanel({ method }: TryItPanelProps) {
  const [params, setParams] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    method.params.forEach((p) => {
      initial[p.name] = ''
    })
    return initial
  })
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call (static site — no real backend)
    await new Promise((r) => setTimeout(r, 800))

    // Build a realistic mock response
    setResponse(method.response)
    setLoading(false)
  }

  // Build the curl command for display
  const buildEndpoint = () => {
    let endpoint = method.endpoint
    method.params.forEach((p) => {
      const val = params[p.name] || `{${p.name}}`
      endpoint = endpoint.replace(`{${p.name}}`, val)
    })
    return endpoint
  }

  const queryParams = method.params.filter(
    (p) => !method.endpoint.includes(`{${p.name}}`) && params[p.name],
  )
  const queryString =
    queryParams.length > 0
      ? '?' + queryParams.map((p) => `${p.name}=${encodeURIComponent(params[p.name])}`).join('&')
      : ''

  const curlCommand = `curl -s https://devnet.legible.money${buildEndpoint()}${queryString}`

  return (
    <div className="border border-[#00ff41]/20 rounded-[4px] bg-[#00ff41]/[0.02]">
      <div className="px-4 py-2 border-b border-[#00ff41]/20 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#00ff41]" />
        <span className="text-xs font-bold text-[#00ff41]">Try It</span>
        <span className="text-[10px] text-[#666]">DevNet read-only</span>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        {method.params.map((param) => (
          <div key={param.name}>
            <label className="block text-xs text-[#666] mb-1">
              {param.name}
              {param.required && <span className="text-[#00ff41] ml-1">*</span>}
              <span className="text-[#333] ml-2">{param.type}</span>
            </label>
            <input
              type="text"
              value={params[param.name]}
              onChange={(e) => setParams((p) => ({ ...p, [param.name]: e.target.value }))}
              placeholder={param.description}
              className="w-full bg-[#0a0a0a] border border-[#333] rounded-[4px] px-3 py-1.5 text-xs text-[#e0e0e0] font-mono placeholder:text-[#333] focus:outline-none focus:border-[#00ff41] transition-colors"
            />
          </div>
        ))}

        <div className="text-[10px] text-[#666] font-mono break-all bg-[#0a0a0a] rounded-[4px] px-2 py-1.5">
          {curlCommand}
        </div>

        <Button type="submit" size="sm" disabled={loading}>
          {loading ? 'Requesting...' : 'Send Request'}
        </Button>
      </form>

      {response && (
        <div className="border-t border-[#00ff41]/20 p-4">
          <div className="text-xs text-[#666] mb-2">Response (mock)</div>
          <CodeBlock code={response} language="json" />
        </div>
      )}
    </div>
  )
}
