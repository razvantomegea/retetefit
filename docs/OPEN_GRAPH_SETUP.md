# Open Graph Meta Tags Configuration

This document describes how Open Graph (OG) meta tags are configured in this Next.js application to ensure recipe and educational article images appear correctly in social media share links (WhatsApp, Telegram, Facebook, Twitter, LinkedIn, etc.).

## Implementation Overview

Both recipe pages and educational article pages use Next.js's `generateMetadata` function to dynamically generate comprehensive Open Graph and Twitter Card metadata.

### Key Features

✅ **Dynamic metadata generation** for each recipe and article  
✅ **Absolute image URLs** for social platform compatibility  
✅ **Optimal image dimensions** (1200×630 pixels)  
✅ **Rich article metadata** including author, publish dates, and keywords  
✅ **Twitter Card support** with large image previews  
✅ **Multi-language support** with alternate language URLs  
✅ **SEO-optimized** with robots directives and canonical URLs

## Files Modified

### 1. Recipe Pages

**File:** `app/[locale]/[category]/[slug]/page.tsx`

Generates metadata for recipe pages including:

- Recipe title, description, and image
- Cooking time, servings, and nutritional info in keywords
- Recipe author and publish dates
- Category and tag-based keywords
- Twitter and Open Graph images

### 2. Educational Articles

**File:** `app/[locale]/educational/[slug]/page.tsx`

Generates metadata for educational articles including:

- Article title, description, and featured image
- Health and nutrition-related keywords
- Author and publish dates
- Twitter and Open Graph images

## Environment Configuration

### Required Environment Variable

Create a `.env.local` file in the project root with:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**⚠️ CRITICAL:** This must be set to your production domain for social media platforms to fetch images correctly. Without this, the app falls back to `http://localhost:3000`, which won't work in production.

### For Development

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### For Production

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

## Metadata Structure

### Recipe Pages Metadata

```typescript
{
  title: "Recipe Title | Site Name",
  description: "Recipe description",
  keywords: ["tag1", "tag2", "category", "recipe", "healthy", "low-calorie", "20 minutes"],
  authors: [{ name: "Author Name" }],
  creator: "Author Name",
  publisher: "Site Name",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  openGraph: {
    title: "Recipe Title",
    description: "Recipe description",
    url: "https://yourdomain.com/en/category/slug",
    siteName: "Site Name",
    images: [{
      url: "https://yourdomain.com/recipe-image.png",
      width: 1200,
      height: 630,
      alt: "Recipe image alt text",
      type: "image/png",
    }],
    locale: "en",
    type: "article",
    publishedTime: "2025-11-13",
    modifiedTime: "2025-11-13",
    authors: ["Author Name"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recipe Title",
    description: "Recipe description",
    images: ["https://yourdomain.com/recipe-image.png"],
    creator: "@maingain",
    site: "@maingain",
  },
  alternates: {
    canonical: "https://yourdomain.com/en/category/slug",
    languages: {
      "en-US": "https://yourdomain.com/en/category/slug",
      "ro-RO": "https://yourdomain.com/ro/category/slug",
    },
  },
}
```

### Educational Articles Metadata

Similar structure to recipes but with:

- Education-focused keywords (nutrition, health, weight loss, diet, fitness)
- No category-specific URL structure
- Same author and image handling

## Image Requirements

### Optimal Specifications for Social Sharing

- **Dimensions:** 1200×630 pixels (optimal for all platforms)
- **Format:** PNG or JPG
- **File Size:** Keep under 300 KB for fast loading
- **URLs:** Must be absolute URLs (include full domain)

### Image Handling

The application automatically:

1. Reads image path from markdown frontmatter (`image: '/recipe/hero.png'`)
2. Converts to absolute URL using `NEXT_PUBLIC_SITE_URL`
3. Ensures compatibility with all social platforms

## Testing Your Implementation

### 1. Social Media Debuggers

Use these tools to verify how your links appear:

