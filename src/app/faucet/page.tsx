import type { Metadata } from 'next'
import { FaucetContent } from './FaucetContent'

export const metadata: Metadata = {
  title: 'DevNet Faucet',
  description: 'Request free test LGM tokens on the Legible Money DevNet. 0.222 LGM per request for development and testing.',
}

export default function FaucetPage() {
  return <FaucetContent />
}
