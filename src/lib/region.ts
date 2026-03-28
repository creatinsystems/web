import { headers } from 'next/headers'

export type Region = 'global' | 'id'

export async function getRegion(): Promise<Region> {
  const headerStore = await headers()
  const region = headerStore.get('x-creatin-region')
  return region === 'id' ? 'id' : 'global'
}
