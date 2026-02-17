import type { Metadata } from 'next'
import { apiMethods } from '@/data/api-methods'
import { CodeBlock } from '@/components/code/CodeBlock'
import { Badge } from '@/components/ui/Badge'
import { GlowText } from '@/components/effects/GlowText'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return apiMethods.map((method) => ({
    method: method.name,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ method: string }> }): Promise<Metadata> {
  const { method: methodName } = await params
  const method = apiMethods.find(m => m.name === methodName)
  if (!method) return { title: 'Not Found' }
  return {
    title: `${method.name} — API`,
    description: method.description,
  }
}

export default async function ApiMethodPage({ params }: { params: Promise<{ method: string }> }) {
  const { method: methodName } = await params
  const method = apiMethods.find(m => m.name === methodName)

  if (!method) {
    notFound()
  }

  return (
    <div className="py-16 max-w-4xl mx-auto">
      <Link href="/api" className="text-xs text-[#666] hover:text-[#00ffff] mb-4 inline-block">
        {'<'} Back to API Reference
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <Badge variant={method.method === 'GET' ? 'green' : 'amber'}>
          {method.method}
        </Badge>
        <GlowText as="h1" className="text-2xl font-bold" intensity="md">
          {method.name}
        </GlowText>
      </div>

      <code className="text-sm text-[#666] block mb-6">{method.endpoint}</code>

      <p className="text-sm text-[#e0e0e0]/80 mb-8">{method.description}</p>

      {method.params.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-bold text-[#e0e0e0] uppercase tracking-wider mb-3">Parameters</h2>
          <div className="border border-[#333] rounded-[4px] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#333] bg-[#0d0d0d]">
                  <th className="text-left px-4 py-2 text-[#666] font-normal text-xs">Name</th>
                  <th className="text-left px-4 py-2 text-[#666] font-normal text-xs">Type</th>
                  <th className="text-left px-4 py-2 text-[#666] font-normal text-xs">Required</th>
                  <th className="text-left px-4 py-2 text-[#666] font-normal text-xs">Description</th>
                </tr>
              </thead>
              <tbody>
                {method.params.map((param) => (
                  <tr key={param.name} className="border-b border-[#333]/30">
                    <td className="px-4 py-2 text-[#00ffff] text-xs">{param.name}</td>
                    <td className="px-4 py-2 text-[#e0e0e0]/60 text-xs">{param.type}</td>
                    <td className="px-4 py-2 text-xs">
                      {param.required
                        ? <span className="text-[#00ff41]">required</span>
                        : <span className="text-[#666]">optional</span>
                      }
                    </td>
                    <td className="px-4 py-2 text-[#e0e0e0]/60 text-xs">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-sm font-bold text-[#e0e0e0] uppercase tracking-wider mb-3">Response</h2>
        <CodeBlock code={method.response} language="json" filename={`${method.name} response`} />
      </section>
    </div>
  )
}
