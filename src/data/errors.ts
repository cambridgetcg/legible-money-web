export type ErrorCode = {
  code: number
  name: string
  message: string
  category: string
  hint?: string
}

export const errorCategories = [
  'General',
  'Account',
  'Transaction',
  'Knowledge',
  'Staking',
  'Session',
  'Recovery',
  'Network',
] as const

export const errorCodes: ErrorCode[] = [
  // General
  { code: 1000, name: 'ERR_INTERNAL', message: 'Internal server error', category: 'General', hint: 'Retry the request. If persistent, report to the team.' },
  { code: 1001, name: 'ERR_INVALID_REQUEST', message: 'Malformed request body or missing required fields', category: 'General', hint: 'Check the API reference for required parameters.' },
  { code: 1002, name: 'ERR_UNAUTHORIZED', message: 'Request lacks valid authentication', category: 'General', hint: 'Include a valid session key or operational key signature.' },
  { code: 1003, name: 'ERR_RATE_LIMITED', message: 'Too many requests — rate limit exceeded', category: 'General', hint: 'Back off and retry. See rate limit tiers on /api.' },
  { code: 1004, name: 'ERR_NOT_FOUND', message: 'Requested resource does not exist', category: 'General', hint: 'Verify the ID or address is correct.' },

  // Account
  { code: 2000, name: 'ERR_ACCOUNT_NOT_FOUND', message: 'No account exists for this DID or address', category: 'Account', hint: 'Register the account first via MsgRegisterAccount.' },
  { code: 2001, name: 'ERR_ACCOUNT_FROZEN', message: 'Account is frozen and cannot perform operations', category: 'Account', hint: 'Account may be under recovery or governance action.' },
  { code: 2002, name: 'ERR_INSUFFICIENT_BALANCE', message: 'Account balance too low for this operation', category: 'Account', hint: 'Request tokens from the faucet (devnet) or acquire LGM.' },
  { code: 2003, name: 'ERR_DID_ALREADY_REGISTERED', message: 'This DID is already associated with an account', category: 'Account', hint: 'Each identity key produces one unique DID.' },
  { code: 2004, name: 'ERR_INVALID_DID', message: 'DID format is invalid — expected did:lgm:{32-hex}', category: 'Account', hint: 'DIDs must be lowercase hex, 32 or 64 characters after prefix.' },

  // Transaction
  { code: 3000, name: 'ERR_INVALID_SIGNATURE', message: 'Ed25519 signature verification failed', category: 'Transaction', hint: 'Ensure you are signing with the correct key for this account.' },
  { code: 3001, name: 'ERR_NONCE_MISMATCH', message: 'Transaction nonce does not match account nonce', category: 'Transaction', hint: 'Query account nonce and use the next sequential value.' },
  { code: 3002, name: 'ERR_INSUFFICIENT_FEE', message: 'Transaction fee is below minimum', category: 'Transaction', hint: 'Use the fee estimation endpoint or increase the fee.' },
  { code: 3003, name: 'ERR_TX_TOO_LARGE', message: 'Transaction exceeds maximum size (64 KB)', category: 'Transaction', hint: 'Reduce claim content size or split into multiple transactions.' },

  // Knowledge
  { code: 4000, name: 'ERR_CLAIM_TOO_LARGE', message: 'Claim content exceeds 4096 bytes', category: 'Knowledge', hint: 'Shorten claim content or reference external evidence.' },
  { code: 4001, name: 'ERR_INVALID_DOMAIN', message: 'Knowledge domain is not recognized', category: 'Knowledge', hint: 'Use a registered domain or submit a domain registration first.' },
  { code: 4002, name: 'ERR_INSUFFICIENT_STAKE', message: 'Claim stake is below minimum for this domain', category: 'Knowledge', hint: 'Increase stake amount. Minimum varies by domain.' },
  { code: 4003, name: 'ERR_FACT_NOT_FOUND', message: 'No verified fact exists with this ID', category: 'Knowledge', hint: 'The claim may still be pending verification or was rejected.' },
  { code: 4004, name: 'ERR_ROUND_NOT_FOUND', message: 'Verification round not found', category: 'Knowledge', hint: 'The round may have completed and been pruned.' },
  { code: 4005, name: 'ERR_CLAIM_REJECTED', message: 'Claim failed verification — confidence below threshold', category: 'Knowledge', hint: 'Review the rejection reason and consider resubmitting with evidence.' },

  // Staking
  { code: 5000, name: 'ERR_BELOW_MIN_STAKE', message: 'Stake amount below minimum (0.111 LGM)', category: 'Staking', hint: 'Minimum validator stake is 111000000000000 base units.' },
  { code: 5001, name: 'ERR_ALREADY_UNBONDING', message: 'Validator is already in unbonding period', category: 'Staking', hint: 'Wait for current unbonding to complete (7 days).' },
  { code: 5002, name: 'ERR_VALIDATOR_NOT_FOUND', message: 'No validator registered for this DID', category: 'Staking', hint: 'Register as a validator first by staking the minimum amount.' },
  { code: 5003, name: 'ERR_SLASHED', message: 'Validator was slashed — stake reduced', category: 'Staking', hint: 'Review slashing reason. Re-stake above minimum to reactivate.' },

  // Session
  { code: 6000, name: 'ERR_SESSION_EXPIRED', message: 'Session key has expired', category: 'Session', hint: 'Create a new session key with MsgCreateSession.' },
  { code: 6001, name: 'ERR_SESSION_NOT_FOUND', message: 'No active session for this key hash', category: 'Session', hint: 'The session may have been revoked or expired.' },
  { code: 6002, name: 'ERR_CAPABILITY_DENIED', message: 'Session key lacks permission for this operation', category: 'Session', hint: 'Create a new session with the required capabilities.' },
  { code: 6003, name: 'ERR_MAX_SESSION_KEYS', message: 'Maximum concurrent sessions reached', category: 'Session', hint: 'Revoke unused sessions before creating new ones.' },
  { code: 6004, name: 'ERR_AMOUNT_EXCEEDED', message: 'Transaction exceeds session key spending limit', category: 'Session', hint: 'Reduce amount or use the operational key for larger transactions.' },
  { code: 6005, name: 'ERR_SESSION_DURATION_EXCEEDED', message: 'Requested session duration exceeds maximum', category: 'Session', hint: 'Use a shorter duration or check MaxSessionDuration param.' },

  // Recovery
  { code: 7000, name: 'ERR_RECOVERY_IN_PROGRESS', message: 'A recovery request is already active', category: 'Recovery', hint: 'Challenge or wait for the existing recovery to complete.' },
  { code: 7001, name: 'ERR_NOT_SHARD_HOLDER', message: 'Sender is not an authorized shard holder', category: 'Recovery', hint: 'Only registered shard holders can participate in recovery.' },
  { code: 7002, name: 'ERR_KEY_ROTATION_COOLDOWN', message: 'Key rotation cooldown period has not elapsed', category: 'Recovery', hint: 'Wait for the cooldown period before rotating again.' },
  { code: 7003, name: 'ERR_RECOVERY_CHALLENGED', message: 'Recovery was challenged and cancelled', category: 'Recovery', hint: 'The account owner or authority cancelled this recovery.' },

  // Network
  { code: 8000, name: 'ERR_NODE_SYNCING', message: 'Node is still syncing — data may be stale', category: 'Network', hint: 'Wait for sync to complete or use a different RPC endpoint.' },
  { code: 8001, name: 'ERR_PEER_REJECTED', message: 'Connection rejected by peer', category: 'Network', hint: 'Check network configuration and peer allowlists.' },
]
