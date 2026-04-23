import { getAddress, type Address } from 'viem';

export const SAFE_FACTORY: Address = getAddress('0xaacFeEa03eb1561C4e67d661e40682Bd20E3541b');
export const SAFE_INIT_CODE_HASH = '0x2bce2127ff07fb632d16c8347c4ebf501f4841168bed00d9e6ef715ddb6fcecf' as `0x${string}`;

export const USDC_ADDRESS: Address = getAddress('0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174');
export const CTF_ADDRESS: Address = getAddress('0x4D97DCd97eC945f40cf65F87097ACE5EA0476045');
export const CTF_EXCHANGE: Address = getAddress('0x4bFb41d5B3570DeFd03C39a9A4D8dE6Bd8B8982E');
export const NEG_RISK_CTF_EXCHANGE: Address = getAddress('0xC5d563A36AE78145C45a50134d48A1215220f80a');
export const NEG_RISK_ADAPTER: Address = getAddress('0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296');

export const MULTI_SEND_CALL_ONLY: Address = getAddress('0x40A2aCCbd92BCA938b02010E17A5b8929b49130D');

export const SIGNATURE_TYPE_EOA = 0 as const;
export const SIGNATURE_TYPE_SAFE = 2 as const;
