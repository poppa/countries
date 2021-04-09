import fetch from 'node-fetch'
import { Country, getRestApiUrl, Maybe } from '..'

let cache: Maybe<Country[]>

export async function getCountries(): Promise<Country[]> {
  if (!cache) {
    const data = await fetch(getRestApiUrl())
    cache = await data.json()
  } else {
    console.log(`Got cached countries`)
  }

  return cache
}

export async function getCountry(code: string): Promise<Maybe<Country>> {
  const c = await getCountries()
  return c.find((c) => c.alpha2Code.toLowerCase() === code.toLowerCase())
}
