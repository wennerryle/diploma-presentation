<script lang="ts">
	import { Notes, Slide, Transition } from '@animotion/core'
	import {
		Images,
		Navigation,
		Blocks,
		ArrowLeftRight,
		Asterisk,
		FlaskConical,
		BetweenHorizontalStart,
		Bug
	} from 'svelte-lucide'

	import edisonstation from './edison_station.webp'
	import { tick, type Component } from 'svelte'

	let ulList: HTMLUListElement

	const goals: [string, Component][] = [
		['Анализ существующих решений и требований к UI зарядных станций.', Images],
		[
			`Проектирование структуры и навигации UI с учётом разных режимов работы и категорий пользователей.`,
			Navigation
		],
		['Реализация фронтенд-части UI на современном стеке технологий', Blocks],
		[
			`Интеграция собственного бинарного протокола взаимодействия через WebSockets для обмена данными с аппаратной частью станции.`,
			ArrowLeftRight
		]
	]

	const goals2: [string, Component][] = [
		[
			'Разработка специализированных страниц для настройки станции и проведения тестирования на производстве.',
			FlaskConical
		],
		[
			`Описание архитектуры UI, принципов синхронизации данных и взаимодействия системных
				компонентов.`,
			BetweenHorizontalStart
		],
		[`Тестирование и отладка системы для подтверждения функциональности.`, Bug],
		[
			`Обеспечение высоких нефункциональных требований: мгновенная загрузка, PWA-совместимость,
			кроссбраузерность.`,
			Asterisk
		]
	]
</script>

{#snippet li(text: string, icon: Component)}
	<div class="flex items-center gap-x-10">
		<svelte:component this={icon} class="min-h-max min-w-max" />
		{text.trim()}
	</div>
{/snippet}

{#snippet liTransition(text: string, icon: Component)}
	<Transition
		do={async () => {
			if (ulList) {
				await tick()
				ulList.scrollTop = ulList.scrollHeight
			}
		}}
	>
		{@render li(text, icon)}
	</Transition>
{/snippet}

<Slide class="h-full p-10">
	<div class="mb-10 flex h-full flex-col justify-between">
		<p>Цель</p>
	</div>
	<p class="text-justify text-3xl">
		Разработка современного, интуитивно понятного и многофункционального UI для управления
		портативной зарядной станцией электромобилей, предназначенной для домашнего, офисного, дорожного
		использования, а также для целей тестирования на производстве
	</p>
	<img class="mx-auto w-3/5 object-fill" src={edisonstation} alt="станция" />
</Slide>

<Slide class="h-full p-10">
	<Transition visible>
		<div class="bg-bg z-20 flex h-full flex-col pb-10">
			<p>Задачи</p>
		</div>
	</Transition>
	<ul
		bind:this={ulList}
		class={['flex flex-col gap-y-4 overflow-auto', 'p-10 text-justify text-3xl']}
	>
		{#each goals as [text, icon]}
			{@render liTransition(text, icon)}
		{/each}
	</ul>
	<Notes>
		{#each goals as [text]}
			{text} <br />
		{/each}
	</Notes>
</Slide>

<Slide class="h-full p-10">
	<Transition visible>
		<div class="bg-bg z-20 flex h-full flex-col pb-10">
			<p>Задачи</p>
		</div>
	</Transition>
	<ul
		bind:this={ulList}
		class={['flex w-full flex-col gap-y-4 overflow-auto', 'p-10 text-justify text-3xl']}
	>
		<Transition visible>
			{@render li(goals2[0][0], goals2[0][1])}
		</Transition>
		{#each goals2.splice(1) as [text, icon]}
			{@render liTransition(text, icon)}
		{/each}
	</ul>
	<Notes>
		{#each goals2 as [text]}
			{text} <br />
		{/each}
	</Notes>
</Slide>
