<script module lang="ts">
	let currentPic = 0

	function getId() {
		return ++currentPic
	}
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements'
	import { Earth } from 'svelte-lucide'

	interface Props extends HTMLAttributes<any> {
		source: string
		src: string
		description: string
		siteurl: string
	}

	const { source, src, description, ...rest }: Props = $props()
</script>

<div {...rest} class={[rest.class, '']}>
	<div class="h-max w-max rounded-2xl">
		<img {src} alt={description} />
		<div class="bg-gray-900">
			<Earth class="mr-3" />
			<p class="text-white">{source}</p>
		</div>
	</div>
	Рисунок {getId()} – {description}
</div>
