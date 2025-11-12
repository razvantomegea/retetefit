import 'server-only';

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

import type { EducationalArticle, EducationalArticleFrontmatter, Locale } from '@/types';
import { isString, isValidISODate } from './validation';

const contentDirectory = path.join(process.cwd(), 'content', 'educational');

export function getAllEducationalFilePaths(locale: Locale): string[] {
  const localeDir = path.join(contentDirectory, locale);
  const filePaths: string[] = [];

  if (!fs.existsSync(localeDir)) {
    return filePaths;
  }

  const files = fs.readdirSync(localeDir);

  for (const file of files) {
    const filePath = path.join(localeDir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
      filePaths.push(filePath);
    }
  }

  return filePaths;
}

export function parseEducationalFile(filePath: string): EducationalArticle | null {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Validate all required frontmatter fields
    if (!isString(data.slug)) {
      console.error(`Invalid or missing slug in ${filePath}`);
      return null;
    }
    if (!isString(data.title)) {
      console.error(`Invalid or missing title in ${filePath}`);
      return null;
    }
    if (!isString(data.description)) {
      console.error(`Invalid or missing description in ${filePath}`);
      return null;
    }
    if (!isString(data.author)) {
      console.error(`Invalid or missing author in ${filePath}`);
      return null;
    }
    if (!isString(data.image)) {
      console.error(`Invalid or missing image in ${filePath}`);
      return null;
    }
    if (!isString(data.imageAlt)) {
      console.error(`Invalid or missing imageAlt in ${filePath}`);
      return null;
    }
    
    // Validate date fields
    if (!isValidISODate(data.publishedAt)) {
      console.error(`Invalid or missing publishedAt date in ${filePath}`);
      return null;
    }
    if (!isValidISODate(data.updatedAt)) {
      console.error(`Invalid or missing updatedAt date in ${filePath}`);
      return null;
    }

    const readingTimeResult = readingTime(content);

    // Build the EducationalArticle object with validated fields
    const article: EducationalArticle = {
      slug: data.slug,
      title: data.title,
      description: data.description,
      author: data.author,
      image: data.image,
      imageAlt: data.imageAlt,
      publishedAt: data.publishedAt,
      updatedAt: data.updatedAt,
      content,
      readingTime: Math.ceil(readingTimeResult.minutes),
    };

    return article;
  } catch (error) {
    console.error(`Error parsing educational file ${filePath}:`, error);
    return null;
  }
}

export function parseEducationalContent(content: string): { content: string } {
  return {
    content: content.trim(),
  };
}

