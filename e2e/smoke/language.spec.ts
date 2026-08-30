import { expect, test } from '../fixtures/test';
import { byTestId, DataTestId } from '../fixtures/test-id';

test('language switcher preserves path between locales', async ({ page }) => {
  await page.goto('/ro/main');
  await expect(byTestId(page, DataTestId.CategoryTitle)).toBeVisible();

  await byTestId(page, DataTestId.LanguageSwitcher).click();
  await expect(page).toHaveURL(/\/en\/main/);
  await expect(byTestId(page, DataTestId.CategoryTitle)).toBeVisible();
});
