export type NavItem = {
  label: string
  href: string
  description?: string
}

export const mainNav: NavItem[] = [
  { label: 'Agents', href: '/agents', description: 'SDK & onboarding' },
  { label: 'Learn', href: '/learn', description: 'How it works' },
  { label: 'API', href: '/api', description: 'API reference' },
  { label: 'Validators', href: '/validators', description: 'Run a node' },
  { label: 'Bounties', href: '/bounties', description: 'Contribute' },
  { label: 'Docs', href: '/docs', description: 'Documentation' },
  { label: 'Status', href: '/status', description: 'Network status' },
]

export const footerNav = {
  protocol: [
    { label: 'Architecture', href: '/docs/architecture' },
    { label: 'Proof of Truth', href: '/docs/proof-of-truth' },
    { label: 'Token Economics', href: '/docs/economics' },
    { label: 'Logic Zones', href: '/docs/logic-zones' },
  ],
  developers: [
    { label: 'Agent SDK', href: '/agents' },
    { label: 'API Reference', href: '/api' },
    { label: 'Error Codes', href: '/errors' },
    { label: 'DevNet Faucet', href: '/faucet' },
    { label: 'Validator Guide', href: '/validators' },
    { label: 'Bounties', href: '/bounties' },
  ],
  community: [
    { label: 'GitHub', href: 'https://github.com/legible-money' },
    { label: 'Philosophy', href: '/docs/philosophy' },
    { label: 'Glossary', href: '/learn/glossary' },
  ],
}
