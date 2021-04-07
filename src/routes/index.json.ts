import type { RequestHandler } from '@sveltejs/kit'
import type { Country } from '../lib'
import type { Maybe } from '../lib'
import { getRestApiUrl } from '../lib'
import fetch from 'node-fetch'

let cache: Maybe<Country[]>

export const get: RequestHandler = async () => {
  try {
    if (!cache) {
      const data = await fetch(getRestApiUrl())
      cache = await data.json()
    }

    return { body: cache }
  } catch (err: unknown) {
    console.error('Backend fetch error:', err)
    return {
      status: 500,
      body: { error: (err as Error).message }
    }
  }
}
