import { expect, test } from '../fixtures/test';
import { byTestId, DataTestId } from '../fixtures/test-id';

const RECIPE_SLUG = 'chicken-pilaf';

test('category page links to recipe detail', async ({ page }) => {
  await page.goto('/en/main');
  await expect(byTestId(page, DataTestId.CategoryTitle)).toBeVisible();

  await byTestId(page, DataTestId.RecipeCard(RECIPE_SLUG)).click();
  await expect(page).toHaveURL(new RegExp(`/en/main/${RECIPE_SLUG}`));
  await expect(byTestId(page, DataTestId.RecipeTitle)).toBeVisible();
});
