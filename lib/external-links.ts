import type { AnchorHTMLAttributes } from 'react';

export type EnhancedAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  'data-external'?: string;
};

const EXTERNAL_WARNING_TITLE = 'External link - opens in a new tab';

function isExternalLink(href?: AnchorHTMLAttributes<HTMLAnchorElement>['href']) {
  if (typeof href !== 'string') {
    return false;
  }

  const normalizedHref = href.trim().toLowerCase();
  return normalizedHref.startsWith('http://') || normalizedHref.startsWith('https://');
}

function mergeRelAttribute(rel?: string) {
  const tokens = [...(rel ? rel.split(/\s+/).filter(Boolean) : []), 'noopener', 'noreferrer'];

  return Array.from(new Set(tokens)).join(' ');
}

export function enhanceAnchorProps(
  props: AnchorHTMLAttributes<HTMLAnchorElement>
): EnhancedAnchorProps {
  const enhanced: EnhancedAnchorProps = { ...props };

  const external = props.target === '_blank' || isExternalLink(props.href);

  if (!external) {
    if ('data-external' in enhanced) {
      delete enhanced['data-external'];
    }

    return enhanced;
  }

  enhanced.rel = mergeRelAttribute(props.rel);
  enhanced['data-external'] = 'true';
  enhanced.target = '_blank';

  if (!props.title) {
    enhanced.title = EXTERNAL_WARNING_TITLE;
  }

  return enhanced;
}

export const __testing = {
  EXTERNAL_WARNING_TITLE,
  isExternalLink,
  mergeRelAttribute,
};
