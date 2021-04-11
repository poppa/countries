import { writable } from 'svelte/store'
import type { Maybe } from './interfaces/types'

export const selectedRegion = writable<Maybe<string>>(undefined)
export const searchTerm = writable<Maybe<string>>(undefined)
