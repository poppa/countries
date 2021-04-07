<script>
	import Header from '../components/Header.svelte';
	import '../app.scss';
</script>

<Header />

<main>
	<div class="container">
		<slot />
	</div>
</main>

<style>
	main {
		padding-top: var(--padding);
		padding-bottom: var(--padding);
	}
</style>
