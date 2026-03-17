# Image Compression Automation Script
Write-Host "🖼️  Starting Image Compression..." -ForegroundColor Cyan
Write-Host ""

# Get the script's directory (should be workspace root)
$WorkspaceRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Workspace: $WorkspaceRoot" -ForegroundColor Yellow
Write-Host ""

# Check if Python script exists
$PythonScript = Join-Path $WorkspaceRoot "compress_now.py"
if (-not (Test-Path $PythonScript)) {
    Write-Host "❌ Python script not found: $PythonScript" -ForegroundColor Red
    exit 1
}

# Run Python script
Write-Host "Running compression..." -ForegroundColor Cyan
E:\Python\python.exe $PythonScript

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Compression complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Update code references: E:\Python\python.exe scripts\update_image_refs.py"
    Write-Host "  2. Test locally: npm run dev"
    Write-Host "  3. Deploy: git add . && git commit -m 'Performance: Compress images' && git push"
} else {
    Write-Host ""
    Write-Host "❌ Compression failed!" -ForegroundColor Red
}
