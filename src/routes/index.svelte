<script context="module" lang="ts">
	// SSR preload
	export const load: Load = async ({ fetch, }) => {
		const url = `./index.json`;
		const res = await fetch(url);

		try {
			if (res.ok) {
				return {
					props: {
						countries: await res.json()
					}
				}
			} else {
				throw new Error(`Bad Resquest/response ${res.status}`)
			}
		} catch (err: unknown) {
			return {
				status: res.status,
				error: (err as Error)
			}
		}
	}
</script>

<script lang="ts">
	import type { Load } from "@sveltejs/kit"

	import type { Country } from "../lib"
	export let countries: Country[]
</script>


<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
<!-- <pre>{JSON.stringify(countries, null, 2)}</pre> -->
