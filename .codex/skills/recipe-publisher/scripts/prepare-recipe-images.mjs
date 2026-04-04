#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const SUPPORTED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.avif',
  '.tif',
  '.tiff',
]);

const NATURAL_COLLATOR = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});


function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const part = argv[index];

    if (!part.startsWith('--')) {
      continue;
    }

    const key = part.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith('--')) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function printUsage() {
  console.log(`Usage:
  corepack pnpm recipe:prepare-images --input <dir> --slug <slug> [--output <dir>] [--hero latest|earliest|none] [--hero-file <filename>] [--max-width <px>] [--hero-height <px>] [--dry-run]

Examples:
  corepack pnpm recipe:prepare-images --input "C:\\temp\\recipe" --slug "chicken-pilaf"
  corepack pnpm recipe:prepare-images --input "C:\\temp\\recipe" --slug "chicken-pilaf" --hero-file "IMG_1004.JPG"
`);
}

async function collectFiles(inputDir) {
  const entries = await fs.readdir(inputDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (!SUPPORTED_EXTENSIONS.has(extension)) {
      continue;
    }

    const fullPath = path.join(inputDir, entry.name);
    const stats = await fs.stat(fullPath);
    const timestamp =
      Number.isFinite(stats.birthtimeMs) && stats.birthtimeMs > 0
        ? stats.birthtimeMs
        : stats.mtimeMs;

    files.push({
      fullPath,
      name: entry.name,
      timestamp,
    });
  }

  files.sort((left, right) => {
    if (left.timestamp !== right.timestamp) {
      return left.timestamp - right.timestamp;
    }

    return NATURAL_COLLATOR.compare(left.name, right.name);
  });

  return files;
}

function resolveHero(files, heroMode, heroFile) {
  if (heroFile) {
    const selected = files.find(
      (file) => file.name.toLowerCase() === heroFile.toLowerCase(),
    );

    if (!selected) {
      throw new Error(`Could not find --hero-file "${heroFile}" in the input folder.`);
    }

    return selected;
  }

  if (heroMode === 'none') {
    return null;
  }

  if (heroMode === 'earliest') {
    return files[0] ?? null;
  }

  return files[files.length - 1] ?? null;
}

async function ensureSharp() {
  try {
    const module = await import('sharp');
    return module.default;
  } catch {
    throw new Error(
      'The "sharp" package is required. Install dependencies with "corepack pnpm install" before running this script.',
    );
  }
}

async function writeImage(sharp, sourcePath, destinationPath, maxWidth, height) {
  const resizeOptions = {
    width: maxWidth,
    withoutEnlargement: true,
  };

  if (height != null) {
    resizeOptions.height = height;
    resizeOptions.fit = 'cover';
    resizeOptions.position = 'attention';
  }

  await sharp(sourcePath)
    .rotate()
    .resize(resizeOptions)
    .png({
      compressionLevel: 6,
      adaptiveFiltering: true,
      palette: false,
    })
    .toFile(destinationPath);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.input || !args.slug) {
    printUsage();
    process.exit(args.help ? 0 : 1);
  }

  const inputDir = path.resolve(args.input);
  const outputDir = path.resolve(args.output ?? path.join('public', args.slug));
  const heroMode = typeof args.hero === 'string' ? args.hero.toLowerCase() : 'latest';
  const heroFile = typeof args['hero-file'] === 'string' ? args['hero-file'] : null;
  const maxWidth = Number.parseInt(args['max-width'] ?? '1200', 10);
  const heroHeight = Number.parseInt(args['hero-height'] ?? '630', 10);
  const dryRun = Boolean(args['dry-run']);

  if (!Number.isFinite(maxWidth) || maxWidth <= 0) {
    throw new Error(`Invalid --max-width value "${args['max-width']}".`);
  }

  if (!Number.isFinite(heroHeight) || heroHeight <= 0) {
    throw new Error(`Invalid --hero-height value "${args['hero-height']}".`);
  }

  const files = await collectFiles(inputDir);

  if (files.length === 0) {
    throw new Error(`No supported image files were found in ${inputDir}.`);
  }

  const hero = resolveHero(files, heroMode, heroFile);
  const gallery = files.filter((file) => file.fullPath !== hero?.fullPath);

  const plan = {
    slug: args.slug,
    inputDir,
    outputDir,
    hero: hero
      ? {
          source: hero.fullPath,
          destination: path.join(outputDir, 'hero.png'),
        }
      : null,
    gallery: gallery.map((file, index) => ({
      source: file.fullPath,
      destination: path.join(outputDir, `${index + 1}.png`),
    })),
  };

  console.log(JSON.stringify(plan, null, 2));

  if (dryRun) {
    return;
  }

  const sharp = await ensureSharp();

  await fs.mkdir(outputDir, { recursive: true });

  if (plan.hero) {
    await writeImage(sharp, plan.hero.source, plan.hero.destination, maxWidth, heroHeight);
  }

  for (const item of plan.gallery) {
    await writeImage(sharp, item.source, item.destination, maxWidth);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});


