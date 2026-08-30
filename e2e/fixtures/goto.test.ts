import { describe, expect, it } from 'vitest';

import { isTransientNavigationError } from './goto';

describe('isTransientNavigationError', () => {
  it('matches aborted and detached-frame navigations', () => {
    expect(
      isTransientNavigationError(
        new Error('page.goto: net::ERR_ABORTED; maybe frame was detached?')
      )
    ).toBe(true);
    expect(isTransientNavigationError(new Error('net::ERR_CONNECTION_RESET'))).toBe(true);
  });

  it('does not match unrelated failures', () => {
    expect(isTransientNavigationError(new Error('Timeout 30000ms exceeded'))).toBe(false);
  });
});
