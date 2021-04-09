export * from './interfaces/country'
export * from './interfaces/types'

export const PageTitle = 'Where in the world?'

const baseUrl = 'https://restcountries.eu/rest/v2/all'
const fields = [
  'name',
  'capital',
  'region',
  'subregion',
  'population',
  'flag',
  'topLevelDomain',
  'nativeName',
  'currencies',
  'languages',
  'borders',
  'alpha3Code'
]

export function getRestApiUrl(): string {
  return `${baseUrl}?fields=${fields.join(';')}`
}

const numberFormatter = new Intl.NumberFormat()

export function formatNumber(num: number): string {
  return numberFormatter.format(num).toString()
}

export function joinNice(arr: string[], separator = 'and'): string {
  if (arr.length > 1) {
    const copy = [...arr]
    const last = copy.pop()
    return `${copy.join(', ')} ${separator} ${last}`
  } else {
    return arr[0] || ''
  }
}
