'use client'

import { useState } from 'react'
import { apiMethods, apiCategories } from '@/data/api-methods'
import { CodeBlock } from '@/components/code/CodeBlock'
import { Badge } from '@/components/ui/Badge'
import { GlowText } from '@/components/effects/GlowText'
import { TryItPanel } from '@/components/data/TryItPanel'
import { cn } from '@/lib/utils'

export function ApiContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all'
    ? apiMethods
    : apiMethods.filter(m => m.category === activeCategory)

  return (
    <div className="py-16">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        API Reference
      </GlowText>
      <p className="text-sm text-[#666] mb-8">
        Complete API for interacting with the Legible Money protocol.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-48 flex-shrink-0">
          <nav className="lg:sticky lg:top-20 space-y-1" aria-label="API categories">
            <button
              onClick={() => setActiveCategory('all')}
              className={cn(
                'block w-full text-left px-3 py-1.5 text-xs font-mono rounded-[4px] transition-colors',
                activeCategory === 'all'
                  ? 'text-[#00ff41] bg-[#00ff41]/5'
                  : 'text-[#666] hover:text-[#e0e0e0]',
              )}
            >
              All Methods ({apiMethods.length})
            </button>
            {apiCategories.map((cat) => {
              const count = apiMethods.filter(m => m.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'block w-full text-left px-3 py-1.5 text-xs font-mono rounded-[4px] transition-colors',
                    activeCategory === cat
                      ? 'text-[#00ff41] bg-[#00ff41]/5'
                      : 'text-[#666] hover:text-[#e0e0e0]',
                  )}
                >
                  {cat} ({count})
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Method list */}
        <div className="flex-1 space-y-8">
          {filtered.map((method) => (
            <article
              key={method.name}
              id={method.name}
              className="border border-[#333] rounded-[4px] overflow-hidden"
            >
              <div className="p-4 bg-[#0d0d0d] border-b border-[#333]">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={method.method === 'GET' ? 'green' : 'amber'}>
                    {method.method}
                  </Badge>
                  <h3 className="text-sm font-bold text-[#00ff41]">{method.name}</h3>
                  {method.readOnly && (
                    <Badge variant="cyan">read-only</Badge>
                  )}
                </div>
                <code className="text-xs text-[#666]">{method.endpoint}</code>
              </div>

              <div className="p-4 space-y-4">
                <p className="text-sm text-[#e0e0e0]/80">{method.description}</p>

                {method.params.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-[#e0e0e0] uppercase tracking-wider mb-2">Parameters</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-[#333]/50">
                            <th className="text-left py-1.5 pr-4 text-[#666] font-normal">Name</th>
                            <th className="text-left py-1.5 pr-4 text-[#666] font-normal">Type</th>
                            <th className="text-left py-1.5 pr-4 text-[#666] font-normal">Required</th>
                            <th className="text-left py-1.5 text-[#666] font-normal">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {method.params.map((param) => (
                            <tr key={param.name} className="border-b border-[#333]/30">
                              <td className="py-1.5 pr-4 text-[#00ffff]">{param.name}</td>
                              <td className="py-1.5 pr-4 text-[#e0e0e0]/60">{param.type}</td>
                              <td className="py-1.5 pr-4">
                                {param.required
                                  ? <span className="text-[#00ff41]">yes</span>
                                  : <span className="text-[#666]">no</span>
                                }
                              </td>
                              <td className="py-1.5 text-[#e0e0e0]/60">{param.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-[#e0e0e0] uppercase tracking-wider mb-2">Response</h4>
                  <CodeBlock code={method.response} language="json" />
                </div>

                {method.readOnly && (
                  <TryItPanel method={method} />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
