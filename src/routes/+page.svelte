<script lang="ts">
	import { getPresentation, Presentation } from '@animotion/core'

	import Intro from '$lib/slides/intro.svelte'
	import Thankyou from '$lib/slides/thankyou.svelte'
	import Goals from '$lib/slides/goals.svelte'
	import Actuality from '$lib/slides/actuality.svelte'
	import Juicebootanalyze from '$lib/slides/juicebootanalyze.svelte'
	import Uirequirements from '$lib/slides/uirequirements.svelte'
	import Metodology from '$lib/slides/metodology.svelte'
	import Paradigma from '$lib/slides/paradigma.svelte'
	import Technologies from '$lib/slides/technologies.svelte'
	import Architecture from '$lib/slides/architecture.svelte'
	import Testing from '$lib/slides/testing.svelte'
	import Ui from '$lib/slides/ui.svelte'
	import Conclusion from '$lib/slides/conclusion.svelte'
	import type { KeyboardEventHandler } from 'svelte/elements'
	import { runScreener } from '$lib/screener'

	// @ts-ignore
	window.reveal = getPresentation()

	const onkeydown: KeyboardEventHandler<Window> = (event) => {
		if (!event.ctrlKey || !event.altKey || event.key.toLowerCase() !== 'd') return
		runScreener()
	}
</script>

<svelte:window {onkeydown} />

<Presentation
	options={{
		transition: 'fade',
		controls: false,
		progress: false,
		history: true
	}}
>
	<Intro />
	<Actuality />
	<Goals />
	<Juicebootanalyze />
	<Uirequirements />
	<Metodology />
	<Paradigma />
	<Technologies />
	<Architecture />
	<Testing />
	<Ui />
	<Conclusion />
	<Thankyou />
</Presentation>
