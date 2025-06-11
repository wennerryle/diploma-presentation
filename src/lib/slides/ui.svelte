<script lang="ts">
	import { Slide, Notes } from '@animotion/core'
	import ChargingScreenshot from './ChargingScreenshot.png'
	import SettingsScreenshot from './SettingsScreenshot.png'
	import OtaScreenshot from './UpdateOTA_Screenshot.png'
	import AboutScreenshot from './AboutScreenshot.png'
</script>

{#snippet illustration(src: string, description: string)}
	<div class="flex flex-col gap-y-2 text-2xl">
		<img class="h-[70vh] object-contain" {src} alt={description} />
		<p>{description}</p>
	</div>
{/snippet}

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col">
		<p class="pb-10">Пользовательский интерфейс</p>

		<div class="max-h-[70vh] object-contain">
			{@render illustration(ChargingScreenshot, 'Страница «Главная»')}
		</div>
	</div>
</Slide>

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col">
		<p class="pb-10">Пользовательский интерфейс</p>

		<div class="max-h-[70vh] object-contain">
			{@render illustration(SettingsScreenshot, 'Страница «Панель настройки / Настройки»')}
		</div>
	</div>
</Slide>

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col">
		<p class="pb-10">Пользовательский интерфейс</p>

		<div class="max-h-[70vh] object-contain">
			{@render illustration(OtaScreenshot, 'Страница «Панель настройки / Обновление»')}
		</div>
	</div>
</Slide>

<Slide transition="fade" class="h-full p-10">
	<div class="flex h-full flex-col">
		<p class="pb-10">Пользовательский интерфейс</p>

		<div class="max-h-[70vh] object-contain">
			{@render illustration(AboutScreenshot, 'Страница «Панель настройки / Об устройстве»')}
		</div>
	</div>
</Slide>
