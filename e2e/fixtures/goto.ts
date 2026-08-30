import type { Page, Response } from '@playwright/test';

const TRANSIENT_NAVIGATION_ERROR_PATTERN =
  /ERR_ABORTED|ERR_CONNECTION_RESET|frame was detached|Navigation failed because page was closed/i;

export function isTransientNavigationError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return TRANSIENT_NAVIGATION_ERROR_PATTERN.test(message);
}

export async function gotoWithRetry(
  goto: Page['goto'],
  url: string,
  options?: Parameters<Page['goto']>[1]
): Promise<Response | null> {
  const gotoOptions = { waitUntil: 'domcontentloaded' as const, ...options };

  try {
    return await goto(url, gotoOptions);
  } catch (error) {
    if (!isTransientNavigationError(error)) {
      throw error;
    }

    return await goto(url, gotoOptions);
  }
}
