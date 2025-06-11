<script lang="ts">
	import { Notes, Slide, Transition } from '@animotion/core'
	import { type Component } from 'svelte'
	import {
		AudioWaveform,
		Route,
		Settings2,
		FlaskConical,
		Flag,
		Coffee,
		KeySquare,
		Lock,
		Chrome
	} from 'svelte-lucide'

	const funcRequirements: [string, Component][] = [
		['Мониторинг состояния', AudioWaveform],
		['Управление режимами работы', Route],
		['Расширенные настройки', Settings2],
		['Страница тестирования для производственного персонала', FlaskConical]
	]

	const nonfuncRequirements: [string, Component][] = [
		['Производительность: мгновенная загрузка страниц', Flag],
		['Удобство использования: адаптивный, интуитивно понятный дизайн', Coffee],
		['Надёжность: устойчивость к потере соединения, целостность данных', KeySquare],
		['Безопасность: разделение режимов доступа', Lock],
		['Переносимость: кроссбраузерность', Chrome]
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

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col">
		<p class="pb-10">Функциональные требования к пользовательскому интерфейсу</p>

		<ul
			class={[
				'flex max-h-full w-full flex-col gap-y-4 overflow-auto',
				'self-center p-10 text-justify text-3xl'
			]}
		>
			{#each funcRequirements as [text, icon]}
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

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col">
		<p class="pb-10">Нефункциональные требования к пользовательскому интерфейсу</p>

		<ul
			class={[
				'flex max-h-full w-full flex-col gap-y-4 overflow-auto',
				'p-10 text-justify text-3xl'
			]}
		>
			{#each nonfuncRequirements as [text, icon]}
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
