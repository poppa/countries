export interface Country {
  currencies: Currency[]
  languages: Language[]
  flag: string
  name: string
  topLevelDomain: string[]
  capital: string
  region: string
  subregion: string
  population: number
  borders: string[]
  nativeName: string
  alpha2Code: string
}

interface Language {
  iso639_1: string
  iso639_2: string
  name: string
  nativeName: string
}

interface Currency {
  code: string
  name: string
  symbol: string
}
