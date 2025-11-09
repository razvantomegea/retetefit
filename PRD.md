# PRD: Maingain: Healthy Low Calories Recipes under 60 minutes - Design System & Best Practices

## Color Palette

### Light Mode

```css
:root {
  /* Primary - Green (Action & Brand) */
  --green-50: #f0fdf4;
  --green-100: #dcfce7;
  --green-500: #22c55e; /* Main action color */
  --green-600: #16a34a; /* Hover state */
  --green-700: #15803d; /* Active state */
  --green-900: #14532d; /* Dark accents */

  /* Neutral - Base Colors */
  --white: #ffffff;
  --zinc-50: #fafafa;
  --zinc-100: #f4f4f5;
  --zinc-200: #e4e4e7;
  --zinc-300: #d4d4d8;
  --zinc-400: #a1a1aa;
  --zinc-500: #71717a;
  --zinc-700: #3f3f46;
  --zinc-900: #18181b;

  /* Semantic Colors */
  --success: #22c55e; /* Green-500 */
  --warning: #f59e0b; /* Amber-500 */
  --error: #ef4444; /* Red-500 */
  --info: #3b82f6; /* Blue-500 */

  /* Surface & Background */
  --background: #ffffff;
  --surface: #fafafa; /* Zinc-50 */
  --surface-elevated: #ffffff;

  /* Text */
  --text-primary: #18181b; /* Zinc-900 */
  --text-secondary: #52525b; /* Zinc-600 */
  --text-tertiary: #a1a1aa; /* Zinc-400 */

  /* Borders */
  --border-light: #f4f4f5; /* Zinc-100 */
  --border: #e4e4e7; /* Zinc-200 */
  --border-strong: #d4d4d8; /* Zinc-300 */

  /* Overlays */
  --overlay: rgba(0, 0, 0, 0.5);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

### Dark Mode

```css
.dark {
  /* Primary - Green (slightly brighter for dark bg) */
  --green-400: #4ade80; /* Main action color */
  --green-500: #22c55e; /* Hover state */
  --green-600: #16a34a; /* Active state */

  /* Neutral - Dark Base */
  --zinc-800: #27272a;
  --zinc-850: #1f1f23; /* Custom darker shade */
  --zinc-900: #18181b;
  --zinc-950: #09090b;

  /* Surface & Background */
  --background: #09090b; /* Zinc-950 */
  --surface: #18181b; /* Zinc-900 */
  --surface-elevated: #27272a; /* Zinc-800 */

  /* Text */
  --text-primary: #fafafa; /* Zinc-50 */
  --text-secondary: #d4d4d8; /* Zinc-300 */
  --text-tertiary: #71717a; /* Zinc-500 */

  /* Borders */
  --border-light: #27272a; /* Zinc-800 */
  --border: #3f3f46; /* Zinc-700 */
  --border-strong: #52525b; /* Zinc-600 */

  /* Action Color Override */
  --success: #4ade80; /* Green-400 (brighter) */

  /* Overlays */
  --overlay: rgba(0, 0, 0, 0.7);
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
}
```

### Nutrition-Specific Colors

```css
/* Macronutrient Colors (both themes) */
--macro-protein: #3b82f6; /* Blue */
--macro-carbs: #f59e0b; /* Amber */
--macro-fat: #ec4899; /* Pink */
--macro-fiber: #8b5cf6; /* Purple */
--macro-calories: #22c55e; /* Green */

/* Category Colors (subtle backgrounds) */
--cat-breakfast: #fef3c7; /* Amber-100 */
--cat-lunch: #dbeafe; /* Blue-100 */
--cat-dinner: #f3e8ff; /* Purple-100 */
--cat-snacks: #dcfce7; /* Green-100 */
--cat-desserts: #fce7f3; /* Pink-100 */

/* Dark mode category backgrounds */
.dark {
  --cat-breakfast: rgba(245, 158, 11, 0.1);
  --cat-lunch: rgba(59, 130, 246, 0.1);
  --cat-dinner: rgba(139, 92, 246, 0.1);
  --cat-snacks: rgba(34, 197, 94, 0.1);
  --cat-desserts: rgba(236, 72, 153, 0.1);
}
```

---

## Typography System

### Font Families

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
--font-display: 'Inter', sans-serif; /* For headings */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace; /* For nutrition values */
```

### Font Scales

```css
/* Mobile First */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */

/* Desktop (md+) */
@media (min-width: 768px) {
  --text-3xl: 2.25rem; /* 36px */
  --text-4xl: 3rem; /* 48px */
  --text-5xl: 3.75rem; /* 60px */
}
```

### Font Weights

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Spacing System

```css
/* Base-8 spacing scale */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

---

## Component Specifications

### Navigation Bar

```yaml
Height: 64px (mobile), 72px (desktop)
Background: transparent → surface (on scroll)
Backdrop: blur-md
Border: 1px solid border (on scroll)
Padding: space-4 space-6
Position: sticky top-0
Z-index: 50

Logo:
  Font-size: text-xl
  Font-weight: font-bold
  Color: text-primary

