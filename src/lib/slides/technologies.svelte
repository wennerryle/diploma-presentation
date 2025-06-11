<script lang="ts">
	import { Notes, Slide, Transition } from '@animotion/core'
	import type { Component } from 'svelte'
	import { Webhook } from 'svelte-lucide'
	import Svelte from '$lib/icons/svelte.svelte'
	import Tailwind from '$lib/icons/tailwind.svelte'
	import Vite from '$lib/icons/vite.svelte'
	import Typescript from '$lib/icons/typescript.svelte'

	const technologies: [string, Component][] = [
		['Svelte 5', Svelte],
		['TypeScript', Typescript],
		['Vite', Vite],
		['Tailwind CSS', Tailwind],
		['Websockets', Webhook]
	]
</script>

{#snippet li(text: string, icon: Component)}
	<div class="flex items-center gap-x-10">
		<svelte:component this={icon} class="min-h-max min-w-max" />
		{text.trim()}
	</div>
{/snippet}

{#snippet liTransition(text: string, icon: Component)}
	<Transition>
		{@render li(text, icon)}
	</Transition>
{/snippet}

{#snippet illustration(src: string, description: string)}
	<div class="flex flex-col gap-y-2 text-2xl">
		<img class="w-full" {src} alt={description} />
		<p>{description}</p>
	</div>
{/snippet}

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col">
		<p class="pb-10">Использованные технологии</p>

		<ul
			class={[
				'flex max-h-full w-full flex-col gap-y-4 overflow-auto',
				'p-10 text-justify text-3xl'
			]}
		>
			{#each technologies as [text, icon]}
				{@render liTransition(text, icon)}
			{/each}
		</ul>
	</div>
	<Notes>
		Интерфейс Juice Booster 2 ориентирован на упрощенное взаимодействие и не предоставляет
		углубленных возможностей для детальной конфигурации, проведения специфических диагностических
		тестов или отладки, которые необходимы для производственных целей или для расширенного
		администрирования. Именно эти расширенные функции реализуются в моём проекте
	</Notes>
</Slide>
