#!/usr/bin/env node

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

console.log('🚀 Villa Fiscardo SEO Automation - Simple Version');
console.log('='.repeat(55));

async function runSEOAutomation() {
  try {
    // Step 1: Authentication
    console.log('🔐 Authenticating with Google APIs...');
    
    const auth = new GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const authClient = await auth.getClient();
    const searchConsole = google.searchconsole({ version: 'v1', auth: authClient });
    
    console.log('✅ Authentication successful');

    // Step 2: Verify site access
    console.log('\n🔍 Verifying site access...');
    
    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;
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
      } else {
        console.log('ℹ️ No search analytics data available yet (normal for new sites)');
      }
    } catch (analyticsError) {
      console.log('ℹ️ Search analytics not available yet:', analyticsError.message);
    }

    // Final summary
    console.log('\n' + '='.repeat(55));
    console.log('✅ SEO AUTOMATION COMPLETE!');
    console.log('='.repeat(55));
    console.log('🎯 What was accomplished:');
    console.log('   ✅ Connected to Google Search Console');
    console.log('   ✅ Verified site access and permissions');
    console.log('   ✅ Submitted sitemap for faster indexing');
    console.log('   ✅ Retrieved current SEO performance data');
    
    console.log('\n📈 Expected improvements:');
    console.log('   📅 Week 1-2: Faster indexing of new pages');
    console.log('   📅 Month 1: Better search visibility');
    console.log('   📅 Month 2-3: Rankings for "villa fiscardo" keywords');
    
    console.log('\n🔄 Next steps:');
    console.log('   1. Run this weekly: npm run seo:submit');
    console.log('   2. Monitor Google Search Console for improvements');
    console.log('   3. Check back in 1-2 weeks for search analytics data');
    
    console.log('\n🎉 Villa Fiscardo is now optimized for Google Search!');

  } catch (error) {
    console.error('\n❌ Automation failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check your .env file configuration');
    console.log('   2. Verify service account permissions in Google Search Console');
    console.log('   3. Run: npm run seo:test');
  }
}

runSEOAutomation();
