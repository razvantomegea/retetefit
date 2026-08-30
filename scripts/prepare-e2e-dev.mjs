import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const e2ePort = process.env.E2E_PORT ?? '3001';
const baseURL = `http://localhost:${e2ePort}`;
const lockPath = path.join(root, '.next', 'dev', 'lock');
const healthMarker = 'data-testid="home-hero"';

async function isHealthyE2eServer() {
  try {
    const response = await fetch(`${baseURL}/ro`, {
      signal: AbortSignal.timeout(5_000),
    });

    if (response.status !== 200) {
      return false;
    }

    const html = await response.text();
    return html.includes(healthMarker);
  } catch {
    return false;
  }
}

function stopProcess(pid) {
  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/PID', String(pid), '/F'], { stdio: 'ignore' });
    return;
  }

  try {
    process.kill(pid, 'SIGTERM');
  } catch {
    // Process already exited.
  }
}

function isListeningOnPort(line, port) {
  return line.includes(`:${port}`) && line.includes('LISTENING');
}

function extractPid(line) {
  const pid = Number(line.trim().split(/\s+/).at(-1));
  return Number.isInteger(pid) && pid > 0 ? pid : null;
}

function parseListeningPid(line, port) {
  if (!isListeningOnPort(line, port)) {
    return null;
  }

  return extractPid(line);
}

function stopWindowsListenersOnPort(port) {
  const result = spawnSync('netstat', ['-ano'], { encoding: 'utf8' });
  const lines = result.stdout?.split('\n') ?? [];

  for (const line of lines) {
    const pid = parseListeningPid(line, port);
    if (pid !== null) {
      stopProcess(pid);
    }
  }
}

function stopUnixListenersOnPort(port) {
  spawnSync('sh', ['-c', `lsof -ti :${port} | xargs -r kill`], {
    stdio: 'ignore',
  });
}

function stopListenersOnPort(port) {
  if (process.platform === 'win32') {
    stopWindowsListenersOnPort(port);
    return;
  }

  stopUnixListenersOnPort(port);
}

function readDevLock() {
  try {
    return JSON.parse(readFileSync(lockPath, 'utf8'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[prepare-e2e-dev] Could not read dev lock: ${message}`);
    return null;
  }
}

function stopDevServerFromLock(lock) {
  if (typeof lock.pid !== 'number') {
    return;
  }

  console.warn(
    `[prepare-e2e-dev] Stopping Next.js dev server (pid ${lock.pid}, port ${lock.port ?? '?'}) so Playwright can start e2e on port ${e2ePort}.`
  );
  stopProcess(lock.pid);
}

function clearNextDevLock() {
  if (!existsSync(lockPath)) {
    return;
  }

  const lock = readDevLock();
  if (lock !== null) {
    stopDevServerFromLock(lock);
  }

  if (existsSync(lockPath)) {
    unlinkSync(lockPath);
  }
}

if (await isHealthyE2eServer()) {
  console.log(`[prepare-e2e-dev] Reusing healthy e2e server on port ${e2ePort}.`);
  process.exit(0);
}

console.warn(
  `[prepare-e2e-dev] No healthy e2e server on port ${e2ePort}; clearing stale dev processes.`
);
stopListenersOnPort(e2ePort);
clearNextDevLock();
