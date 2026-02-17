import type { Metadata } from 'next'
import { StatusContent } from './StatusContent'

export const metadata: Metadata = {
  title: 'Network Status',
  description: 'Live DevNet network dashboard for the Legible Money protocol. Block height, validator status, RPC endpoints, and protocol metrics.',
}

export default function StatusPage() {
  return <StatusContent />
}
