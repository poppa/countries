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
  'alpha2Code'
]

export function getRestApiUrl(): string {
  return `${baseUrl}?fields=${fields.join(';')}`
}
