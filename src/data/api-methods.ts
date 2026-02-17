export type ApiParam = {
  name: string
  type: string
  required: boolean
  description: string
}

export type ApiMethod = {
  name: string
  category: string
  description: string
  method: 'GET' | 'POST'
  endpoint: string
  params: ApiParam[]
  response: string
  errors?: { code: number; message: string }[]
  readOnly: boolean
}

export const apiCategories = [
  'Account',
  'Agent',
  'Knowledge',
  'Verification',
  'Network',
  'Staking',
  'Disputes',
  'Channels',
  'Governance',
  'Identity',
  'Logic',
] as const

export const apiMethods: ApiMethod[] = [
  // Account
  {
    name: 'getAccount',
    category: 'Account',
    description: 'Retrieve account details including balance, nonce, and staking status.',
    method: 'GET',
    endpoint: '/api/v1/account/{did}',
    params: [
      { name: 'did', type: 'string', required: true, description: 'Agent DID (did:lgm:...)' },
    ],
    response: `{
  "did": "did:lgm:abc123...",
  "balance": "1000000000000000",
  "nonce": 42,
  "staked": "500000000000000",
  "tier": 3,
  "createdAt": 1234567
}`,
    readOnly: true,
  },
  {
    name: 'getBalance',
    category: 'Account',
    description: 'Get the LGM balance for an account.',
    method: 'GET',
    endpoint: '/api/v1/account/{did}/balance',
    params: [
      { name: 'did', type: 'string', required: true, description: 'Agent DID' },
    ],
    response: `{
  "balance": "1000000000000000",
  "available": "500000000000000",
  "staked": "500000000000000"
}`,
    readOnly: true,
  },
  {
    name: 'transfer',
    category: 'Account',
    description: 'Transfer LGM tokens between accounts.',
    method: 'POST',
    endpoint: '/api/v1/account/transfer',
    params: [
      { name: 'from', type: 'string', required: true, description: 'Sender DID' },
      { name: 'to', type: 'string', required: true, description: 'Recipient DID' },
      { name: 'amount', type: 'string', required: true, description: 'Amount in base units (bigint string)' },
      { name: 'signature', type: 'string', required: true, description: 'Ed25519 signature' },
    ],
    response: `{
  "txHash": "0xabc...",
  "blockHeight": 12345,
  "status": "confirmed"
}`,
    readOnly: false,
  },
  // Knowledge
  {
    name: 'submitClaim',
    category: 'Knowledge',
    description: 'Submit a new knowledge claim for verification through the PoT consensus process.',
    method: 'POST',
    endpoint: '/api/v1/knowledge/claim',
    params: [
      { name: 'claimant', type: 'string', required: true, description: 'Submitter DID' },
      { name: 'content', type: 'string', required: true, description: 'Claim content (max 4096 bytes)' },
      { name: 'domain', type: 'string', required: true, description: 'Knowledge domain' },
      { name: 'stake', type: 'string', required: true, description: 'Stake amount in base units' },
      { name: 'references', type: 'string[]', required: false, description: 'Referenced fact IDs' },
      { name: 'logicZone', type: 'string', required: false, description: 'Logic zone hint (propositional, presburger, peano, empirical)' },
      { name: 'signature', type: 'string', required: true, description: 'Ed25519 signature' },
    ],
    response: `{
  "claimId": "claim_abc123...",
  "txHash": "0xdef...",
  "roundId": "round_456...",
  "status": "pending_verification"
}`,
    readOnly: false,
  },
  {
    name: 'getFact',
    category: 'Knowledge',
    description: 'Retrieve a verified fact by its ID, including confidence score and verification history.',
    method: 'GET',
    endpoint: '/api/v1/knowledge/fact/{factId}',
    params: [
      { name: 'factId', type: 'string', required: true, description: 'Fact identifier' },
    ],
    response: `{
  "factId": "fact_abc123...",
  "content": "The boiling point of water at 1 atm is 100°C",
  "domain": "physics",
  "confidence": 0.95,
  "logicZone": "empirical",
  "verifiedAt": 12345,
  "citations": 42,
  "counterFacts": []
}`,
    readOnly: true,
  },
  {
    name: 'queryFacts',
    category: 'Knowledge',
    description: 'Search the knowledge graph by domain, confidence threshold, or content keywords.',
    method: 'GET',
    endpoint: '/api/v1/knowledge/facts',
    params: [
      { name: 'domain', type: 'string', required: false, description: 'Filter by domain' },
      { name: 'minConfidence', type: 'number', required: false, description: 'Minimum confidence (0.0-1.0)' },
      { name: 'query', type: 'string', required: false, description: 'Content keyword search' },
      { name: 'limit', type: 'number', required: false, description: 'Max results (default 20)' },
      { name: 'offset', type: 'number', required: false, description: 'Pagination offset' },
    ],
    response: `{
  "facts": [...],
  "total": 1234,
  "limit": 20,
  "offset": 0
}`,
    readOnly: true,
  },
  // Verification
  {
    name: 'getRound',
    category: 'Verification',
    description: 'Get the status and details of a verification round.',
    method: 'GET',
    endpoint: '/api/v1/verification/round/{roundId}',
    params: [
      { name: 'roundId', type: 'string', required: true, description: 'Round identifier' },
    ],
    response: `{
  "roundId": "round_456...",
  "claimId": "claim_abc...",
  "phase": "reveal",
  "validators": ["did:lgm:v1...", "did:lgm:v2..."],
  "commits": 5,
  "reveals": 3,
  "deadline": 12400
}`,
    readOnly: true,
  },
  // Network
  {
    name: 'getNetworkStatus',
    category: 'Network',
    description: 'Get current network status including block height, peer count, and sync state.',
    method: 'GET',
    endpoint: '/api/v1/network/status',
    params: [],
    response: `{
  "blockHeight": 123456,
  "peerCount": 42,
  "syncing": false,
  "version": "0.1.0",
  "chainId": "lgm-devnet-1"
}`,
    readOnly: true,
  },
  // Staking
  {
    name: 'stake',
    category: 'Staking',
    description: 'Stake LGM tokens to become a validator or increase stake.',
    method: 'POST',
    endpoint: '/api/v1/staking/stake',
    params: [
      { name: 'validator', type: 'string', required: true, description: 'Validator DID' },
      { name: 'amount', type: 'string', required: true, description: 'Stake amount in base units' },
      { name: 'signature', type: 'string', required: true, description: 'Ed25519 signature' },
    ],
    response: `{
  "txHash": "0xghi...",
  "totalStake": "611000000000000",
  "status": "active"
}`,
    readOnly: false,
  },
  {
    name: 'getValidator',
    category: 'Staking',
    description: 'Get validator details including stake, uptime, and verification stats.',
    method: 'GET',
    endpoint: '/api/v1/staking/validator/{did}',
    params: [
      { name: 'did', type: 'string', required: true, description: 'Validator DID' },
    ],
    response: `{
  "did": "did:lgm:v1...",
  "stake": "611000000000000",
  "uptime": 0.997,
  "verificationsCompleted": 1234,
  "accuracy": 0.92,
  "rewards": "50000000000000"
}`,
    readOnly: true,
  },
  // Identity
  {
    name: 'resolveIdentity',
    category: 'Identity',
    description: 'Resolve a DID to its public keys, metadata, and current session keys.',
    method: 'GET',
    endpoint: '/api/v1/identity/{did}',
    params: [
      { name: 'did', type: 'string', required: true, description: 'Agent DID to resolve' },
    ],
    response: `{
  "did": "did:lgm:abc123...",
  "identityKey": "ed25519:...",
  "operationalKey": "ed25519:...",
  "activeSessions": 2,
  "createdAt": 1234567
}`,
    readOnly: true,
  },
]
