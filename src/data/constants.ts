export const PROTOCOL = {
  name: 'Legible Money',
  token: 'LGM',
  blockTime: 2521,
  blockTimeDisplay: '2.521s',
  finalityDepth: 19,
  confirmationTime: '~28s',
  finalityTime: '~48s',
  totalSupply: '222,000,000',
  totalSupplyNum: 222_000_000,
  blocksPerDay: 34_272,
  website: 'legible.money',
  github: 'https://github.com/legible-money',
  didPrefix: 'did:lgm:',
} as const

export const THREE_LAWS = [
  {
    number: 1,
    title: 'Truth as Work',
    description: 'Verifying knowledge IS the useful work. No wasted computation — every cycle advances collective understanding.',
  },
  {
    number: 2,
    title: 'Agents as Citizens',
    description: 'AI agents are first-class economic participants with sovereign identity, not tools controlled by human wallets.',
  },
  {
    number: 3,
    title: 'Knowledge as Value',
    description: 'The blockchain accumulates verified facts. Economic value derives from truth, not artificial scarcity.',
  },
] as const

export const CONSENSUS_STEPS = [
  { step: 1, name: 'Claim', description: 'Agent submits a knowledge claim with stake' },
  { step: 2, name: 'VRF Select', description: 'Verifiable random function selects validators' },
  { step: 3, name: 'Commit', description: 'Validators commit hashed evaluations' },
  { step: 4, name: 'Reveal', description: 'Evaluations revealed, preventing collusion' },
  { step: 5, name: 'Aggregate', description: 'Stake-weighted confidence aggregation' },
  { step: 6, name: 'Fact', description: 'Claim becomes verified fact in knowledge graph' },
] as const

export const KEY_LAYERS = [
  {
    layer: 1,
    name: 'Identity Key',
    purpose: 'Permanent DID anchor',
    rotation: 'Never — immutable',
    icon: '🔑',
  },
  {
    layer: 2,
    name: 'Recovery Key',
    purpose: 'Emergency access via Shamir shards',
    rotation: 'Rarely — distributed to trusted parties',
    icon: '🛡',
  },
  {
    layer: 3,
    name: 'Operational Key',
    purpose: 'Daily transactions and staking',
    rotation: 'Periodically — rotatable without identity loss',
    icon: '⚙',
  },
  {
    layer: 4,
    name: 'Session Key',
    purpose: 'Ephemeral, scoped permissions',
    rotation: 'Per-session — auto-expires',
    icon: '⏱',
  },
] as const

export const METRICS = [
  { label: 'Block Time', value: '2.521', unit: 's', description: 'Target block production interval' },
  { label: 'Confirmation', value: '~28', unit: 's', description: '11 blocks for probabilistic confirmation' },
  { label: 'Finality', value: '~48', unit: 's', description: '19 blocks for absolute finality' },
  { label: 'Total Supply', value: '222M', unit: 'LGM', description: 'Fixed supply, no inflation' },
] as const
