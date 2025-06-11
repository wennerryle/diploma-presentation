<script lang="ts">
	import Title from '$lib/components/title.svelte'
	import { Notes, Slide } from '@animotion/core'
</script>

<Slide class="h-full w-full p-10">
	<div class="flex h-full w-full flex-col justify-between">
		<p class="h-1/3 text-2xl text-balance">
			Министерство науки и среднего профессионального образования
			<span class="text-nowrap">Российской Федерации</span><br />
			ПОУ «Волго-Вятский колледж информатики, финансов, права, управления»
		</p>
		<Title class="w-full">
			Дипломный проект на тему:
			<br />
			«Разработка пользовательского интерфейса системы управления автомобильной зарядной станцией»
		</Title>
		<div class="flex flex-col text-right text-2xl">
			<p>Выполнил:</p>
			<p>Поздеев Владислав Евгеньевич</p>
			<p>выпускник группы ИСП-41</p>
			<p>специальность ВВК.090207.175</p>
			<p>Руководитель проекта:</p>
			<p>Синенок Владимир Николаевич</p>
			<br />
			<p>Киров, 2025</p>
		</div>
	</div>
	<Notes>ФИО студента, группа, ФИО руководителя, Колледж.</Notes>
</Slide>
