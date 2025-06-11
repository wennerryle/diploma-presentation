<script lang="ts">
	import { Chart } from 'chart.js/auto'
	import evSalesCsv from './IEA-EV-dataEV-sales-russia.csv?raw' // Переименовал для ясности
	import Papa from 'papaparse'
	import { onMount } from 'svelte'

	let canvas: HTMLCanvasElement
	let chart: Chart | undefined

	interface RussiaEVData {
		region: string
		category: string
		parameter: string
		mode: string
		powertrain: string
		year: number
		unit: string
		value: number
	}

	const init = () => {
		const result = Papa.parse<RussiaEVData>(evSalesCsv, {
			dynamicTyping: true,
			header: true
		})

		// 0. Обработка ошибок парсинга
		if (result.errors.length > 0) {
			console.error('Ошибка при парсинге CSV:', result.errors)
			return // Прекращаем выполнение, если есть ошибки
		}
		// Проверяем, что данные существуют
		if (!result.data || result.data.length === 0) {
			console.warn('CSV файл пуст или не содержит данных.')
			return
		}

		// 1. Подготовка данных: Фильтруем и группируем
		// Нам нужны только 'EV sales' в 'Vehicles'
		const filteredSalesData = result.data.filter(
			(item) =>
				item.parameter === 'EV sales' &&
				item.unit === 'Vehicles' &&
				// Убедимся, что powertrain это 'BEV' или 'PHEV', и value является числом
				(item.powertrain === 'BEV' || item.powertrain === 'PHEV') &&
				typeof item.value === 'number' &&
				!isNaN(item.value)
		)

		// Группируем данные по году и типу силового агрегата (BEV/PHEV)
		// Map: { year: { BEV: total_sales_bev, PHEV: total_sales_phev } }
		const salesByYearAndPowertrain: { [year: number]: { BEV?: number; PHEV?: number } } = {}

		filteredSalesData.forEach((item) => {
			if (!salesByYearAndPowertrain[item.year]) {
				salesByYearAndPowertrain[item.year] = {}
			}
			// Добавляем к существующему значению или инициализируем
			salesByYearAndPowertrain[item.year][item.powertrain as 'BEV' | 'PHEV'] =
				(salesByYearAndPowertrain[item.year][item.powertrain as 'BEV' | 'PHEV'] || 0) + item.value
		})

		// Получаем отсортированные года для оси X
		const years = Object.keys(salesByYearAndPowertrain)
			.map(Number)
			.sort((a, b) => a - b)

		// 2. Создаем datasets для каждого типа (BEV/PHEV)
		const datasets: {
			label: string
			data: number[]
			backgroundColor: string
			borderColor: string
			borderWidth: number
			stack: string // Важно для стекового графика
		}[] = []

		// Цвета для BEV и PHEV (можно использовать те же, что и в оригинале)
		const typeColors = {
			BEV: { background: 'rgba(54, 162, 235, 0.7)', border: 'rgba(54, 162, 235, 1)' }, // Голубой
			PHEV: { background: 'rgba(255, 99, 132, 0.7)', border: 'rgba(255, 99, 132, 1)' } // Красный
		}

		// Типы силовых агрегатов, которые мы хотим отобразить
		const powertrains: ('BEV' | 'PHEV')[] = ['BEV', 'PHEV']

		powertrains.forEach((type) => {
			datasets.push({
				label: `${type}`, // Label теперь просто тип, так как регион один (Russia)
				data: years.map((year) => salesByYearAndPowertrain[year]?.[type] || 0), // Получаем данные для каждого года, 0 если нет данных
				backgroundColor: typeColors[type].background,
				borderColor: typeColors[type].border,
				borderWidth: 1,
				stack: 'Russia Sales' // Все датасеты для России будут в одном стеке
			})
		})

		// 3. Создаем график с группировкой
		if (chart) {
			chart.destroy() // Уничтожаем предыдущий график, если он существует
		}

		chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: years, // Года на оси X
				datasets: datasets // Наши подготовленные датасеты
			},
			options: {
				responsive: true,
				maintainAspectRatio: false, // Разрешаем изменять соотношение сторон
				scales: {
					x: {
						stacked: true, // Важно для стековых столбцов
						title: {
							display: true,
							text: 'Год'
						}
					},
					y: {
						stacked: true, // Важно для стековых столбцов
						beginAtZero: true,
						title: {
							display: true,
							text: 'Продажи (количество автомобилей)'
						}
					}
				},
				plugins: {
					title: {
						display: true,
						text: 'Продажи электромобилей (BEV и PHEV) в России по годам'
					},
					tooltip: {
						callbacks: {
							label: function (context) {
								const value = context.raw as number
								return `${context.dataset.label}: ${value.toLocaleString('ru-RU')} автомобилей`
							}
						}
					},
					legend: {
						position: 'bottom',
						labels: {
							boxWidth: 12,
							padding: 20,
							generateLabels: (chartInstance) => {
								// Создаем кастомные метки для легенды, теперь только для типов
								const uniqueTypes = [
									{
										type: 'BEV (Полностью электрический автомобиль)',
										color: typeColors.BEV.background
									},
									{
										type: 'PHEV (Гибридный электромобиль)',
										color: typeColors.PHEV.background
									}
								]

								return uniqueTypes.map((item, index) => ({
									text: item.type,
									fillStyle: item.color,
									strokeStyle: item.color,
									hidden: chartInstance.isDatasetVisible(index) ? false : true, // Можно переключать видимость
									lineWidth: 1,
									index: index // Индекс для внутреннего использования Chart.js
								}))
							}
						}
					}
				}
			}
		})

		// Функция очистки: уничтожение графика при удалении компонента
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
