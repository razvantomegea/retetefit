import type { Page } from '@playwright/test';

import { DataTestId } from '../../lib/constants/data-test-id';

export function byTestId(page: Page, testId: string) {
  return page.getByTestId(testId).filter({ visible: true });
}

export { DataTestId };
