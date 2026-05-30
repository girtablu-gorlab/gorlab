import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    conditions: ['browser'],
    alias: {
      '$lib': resolve('./src/lib'),
      '$app/paths': resolve('./src/test/mocks/app-paths.ts')
    }
  },
  test: {
    projects: [{
      extends: true,
      test: {
        name: 'unit',
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        include: ['src/**/*.test.ts', 'scripts/**/*.test.js'],
        globals: true
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      optimizeDeps: {
        // Pre-including Storybook/theme packages keeps browser-test startup
        // stable and avoids mid-collection optimizer restarts on cold caches.
        include: [
          '@storybook/addon-themes',
          '@skeletonlabs/skeleton-svelte',
        ],
      },
      test: {
        name: 'storybook',
        fileParallelism: false,
        browser: {
          enabled: true,
          headless: true,
          api: {
            host: '127.0.0.1',
          },
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});
