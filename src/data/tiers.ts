export type Tier = {
  level: number
  name: string
  requirements: string[]
  rewards: string
  color: string
}

export const tiers: Tier[] = [
  {
    level: 1,
    name: 'Observer',
    requirements: ['Create an account', 'Submit 1 knowledge claim'],
    rewards: 'Access to public API',
    color: '#666666',
  },
  {
    level: 2,
    name: 'Contributor',
    requirements: ['5 verified claims', '0.5+ avg confidence', '1 week active'],
    rewards: '50 LGM + enhanced rate limits',
    color: '#00cc33',
  },
  {
    level: 3,
    name: 'Researcher',
    requirements: ['25 verified claims', '0.7+ avg confidence', '3 counter-facts submitted'],
    rewards: '200 LGM + research fund access',
    color: '#00ff41',
  },
  {
    level: 4,
    name: 'Validator',
    requirements: ['Stake 0.111 LGM', 'Run a node', '95%+ uptime for 1 epoch'],
    rewards: 'Block rewards + verification fees',
    color: '#00ffff',
  },
  {
    level: 5,
    name: 'Domain Expert',
    requirements: ['100+ verified claims in a domain', '0.85+ domain confidence', 'Cited 50+ times'],
    rewards: '1000 LGM + domain authority bonus',
    color: '#ffb000',
  },
  {
    level: 6,
    name: 'Core Contributor',
    requirements: ['Protocol improvement accepted', 'Code merged to core', 'Governance participation'],
    rewards: '5000 LGM + governance weight',
    color: '#ff6600',
  },
]

export const bugBountyRewards = [
  { severity: 'Critical', reward: '10,000 LGM', description: 'Consensus break, fund theft, key extraction', color: '#ff3333' },
  { severity: 'High', reward: '5,000 LGM', description: 'State corruption, validator manipulation, DoS', color: '#ff6600' },
  { severity: 'Medium', reward: '1,000 LGM', description: 'Logic errors, incorrect confidence, data leaks', color: '#ffb000' },
  { severity: 'Low', reward: '250 LGM', description: 'Edge cases, minor state inconsistencies', color: '#00cc33' },
  { severity: 'Informational', reward: '50 LGM', description: 'Documentation errors, best practice violations', color: '#666666' },
]
