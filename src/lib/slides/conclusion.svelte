<script lang="ts">
	import { Slide } from '@animotion/core'
	import { type Component } from 'svelte'
</script>

{#snippet li(text: string, icon: Component)}
	<div class="flex items-center gap-x-10">
		<svelte:component this={icon} class="min-h-max min-w-max" />
		{text.trim()}
	</div>
{/snippet}

<Slide class="h-full p-10">
	<div class="mb-10 flex h-full flex-col justify-between">
		<p>Заключение</p>
	</div>
	<div class="flex flex-col gap-y-3">
		<p class="text-justify text-3xl">
			Все поставленные цели и задачи дипломного проекта успешно выполнены.
		</p>
		<p class="text-justify text-3xl">
			Разработанный UI отвечает высоким стандартам функциональности, надежности, удобства
			использования и эффективности.
		</p>
		<p class="text-justify text-3xl">
			Снижен порог входа для рядовых пользователей, предоставлены мощные инструменты для тех.
			специалистов.
		</p>
	</div>
</Slide>
