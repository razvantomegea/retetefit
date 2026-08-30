import { __testing, enhanceAnchorProps } from '../external-links';

describe('enhanceAnchorProps', () => {
  it('should leave internal links unchanged', () => {
    const original = { href: '/about', title: 'About us' };
    const result = enhanceAnchorProps(original);

    expect(result).toEqual(original);
    expect(result['data-external']).toBeUndefined();
  });

  it('should add security attributes to external links', () => {
    const result = enhanceAnchorProps({ href: 'https://example.com' });

    expect(result.rel).toBe('noopener noreferrer');
    expect(result.title).toBe(__testing.EXTERNAL_WARNING_TITLE);
    expect(result['data-external']).toBe('true');
    expect(result.target).toBe('_blank');
  });

  it('should preserve existing rel values while adding security tokens', () => {
    const result = enhanceAnchorProps({
      href: 'https://example.com',
      rel: 'nofollow noopener',
    });

    expect(result.rel).toBe('nofollow noopener noreferrer');
  });

  it('should respect target blank even for non-external hrefs', () => {
    const result = enhanceAnchorProps({
      href: '/contact',
      target: '_blank',
    });

    expect(result.rel).toBe('noopener noreferrer');
    expect(result.target).toBe('_blank');
    expect(result['data-external']).toBe('true');
  });

  it('should retain provided titles for external links', () => {
    const result = enhanceAnchorProps({
      href: 'https://example.com',
      title: 'Custom title',
    });

    expect(result.title).toBe('Custom title');
  });

  it('should not mutate the original props object', () => {
    const props = { href: 'https://example.com', rel: 'nofollow' };
    const result = enhanceAnchorProps(props);

    expect(props).toEqual({ href: 'https://example.com', rel: 'nofollow' });
    expect(result).not.toBe(props);
  });
});

describe('mergeRelAttribute', () => {
  it('should avoid duplicate tokens', () => {
    expect(__testing.mergeRelAttribute('noopener noreferrer')).toBe('noopener noreferrer');
  });

  it('should handle undefined values gracefully', () => {
    expect(__testing.mergeRelAttribute()).toBe('noopener noreferrer');
  });
});

describe('isExternalLink', () => {
  it('should detect http and https links', () => {
    expect(__testing.isExternalLink('http://example.com')).toBe(true);
    expect(__testing.isExternalLink('https://example.com')).toBe(true);
  });

  it('should treat relative links as internal', () => {
    expect(__testing.isExternalLink('/internal')).toBe(false);
  });

  it('should treat non-string href as internal', () => {
    expect(__testing.isExternalLink(undefined)).toBe(false);
  });
});

describe('enhanceAnchorProps data-external cleanup', () => {
  it('should strip leftover data-external from internal links', () => {
    const result = enhanceAnchorProps({
      href: '/about',
      'data-external': 'true',
    } as Parameters<typeof enhanceAnchorProps>[0]);

    expect(result['data-external']).toBeUndefined();
  });
});