Nav Links:
  Font-size: text-sm (mobile), text-base (desktop)
  Font-weight: font-medium
  Color: text-secondary
  Hover: text-primary, border-b-2 green-500
  Active: text-primary, border-b-2 green-500
  Spacing: space-6 between items

Theme Toggle:
  Size: 40px × 40px
  Icon-size: 20px
  Hover: background surface-elevated

Language Switcher:
  Size: 40px × 40px
  Font-size: text-sm
  Font-weight: font-semibold
```

### Hero Section (Homepage)

```yaml
Height: 60vh (mobile), 70vh (desktop)
Background: gradient from surface to background
Padding: space-12 space-6 (mobile), space-20 space-8 (desktop)
Text-align: center

Title:
  Font-size: text-4xl (mobile), text-5xl (desktop)
  Font-weight: font-bold
  Color: text-primary
  Line-height: tight (1.1)
  Margin-bottom: space-6

Subtitle:
  Font-size: text-lg (mobile), text-xl (desktop)
  Font-weight: font-normal
  Color: text-secondary
  Max-width: 600px
  Margin: 0 auto space-8

CTA Button:
  Padding: space-3 space-8
  Font-size: text-base
  Font-weight: font-semibold
  Background: green-500
  Color: white
  Hover: green-600
  Border-radius: 8px
  Shadow: shadow
```

### Recipe Card

```yaml
Layout: vertical
Background: surface
Border: 1px solid border
Border-radius: 12px
Overflow: hidden
Transition: all 200ms ease
Hover:
  transform: translateY(-4px)
  shadow: shadow-lg
  border-color: green-500

Image:
  Aspect-ratio: 16/9
  Object-fit: cover
  Background: zinc-200 (loading)

Content:
  Padding: space-5

Category Badge:
  Position: absolute top-3 left-3 (on image)
  Font-size: text-xs
  Font-weight: font-semibold
  Padding: space-1 space-3
  Background: white/90 backdrop-blur
  Color: green-700
  Border-radius: 6px

Title:
  Font-size: text-xl
  Font-weight: font-semibold
  Color: text-primary
  Line-height: tight
  Margin-bottom: space-3
  Lines: 2 (clamp)

Meta Info:
  Font-size: text-sm
  Color: text-tertiary
  Display: flex
  Gap: space-4
  Icons: 16px

Nutrition Quick View:
  Display: grid (4 columns)
  Gap: space-2
  Margin-top: space-4
  Font-size: text-xs
  Font-weight: font-medium

  Item:
    Text-align: center
    Label: text-tertiary
    Value: text-primary, font-semibold
```

### Recipe Hero (Detail Page)

```yaml
Height: auto
Background: gradient from surface to background
Padding: space-12 space-6 (mobile), space-16 space-8 (desktop)

Layout: 2-column (desktop)
  - Left: Image (60%)
  - Right: Info (40%)

Image:
  Aspect-ratio: 4/3
  Border-radius: 16px
  Object-fit: cover
  Shadow: shadow-lg

Title:
  Font-size: text-3xl (mobile), text-4xl (desktop)
  Font-weight: font-bold
  Color: text-primary
  Margin-bottom: space-4

Description:
  Font-size: text-lg
  Color: text-secondary
  Line-height: relaxed (1.6)
  Margin-bottom: space-6

Tags:
  Display: flex
  Gap: space-2
  Flex-wrap: wrap
  Margin-bottom: space-6

  Badge:
    Font-size: text-xs
    Padding: space-2 space-3
    Background: green-50 (light), green-900/20 (dark)
    Color: green-700 (light), green-400 (dark)
    Border: 1px solid green-200 (light), green-800 (dark)
    Border-radius: 6px

Meta Grid:
  Display: grid (2×2)
  Gap: space-4

  Item:
    Display: flex align-items-center
    Gap: space-2
    Font-size: text-sm
    Icon: 20px, text-secondary
    Label: text-secondary
    Value: text-primary, font-semibold
```

### Nutrition Card

```yaml
Background: surface-elevated
Border: 2px solid green-500
Border-radius: 12px
Padding: space-6
Shadow: shadow
Position: sticky top-24 (desktop)

Title:
  Font-size: text-lg
  Font-weight: font-bold
  Color: text-primary
  Margin-bottom: space-5

Macro Grid:
  Display: grid (2 columns)
  Gap: space-4

  Item:
    Display: flex justify-between
    Padding: space-3
    Background: background
    Border-radius: 8px
    Border-left: 4px solid [macro-color]

    Label:
      Font-size: text-sm
      Font-weight: font-medium
      Color: text-secondary

    Value:
      Font-size: text-lg
      Font-weight: font-bold
      Font-family: font-mono
      Color: text-primary

Servings Info:
  Margin-top: space-4
  Font-size: text-sm
  Color: text-tertiary
  Text-align: center
```

### Ingredients List

```yaml
Background: surface
Border: 1px solid border
Border-radius: 12px
Padding: space-6

Title:
  Font-size: text-2xl
  Font-weight: font-bold
  Color: text-primary
  Margin-bottom: space-5

