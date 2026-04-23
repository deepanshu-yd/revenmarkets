import { ClobClient, OrderType, Side } from '@polymarket/clob-client'
import {
  encodeFunctionData,
  erc20Abi,
  maxUint256,
  type Address,
  type Hex,
  type WalletClient,
} from 'viem'
import { polygon } from 'viem/chains'
import {
  CTF_ADDRESS,
  CTF_EXCHANGE,
  NEG_RISK_ADAPTER,
  NEG_RISK_CTF_EXCHANGE,
  SIGNATURE_TYPE_EOA,
  SIGNATURE_TYPE_SAFE,
  USDC_ADDRESS,
} from './constants'
import {
  getPublicClient,
  getWalletClient,
  wallet,
} from './wallet'

const CLOB_HOST = 'https://clob.polymarket.com'

const LS_CREDS_PREFIX = 'humanplane:polymarket:creds:v1:'

type Creds = { key: string; secret: string; passphrase: string }

/** ---- Credential persistence ----------------------------------------- */

function credsKey(
  eoa: string,
  funder: string,
  sigType: number
): string {
  return `${LS_CREDS_PREFIX}${eoa.toLowerCase()}:${funder.toLowerCase()}:${sigType}`
}

function loadCreds(
  eoa: string,
  funder: string,
  sigType: number
): Creds | null {
  try {
    const raw = localStorage.getItem(credsKey(eoa, funder, sigType))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.key && parsed?.secret && parsed?.passphrase) return parsed
    return null
  } catch {
    return null
  }
}

function saveCreds(
  eoa: string,
  funder: string,
  sigType: number,
  creds: Creds
) {
  try {
    localStorage.setItem(
      credsKey(eoa, funder, sigType),
      JSON.stringify(creds)
    )
  } catch {
    /* quota */
  }
}

export function clearCredsForEoa(eoa: string) {
  try {
    const prefix = `${LS_CREDS_PREFIX}${eoa.toLowerCase()}:`
    const toRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(prefix)) toRemove.push(k)
    }
    for (const k of toRemove) localStorage.removeItem(k)
  } catch {
    /* noop */
  }
}

export const clearCreds = clearCredsForEoa

export function hasCachedCreds(): boolean {
  const eoa = wallet.eoa()
  const funder = wallet.funder()
  if (!eoa || !funder) return false
  const sigType = wallet.mode() === 'eoa' ? SIGNATURE_TYPE_EOA : SIGNATURE_TYPE_SAFE
  return loadCreds(eoa, funder, sigType) != null
}

/** ---- Ethers-compatible signer shim around viem ---------------------- */
function makeEthersSigner(
  walletClient: WalletClient,
  eoa: Address,
  reportedAddress?: Address
) {
  return {
    getAddress: async () => reportedAddress ?? eoa,
    signMessage: async (message: string | Uint8Array) => {
      const msg =
        typeof message === 'string'
          ? message
          : new TextDecoder().decode(message)
      return walletClient.signMessage({ account: eoa, message: msg })
    },
    _signTypedData: async (domain: any, types: any, value: any) => {
      const primaryType =
        (Object.keys(types).find((k) => k !== 'EIP712Domain') ??
          'Order') as string
      return walletClient.signTypedData({
        account: eoa,
        domain: {
          ...domain,
          chainId:
            domain?.chainId != null ? Number(domain.chainId) : undefined,
        },
        types,
        primaryType,
        message: value,
      })
    },
    provider: {
      getNetwork: async () => ({ chainId: 137 }),
    },
  }
}

/** ---- ClobClient factory --------------------------------------------- */

const _clientCache = new Map<string, ClobClient>()
const _derivingCreds = new Map<string, Promise<Creds>>()

export function invalidateClobClient() {
  _clientCache.clear()
}

export async function getClobClient(): Promise<ClobClient | null> {
  const eoa = wallet.eoa()
  const funder = wallet.funder()
  if (!eoa || !funder) return null
  const wc = getWalletClient()
  if (!wc) return null

  const mode = wallet.mode()
  const sigType = mode === 'eoa' ? SIGNATURE_TYPE_EOA : SIGNATURE_TYPE_SAFE

  let creds = loadCreds(eoa, funder, sigType)

  const signer = makeEthersSigner(wc, eoa, eoa) as any

  if (!creds) {
    const slotKey = `${eoa.toLowerCase()}:${funder.toLowerCase()}:${sigType}`
    if (!_derivingCreds.has(slotKey)) {
      const refreshed = loadCreds(eoa, funder, sigType)
      if (refreshed) {
        creds = refreshed
      } else {
        const bootstrap = new ClobClient(
          CLOB_HOST,
          137,
          signer,
          undefined,
          sigType,
          funder,
          undefined,
          true
        )
        const p = bootstrap
          .createOrDeriveApiKey(0)
          .then((fresh) => {
            if (!fresh?.key) {
              throw new Error(
                'Polymarket returned empty credentials — check your wallet and try again'
              )
            }
            const c: Creds = {
              key: fresh.key,
              secret: fresh.secret,
              passphrase: fresh.passphrase,
            }
            saveCreds(eoa, funder, sigType, c)
            return c
          })
          .finally(() => {
            _derivingCreds.delete(slotKey)
          })
        _derivingCreds.set(slotKey, p)
        creds = await p
      }
    } else {
      creds = await _derivingCreds.get(slotKey)!
    }
  }

  const cacheKey = `${mode}:${funder.toLowerCase()}:${creds.key}`
  const cached = _clientCache.get(cacheKey)
  if (cached) return cached

  const client = new ClobClient(
    CLOB_HOST,
    137,
    signer,
    creds,
    sigType,
    funder,
    undefined,
    true
  )
  _clientCache.set(cacheKey, client)
  return client
}

/** ---- USDC balance + allowance --------------------------------------- */

export type AllowanceStatus = {
  balance: bigint
  ctfExchange: bigint
  negRiskExchange: bigint
  negRiskAdapter: bigint
}

export async function fetchUsdcStatus(holder: Address): Promise<AllowanceStatus> {
  const pc = getPublicClient()
  const [balance, a1, a2, a3] = await Promise.all([
    pc.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [holder],
    }) as Promise<bigint>,
    pc.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [holder, CTF_EXCHANGE],
    }) as Promise<bigint>,
    pc.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [holder, NEG_RISK_CTF_EXCHANGE],
    }) as Promise<bigint>,
    pc.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: 'allowance',
      args: [holder, NEG_RISK_ADAPTER],
    }) as Promise<bigint>,
  ])
  return {
    balance,
    ctfExchange: a1,
    negRiskExchange: a2,
    negRiskAdapter: a3,
  }
}

export async function placeOrder(args: {
  tokenId: string
  side: 'BUY' | 'SELL'
  price: number
  size: number
  tickSize?: number
  negRisk?: boolean
}) {
  const client = await getClobClient()
  if (!client) throw new Error('wallet not connected')

  const side = args.side === 'BUY' ? Side.BUY : Side.SELL
  
  const userOrder = {
    tokenID: args.tokenId,
    price: args.price,
    size: args.size,
    side,
  }
  
  const response = await client.createAndPostOrder(
    userOrder,
    { tickSize: String(args.tickSize ?? 0.01) as any, negRisk: args.negRisk ?? false },
    OrderType.GTC,
    false,
    false
  )

  if (response.error || response.errorMsg || response.success === false) {
    throw new Error(response.error || response.errorMsg || 'Order failed')
  }
  
  return response
}
