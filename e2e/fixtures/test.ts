/* eslint-disable react-hooks/rules-of-hooks -- Playwright fixture, not React */
import { expect, test as base } from '@playwright/test';

import { gotoWithRetry } from './goto';

export const test = base.extend({
  page: async ({ page }, use) => {
    const originalGoto = page.goto.bind(page);
    page.goto = ((url, options) => gotoWithRetry(originalGoto, url, options)) as typeof page.goto;
    await use(page);
  },
});

export { expect };
