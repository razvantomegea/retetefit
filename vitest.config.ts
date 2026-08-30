import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['test/setup.ts'],
    include: ['lib/**/*.test.{ts,tsx}', 'e2e/fixtures/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['lib/**/*.ts'],
      exclude: [
        '**/*.test.{ts,tsx}',
        '**/*.d.ts',
        'lib/constants/data-test-id.ts',
        'lib/app-version.ts',
        'lib/constants.ts',
        // Content loaders / FS I/O — covered by Playwright smoke, not unit thresholds
        'lib/recipes/utils.ts',
        'lib/recipes/get-all.ts',
        'lib/recipes/get-by-slug.ts',
        'lib/recipes/featured.ts',
        'lib/recipes/related.ts',
        'lib/recipes/search.ts',
        'lib/recipes/categories.ts',
        'lib/recipes/index.ts',
        'lib/educational/get-all.ts',
        'lib/educational/get-by-slug.ts',
        'lib/educational/utils.ts',
        'lib/educational/index.ts',
      ],
      reporter: ['text', 'text-summary', 'lcov', 'json-summary'],
      reportsDirectory: 'coverage',
      thresholds: {
        lines: 90,
        branches: 80,
        functions: 90,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      'server-only': path.resolve(__dirname, '__mocks__/server-only.ts'),
    },
  },
});
