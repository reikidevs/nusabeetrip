# Script untuk development dengan auto clear cache
Write-Host "🧹 Clearing .next cache..." -ForegroundColor Yellow
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "✅ Cache cleared!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No cache to clear" -ForegroundColor Cyan
}

Write-Host "🚀 Starting dev server..." -ForegroundColor Yellow
npm run dev
