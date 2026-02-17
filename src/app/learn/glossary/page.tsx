import type { Metadata } from 'next'
import { glossary } from '@/data/glossary'
import { GlowText } from '@/components/effects/GlowText'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'Key terms and definitions for the Legible Money protocol.',
}

function termToId(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function GlossaryPage() {
  const termIds = new Set(glossary.map((e) => termToId(e.term)))

  return (
    <div className="py-16 max-w-4xl mx-auto">
      <Link href="/learn" className="text-xs text-[#666] hover:text-[#00ffff] mb-4 inline-block">
        {'<'} Back to Learn
      </Link>

      <GlowText as="h1" className="text-2xl font-bold mb-2" intensity="md">
        Glossary
      </GlowText>
      <p className="text-sm text-[#666] mb-12">
        {glossary.length} terms defined
      </p>

      <div className="space-y-6">
        {glossary.map((entry) => (
          <article
            key={entry.term}
            id={termToId(entry.term)}
            className="p-4 border border-[#333]/50 rounded-[4px] hover:border-[#333] transition-colors scroll-mt-20"
          >
            <h3 className="text-sm font-bold text-[#00ff41] mb-1" style={{ textShadow: '0 0 4px #00ff4140' }}>
              {entry.term}
            </h3>
            <p className="text-sm text-[#e0e0e0]/70 leading-relaxed">
              {entry.definition}
            </p>
            {entry.related && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {entry.related.map((r) => {
                  const id = termToId(r)
                  const isLinked = termIds.has(id)
                  return isLinked ? (
                    <a
                      key={r}
                      href={`#${id}`}
                      className="text-[10px] text-[#00ffff] border border-[#00ffff]/20 px-1.5 py-0.5 rounded-[2px] hover:bg-[#00ffff]/5 transition-colors"
                    >
                      {r}
                    </a>
                  ) : (
                    <span key={r} className="text-[10px] text-[#666] border border-[#333]/50 px-1.5 py-0.5 rounded-[2px]">
                      {r}
                    </span>
                  )
                })}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
