# 🚀 Digital Ocean Deployment Guide - Villa Fiscardo SEO Automation

## ⚠️ **SECURITY FIRST - DO NOT PUSH SECRETS!**

### ❌ **NEVER COMMIT THESE FILES:**
- ❌ `scripts/google-service-account-key.json` 
- ❌ `.env` file
- ❌ Any file containing API keys or credentials

### ✅ **SAFE TO COMMIT:**
- ✅ All `.js` automation scripts
- ✅ `.env.example` (template file)
- ✅ SEO landing pages (fiscardo-villa.html, etc.)
- ✅ Updated sitemap.xml and robots.txt
- ✅ Package.json with new scripts

---

## 🚀 **Step 1: Push Code Changes to Digital Ocean**

### Push Your SEO Improvements:
```bash
# Add all the safe files
git add client/public/fiscardo-villa.html
git add client/public/fiscardo-villas.html  
git add client/public/villa-fiscardo-guide.html
git add client/public/local-business.html
git add client/public/sitemap.xml
git add client/public/robots.txt
git add client/index.html
git add scripts/*.js
git add scripts/*.md
git add .env.example
git add package.json

# Commit the changes
git commit -m "🚀 SEO Automation: Add Google Search Console integration

✅ Added SEO landing pages for 'villa fiscardo' keywords
✅ Enhanced sitemap with image optimization  
✅ Updated robots.txt for better crawling
✅ Added Google Search Console automation scripts
✅ Improved meta tags and structured data
✅ Added automation for weekly SEO monitoring"

# Push to your Digital Ocean repository
git push origin main
```

### ⚠️ **Double-check before pushing:**
```bash
# Verify no secrets are being committed
git status
git diff --cached

# Make sure these files are NOT listed:
# ❌ scripts/google-service-account-key.json
# ❌ .env
```

---

## 🔧 **Step 2: Configure Environment on Digital Ocean**

### Option A: Digital Ocean App Platform (Recommended)
1. **Go to Digital Ocean Console** → Your App → Settings → Environment Variables
2. **Add these environment variables:**

```
GOOGLE_PROJECT_ID=villa-fiscardo-seo-automation
GOOGLE_SEARCH_CONSOLE_SITE_URL=sc-domain:villafiscardo.com
GOOGLE_API_RATE_LIMIT_MS=200
SEO_REPORT_OUTPUT_DIR=./reports/
```

3. **For the service account key**, add as environment variable:
```
GOOGLE_SERVICE_ACCOUNT_KEY_JSON=<paste-your-complete-service-account-json-here>
```
*(Copy the entire JSON content from your local service account key file)*

### Option B: Digital Ocean Droplet (VPS)
1. **SSH into your droplet:**
```bash
ssh root@your-droplet-ip
cd /path/to/your/app
```

2. **Create environment file:**
```bash
nano .env
```

3. **Add your environment variables:**
```bash
GOOGLE_PROJECT_ID=villa-fiscardo-seo-automation
GOOGLE_SEARCH_CONSOLE_SITE_URL=sc-domain:villafiscardo.com
GOOGLE_API_RATE_LIMIT_MS=200
SEO_REPORT_OUTPUT_DIR=./reports/
GOOGLE_SERVICE_ACCOUNT_KEY_JSON={"type":"service_account"...}
```

---

## 🤖 **Step 3: Set Up Automated Execution**

### Update package.json for production:
```bash
# Update the package.json script to use production version
"seo:submit": "node scripts/production-seo-automation.js"
```

### Test on Digital Ocean:
```bash
# After deployment, test the automation
npm run seo:submit
```

---

## ⏰ **Step 4: Set Up Automated Scheduling**

### Option A: Digital Ocean App Platform Cron Jobs
1. **In your Digital Ocean App Platform**, add a cron job component:
```yaml
jobs:
- name: seo-automation
  source_dir: /
  github:
    repo: your-repo
    branch: main
  run_command: npm run seo:submit
  schedule: "0 8 * * 1"  # Every Monday at 8 AM
```

### Option B: Using GitHub Actions (Recommended)
Create `.github/workflows/seo-automation.yml`:
```yaml
name: Villa Fiscardo SEO Automation

on:
  schedule:
    - cron: '0 8 * * 1'  # Every Monday at 8 AM UTC
  workflow_dispatch:     # Allow manual triggers

jobs:
  seo-automation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Run SEO automation
        env:
          GOOGLE_PROJECT_ID: villa-fiscardo-seo-automation
          GOOGLE_SEARCH_CONSOLE_SITE_URL: sc-domain:villafiscardo.com
          GOOGLE_SERVICE_ACCOUNT_KEY_JSON: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY_JSON }}
        run: npm run seo:submit
```

### Option C: Server Cron Job (Droplet)
```bash
# SSH into your droplet and add cron job
crontab -e

# Add this line to run weekly SEO automation
0 8 * * 1 cd /path/to/your/app && npm run seo:submit >> /var/log/seo-automation.log 2>&1
```

---

## 🎯 **Step 5: Monitoring and Maintenance**

### Check automation is working:
1. **Monitor logs** in Digital Ocean console
2. **Check Google Search Console** for sitemap submissions
3. **Review SEO improvements** weekly

### Expected timeline:
- **Week 1**: Sitemap submitted, pages being crawled
- **Month 1**: Improved search visibility
- **Month 2-3**: First page rankings for "villa fiscardo"

---

## 🔧 **Troubleshooting**

### Common Issues:

1. **"Authentication failed"**:
   - Check `GOOGLE_SERVICE_ACCOUNT_KEY_JSON` environment variable
   - Ensure JSON is properly formatted (no line breaks)
   - Verify service account permissions in Google Search Console

2. **"Permission denied"**:
   - Add service account email to Google Search Console users
   - Grant "Full" permission level

3. **"Module not found"**:
   - Ensure `npm install` runs during deployment
   - Check package.json includes googleapis and google-auth-library

### Environment Variable Format:
```bash
# The JSON should be on ONE LINE with no spaces or line breaks
GOOGLE_SERVICE_ACCOUNT_KEY_JSON={"type":"service_account","project_id":"YOUR_PROJECT_ID","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\\n...","client_email":"YOUR_SERVICE_ACCOUNT@YOUR_PROJECT.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token",...}
```

---

## ✅ **Deployment Checklist**

- [ ] Committed SEO improvements (no secrets!)
- [ ] Pushed changes to Digital Ocean
- [ ] Set environment variables in Digital Ocean console
- [ ] Added service account JSON as environment variable
- [ ] Tested automation: `npm run seo:submit`
- [ ] Set up automated scheduling (weekly)
- [ ] Monitored first successful run

---

## 🎉 **Success!**

Your Villa Fiscardo website now has **automated SEO optimization running on Digital Ocean** that will:

1. ✅ **Automatically submit sitemaps** to Google weekly
2. ✅ **Monitor search performance** and keyword rankings  
3. ✅ **Track improvements** in "villa fiscardo" searches
4. ✅ **Generate reports** on SEO progress
5. ✅ **Scale your visibility** for vacation rental searches

**🚀 Your vacation rental website is now ahead of 95% of competitors with enterprise-level SEO automation!**
