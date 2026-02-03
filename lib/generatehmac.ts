// lib/generateHmac.ts
export async function generateHmac(
  customerId: number,
  timestamp: number,
  secret: string
): Promise<string> {
  const data = `${customerId}|${timestamp}`
  const encoder = new TextEncoder()

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(data)
  )

  // Convertir le buffer en hex
  const bytes = new Uint8Array(signature)
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}


export function buildAuthParams(id_customer: number) {
  const ts = Math.floor(Date.now() / 1000);
  const sig = generateHmac(id_customer, ts, process.env.NEXT_PUBLIC_CSC_HMAC_SECRET!);
  return { ts, sig };
}