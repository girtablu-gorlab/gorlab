import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import catalogConfig from './oddments.config.js'

const base = catalogConfig.basePath ?? ''

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true,
    }),
    paths: { base },
    prerender: {
      handleUnseenRoutes: 'ignore',
      handleHttpError: ({ path, message }) => {
        if (path === '/favicon.svg') {
          console.warn('Warning: /favicon.svg not found in static/ — add one or run `oddments init`')
          return
        }
        throw new Error(message)
      },
    },
  },
}

export default config
