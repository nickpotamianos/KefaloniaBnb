# Google Search Console API Setup Guide

This guide will help you set up automated Google Search Console API integration for Villa Fiscardo.

## Prerequisites

1. Google Cloud Console account
2. Node.js installed
3. Access to your Google Search Console property

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Name it "Villa Fiscardo SEO Automation"

## Step 2: Enable Required APIs

Enable these APIs in your Google Cloud project:

1. **Google Search Console API**
   - Go to APIs & Services > Library
   - Search for "Google Search Console API"
   - Click "Enable"

2. **Google Indexing API** (for faster indexing)
   - Search for "Web Search Indexing API"
   - Click "Enable"

## Step 3: Create Service Account

1. Go to APIs & Services > Credentials
2. Click "Create Credentials" > "Service Account"
3. Name: "villa-fiscardo-seo-bot"
4. Description: "Automated SEO management for Villa Fiscardo"
5. Click "Create and Continue"
6. Grant roles:
   - "Viewer" role for basic access
   - "Search Console API User" (if available)
7. Click "Done"

## Step 4: Generate Service Account Key

1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the key file
6. Rename it to `google-service-account-key.json`
7. Place it in your project's `scripts/` folder
8. **IMPORTANT**: Add this file to `.gitignore` - never commit credentials!

## Step 5: Verify Domain Ownership

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add villafiscardo.com as a property if not already added
3. Verify ownership using one of these methods:
   - HTML file upload
   - HTML tag
   - DNS record
   - Google Analytics
   - Google Tag Manager

## Step 6: Grant API Access

1. In Google Search Console, go to Settings > Users and permissions
2. Add your service account email as a user with "Full" permissions
3. The service account email looks like: `villa-fiscardo-seo-bot@your-project-id.iam.gserviceaccount.com`

## Environment Variables Setup

Create a `.env` file in your project root with:

```
GOOGLE_SERVICE_ACCOUNT_KEY_PATH=./scripts/google-service-account-key.json
GOOGLE_SEARCH_CONSOLE_SITE_URL=https://villafiscardo.com/
GOOGLE_PROJECT_ID=your-google-cloud-project-id
```

## Security Notes

- Never commit service account keys to version control
- Store credentials securely
- Use environment variables for sensitive data
- Regularly rotate service account keys
- Monitor API usage and quotas

## Next Steps

After completing this setup:
1. Run the automated URL submission script
2. Set up monitoring for indexing status
3. Schedule regular SEO health checks
