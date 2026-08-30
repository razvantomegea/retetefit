import { expect, test } from '../fixtures/test';
import { byTestId, DataTestId } from '../fixtures/test-id';

test('search dialog navigates to results', async ({ page }) => {
  await page.goto('/ro');
  await expect(byTestId(page, DataTestId.HomeHero)).toBeVisible();

  await byTestId(page, DataTestId.SearchTrigger).click();
  const input = byTestId(page, DataTestId.SearchInput);
  await expect(input).toBeVisible();
  await input.fill('pui');
  await input.press('Enter');

  await expect(page).toHaveURL(/\/ro\/search\?q=/);
  await expect(byTestId(page, DataTestId.SearchResults)).toBeVisible();
});
