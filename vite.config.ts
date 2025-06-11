import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig, type Plugin } from 'vite'
import tailwindcss from '@tailwindcss/vite'

const noHMR: Plugin = {
	name: 'full-reload',
	handleHotUpdate({ server }) {
		server.ws.send({ type: 'full-reload' })
		return []
	}
}

export default defineConfig({
	plugins: [noHMR, tailwindcss(), sveltekit()]
})
