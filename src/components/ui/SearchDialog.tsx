'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { apiMethods } from '@/data/api-methods'
import { errorCodes } from '@/data/errors'
import { mainNav } from '@/data/navigation'

type SearchResult = {
  title: string
  description: string
  href: string
  category: string
}

const staticPages: SearchResult[] = [
  ...mainNav.map((n) => ({
    title: n.label,
    description: n.description || '',
    href: n.href,
    category: 'Page',
  })),
  { title: 'Network Status', description: 'Live DevNet dashboard', href: '/status', category: 'Page' },
  { title: 'DevNet Faucet', description: 'Request test tokens', href: '/faucet', category: 'Page' },
  { title: 'Error Reference', description: 'All protocol error codes', href: '/errors', category: 'Page' },
  { title: 'Glossary', description: 'Protocol terminology', href: '/learn/glossary', category: 'Page' },
]

const apiResults: SearchResult[] = apiMethods.map((m) => ({
  title: m.name,
  description: `${m.method} ${m.endpoint}`,
  href: `/api/${m.name}`,
  category: 'API',
}))

const errorResults: SearchResult[] = errorCodes.map((e) => ({
  title: `${e.code} ${e.name}`,
  description: e.message,
  href: `/errors#err-${e.code}`,
  category: 'Error',
}))

const allResults: SearchResult[] = [...staticPages, ...apiResults, ...errorResults]

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = query.length > 0
    ? allResults.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase()),
      ).slice(0, 12)
    : []

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    },
    [],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const navigate = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && results[selected]) {
      navigate(results[selected].href)
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-[#666] border border-[#333] rounded-[4px] hover:border-[#666] transition-colors"
        aria-label="Search"
      >
        <span>Search</span>
        <kbd className="text-[10px] px-1.5 py-0.5 border border-[#333] rounded-[2px] bg-[#0a0a0a]">
          &#8984;K
        </kbd>
      </button>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="fixed inset-x-0 top-[15%] mx-auto max-w-lg z-50 px-4">
        <div className="border border-[#333] rounded-[4px] bg-[#0d0d0d] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#333]">
            <span className="text-[#00ff41] text-sm">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
              onKeyDown={handleInputKeyDown}
              placeholder="Search pages, API methods, errors..."
              className="flex-1 bg-transparent text-sm text-[#e0e0e0] font-mono placeholder:text-[#666] focus:outline-none"
            />
            <kbd
              className="text-[10px] px-1.5 py-0.5 border border-[#333] rounded-[2px] text-[#666] cursor-pointer"
              onClick={() => setOpen(false)}
            >
              ESC
            </kbd>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="max-h-80 overflow-y-auto py-2">
              {results.map((result, i) => (
                <button
                  key={result.href}
                  onClick={() => navigate(result.href)}
                  onMouseEnter={() => setSelected(i)}
                  className={`w-full text-left px-4 py-2 flex items-center gap-3 text-xs transition-colors ${
                    i === selected ? 'bg-[#00ff41]/5' : 'hover:bg-[#ffffff04]'
                  }`}
                >
                  <span className="text-[10px] uppercase tracking-wider text-[#666] w-10 flex-shrink-0">
                    {result.category}
                  </span>
                  <span className={i === selected ? 'text-[#00ff41]' : 'text-[#e0e0e0]'}>
                    {result.title}
                  </span>
                  <span className="text-[#666] truncate ml-auto">{result.description}</span>
                </button>
              ))}
            </div>
          )}

          {query.length > 0 && results.length === 0 && (
            <div className="px-4 py-8 text-center text-xs text-[#666]">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {query.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-[#666]">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
    </>
  )
}
