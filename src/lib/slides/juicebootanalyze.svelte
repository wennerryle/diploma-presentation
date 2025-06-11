<script>
	import { Notes, Slide } from '@animotion/core'
	import juiceBoosterImage from './JuiceBooster.png'
</script>

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col justify-between">
		<p>Анализ аналогов: Juice Booster 2</p>

		<img
			class="h-3/5 w-full object-cover object-bottom"
			src={juiceBoosterImage}
			alt="juice booster 2"
		/>

		<p class="text-xl">
			Juice Booster 2. (мощность 22 кВт, защита IP67) <br />
			Источник: https://avtocharge.ru/juicebooster-2/
		</p>
	</div>
	<Notes>
		Интерфейс Juice Booster 2 ориентирован на упрощенное взаимодействие и не предоставляет
		углубленных возможностей для детальной конфигурации, проведения специфических диагностических
		тестов или отладки, которые необходимы для производственных целей или для расширенного
		администрирования. Именно эти расширенные функции реализуются в моём проекте
	</Notes>
</Slide>
