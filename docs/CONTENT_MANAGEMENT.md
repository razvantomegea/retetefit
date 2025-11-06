# Content Management Guide

This guide explains how to manage recipe content for the Maingain recipe blog.

## Table of Contents

- [Adding New Recipes](#adding-new-recipes)
- [Frontmatter Schema](#frontmatter-schema)
- [Markdown Content Structure](#markdown-content-structure)
- [Image Management](#image-management)
- [Category Guidelines](#category-guidelines)
- [Publishing Workflow](#publishing-workflow)

## Adding New Recipes

### Step 1: Choose Location

Recipes are organized by language and category:

```
content/recipes/
  ├── ro/              # Romanian recipes
  │   ├── simple/
  │   ├── fast/
  │   ├── high-protein/
  │   ├── high-fiber/
  │   ├── vegetarian/
  │   └── vegan/
  └── en/              # English recipes
      ├── simple/
      ├── fast/
      ├── high-protein/
      ├── high-fiber/
      ├── vegetarian/
      └── vegan/
```

### Step 2: Create Recipe File

Create a new `.md` file in the appropriate category folder. Use a URL-friendly slug as the filename:

```bash
# Example
content/recipes/en/high-protein/protein-pancakes.md
content/recipes/ro/high-protein/clatite-proteice.md
```

**Filename Guidelines:**
- Use lowercase letters
- Use hyphens instead of spaces
- Keep it descriptive but concise

### Step 3: Write Frontmatter

Every recipe must start with YAML frontmatter (between `---` lines):

```yaml
---
title: "Recipe Title"
slug: "recipe-slug"
description: "Brief description (max 150 chars)"
category: "high-protein"
lang: "en"
cookTime: 25
servings: 2
calories: 450
protein: 35
carbs: 45
fat: 12
fiber: 8
difficulty: "easy"
tags: ["high-protein", "quick", "breakfast"]
featured: false
publishedAt: "2025-01-15"
updatedAt: "2025-01-15"
image: "/images/recipes/recipe-slug.jpg"
imageAlt: "Descriptive alt text for accessibility"
author: "Maingain Team"
---
```

### Step 4: Write Content

After the frontmatter, write your recipe content in Markdown format (see [Markdown Content Structure](#markdown-content-structure)).

## Frontmatter Schema

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Recipe title (max 60 chars) | "Protein Pancakes with Banana" |
| `slug` | string | URL-friendly identifier (must match filename) | "protein-pancakes" |
| `description` | string | Brief description (max 150 chars for SEO) | "Delicious protein-rich pancakes ready in 15 minutes" |
| `category` | string | One of: `simple`, `fast`, `high-protein`, `high-fiber`, `vegetarian`, `vegan` | "high-protein" |
| `lang` | string | Language code: `"en"` or `"ro"` | "en" |
| `cookTime` | number | Cooking time in minutes | 25 |
| `servings` | number | Number of servings | 2 |
| `calories` | number | Calories per serving | 450 |
| `protein` | number | Protein in grams per serving | 35 |
| `carbs` | number | Carbohydrates in grams per serving | 45 |
| `fat` | number | Fat in grams per serving | 12 |
| `fiber` | number | Fiber in grams per serving | 8 |
| `difficulty` | string | One of: `"easy"`, `"medium"`, `"hard"` | "easy" |
| `tags` | array | Array of tag strings | `["high-protein", "quick"]` |
| `featured` | boolean | Whether to show on homepage | `true` |
| `publishedAt` | string | ISO date string (YYYY-MM-DD) | "2025-01-15" |
| `updatedAt` | string | ISO date string (YYYY-MM-DD) | "2025-01-15" |
| `image` | string | Path to hero image (starts with `/`) | "/images/recipes/pancakes.jpg" |
| `imageAlt` | string | Descriptive alt text for image | "Stack of protein pancakes with banana slices" |
| `author` | string | Author name | "Maingain Team" |

### Field Guidelines

**Title:**
- Keep under 60 characters
- Use descriptive, benefit-focused language
- Include key ingredients or characteristics

**Description:**
- 120-150 characters for optimal SEO
- Mention key benefits (high protein, quick, low calorie)
- Include taste/texture appeal
- Avoid repeating the title

**Category:**
- Choose the most relevant category
- Recipes can fit multiple categories - pick the primary one
- Use category definitions from [Category Guidelines](#category-guidelines)

**Nutrition Values:**
- Always per serving (not total recipe)
- Round to nearest whole number
- Use a nutrition calculator for accuracy
- Double-check calculations

**Tags:**
- Use 3-6 relevant tags
- Common tags: `high-protein`, `low-carb`, `vegetarian`, `vegan`, `quick`, `easy`, `meal-prep`, `gluten-free`, `dairy-free`
- Be consistent with tag names

**Dates:**
- `publishedAt`: When recipe is first published (must be today or in the past to appear)
- `updatedAt`: Last modification date (update when making changes)

**Images:**
- Store in `public/images/recipes/`
- Use descriptive filenames matching the slug
- Recommended: WebP format with JPG fallback
- Size: Max 1200px width for hero images
- See [Image Management](#image-management) for details

## Markdown Content Structure

### Required Sections

Every recipe must include these sections in order:

1. **Introduction** (before first heading)
   - 1-2 paragraphs introducing the recipe
   - Mention key benefits and appeal

2. **Ingredients** (`## Ingredients` or `## Ingrediente`)
   - Bulleted list using `-` or `*`
   - Include measurements and units
   - Group by type (e.g., "For topping:")

3. **Instructions** (`## Instructions` or `## Instrucțiuni`)
   - Numbered list (1., 2., 3.)
   - Clear, actionable steps
   - Include timing and temperatures

### Optional Sections

4. **Nutrition Facts** (`## Nutrition Facts` or `## Valori Nutriționale`)
   - Additional nutrition information
   - Serving size notes
   - Variation notes

5. **Tips & Variations** (`## Tips & Variations` or `## Tips & Variații`)
   - Substitution ideas
   - Cooking tips
   - Meal prep suggestions
   - Dietary modifications

### Markdown Examples

**Ingredients:**
```markdown
## Ingredients

- 2 large eggs
- 1 ripe banana (approx. 100g)
- 30g vanilla protein powder

### For topping (optional):
- Fresh berries
- Honey or maple syrup
```

**Instructions:**
```markdown
## Instructions

1. In a medium bowl, mash the banana with a fork until creamy.

2. Add the eggs and mix well until uniform.

3. Incorporate the protein powder and mix until no lumps remain.
```

**Tips (using bold for emphasis):**
```markdown
## Tips & Variations

- **No protein powder?** Use 4-5 egg whites instead.

- **Vegan?** Try with almond butter and chickpea flour.

- **Meal prep friendly:** Prepare mixture the night before.
```

## Image Management

### Image Storage

Store all recipe images in:
```
public/images/recipes/
```

### Image Naming

Use descriptive filenames matching the recipe slug:
```
protein-pancakes.jpg
clatite-proteice.jpg
```

### Image Specifications

**Format:**
- Primary: WebP (better compression)
- Fallback: JPG (browser compatibility)

**Dimensions:**
- Hero images: 1200px × 900px (4:3 aspect ratio)
- Card images: 800px × 450px (16:9 aspect ratio)

**Optimization:**
- Compress images before uploading
- Use tools like Squoosh, ImageOptim, or TinyPNG
- Target file size: < 200KB for hero images

### Image Best Practices

**Photography:**
- Natural lighting preferred
- Clean, minimal backgrounds (white/light wood)
- Overhead shots (flat lay) for full meals
- 45° angle for stacked/layered dishes
- Include fresh ingredients or garnish
- Consistent style across all recipes

**Alt Text:**
- Be descriptive but concise
- Include recipe name
- Mention key visual elements
- Example: "Stack of protein pancakes with banana slices and fresh berries on a white plate"

## Category Guidelines

### Simple
Recipes with minimal ingredients (5 or fewer) and straightforward techniques.

### Fast
Recipes that can be prepared in 30 minutes or less (total time).

### High Protein
Recipes with at least 20g protein per serving.

### High Fiber
Recipes with at least 8g fiber per serving.

### Vegetarian
Recipes containing no meat or fish, but may include eggs and dairy.

### Vegan
Recipes containing no animal products (no meat, fish, eggs, dairy, or honey).

**Note:** A recipe can fit multiple categories. Choose the primary category that best represents the recipe's main characteristic.

## Publishing Workflow

### 1. Draft the Recipe

- Create the `.md` file in the appropriate category
- Write complete frontmatter and content
- Add images to `public/images/recipes/`

### 2. Review Checklist

Before publishing, verify:
- [ ] All required frontmatter fields are present
- [ ] Slug matches filename (without `.md`)
- [ ] Description is 120-150 characters
- [ ] Nutrition values are accurate and per serving
- [ ] All images exist and paths are correct
- [ ] Alt text is descriptive
- [ ] Markdown sections are properly formatted
- [ ] Ingredients and instructions are clear
- [ ] `publishedAt` date is today or in the past
- [ ] `featured` is set appropriately (only for best recipes)

### 3. Set Published Date

Set `publishedAt` to the desired publication date:
- Use today's date for immediate publishing
- Use a future date to schedule (recipes won't appear until that date)

### 4. Test Locally

1. Start development server: `pnpm dev`
2. Navigate to recipe URL: `/[locale]/[category]/[slug]`
3. Check:
   - Recipe displays correctly
   - Images load
   - Nutrition card shows correct values
   - Related recipes appear
   - SEO metadata is correct

### 5. Update Translations (if needed)

If adding new tags or content, update translation files:
- `messages/en.json`
- `messages/ro.json`

### 6. Build and Deploy

- Recipe will be included in static site generation
- No manual build steps needed for content
- Deploy as normal through your CI/CD pipeline

## Best Practices

### Content Writing

- **Tone:** Friendly and approachable (use "tu" form in Romanian, casual but professional in English)
- **Length:** Keep instructions concise but clear
- **Clarity:** Use specific measurements and temperatures
- **Accessibility:** Always include alt text for images
- **SEO:** Use descriptive titles and meta descriptions

### Consistency

- **Measurements:** Use consistent units (grams, cups, etc.)
- **Formatting:** Follow the same markdown structure
- **Language:** Match language of content with `lang` field
- **Tags:** Use consistent tag naming across recipes

### Quality

- **Test recipes:** Actually make the recipe before publishing
- **Accuracy:** Double-check all nutrition calculations
- **Photos:** Use high-quality, appetizing images
- **Proofread:** Check for typos and grammar errors

## Troubleshooting

### Recipe Not Appearing

- Check `publishedAt` date is today or in the past
- Verify file is in correct category folder
- Ensure frontmatter `lang` matches folder language
- Check slug matches filename

### Images Not Loading

- Verify image exists in `public/images/recipes/`
- Check image path in frontmatter (should start with `/`)
- Ensure filename matches exactly (case-sensitive)

### Build Errors

- Check for YAML syntax errors in frontmatter
- Verify all required fields are present
- Ensure no special characters break YAML parsing
- Check markdown formatting for unclosed lists or headings

## Need Help?

For questions or issues:
1. Check this documentation
2. Review example recipes in `content/recipes/`
3. Check PRD.md for design system guidelines
4. Contact the development team
