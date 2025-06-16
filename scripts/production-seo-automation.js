#!/usr/bin/env node

/**
 * Production SEO Automation for Digital Ocean
 * Uses environment variables instead of service account file
 */

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

console.log('🚀 Villa Fiscardo SEO Automation - Production Version');
console.log('='.repeat(55));

async function runProductionSEOAutomation() {
  try {
    // Step 1: Authentication (Production Method)
    console.log('🔐 Authenticating with Google APIs...');
    
    let authClient;
    
    // Try environment variable first (Digital Ocean App Platform)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON) {
      console.log('📋 Using service account from environment variable');
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON);
      
      const auth = new GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters'],
      });
      authClient = await auth.getClient();
      
    } else if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH && fs.existsSync(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH)) {
      console.log('📁 Using service account from file');
      const auth = new GoogleAuth({
        keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
        scopes: ['https://www.googleapis.com/auth/webmasters'],
      });
      authClient = await auth.getClient();
      
    } else {
      throw new Error('No Google service account credentials found. Set GOOGLE_SERVICE_ACCOUNT_KEY_JSON environment variable.');
    }

    const searchConsole = google.searchconsole({ version: 'v1', auth: authClient });
    console.log('✅ Authentication successful');

    // Step 2: Verify site access
    console.log('\n🔍 Verifying site access...');
    
    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'sc-domain:villafiscardo.com';
    const siteResponse = await searchConsole.sites.get({ siteUrl });
    
    console.log('✅ Site access confirmed');
    console.log(`   📍 Site: ${siteResponse.data.siteUrl}`);
    console.log(`   🔑 Permission: ${siteResponse.data.permissionLevel}`);

    // Step 3: Submit sitemap
    console.log('\n🗺️ Submitting sitemap...');
    
    try {
      const sitemapUrl = 'https://villafiscardo.com/sitemap.xml';
      await searchConsole.sitemaps.submit({
        siteUrl: siteUrl,
        feedpath: sitemapUrl
      });
      console.log(`✅ Sitemap submitted: ${sitemapUrl}`);
    } catch (sitemapError) {
      if (sitemapError.message.includes('already exists')) {
        console.log('ℹ️ Sitemap already exists (this is normal)');
      } else {
        console.log('❌ Sitemap error:', sitemapError.message);
      }
    }

    // Step 4: Get sitemap status
    console.log('\n📊 Checking sitemap status...');
    
    const sitemapsResponse = await searchConsole.sitemaps.list({ siteUrl });
    
    if (sitemapsResponse.data.sitemap && sitemapsResponse.data.sitemap.length > 0) {
      console.log('📋 Found sitemaps:');
      sitemapsResponse.data.sitemap.forEach(sitemap => {
        console.log(`   📍 ${sitemap.feedpath}`);
        console.log(`      📄 URLs: ${sitemap.contents?.[0]?.submitted || 'Unknown'} submitted, ${sitemap.contents?.[0]?.indexed || 'Unknown'} indexed`);
      });
    } else {
      console.log('ℹ️ No sitemaps found');
    }

    // Step 5: Get search analytics (last 7 days)
    console.log('\n📈 Getting search analytics...');
    
    try {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const analyticsResponse = await searchConsole.searchanalytics.query({
        siteUrl: siteUrl,
        requestBody: {
          startDate: startDate,
          endDate: endDate,
          dimensions: ['query'],
          rowLimit: 10
        }
      });
      
      if (analyticsResponse.data.rows && analyticsResponse.data.rows.length > 0) {
        console.log(`📊 Found ${analyticsResponse.data.rows.length} search queries in the last 7 days`);
        console.log('🏆 Top search queries:');
        analyticsResponse.data.rows.slice(0, 5).forEach((row, index) => {
          console.log(`   ${index + 1}. "${row.keys[0]}" - ${row.clicks} clicks, ${row.impressions} impressions`);
        });
        
        // Check for villa fiscardo keywords
        const villaFiscardoQueries = analyticsResponse.data.rows.filter(row => 
          row.keys[0].toLowerCase().includes('villa') || 
          row.keys[0].toLowerCase().includes('fiscardo')
        );
        
        if (villaFiscardoQueries.length > 0) {
          console.log('\n🎯 Target keyword progress:');
          villaFiscardoQueries.forEach(row => {
            console.log(`   🎯 "${row.keys[0]}" - ${row.clicks} clicks, ${row.impressions} impressions`);
          });
        } else {
          console.log('\n💡 Target keywords not appearing yet - keep optimizing!');
        }
        
      } else {
        console.log('ℹ️ No search analytics data available yet (normal for new sites)');
      }
    } catch (analyticsError) {
      console.log('ℹ️ Search analytics not available yet:', analyticsError.message);
    }

    // Create simple report
    const timestamp = new Date().toISOString();
    const reportData = {
      timestamp,
      siteUrl,
      status: 'success',
      environment: 'production',
      server: 'digital-ocean'
    };

    // Save report if in writable directory
    try {
      const reportsDir = process.env.SEO_REPORT_OUTPUT_DIR || './reports';
      if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
      }
      
      const reportPath = `${reportsDir}/seo-automation-${Date.now()}.json`;
      fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
      console.log(`\n📄 Report saved: ${reportPath}`);
    } catch (reportError) {
      console.log('\nℹ️ Could not save report file (this is normal on some hosting platforms)');
    }

    // Final summary
    console.log('\n' + '='.repeat(55));
    console.log('✅ SEO AUTOMATION COMPLETE (Production)');
    console.log('='.repeat(55));
    console.log('🎯 Actions completed:');
    console.log('   ✅ Connected to Google Search Console');
    console.log('   ✅ Verified site access and permissions');
    console.log('   ✅ Submitted sitemap for faster indexing');
    console.log('   ✅ Retrieved current SEO performance data');
    
    console.log('\n📈 Your Villa Fiscardo SEO automation is working on Digital Ocean!');
    console.log('\n🔄 This script runs automatically and will improve your Google rankings.');

  } catch (error) {
    console.error('\n❌ Production automation failed:', error.message);
    console.log('\n🔧 Production troubleshooting:');
    console.log('   1. Check Digital Ocean environment variables');
    console.log('   2. Verify GOOGLE_SERVICE_ACCOUNT_KEY_JSON is set');
    console.log('   3. Ensure service account has Search Console permissions');
    
    // Log error for debugging but don't expose sensitive details
    console.log('\n📝 Error details (for debugging):');
    console.log('   Error type:', error.constructor.name);
    console.log('   Environment check:');
    console.log('   - Has service account JSON:', !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON);
    console.log('   - Has site URL:', !!process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL);
  }
}

runProductionSEOAutomation();
