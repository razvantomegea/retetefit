import { defineConfig, devices } from '@playwright/test';

/** Dedicated port so e2e never reuses a normal `pnpm dev` on :3000. */
const E2E_PORT = process.env.E2E_PORT ?? '3001';
const baseURL = `http://localhost:${E2E_PORT}`;

export default defineConfig({
  testDir: 'e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 1,
  failOnFlakyTests: true,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  workers: 1,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    navigationTimeout: 45_000,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: process.platform === 'win32' ? 'pnpm.cmd run dev' : 'pnpm run dev',
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120_000,
    env: {
      ...process.env,
      PORT: E2E_PORT,
      NEXT_PUBLIC_SITE_URL: baseURL,
    },
  },
});
