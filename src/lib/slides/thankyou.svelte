<script>
	import { Title } from '$lib/components'
	import { Slide, Transition, Action } from '@animotion/core'
	import { Confetti } from 'svelte-confetti'

	let showConfetti = $state(false)
</script>

<Slide
	class="flex h-full justify-center"
	in={() => {
		showConfetti = true
	}}
	out={() => {
		showConfetti = false
	}}
>
	<Title class="my-auto">Спасибо!</Title>

	{#if showConfetti}
		<div
			style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;"
		>
			<Confetti
				x={[-5, 5]}
				y={[0, 0.1]}
				delay={[500, 2000]}
				infinite
				duration={5000}
				amount={200}
				fallDistance="100vh"
			/>
		</div>
	{/if}
</Slide>
