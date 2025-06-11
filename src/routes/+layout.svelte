<script lang="ts">
	import '../styles/app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Diploma Presentation</title>
</svelte:head>

{@render children()}
