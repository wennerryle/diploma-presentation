<script lang="ts">
	import { Action, Notes, Slide, Transition } from '@animotion/core'
	import EvVehiclesChart from '$lib/business-components/evVehiclesChart.svelte'
	import type { ComponentProps, SvelteComponent } from 'svelte'
	import EvVehiclesRussia from '$lib/business-components/evVehiclesRussia.svelte'
	import { tween } from '@animotion/motion'

	let chartglobal: ComponentProps<EvVehiclesChart> | undefined = $state()
	let chartru: ComponentProps<EvVehiclesChart> | undefined = $state()

	const from = 4447
	const to = 7410

	const percent = to / 100
	const initial = from / percent
	const radialD = 2

	const original = {
		x: 0,
		y: 100,
		r: initial * radialD,
		fst: '#cb839a',
		snd: '#ffb3cb',
		amount: from,
		bx: 190,
		by: 225,
		bwidth: 160,
		bheight: 60
	}

	const circle = tween(original, { duration: 1500 })

	let year = tween(2023)

	function showEvStationsDifference() {
		return circle.to(
			{
				x: 600,
				fst: '#7accc8',
				snd: '#b3fffc',
				r: 100 * radialD,
				amount: to,
				bx: 725,
				by: 205,
				bwidth: 280,
				bheight: 100
			},
			{ duration: 1000 }
		)
	}

	function unshowEvStationDifference() {
		return circle.to(original, { duration: 1000 })
	}
</script>

<Slide transition="fade" class="h-full p-10" in={() => chartglobal?.animate?.()}>
	<div class="flex h-full flex-col justify-between">
		<p>Актуальность: Электротранспорт и инфраструктура</p>

		<EvVehiclesChart bind:this={chartglobal} />
		<p class="text-xl">
			Глобальная продажа электротранспорта по региону и типу<br />
			Каждый подграф: Китай, Европа, США, Остальной мир <br />
			Источник: https://www.iea.org/energy-system/transport/electric-vehicles
		</p>
	</div>
	<Notes>
		"Начнём с глобального контекста. Электрификация транспорта – это не просто тренд, это ключевое
		направление энергетического перехода. Как вы видите на графике, мировые продажи электромобилей
		показывают экспоненциальный рост, особенно за счет таких регионов, как Китай."
		<br />
		"Это формирует огромный спрос на зарядную инфраструктуру."
	</Notes>
</Slide>

<Slide class="h-full p-10" in={() => chartru?.animate?.()}>
	<div class="flex h-full flex-col justify-between">
		<p>Актуальность: Электротранспорт и инфраструктура</p>

		<EvVehiclesRussia bind:this={chartru} />
		<p class="text-xl">
			Продажа электротранспорта в России<br />
			Источник: https://www.iea.org/data-and-statistics/data-tools/global-ev-data-explorer
		</p>
	</div>
	<Notes>
		"В России мы также наблюдаем значительный рост рынка электромобилей, хотя и с определённой
		спецификой, где гибриды занимают существенную долю." "Однако, несмотря на рост, существует
		серьезный барьер – так называемый 'страх запаса хода' (range anxiety). Количество общественных
		зарядных станций значительно отстаёт от потребностей. Это делает портативные зарядные станции
		особенно актуальными, как 'умную канистру' для электромобиля." "Но управление такими
		устройствами – это не всегда просто, и именно здесь моя работа находит своё значение."
	</Notes>
</Slide>

