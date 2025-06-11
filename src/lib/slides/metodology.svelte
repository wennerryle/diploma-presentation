<script lang="ts">
	import { Notes, Slide, Transition } from '@animotion/core'
	import type { Component } from 'svelte'
	import { GitGraph, Kanban } from 'svelte-lucide'
	import GitGraphPic from './GitGraph.png'
	import KanbanPic from './Kanban.png'

	const goals: [string, Component][] = [
		['Kanban', Kanban],
		['Git Flow', GitGraph]
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
		<p class="pb-10">Методология разработки</p>

		<ul
			class={[
				'flex h-[168px] max-h-full w-full flex-col gap-y-4 overflow-auto',
				'p-10 text-justify text-3xl'
			]}
		>
			{#each goals as [text, icon]}
				{@render liTransition(text, icon)}
			{/each}
		</ul>
		<Transition>
			<div class="flex max-w-full justify-stretch gap-x-10">
				{@render illustration(KanbanPic, 'Элементы Kanban')}
				{@render illustration(GitGraphPic, 'Элементы Git-Flow')}
			</div>
		</Transition>
	</div>
	<Notes>
		Интерфейс Juice Booster 2 ориентирован на упрощенное взаимодействие и не предоставляет
		углубленных возможностей для детальной конфигурации, проведения специфических диагностических
		тестов или отладки, которые необходимы для производственных целей или для расширенного
		администрирования. Именно эти расширенные функции реализуются в моём проекте
	</Notes>
</Slide>
