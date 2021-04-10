import type { RequestHandler } from '@sveltejs/kit'
import { getCountry } from '../../lib/server'

export const get: RequestHandler = async ({ params }) => {
  try {
    const country = await getCountry(params.country)

    if (country) {
      return { body: country }
    }

    return { status: 404 }
  } catch (err: unknown) {
    console.error('Backend fetch error:', err)
    return {
      status: 500,
      body: { error: (err as Error).message }
    }
  }
}
