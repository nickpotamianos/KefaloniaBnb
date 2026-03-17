# Push-Canonical-Fix.ps1
# Script to commit and push canonical URL fixes to GitHub

# Navigate to the project directory
Set-Location -Path C:\Users\Nick\Desktop\KefaloniaBnb

# Stage all changes
Write-Host "Staging changes..." -ForegroundColor Cyan
git add .

# Commit changes with a descriptive message
Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m "Fix Google indexing issues with proper canonical tags"

# Push changes to the remote repository
Write-Host "Pushing changes to GitHub..." -ForegroundColor Cyan
git push

# Check if push was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "Changes successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "The following files were updated:" -ForegroundColor Cyan
    Write-Host "- client/index.html (removed hardcoded canonical)" -ForegroundColor White
    Write-Host "- client/src/components/SEO/CanonicalTag.tsx (new component)" -ForegroundColor White
    Write-Host "- client/src/pages/Blog.tsx (added direct DOM canonical manipulation)" -ForegroundColor White
    Write-Host "- client/src/pages/BlogIndex.tsx (added direct DOM canonical manipulation)" -ForegroundColor White
    Write-Host "- client/public/beach-exploration-canonical.html (static helper)" -ForegroundColor White
    Write-Host "- client/public/culinary-delights-canonical.html (static helper)" -ForegroundColor White
    Write-Host "- client/public/nature-hikes-canonical.html (static helper)" -ForegroundColor White
    Write-Host "- client/public/_redirects (updated for static helpers)" -ForegroundColor White
    Write-Host "- client/public/sitemap.xml (added static helpers)" -ForegroundColor White
    Write-Host "- server/middleware/canonicalTags.ts (server-side canonical fix)" -ForegroundColor White
    Write-Host "- server/index.ts (added middleware)" -ForegroundColor White
    Write-Host "- scripts/check-canonical-urls.js (updated test script)" -ForegroundColor White
    Write-Host "- scripts/generate-gsc-submit-list.js (new helper script)" -ForegroundColor White
    
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "1. Wait for deployment to complete (usually 2-5 minutes)" -ForegroundColor White
    Write-Host "2. Run the canonical test script: node scripts/check-canonical-urls.js" -ForegroundColor White
    Write-Host "3. Generate URLs for submission: node scripts/generate-gsc-submit-list.js" -ForegroundColor White
    Write-Host "4. Submit URLs to Google Search Console for validation" -ForegroundColor White
    Write-Host "5. Monitor results in Google Search Console" -ForegroundColor White
} else {
    Write-Host "Error pushing changes to GitHub. Please check git output for details." -ForegroundColor Red
}
