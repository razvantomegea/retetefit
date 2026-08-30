# Run once so Cursor discovers the repo skill via junction.

$ErrorActionPreference = "Stop"
$repo = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$cursor = Join-Path $env:USERPROFILE ".cursor\skills\recipe-publisher"

if (-not (Test-Path $repo)) { throw "Repo skill missing: $repo" }

if (Test-Path $cursor) {
  $item = Get-Item $cursor -Force
  $isReparse = [bool]($item.Attributes -band [IO.FileAttributes]::ReparsePoint)
  if ($isReparse) {
    $rawTarget = $item.Target
    if ($rawTarget -is [array]) { $rawTarget = $rawTarget[0] }
    $matchesRepo = $false
    if ($rawTarget) {
      try {
        $resolvedTarget = (Resolve-Path -LiteralPath $rawTarget).Path
        $matchesRepo = ($resolvedTarget -eq $repo)
      } catch {
        $matchesRepo = $false
      }
    }
    if ($matchesRepo) {
      Write-Host "Already linked: $cursor"
      Write-Host "  -> $repo"
      exit 0
    }
    Write-Host "Removing outdated link (target differs)…"
  } else {
    Write-Host "Removing existing folder (close Cursor first if this fails)…"
  }
  try {
    Remove-Item -Recurse -Force $cursor
  } catch {
    Write-Host ""
    Write-Host "LOCKED: $cursor"
    Write-Host "1. Quit Cursor completely (not just this chat)."
    Write-Host "2. Re-run:"
    Write-Host "   powershell -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    Write-Host ""
    throw
  }
}

cmd /c mklink /J "$cursor" "$repo"
if ($LASTEXITCODE -ne 0) { throw "mklink failed" }
Write-Host "Linked: $cursor  =>  $repo"
