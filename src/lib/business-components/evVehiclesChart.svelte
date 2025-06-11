<script lang="ts">
	import { Chart } from 'chart.js/auto'
	import evSales from './global-electric-car-sales-2014-2024.csv?raw'
	import Papa from 'papaparse'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement
	let chart: Chart

	const init = () => {
		const result = Papa.parse<['', number, number, number, number]>(evSales, {
			dynamicTyping: true,
			header: true
		})

		console.log(result)

		// 1. Подготовка данных
		// @ts-ignore
		const years = result.data.map((item) => item[''])

		// Группируем данные по регионам
		const regions = {
			Китай: ['China BEV', 'China PHEV'],
			Европа: ['Europe BEV', 'Europe PHEV'],
			США: ['United States BEV', 'United States PHEV'],
			'Остальной мир': ['Rest of World BEV', 'Rest of World PHEV']
		}

		// 2. Создаем datasets для каждого типа (BEV/PHEV)
		const datasets: {
			label: string
			data: any
			backgroundColor: string
			borderColor: string
			borderWidth: number
			// Группировка по региону
			stack: string
		}[] = []

		// Цвета для BEV и PHEV
		const typeColors = {
			BEV: { background: 'rgba(54, 162, 235, 0.7)', border: 'rgba(54, 162, 235, 1)' },
			PHEV: { background: 'rgba(255, 99, 132, 0.7)', border: 'rgba(255, 99, 132, 1)' }
		}

		// Для каждого региона создаем два dataset (BEV и PHEV)
		Object.entries(regions).forEach(([region, keys]) => {
			keys.forEach((key) => {
				const type = key.includes('BEV') ? 'BEV' : 'PHEV'
				datasets.push({
					label: `${region} ${type}`,
					data: result.data.map((item: { [x: string]: any }) => item[key]),
					backgroundColor: typeColors[type].background,
					borderColor: typeColors[type].border,
					borderWidth: 1,
					// Группировка по региону
					stack: region
				})
			})
		})

		// 3. Создаем график с группировкой
		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: years,
				datasets: datasets
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						stacked: true
					},
					y: {
						stacked: true,
						beginAtZero: true,
						title: {
							display: true,
							text: 'Продажи (в миллионах)'
						}
					}
				},
				plugins: {
					title: {
						display: true,
						text: 'Глобальная продажа электротранспорта по региону и типу'
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								return `${context.dataset.label}: ${context.raw}M`
							}
						}
					},
					legend: {
						position: 'bottom',
						labels: {
							boxWidth: 12,
							padding: 20,
							generateLabels: (chart) => {
								// Создаем кастомные метки для легенды
								const uniqueTypes = [
									{
										type: 'BEV (Полностью электрический автомобиль)',
										color: typeColors.BEV.background
									},
									{ type: 'PHEV (Гибридный электромобиль)', color: typeColors.PHEV.background }
								]

								return uniqueTypes.map((item) => ({
									text: item.type,
									fillStyle: item.color,
									strokeStyle: item.color,
									hidden: false,
									lineWidth: 1,
									index: item.type === 'BEV' ? 0 : 1
								}))
							}
						}
					}
				}
			}
		})

		return () => {
			chart?.destroy()
		}
	}

	onMount(init)

	export function animate() {
		// Принудительная перерисовка/переинициализация графика
		if (chart) {
			chart.destroy() // Уничтожаем старый график
		}
		init() // Создаем новый график
	}
</script>

<div class="h-full py-10">
	<canvas bind:this={canvas}></canvas>
</div>
