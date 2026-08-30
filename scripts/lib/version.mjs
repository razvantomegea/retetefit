import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

export function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim();
}

const STABLE_TAG_PATTERN = /^v\d+\.\d+\.\d+$/;

const SEMVER_PATTERN =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

/** Latest stable release tag (vMAJOR.MINOR.PATCH). Pre-release tags are ignored. */
export function getLastTagVersion() {
  try {
    const out = execSync('git tag -l "v*" --sort=-version:refname', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    const latest = out
      .split('\n')
      .filter(Boolean)
      .find((tag) => STABLE_TAG_PATTERN.test(tag));
    return latest ? latest.slice(1) : null;
  } catch {
    return null;
  }
}

export function readPkgVersion() {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  if (typeof pkg.version !== 'string' || pkg.version.trim() === '') {
    throw new Error('package.json missing version field');
  }
  return pkg.version;
}

const APP_VERSION_FILE = 'lib/app-version.ts';
// Accept single or double quotes (Prettier may rewrite either form).
const PACKAGED_APP_VERSION_PATTERN = /export const PACKAGED_APP_VERSION = (["'])([^"']+)\1;/;

export function readAppVersionFile() {
  const content = readFileSync(APP_VERSION_FILE, 'utf8');
  const match = content.match(PACKAGED_APP_VERSION_PATTERN);
  if (!match) {
    throw new Error(`${APP_VERSION_FILE} missing PACKAGED_APP_VERSION export`);
  }
  return match[2];
}

export function writeAppVersionFile(version) {
  if (typeof version !== 'string' || !SEMVER_PATTERN.test(version)) {
    throw new Error(`Invalid version "${version}": expected a valid semantic version (e.g. 1.0.0)`);
  }
  const content = readFileSync(APP_VERSION_FILE, 'utf8');
  if (!PACKAGED_APP_VERSION_PATTERN.test(content)) {
    throw new Error(`${APP_VERSION_FILE} missing PACKAGED_APP_VERSION export`);
  }
  const next = content.replace(
    PACKAGED_APP_VERSION_PATTERN,
    `export const PACKAGED_APP_VERSION = "${version}";`
  );
  writeFileSync(APP_VERSION_FILE, next);
}

export function writePkgVersion(version) {
  if (typeof version !== 'string' || !SEMVER_PATTERN.test(version)) {
    throw new Error(`Invalid version "${version}": expected a valid semantic version (e.g. 1.0.0)`);
  }
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  pkg.version = version;
  writeFileSync('package.json', `${JSON.stringify(pkg, null, 2)}\n`);
  writeAppVersionFile(version);
}

const PATCH_VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

function bumpPatch(version) {
  if (!PATCH_VERSION_PATTERN.test(version)) {
    throw new Error(
      `Invalid version "${version}": expected exactly three numeric parts (e.g. 1.0.0)`
    );
  }
  const [major, minor, patch] = version.split('.').map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

function compareVersions(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

export function nextReleaseVersion({ lastTagVersion, currentVersion }) {
  if (lastTagVersion === null) {
    if (currentVersion !== '1.0.0') {
      throw new Error(`First release requires package.json version 1.0.0, got ${currentVersion}`);
    }
    return '1.0.0';
  }

  if (compareVersions(currentVersion, lastTagVersion) <= 0) {
    return bumpPatch(lastTagVersion);
  }

  return currentVersion;
}

export function assertVersionFilesInSync() {
  const pkgVersion = readPkgVersion();
  const appVersion = readAppVersionFile();
  if (appVersion !== pkgVersion) {
    throw new Error(
      `${APP_VERSION_FILE} (${appVersion}) must match package.json (${pkgVersion}). Run: pnpm version:bump`
    );
  }
}

export function assertReleaseReady({ lastTagVersion, currentVersion }) {
  assertVersionFilesInSync();

  if (lastTagVersion === null) {
    if (currentVersion !== '1.0.0') {
      throw new Error(`First release requires package.json version 1.0.0, got ${currentVersion}`);
    }
    return;
  }

  if (compareVersions(currentVersion, lastTagVersion) <= 0) {
    throw new Error(
      `package.json version ${currentVersion} must be greater than latest tag v${lastTagVersion}. Run: pnpm version:bump`
    );
  }
}
