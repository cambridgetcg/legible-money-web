'use client'

import { useState } from 'react'
import { errorCodes, errorCategories } from '@/data/errors'
import { GlowText } from '@/components/effects/GlowText'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

export function ErrorsContent() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [search, setSearch] = useState('')

  const filtered = errorCodes.filter((err) => {
    const matchesCategory = activeCategory === 'all' || err.category === activeCategory
    const matchesSearch =
      !search ||
      err.name.toLowerCase().includes(search.toLowerCase()) ||
      err.message.toLowerCase().includes(search.toLowerCase()) ||
      err.code.toString().includes(search)
    return matchesCategory && matchesSearch
  })

  return (
    <div className="py-16">
      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        Error Reference
      </GlowText>
      <p className="text-sm text-[#666] mb-8">
        All protocol error codes with descriptions and resolution hints.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-48 flex-shrink-0">
          <div className="lg:sticky lg:top-20 space-y-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search errors..."
              className="w-full bg-[#0a0a0a] border border-[#333] rounded-[4px] px-3 py-1.5 text-xs text-[#e0e0e0] font-mono placeholder:text-[#333] focus:outline-none focus:border-[#00ff41] transition-colors"
            />

            <nav className="space-y-1" aria-label="Error categories">
              <button
                onClick={() => setActiveCategory('all')}
                className={cn(
                  'block w-full text-left px-3 py-1.5 text-xs font-mono rounded-[4px] transition-colors',
                  activeCategory === 'all'
                    ? 'text-[#00ff41] bg-[#00ff41]/5'
                    : 'text-[#666] hover:text-[#e0e0e0]',
                )}
              >
                All Errors ({errorCodes.length})
              </button>
              {errorCategories.map((cat) => {
                const count = errorCodes.filter((e) => e.category === cat).length
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
          </div>
        </aside>

        {/* Error list */}
        <div className="flex-1">
          <div className="text-xs text-[#666] mb-4">
            {filtered.length} error{filtered.length !== 1 ? 's' : ''} found
          </div>

          <div className="space-y-3">
            {filtered.map((err) => (
              <article
                key={err.code}
                id={`err-${err.code}`}
                className="border border-[#333] rounded-[4px] p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="amber">{err.code}</Badge>
                  <span className="text-sm font-bold text-[#00ff41]">{err.name}</span>
                  <Badge variant="default">{err.category}</Badge>
                </div>
                <p className="text-sm text-[#e0e0e0]/80 mb-2">{err.message}</p>
                {err.hint && (
                  <div className="text-xs text-[#666] bg-[#ffffff04] rounded-[4px] px-3 py-2">
                    <span className="text-[#ffb000]">Hint: </span>
                    {err.hint}
                  </div>
                )}
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-[#666] text-sm">
                No errors matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
