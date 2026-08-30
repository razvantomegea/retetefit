import { expect, test } from '../fixtures/test';
import { byTestId, DataTestId } from '../fixtures/test-id';

test.use({ viewport: { width: 390, height: 844 } });

test('mobile menu opens and navigates to a category', async ({ page }) => {
  await page.goto('/ro');
  await expect(byTestId(page, DataTestId.HomeHero)).toBeVisible();
  await expect(byTestId(page, DataTestId.MobileMenuTrigger)).toBeVisible();

  await byTestId(page, DataTestId.MobileMenuTrigger).click();

  const sheet = page.getByRole('dialog');
  await expect(sheet).toBeVisible();
  await sheet.getByTestId(DataTestId.NavCategoryLink('main')).click();

  await expect(page).toHaveURL(/\/ro\/main/);
  await expect(byTestId(page, DataTestId.CategoryTitle)).toBeVisible();
});
