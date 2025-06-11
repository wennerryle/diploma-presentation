<script lang="ts">
	let { children, uppercase = false, ...props } = $props()

	let ref: HTMLParagraphElement

	export function textSize(size: string) {
		ref.classList.replace('text-8xl', size)
	}
</script>

<p bind:this={ref} class={['text-4xl', { uppercase }, props.class]}>
	{@render children?.()}
</p>
