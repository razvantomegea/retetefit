import { expect, test } from '../fixtures/test';
import { byTestId, DataTestId } from '../fixtures/test-id';

test('educational article loads', async ({ page }) => {
  await page.goto('/ro/educational/why-we-get-fat');
  await expect(byTestId(page, DataTestId.EducationalTitle)).toBeVisible();
});
