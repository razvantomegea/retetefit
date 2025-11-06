import 'server-only';

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import { Category, Locale, Recipe, RecipeFrontmatter } from '@/types';

export const recipesDirectory = path.join(process.cwd(), 'content', 'recipes');

export function getRecipeFilePath(locale: Locale, category: Category, slug: string): string {
  return path.join(recipesDirectory, locale, category, `${slug}.md`);
}

export function getAllRecipeFilePaths(locale: Locale): string[] {
  const localeDir = path.join(recipesDirectory, locale);
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const filePaths: string[] = [];
  const categories = fs.readdirSync(localeDir, { withFileTypes: true });

  for (const categoryDir of categories) {
    if (categoryDir.isDirectory()) {
      const categoryPath = path.join(localeDir, categoryDir.name);
      const files = fs.readdirSync(categoryPath);
      for (const file of files) {
        if (file.endsWith('.md')) {
          filePaths.push(path.join(categoryPath, file));
        }
      }
    }
  }

  return filePaths;
}

export function parseRecipeFile(filePath: string): Recipe | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate required frontmatter fields
    if (!data.slug || !data.title || !data.category || !data.lang) {
      return null;
    }

    const readingTimeResult = readingTime(content);

    return {
      ...(data as RecipeFrontmatter),
      content,
      readingTime: Math.ceil(readingTimeResult.minutes),
    };
  } catch (error) {
    console.error(`Error parsing recipe file ${filePath}:`, error);
    return null;
  }
}