Items:
  List-style: none
  Padding: 0

  Item:
    Display: flex
    Align-items: start
    Gap: space-3
    Padding: space-3
    Border-radius: 8px
    Transition: background 150ms

    Checkbox:
      Width: 20px
      Height: 20px
      Accent-color: green-500

    Text:
      Font-size: text-base
      Color: text-primary
      Line-height: relaxed

    Checked:
      Text-decoration: line-through
      Color: text-tertiary
```

### Instructions List

```yaml
Counter-style: decimal
Padding-left: space-6

Item:
  Margin-bottom: space-5
  Padding-left: space-3

  Number:
    Font-weight: font-bold
    Color: green-500
    Font-size: text-lg

  Text:
    Font-size: text-base
    Line-height: relaxed (1.7)
    Color: text-primary
```

---

## Best Practices & Guidelines

### Content Strategy

**Recipe Titles:**

- Keep under 60 characters
- Use descriptive, benefit-focused language
- Example: "Clătite Proteice cu Doar 3 Ingrediente" not "Clătite"

**Descriptions:**

- 2-3 sentences max (120-150 characters)
- Mention key benefits: "bogat în proteine", "doar 250 kcal"
- Include taste/texture appeal

**Photography:**

- Natural lighting preferred
- Clean, minimal backgrounds (white/light wood)
- Overhead shots (flat lay) for full meals
- 45° angle for stacked/layered dishes
- Always include fresh ingredients or garnish
- Aspect ratio: 16:9 (cards), 4:3 (hero)
- Format: WebP (with JPG fallback)
- Size: Max 1200px wide for hero images

**Nutritional Information:**

- Always per serving (not total recipe)
- Round to nearest 5 calories
- Show: Calories, Protein, Carbs, Fat, Fiber
- Optional: Sugar, Sodium, Saturated Fat
- Use monospace font for values (better scanning)

### UX Guidelines

**Navigation:**

- Maximum 5-6 category links
- Current page highlighted
- Smooth scroll to sections
- Mobile: hamburger menu opens from right

**Search & Filter:**

- Filter by: category, prep time (<15min, 15-30min, 30min+), calories (<300, 300-500, 500+)
- Sort by: newest, most popular, quickest, lowest calorie
- Clear active filters button

**Loading States:**

- Skeleton loaders for recipe cards
- Progressive image loading (blur placeholder)
- Smooth transitions (200-300ms)

**Micro-interactions:**

- Checkbox ingredients (satisfying click)
- Smooth hover states on cards
- Theme toggle animation
- Heart icon for favorites (future feature)

**Accessibility:**

- Color contrast ratio: 4.5:1 minimum
- Focus indicators: 2px outline, green-500
- Alt text for all images
- Semantic HTML (article, section, nav)
- Keyboard navigation support
- Screen reader labels for icons

### Performance

**Images:**

- Lazy load below fold
- Use Next.js Image component
- Multiple sizes: 640w, 750w, 828w, 1080w, 1200w
- Priority load: hero images only

**Fonts:**

- Use font-display: swap
- Subset to Latin + Romanian characters (ă, â, î, ș, ț)
- Preload primary font

**Code Splitting:**

- Dynamic import for comment sections
- Lazy load related recipes section
- Separate bundle for admin/CMS features

### SEO Requirements

**Meta Tags:**

- Unique title per recipe: "[Recipe Name] | [Site Name]"
- Description: First 150 chars of recipe description
- OG image: Recipe hero image (1200×630px)
- Schema.org Recipe markup (JSON-LD)

**URL Structure:**

- Format: /ro/[category]/[slug] or /en/[category]/[slug]
- Slugs: lowercase, hyphens, Romanian diacritics removed
- Example: /ro/mic-dejun/clatite-proteice-banane

**Content:**

- H1: Recipe title (only one per page)
- H2: Ingrediente, Instrucțiuni, Valori Nutriționale
- H3: Sub-sections if needed
- Alt text: Descriptive, include recipe name

---

## Mobile-First Breakpoints

```css
/* Mobile (default) */
/* 0 - 639px */

/* Tablet */
@media (min-width: 640px) {
  /* sm */
}

/* Tablet Large */
@media (min-width: 768px) {
  /* md */
  /* Recipe grid: 2 columns */
}

/* Desktop */
@media (min-width: 1024px) {
  /* lg */
  /* Recipe grid: 3 columns */
  /* Show sidebar on recipe pages */
}

/* Desktop Large */
@media (min-width: 1280px) {
  /* xl */
  /* Max content width: 1280px */
}
```

---

## Animation & Transitions

```css
/* Defaults */
transition-timing: cubic-bezier(0.4, 0, 0.2, 1); /* ease-in-out */
transition-duration: 200ms; /* fast interactions */

/* Specific cases */
Theme toggle: 300ms
Page transitions: 150ms
Hover effects: 200ms
Loading skeletons: 1500ms infinite
```

---

## Copy Tone & Voice

**Romanian:**

- Tu form (friendly, approachable)
- "Descoperă", "Încearcă", "Savurează"
- Focus on health benefits without being preachy
- Use emojis sparingly (💪 🥗 ⏱️)

**English:**

- Casual but professional
- "Discover", "Try", "Enjoy"
- Similar tone to Romanian version
