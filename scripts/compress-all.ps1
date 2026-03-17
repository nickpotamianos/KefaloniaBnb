# Image Compression - Complete Automation
# 
# This will compress all images and update references automatically

Write-Host "🖼️  Villa Fiscardo - Image Compression Tool`n" -ForegroundColor Cyan
Write-Host "=" -NoNewline -ForegroundColor Gray
Write-Host ("=" * 69) -ForegroundColor Gray

# Check if Python is installed
Write-Host "`n📋 Checking requirements..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "   ✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Python not found!" -ForegroundColor Red
    Write-Host "`n   Please install Python from: https://www.python.org/downloads/" -ForegroundColor Yellow
    Write-Host "   Then run this script again.`n" -ForegroundColor Yellow
    exit 1
}

# Check if Pillow is installed
Write-Host "`n📦 Checking Pillow (image library)..." -ForegroundColor Yellow
$pillowCheck = python -c "import PIL; print('installed')" 2>&1

if ($pillowCheck -match "installed") {
    Write-Host "   ✅ Pillow already installed" -ForegroundColor Green
} else {
    Write-Host "   📥 Installing Pillow..." -ForegroundColor Yellow
    python -m pip install Pillow
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   ✅ Pillow installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Failed to install Pillow" -ForegroundColor Red
        Write-Host "`n   Try manually: pip install Pillow`n" -ForegroundColor Yellow
        exit 1
    }
}

# Confirm before proceeding
Write-Host "`n⚠️  WARNING:" -ForegroundColor Yellow
Write-Host "   This will:" -ForegroundColor White
Write-Host "   • Backup all images to images-backup/" -ForegroundColor White
Write-Host "   • Convert all images to WebP format" -ForegroundColor White
Write-Host "   • Update all code references (.jpg/.png → .webp)" -ForegroundColor White
Write-Host "   • Save ~25-30MB (75% size reduction)`n" -ForegroundColor White

$confirmation = Read-Host "   Continue? (yes/no)"

if ($confirmation -ne "yes") {
    Write-Host "`n❌ Cancelled by user.`n" -ForegroundColor Red
    exit 0
}

# Step 1: Compress images
Write-Host "`n" -NoNewline
Write-Host "=" -NoNewline -ForegroundColor Gray
Write-Host ("=" * 69) -ForegroundColor Gray
Write-Host "STEP 1: Compressing Images" -ForegroundColor Cyan
Write-Host "=" -NoNewline -ForegroundColor Gray
Write-Host ("=" * 69) -ForegroundColor Gray
Write-Host ""

python scripts/compress_images.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Image compression failed!`n" -ForegroundColor Red
    exit 1
}

# Step 2: Update references
Write-Host "`n" -NoNewline
Write-Host "=" -NoNewline -ForegroundColor Gray
Write-Host ("=" * 69) -ForegroundColor Gray
Write-Host "STEP 2: Updating Code References" -ForegroundColor Cyan
Write-Host "=" -NoNewline -ForegroundColor Gray
Write-Host ("=" * 69) -ForegroundColor Gray
Write-Host ""

python scripts/update_image_refs.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Reference update failed!`n" -ForegroundColor Red
    exit 1
}

# Success!
Write-Host "`n" -NoNewline
Write-Host "=" -NoNewline -ForegroundColor Gray
Write-Host ("=" * 69) -ForegroundColor Gray
Write-Host "✅ ALL DONE!" -ForegroundColor Green
Write-Host "=" -NoNewline -ForegroundColor Gray
Write-Host ("=" * 69) -ForegroundColor Gray

Write-Host "`n🎉 Image compression complete!" -ForegroundColor Green
Write-Host "`n📊 Expected improvements:" -ForegroundColor Cyan
Write-Host "   • Page size: 49MB → 15MB (-34MB)" -ForegroundColor White
Write-Host "   • LCP: 8.3s → 2.0s (-6.3s)" -ForegroundColor White
Write-Host "   • Performance score: 63 → 95-100 (+32-37)" -ForegroundColor White

Write-Host "`n🚀 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Test locally:" -ForegroundColor White
Write-Host "      npm run dev" -ForegroundColor Gray
Write-Host "   2. Check all images load correctly" -ForegroundColor White
Write-Host "   3. Deploy:" -ForegroundColor White
Write-Host "      git add ." -ForegroundColor Gray
Write-Host "      git commit -m 'Performance: Compress images to WebP (-34MB)'" -ForegroundColor Gray
Write-Host "      git push origin main" -ForegroundColor Gray

Write-Host "`n💡 Tip: If something breaks, restore from images-backup/ folder`n" -ForegroundColor Cyan
