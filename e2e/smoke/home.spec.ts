import { expect, test } from '../fixtures/test';
import { byTestId, DataTestId } from '../fixtures/test-id';

test('home loads hero and recipes for ro and en', async ({ page }) => {
  await page.goto('/ro');
  await expect(byTestId(page, DataTestId.HomeHero)).toBeVisible();
  await expect(byTestId(page, DataTestId.HomeHeroTitle)).toBeVisible();
  await expect(byTestId(page, DataTestId.HomeRecipesSection)).toBeVisible();

  await page.goto('/en');
  await expect(byTestId(page, DataTestId.HomeHero)).toBeVisible();
  await expect(byTestId(page, DataTestId.HomeRecipesSection)).toBeVisible();
});