<Slide class="h-full p-10" in={() => chartru?.animate?.()}>
	<div class="flex h-full flex-col justify-between">
		<p>Актуальность: Электротранспорт и инфраструктура</p>

		<div class="relative h-[650px]">
			<svg
				class="absolute top-0 left-0 h-[650px] w-full"
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 1200 650"
			>
				<defs>
					<radialGradient id="cccircular-grad-2" r="50%" cx="50%" cy="50%">
						<stop offset="15%" stop-color="#cb839a" stop-opacity="0.5"></stop>
						<stop offset="75%" stop-color="#ffb3cb" stop-opacity="1"></stop>
						<stop offset="100%" stop-color="#ffffff" stop-opacity="1"></stop>
					</radialGradient>
				</defs>
				<filter id="blur" width="160" height="160" x="-30%" y="-30%">
					<feFlood flood-color="oklch(98% 0.02 272)" result="neutral" />
					<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blurred" />
					<feMerge>
						<feMergeNode in="neutral" />
						<feMergeNode in="blurred" />
					</feMerge>
				</filter>
				<filter
					id="outer_blur-2"
					x={original.bx}
					y={original.by}
					width={original.bwidth}
					height={original.bheight}
				>
					<feGaussianBlur in="SourceGraphic" stdDeviation="10, 0" />
				</filter>
				<clipPath id="clip-2">
					<rect
						id="rect"
						x={original.bx}
						y={original.by}
						width={original.bwidth}
						height={original.bheight}
					/>
				</clipPath>
				<g fill="url(#cccircular-grad-2)" id="blursed">
					{#each { length: 11 } as _, i}
						<circle r={Math.max(original.r - i * 30, 0)} cx={original.x + 270} cy="250"></circle>
					{/each}
				</g>
				<g style="clip-path: url(#clip-2)">
					<use xlink:href="#blursed" style="filter: url(#blur) url(#outer_blur-2)" />
				</g>
				<use xlink:href="#rect" style="fill:none;" />
				<text
					x={original.x + 270}
					y={260}
					font-size={original.r * 0.3}
					text-anchor="middle"
					dominant-baseline="middle"
				>
					{original.amount.toFixed() + ' шт.'}
				</text>
				<text
					x={270}
					y={550}
					font-size={original.r * 0.4}
					text-anchor="middle"
					dominant-baseline="middle"
				>
					2023 год
				</text>
				<text
					x={860}
					y={550}
					font-size={original.r * 0.4}
					text-anchor="middle"
					dominant-baseline="middle"
				>
					2024 год
				</text>
			</svg>
			<svg
				class="absolute top-0 left-0 h-[650px] w-full"
				xmlns="http://www.w3.org/2000/svg"
				version="1.1"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 1200 650"
			>
				<defs>
					<radialGradient id="cccircular-grad" r="50%" cx="50%" cy="50%">
						<stop offset="15%" stop-color={circle.fst} stop-opacity="0.5"></stop>
						<stop offset="75%" stop-color={circle.snd} stop-opacity="1"></stop>
						<stop offset="100%" stop-color="#ffffff" stop-opacity="1"></stop>
					</radialGradient>
				</defs>
				<clipPath id="clip-1">
					<rect
						id="rect"
						x={circle.bx}
						y={circle.by}
						width={circle.bwidth}
						height={circle.bheight}
					/>
				</clipPath>
				<g fill="url(#cccircular-grad)" id="blursed-2">
					{#each { length: 11 } as _, i}
						<circle r={Math.max(circle.r - i * 30, 0)} cx={circle.x + 270} cy="250"></circle>
					{/each}
				</g>
				<g style="clip-path: url(#clip-1)">
					<use xlink:href="#blursed-2" style="filter: url(#blur)" />
				</g>
				<use xlink:href="#rect" style="fill:none;" />
				<text
					x={circle.x + 270}
					y={260}
					font-size={circle.r * 0.3}
					text-anchor="middle"
					dominant-baseline="middle"
				>
					{circle.amount.toFixed() + ' шт.'}
				</text>
			</svg>
		</div>

		<p class="text-xl">
			Количество ЭЗС в России<br />
			Источник: https://www.autostat.ru/news/58650/
		</p>
	</div>
	<Action do={showEvStationsDifference} undo={unshowEvStationDifference} />
	<Notes>
		Также на этом графике видно, что рынок ЭЗС растёт, но этого всё равно не покрывает проблему
		страха запаса хода. Управление такими устройствами – это не всегда просто, и именно здесь моя
		работа находит своё значение: я разработал пользовательский интерфейс, который будет
		одновременно простым для обычных пользователей и функциональным для инженеров и тестировщиков
	</Notes>
</Slide>
