import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			external: [
				'@skeletonlabs/skeleton',
				'@skeletonlabs/skeleton/styles/skeleton.css'
			]
		}
	}
});
