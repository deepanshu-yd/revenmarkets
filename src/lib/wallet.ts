import {
  createPublicClient,
  createWalletClient,
  custom,
  encodeAbiParameters,
  getAddress,
  getCreate2Address,
  http,
  keccak256,
  type Address,
  type PublicClient,
  type WalletClient,
} from 'viem'
import { polygon } from 'viem/chains'
import { useState, useEffect } from 'react'
import {
  SAFE_FACTORY,
  SAFE_INIT_CODE_HASH,
} from './constants'

const LS_EOA_KEY = 'humanplane:wallet:eoa:v1'
const LS_MODE_KEY = 'humanplane:wallet:mode:v1'

export type TradingMode = 'eoa' | 'safe'

/** ----- State --------------------------------------------------------- */

type WalletState = {
  eoa: Address | null
  safe: Address | null
  chainId: number | null
  mode: TradingMode
  connecting: boolean
  error: string | null
}

let globalState: WalletState = {
  eoa: null,
  safe: null,
  chainId: null,
  mode: 'eoa',
  connecting: false,
  error: null,
}

if (typeof window !== 'undefined') {
  const m = localStorage.getItem(LS_MODE_KEY)
  globalState.mode = m === 'safe' ? 'safe' : 'eoa'
}

const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

export const wallet = {
  state: () => globalState,
  eoa: () => globalState.eoa,
  safe: () => globalState.safe,
  mode: () => globalState.mode,
  funder: (): Address | null =>
    globalState.mode === 'eoa' ? globalState.eoa : globalState.safe,
  isConnected: () => globalState.eoa != null,
  onPolygon: () => globalState.chainId === polygon.id,
  isConnecting: () => globalState.connecting,
  error: () => globalState.error,
}

export function useWallet() {
  const [state, setState] = useState(globalState)

  useEffect(() => {
    const listener = () => setState({ ...globalState })
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }, [])

  return state
}

export function setTradingMode(mode: TradingMode) {
  try {
    localStorage.setItem(LS_MODE_KEY, mode)
  } catch { /* noop */ }
  
  globalState.mode = mode
  notify()
}

/** ----- Address derivation -------------------------------------------- */

export function deriveSafeAddress(eoa: Address): Address {
  const salt = keccak256(
    encodeAbiParameters([{ name: 'owner', type: 'address' }], [eoa])
  )
  return getCreate2Address({
    from: SAFE_FACTORY,
    salt,
    bytecodeHash: SAFE_INIT_CODE_HASH,
  })
}

/** ----- Connect / disconnect ------------------------------------------ */

export async function connect(): Promise<void> {
  if (globalState.connecting) return
  globalState.connecting = true
  globalState.error = null
  notify()

  try {
    const provider = (window as any).ethereum
    if (!provider) {
      throw new Error('No Ethereum wallet detected — install MetaMask')
    }
    const accounts: string[] = await provider.request({
      method: 'eth_requestAccounts',
    })
    if (!accounts.length) throw new Error('User rejected connection')
    const eoa = getAddress(accounts[0])

    // Ensure Polygon.
    let chainIdHex: string = await provider.request({ method: 'eth_chainId' })
    let chainId = parseInt(chainIdHex, 16)
    if (chainId !== polygon.id) {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${polygon.id.toString(16)}` }],
      })
      chainIdHex = await provider.request({ method: 'eth_chainId' })
      chainId = parseInt(chainIdHex, 16)
    }

    const safe = deriveSafeAddress(eoa)
    localStorage.setItem(LS_EOA_KEY, eoa)
    
    globalState.eoa = eoa
    globalState.safe = safe
    globalState.chainId = chainId
    globalState.connecting = false
    globalState.error = null
    notify()

    provider.on?.('accountsChanged', onAccountsChanged)
    provider.on?.('chainChanged', onChainChanged)
  } catch (e) {
    globalState.connecting = false
    globalState.error = e instanceof Error ? e.message : String(e)
    notify()
  }
}

function onAccountsChanged(accounts: string[]) {
  if (!accounts.length) {
    disconnect()
    return
  }
  const eoa = getAddress(accounts[0])
  localStorage.setItem(LS_EOA_KEY, eoa)
  globalState.eoa = eoa
  globalState.safe = deriveSafeAddress(eoa)
  globalState.error = null
  notify()
}

function onChainChanged(hex: string) {
  globalState.chainId = parseInt(hex, 16)
  notify()
}

export function disconnect() {
  localStorage.removeItem(LS_EOA_KEY)
  globalState.eoa = null
  globalState.safe = null
  globalState.chainId = null
  globalState.connecting = false
  globalState.error = null
  notify()
}

export function initWalletAutoReconnect() {
  const provider = (window as any).ethereum
  if (!provider) return
  const prev = localStorage.getItem(LS_EOA_KEY)
  if (!prev) return
  
  provider.request({ method: 'eth_accounts' }).then(async (accounts: string[]) => {
    if (!accounts.length) return
    const eoa = getAddress(accounts[0])
    if (eoa.toLowerCase() !== prev.toLowerCase()) return
    const chainIdHex = await provider.request({ method: 'eth_chainId' })
    
    globalState.eoa = eoa
    globalState.safe = deriveSafeAddress(eoa)
    globalState.chainId = parseInt(chainIdHex, 16)
    globalState.connecting = false
    globalState.error = null
    notify()
    
    provider.on?.('accountsChanged', onAccountsChanged)
    provider.on?.('chainChanged', onChainChanged)
  }).catch(() => {})
}

/** ----- viem clients -------------------------------------------------- */

export function getWalletClient(): WalletClient | null {
  const eoa = globalState.eoa
  const provider = (window as any).ethereum
  if (!eoa || !provider) return null
  return createWalletClient({
    account: eoa,
    chain: polygon,
    transport: custom(provider),
  })
}

let _publicClient: PublicClient | null = null
export function getPublicClient(): PublicClient {
  if (!_publicClient) {
    const envRpc = process.env.NEXT_PUBLIC_POLYGON_RPC_URL
    _publicClient = createPublicClient({
      chain: polygon,
      transport: http(envRpc || undefined),
    })
  }
  return _publicClient
}

export function shortAddr(a?: string | null): string {
  if (!a) return ''
  return `${a.slice(0, 6)}…${a.slice(-4)}`
}
