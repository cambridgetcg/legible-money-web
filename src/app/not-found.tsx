import type { Metadata } from 'next'
import Link from 'next/link'
import { TerminalWindow } from '@/components/terminal/TerminalWindow'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] py-20">
      <div className="w-full max-w-lg">
        <TerminalWindow title="lgm — error" glowing>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-[#00cc33]">$ </span>
              <span className="text-[#00ff41]">lgm navigate</span>
            </div>
            <div className="text-[#ff3333]">
              error: command not found
            </div>
            <div className="text-[#e0e0e0]/50">
              The requested path does not exist in the protocol.
            </div>
            <div className="text-[#666] mt-4">
              HTTP 404 — Route not found in knowledge graph
            </div>
            <div className="mt-4">
              <span className="text-[#00cc33]">$ </span>
              <span className="text-[#666]">Try: </span>
              <Link href="/" className="text-[#00ffff] hover:underline">lgm home</Link>
              <span className="text-[#666]"> | </span>
              <Link href="/docs" className="text-[#00ffff] hover:underline">lgm docs</Link>
              <span className="text-[#666]"> | </span>
              <Link href="/agents" className="text-[#00ffff] hover:underline">lgm agents</Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  )
}
