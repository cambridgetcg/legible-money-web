'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { mainNav } from '@/data/navigation'
import { SearchDialog } from '@/components/ui/SearchDialog'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#333] bg-[#0a0a0a]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1.5 font-mono text-sm group">
          <span className="text-[#00ff41] font-bold">LGM{'>'}</span>
          <span className="text-[#666] hidden sm:inline">legible.money</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-1.5 text-xs font-mono rounded-[4px] transition-colors',
                pathname === item.href || pathname?.startsWith(item.href + '/')
                  ? 'text-[#00ff41] bg-[#00ff41]/5'
                  : 'text-[#e0e0e0]/70 hover:text-[#00ff41] hover:bg-[#ffffff04]',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SearchDialog />
          <a
            href="https://github.com/legible-money"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#666] hover:text-[#e0e0e0] transition-colors hidden sm:block"
          >
            GitHub
          </a>

          <button
            className="md:hidden p-2 text-[#e0e0e0] hover:text-[#00ff41]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <>
                  <line x1="1" y1="1" x2="17" y2="11" />
                  <line x1="1" y1="11" x2="17" y2="1" />
                </>
              ) : (
                <>
                  <line x1="0" y1="1" x2="18" y2="1" />
                  <line x1="0" y1="6" x2="18" y2="6" />
                  <line x1="0" y1="11" x2="18" y2="11" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-[#333] bg-[#0a0a0a] px-4 py-3 space-y-1" aria-label="Mobile navigation">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-3 py-2 text-sm font-mono rounded-[4px] transition-colors',
                pathname === item.href
                  ? 'text-[#00ff41] bg-[#00ff41]/5'
                  : 'text-[#e0e0e0]/70 hover:text-[#00ff41]',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
