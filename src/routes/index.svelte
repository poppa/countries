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


<p>This is some plain text</p>
<pre>{JSON.stringify(countries, null, 2)}</pre>
