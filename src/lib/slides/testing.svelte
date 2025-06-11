<script lang="ts">
	import { Notes, Slide, Transition } from '@animotion/core'
	import NetworkScreenshot from './NetworkScreenshot.png'
	import type { Component } from 'svelte'
	import {
		ArrowUpNarrowWide,
		Atom,
		BugPlay,
		Factory,
		FolderSync,
		Hash,
		Component as IconComponent,
		Worm
	} from 'svelte-lucide'

	const testing: [string, Component][] = [
		['Ручное интеграционное тестирование с тестовым сервером на Python', Worm],
		['Ручное тестирование на производстве', Factory],
		['Средства отладки', BugPlay]
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
		<img class="h-[70vh] object-contain" {src} alt={description} />
		<p>{description}</p>
	</div>
{/snippet}

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col">
		<p class="pb-10">Тестирование и отладка системы</p>

		<ul
			class={[
				'flex w-full flex-col gap-y-4 overflow-auto',
				'max-h-[70vh] p-10 text-justify text-3xl'
			]}
		>
			{#each testing as [text, icon]}
				{@render liTransition(text, icon)}
			{/each}
		</ul>
	</div>
	<Notes>
		Компонентная иерархия: App.svelte -> pages -> business-components -> UI-components. "Высокая
		переиспользуемость, простота тестирования." Слоистая архитектура: UI, бизнес-логика, протокол,
		провайдеры, утилиты. "Четкое разделение обязанностей, чистота кода." Управление состоянием:
		Svelte stores (writable, derived). "Централизованное, реактивное обновление данных."
		Хеш-роутинг: "Быстрые переходы между страницами без перезагрузки" (Приложение Д). Синхронизация
		данных: WebSocket-соединение, messageParser, sendCommand, реактивные Svelte-сторы. "Актуальность
		информации в реальном времени." (Приложение Г).
	</Notes>
</Slide>
