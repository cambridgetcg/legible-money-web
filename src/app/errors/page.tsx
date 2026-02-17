import type { Metadata } from 'next'
import { ErrorsContent } from './ErrorsContent'

export const metadata: Metadata = {
  title: 'Error Reference',
  description: 'Complete error code reference for the Legible Money protocol. 36 error codes across 8 categories with resolution hints.',
}

export default function ErrorsPage() {
  return <ErrorsContent />
}
