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
  const country = c.find(
    (c) => c.alpha3Code.toLowerCase() === code.toLowerCase()
  )

  // We need this to prevent circular references when resolving
  // bordering countries
  const countryCopy = country && { ...country }

  if (countryCopy) {
    const b = countryCopy.borders
      .map((code) => c.find((cc) => cc.alpha3Code === code))
      .filter((v) => typeof v !== 'undefined')

    countryCopy.bordersResolved = b
  }

  return countryCopy
}
