import type { RequestHandler } from '@sveltejs/kit'
import { getCountry } from '../../lib/server'

export const get: RequestHandler = async ({ params }) => {
  try {
    return { body: await getCountry(params.country) }
  } catch (err: unknown) {
    console.error('Backend fetch error:', err)
    return {
      status: 500,
      body: { error: (err as Error).message }
    }
  }
}
