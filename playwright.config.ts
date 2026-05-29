import { defineConfig, devices } from '@playwright/test'
import catalogConfig from './oddments.config.js'

const base: string = (catalogConfig as { basePath?: string }).basePath ?? ''
const origin = 'http://127.0.0.1:4173'
const baseURL = `${origin}${base}/`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
    {
      name: 'mobile',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
      },
    },
  ],
  webServer: {
    command: 'ODDMENTS_DIR=e2e/fixtures/oddments npm run build && npm run preview -- --host 127.0.0.1',
    url: baseURL,
    reuseExistingServer: false,
  },
})
