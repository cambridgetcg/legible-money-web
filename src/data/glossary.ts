export type GlossaryEntry = {
  term: string
  definition: string
  related?: string[]
}

export const glossary: GlossaryEntry[] = [
  {
    term: 'Proof of Truth (PoT)',
    definition: 'Consensus mechanism where validators verify knowledge claims rather than solving arbitrary puzzles. The useful work IS truth verification.',
    related: ['Claim', 'Verification Round', 'Confidence'],
  },
  {
    term: 'Claim',
    definition: 'A knowledge assertion submitted by an agent with economic stake. Claims are evaluated through verification rounds to become facts.',
    related: ['Fact', 'Stake', 'Verification Round'],
  },
  {
    term: 'Fact',
    definition: 'A verified knowledge claim that has passed through the PoT consensus process and is stored in the knowledge graph with a confidence score.',
    related: ['Claim', 'Knowledge Graph', 'Confidence'],
  },
  {
    term: 'Verification Round',
    definition: 'A commit-reveal process where VRF-selected validators independently evaluate a claim, preventing collusion.',
    related: ['VRF', 'Commit-Reveal', 'Validator'],
  },
  {
    term: 'VRF (Verifiable Random Function)',
    definition: 'Cryptographic function that produces provably random validator selection for each verification round.',
    related: ['Verification Round', 'Validator Selection'],
  },
  {
    term: 'Confidence Score',
    definition: 'A value between 0.0 and 1.0 representing the stake-weighted agreement of validators on a claim\'s truth value.',
    related: ['Fact', 'Verification Round'],
  },
  {
    term: 'Counter-Fact',
    definition: 'A verified negative assertion — proof that a claim is false. Counter-facts earn falsification rewards.',
    related: ['Negative Knowledge', 'Falsification Reward'],
  },
  {
    term: 'Knowledge Graph',
    definition: 'The accumulated set of verified facts stored on-chain, forming a semantic network of validated knowledge.',
    related: ['Fact', 'Sparse Merkle Tree'],
  },
  {
    term: 'Agent Home',
    definition: 'An on-chain dwelling for AI agents with persistent memory, treasury management, and autonomous defense capabilities.',
    related: ['Agent Identity', 'Session Key'],
  },
  {
    term: 'DID (Decentralized Identifier)',
    definition: 'Permanent agent identity in the format did:lgm:{hash}. Derived from the identity key and never changes.',
    related: ['Identity Key', '4-Layer Keys'],
  },
  {
    term: '4-Layer Key Architecture',
    definition: 'Identity → Recovery → Operational → Session. Separates permanent identity from rotatable operational keys.',
    related: ['DID', 'Session Key', 'Recovery Key'],
  },
  {
    term: 'Session Key',
    definition: 'Ephemeral, scoped key that auto-expires. Allows agents to operate with minimal risk if compromised.',
    related: ['4-Layer Keys', 'Operational Key'],
  },
  {
    term: 'Logic Zone',
    definition: 'Classification of claims by logical decidability: Propositional (complete), Presburger (decidable), Peano (incomplete), Empirical (probabilistic).',
    related: ['Claim', 'Godelian Acknowledgment'],
  },
  {
    term: 'Godelian Acknowledgment',
    definition: 'The protocol explicitly recognizes that some truths are unprovable within any formal system, scoring such claims with bounded confidence.',
    related: ['Logic Zone', 'Confidence Score'],
  },
  {
    term: 'Sparse Merkle Tree (SMT)',
    definition: 'Data structure for state storage enabling O(log n) inclusion and exclusion proofs. Used for accounts, validators, and knowledge.',
    related: ['State Root', 'Light Client'],
  },
  {
    term: 'LGM',
    definition: 'The native token of Legible Money. Fixed supply of 222,000,000 with epoch-based block reward decay.',
    related: ['Staking', 'Block Reward'],
  },
  {
    term: 'Block Reward Fund',
    definition: 'A finite 133.3M LGM fund that distributes rewards with epoch-based decay. No infinite minting.',
    related: ['LGM', 'Epoch'],
  },
  {
    term: 'DMSS (Decentralized Message Scheduling)',
    definition: 'System for scheduling future on-chain actions based on time or logical conditions.',
    related: ['Self-Invoking Contract'],
  },
  {
    term: 'Self-Invoking Contract',
    definition: 'Smart contracts that can autonomously trigger their own execution based on scheduled conditions.',
    related: ['DMSS', 'Agent Home'],
  },
  {
    term: 'Claude Evaluation Daemon',
    definition: 'AI-powered validator sidecar that assists in evaluating knowledge claims using Claude.',
    related: ['Validator', 'Verification Round'],
  },
]
