# Windows Task Scheduler Setup for Villa Fiscardo SEO Automation
# This PowerShell script creates scheduled tasks for automated SEO management

# Run this script as Administrator

# Configuration
$ProjectPath = "C:\Users\Nick\Desktop\KefaloniaBnb"
$NodePath = "C:\Program Files\nodejs\node.exe"  # Adjust if Node.js is installed elsewhere

# Check if running as Administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Host "This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

Write-Host "Setting up Villa Fiscardo SEO Automation Scheduled Tasks..." -ForegroundColor Green

# Create daily SEO task
$DailyAction = New-ScheduledTaskAction -Execute $NodePath -Argument "$ProjectPath\scripts\scheduled-seo-automation.js daily" -WorkingDirectory $ProjectPath
$DailyTrigger = New-ScheduledTaskTrigger -Daily -At 8:00AM
$DailySettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
$DailyPrincipal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount

Register-ScheduledTask -TaskName "Villa Fiscardo SEO - Daily" -Action $DailyAction -Trigger $DailyTrigger -Settings $DailySettings -Principal $DailyPrincipal -Description "Daily SEO automation for Villa Fiscardo website"

Write-Host "✅ Daily SEO task created (runs at 8:00 AM daily)" -ForegroundColor Green

# Create weekly SEO task
$WeeklyAction = New-ScheduledTaskAction -Execute $NodePath -Argument "$ProjectPath\scripts\scheduled-seo-automation.js weekly" -WorkingDirectory $ProjectPath
$WeeklyTrigger = New-ScheduledTaskTrigger -Weekly -WeeksInterval 1 -DaysOfWeek Sunday -At 9:00AM
$WeeklySettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
$WeeklyPrincipal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount

Register-ScheduledTask -TaskName "Villa Fiscardo SEO - Weekly" -Action $WeeklyAction -Trigger $WeeklyTrigger -Settings $WeeklySettings -Principal $WeeklyPrincipal -Description "Weekly SEO health monitoring for Villa Fiscardo website"

Write-Host "✅ Weekly SEO task created (runs Sundays at 9:00 AM)" -ForegroundColor Green

# Create monthly SEO task
$MonthlyAction = New-ScheduledTaskAction -Execute $NodePath -Argument "$ProjectPath\scripts\scheduled-seo-automation.js monthly" -WorkingDirectory $ProjectPath
$MonthlyTrigger = New-ScheduledTaskTrigger -Weekly -WeeksInterval 4 -DaysOfWeek Sunday -At 10:00AM
$MonthlySettings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
$MonthlyPrincipal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount

Register-ScheduledTask -TaskName "Villa Fiscardo SEO - Monthly" -Action $MonthlyAction -Trigger $MonthlyTrigger -Settings $MonthlySettings -Principal $MonthlyPrincipal -Description "Monthly SEO report generation for Villa Fiscardo website"

Write-Host "✅ Monthly SEO task created (runs first Sunday of month at 10:00 AM)" -ForegroundColor Green

Write-Host "`n🎉 All scheduled tasks created successfully!" -ForegroundColor Green
Write-Host "`nScheduled Tasks:" -ForegroundColor Yellow
Write-Host "• Daily: Submits URLs for indexing (8:00 AM daily)" -ForegroundColor White
Write-Host "• Weekly: Health monitoring and performance check (Sundays 9:00 AM)" -ForegroundColor White
Write-Host "• Monthly: Comprehensive SEO report (First Sunday 10:00 AM)" -ForegroundColor White

Write-Host "`nTo view tasks:" -ForegroundColor Yellow
Write-Host "• Open Task Scheduler (taskschd.msc)" -ForegroundColor White
Write-Host "• Look for 'Villa Fiscardo SEO' tasks" -ForegroundColor White

Write-Host "`nTo manually run a task:" -ForegroundColor Yellow
Write-Host "• npm run seo:daily" -ForegroundColor White
Write-Host "• npm run seo:weekly" -ForegroundColor White
Write-Host "• npm run seo:monthly" -ForegroundColor White

Write-Host "`n⚠️ Remember to:" -ForegroundColor Red
Write-Host "• Complete Google API setup (see GOOGLE_API_SETUP.md)" -ForegroundColor White
Write-Host "• Create .env file with your credentials" -ForegroundColor White
Write-Host "• Test manual execution before relying on scheduled tasks" -ForegroundColor White
