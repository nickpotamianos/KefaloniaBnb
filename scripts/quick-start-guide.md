# 🚀 Villa Fiscardo SEO Automation - Quick Start Guide

This guide will get your Google Search Console automation up and running in 15 minutes.

## ⏱️ Quick Setup (15 minutes)

### Step 1: Google Cloud Setup (5 minutes)

1. **Create Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Click "New Project" → Name: "Villa Fiscardo SEO"
   - Note your Project ID (e.g., `villa-fiscardo-seo-123456`)

2. **Enable APIs** (2 clicks):
   - Go to [APIs & Services > Library](https://console.cloud.google.com/apis/library)
   - Search & Enable: "Google Search Console API"
   - Search & Enable: "Web Search Indexing API"

3. **Create Service Account**:
   - Go to [APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials)
   - Click "Create Credentials" → "Service Account"
   - Name: `villa-fiscardo-seo-bot`
   - Role: Select "Viewer"
   - Click "Done"

4. **Download Service Account Key**:
   - Click on your service account
   - "Keys" tab → "Add Key" → "Create new key" → JSON
   - Save as `google-service-account-key.json` in your `scripts/` folder

### Step 2: Google Search Console Setup (3 minutes)

1. **Verify Domain** (if not done):
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add property: `villafiscardo.com`
   - Verify using HTML file upload or DNS

2. **Grant API Access**:
   - In Search Console → Settings → Users and permissions
   - Add your service account email: `villa-fiscardo-seo-bot@your-project-id.iam.gserviceaccount.com`
   - Permission: "Full"

### Step 3: Configure Environment (2 minutes)

1. **Copy Environment File**:
   ```powershell
   Copy-Item .env.example .env
   ```

2. **Edit `.env` file** with your values:
   ```bash
   GOOGLE_PROJECT_ID=villa-fiscardo-seo-123456
   GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./scripts/google-service-account-key.json
   GOOGLE_SEARCH_CONSOLE_SITE_URL=https://villafiscardo.com/
   ```

### Step 4: Test & Run (5 minutes)

1. **Test Setup**:
   ```powershell
   npm run seo:test
   ```
   If all tests pass ✅, continue to step 2.

2. **Submit URLs to Google**:
   ```powershell
   npm run seo:submit
   ```
   This will automatically submit all your SEO pages to Google Search Console.

3. **Monitor SEO Health**:
   ```powershell
   npm run seo:monitor
   ```

## 🔄 Automated Scheduling

### Option A: Windows Task Scheduler (Recommended)
```powershell
.\scripts\setup-windows-scheduler.ps1
```

### Option B: Manual NPM Scripts
- **Daily monitoring**: `npm run seo:daily`
- **Weekly reports**: `npm run seo:weekly`
- **Monthly deep analysis**: `npm run seo:monthly`

## 📊 What This Automation Does

### Immediate Benefits:
- ✅ **Faster Google Indexing**: New pages indexed within hours instead of days
- ✅ **Automated URL Submission**: All new content automatically submitted
- ✅ **SEO Health Monitoring**: Daily checks for broken links, missing meta tags
- ✅ **Performance Tracking**: Monitor rankings and click-through rates
- ✅ **Error Detection**: Catch and fix SEO issues before they hurt rankings

### Targeted Keywords:
- "villa fiscardo" (primary)
- "fiscardo villa" 
- "fiscardo villas"
- "villa kefalonia fiscardo"
- "fiscardo accommodation"
- "fiscardo vacation rental"

## 🎯 Expected Results

### Week 1-2:
- New SEO pages indexed by Google
- Improved search console data flow
- Basic ranking improvements

### Month 1:
- Significant improvement in search visibility
- Higher click-through rates from search
- Better Google My Business integration

### Month 2-3:
- First page rankings for target keywords
- Increased organic traffic
- Better conversion rates

## 🚨 Troubleshooting

### Common Issues:

1. **"API not enabled" error**:
   - Double-check both APIs are enabled in Google Cloud Console

2. **"Permission denied" error**:
   - Verify service account has permissions in Search Console
   - Check service account email is correct

3. **"File not found" error**:
   - Ensure `google-service-account-key.json` is in `scripts/` folder
   - Check `.env` file paths are correct

4. **"Quota exceeded" error**:
   - APIs have daily limits (usually 200 requests/day)
   - Automation respects rate limits automatically

### Getting Help:
- Check `scripts/reports/` for detailed logs
- Run `npm run seo:test` to diagnose issues
- Google Cloud Console shows API usage and errors

## 🔐 Security Checklist

- [ ] Service account key is in `scripts/` folder
- [ ] `.env` file is not committed to git
- [ ] `.gitignore` includes sensitive files
- [ ] Service account has minimal required permissions
- [ ] Regular key rotation scheduled (quarterly)

---

## Next Steps After Setup

1. **Monitor Google Search Console**: Check for new indexing and ranking improvements
2. **Review Weekly Reports**: Automated reports will be saved in `scripts/reports/`
3. **Optimize Content**: Use insights to improve underperforming pages
4. **Scale Up**: Add more targeted landing pages based on performance data

**🎉 You're all set! Your Villa Fiscardo website will now automatically optimize itself for better Google rankings.**
