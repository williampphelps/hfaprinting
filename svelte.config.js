import adapter from "svelte-kit-sst";
import { vitePreprocess } from "@sveltejs/kit/vite";
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: seqPreprocessor([vitePreprocess(), preprocessThrelte()]),
  kit: {
    adapter: adapter(),
  },
};

export default config;
