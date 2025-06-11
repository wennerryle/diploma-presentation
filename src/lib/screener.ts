import { getPresentation } from '@animotion/core'
import { sleep } from './utils'
import {
	takeScreenshot,
	checkIfBrowserSupported,
	requestDisplayMedia
} from 'wennerryle-screenshot-xata.io'

let directory: FileSystemDirectoryHandle
let running = false

type RevealAPI = ReturnType<typeof getPresentation>

export async function runScreener() {
	if (!checkIfBrowserSupported()) {
		alert('Браузер не поддерживает MediaDevices API')
		return
	}

	if (running) {
		return
	}

	if (await isFolderFilled()) {
		alert('В папке есть файлы, выберите чистую папку.')
		return
	}

	running = true
	const presentation = getPresentation()
	const screenshotContentType = 'image/png'
	const mediaStream = await requestDisplayMedia()

	try {
		for await (const _ of slidesIterator(presentation)) {
			const blob = await takeScreenshot({
				quality: 10,
				type: screenshotContentType,
				mediaStream
			})
				.then(cleanScreenshotBase64)
				.then((it) => b64toBlob(it, screenshotContentType))

			const res = await directory.getFileHandle(
				'presentation_' + presentation.slides.getSlidePastCount() + '.png',
				{ create: true }
			)

			await res.requestPermission({ mode: 'readwrite' })

			const writer = await res.createWritable()
			await writer.write(blob)
			await writer.close()
		}
	} finally {
		running = false
	}
}

export async function* slidesIterator(presentation: RevealAPI) {
	while (presentation.slides.nextFragment()) {
		await sleep(2000)
	}

	await sleep(2000)
	yield presentation.slides.getCurrentSlide()

	do {
		presentation.slides.next()
		await sleep(2000)

		while (presentation.slides.nextFragment()) {
			await sleep(2000)
		}

		yield presentation.slides.getCurrentSlide()
	} while (!presentation.slides.isLastSlide())
}

async function fsExceptionHandler(callback: () => Promise<any> | void) {
	try {
		const result = callback()
		if (result instanceof Promise) {
			await result
		}
	} catch (e) {
		if (e instanceof DOMException) {
			switch (e.name) {
				case 'AbortError':
					alert('Операция была отменена.')
					break
				case 'SecurityError':
					alert('Ошибка безопасности.')
					break
				default:
					alert('Необработанная ошибка.')
					throw e
			}
			return
		}

		console.log('unhandled exception:')
		throw e
	}
}

async function isFolderFilled() {
	await fsExceptionHandler(async () => {
		directory = await window.showDirectoryPicker()
		for await (const _ of directory.keys()) {
			return true
		}
	})

	return false
}

function cleanScreenshotBase64(it: string) {
	// remove data:image/jpeg;base64,/
	return it.replace(/^data:image\/\w+;base64,/, '')
}

const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
	const byteCharacters = atob(b64Data)
	const byteArrays = []

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize)

		const byteNumbers = new Array(slice.length)
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}

		const byteArray = new Uint8Array(byteNumbers)
		byteArrays.push(byteArray)
	}

	const blob = new Blob(byteArrays, { type: contentType })
	return blob
}