- **Facebook/Meta:** https://developers.facebook.com/tools/debug/
- **Twitter:** https://cards-dev.twitter.com/validator
- **LinkedIn:** https://www.linkedin.com/post-inspector/

### 2. Manual Testing

Share a link on:

- WhatsApp (mobile)
- Telegram (mobile/desktop)
- Facebook
- Twitter
- LinkedIn

### 3. Cache Busting

If you update an OG image and social platforms show the old version:

1. **Facebook:** Use the Sharing Debugger and click "Scrape Again"
2. **Twitter:** Images cache for ~7 days; use the Card Validator
3. **Add version parameter:** Update your image URL with `?v=2` to force refresh

## Content Requirements

### Recipe Markdown Frontmatter

```yaml
---
title: 'Recipe Title'
slug: 'recipe-slug'
description: 'Recipe description for social sharing'
image: '/recipe/hero.png' # Must be in /public folder
imageAlt: 'Descriptive alt text'
author: 'Maingain'
publishedAt: '2025-11-13'
updatedAt: '2025-11-13'
# ... other fields
---
```

### Educational Article Frontmatter

```yaml
---
title: 'Article Title'
slug: 'article-slug'
description: 'Article description for social sharing'
image: '/article/hero.png' # Must be in /public folder
imageAlt: 'Descriptive alt text'
author: 'Maingain'
publishedAt: '2025-11-07'
updatedAt: '2025-11-07'
---
```

## Social Platform Compatibility

| Platform  | Status | Image Preview | Additional Notes      |
| --------- | ------ | ------------- | --------------------- |
| WhatsApp  | ✅     | Large         | Requires absolute URL |
| Telegram  | ✅     | Large         | Requires absolute URL |
| Facebook  | ✅     | Large         | Uses og:image         |
| Twitter/X | ✅     | Large         | Uses twitter:card     |
| LinkedIn  | ✅     | Medium        | Uses og:image         |
| iMessage  | ✅     | Medium        | Uses og:image         |
| Slack     | ✅     | Medium        | Uses og:image         |

## Troubleshooting

### Images Not Appearing

1. **Check `NEXT_PUBLIC_SITE_URL`:** Must be set and use HTTPS in production
2. **Verify image exists:** Check that the image file is in `/public` folder
3. **Use absolute URLs:** Relative paths won't work for social platforms
4. **Check image size:** Should be under 300 KB
5. **Clear social media cache:** Use debugger tools to force refresh

### Wrong Image Showing

- Social platforms cache images aggressively
- Use social media debuggers to clear cache
- Update image filename or add version parameter

### Missing Title/Description

- Verify frontmatter in markdown files
- Check that `generateMetadata` function is working
- Use browser dev tools to inspect `<head>` tags

## Best Practices

1. **Image Design:**
   - Use large, bold fonts for text in images
   - Maintain high contrast between text and background
   - Include brand logo or distinctive visual elements
   - Keep design clean and focused (avoid text-heavy designs)

2. **Descriptions:**
   - Keep under 160 characters for optimal display
   - Make them compelling to encourage clicks
   - Include key benefits or value proposition

3. **Testing:**
   - Always test on multiple platforms before launching
   - Use incognito/private browsing to see fresh cache
   - Verify on both mobile and desktop

4. **Maintenance:**
   - Update `updatedAt` when modifying content
   - Keep image file sizes optimized
   - Monitor social sharing analytics

## Advanced: Dynamic OG Image Generation

For future enhancement, consider implementing Next.js's `opengraph-image.tsx` file convention to generate dynamic OG images on-the-fly. This would allow:

- Automatic image generation from article content
- Consistent branding across all pages
- No need to manually create OG images
- Real-time updates when content changes

Example location: `app/[locale]/[category]/[slug]/opengraph-image.tsx`

## References

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

## Support

For issues or questions about Open Graph configuration, check:

1. Browser console for metadata rendering
2. Page source (`View Page Source`) to verify meta tags
3. Social media debuggers for platform-specific issues
