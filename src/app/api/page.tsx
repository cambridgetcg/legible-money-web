import type { Metadata } from 'next'
import { ApiContent } from './ApiContent'

export const metadata: Metadata = {
  title: 'API Reference',
  description: 'Complete API reference for the Legible Money protocol. Account, Knowledge, Verification, Staking, and Identity endpoints.',
}

export default function ApiPage() {
  return <ApiContent />
}
