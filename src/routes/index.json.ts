import { getCountries } from '../lib/server'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async () => {
  try {
    return { body: await getCountries() }
  } catch (err: unknown) {
    console.error('Backend fetch error:', err)
    return {
      status: 500,
      body: { error: (err as Error).message }
    }
  }
}
