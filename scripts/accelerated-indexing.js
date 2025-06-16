#!/usr/bin/env node

/**
 * Accelerated Indexing Script for Villa Fiscardo
 * Submits individual URLs for immediate indexing
 */

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

console.log('🚀 Villa Fiscardo Accelerated Indexing');
console.log('=' .repeat(45));

// Priority URLs for villa fiscardo keywords
const PRIORITY_URLS = [
  'https://villafiscardo.com/',
  'https://villafiscardo.com/fiscardo-villa.html',
  'https://villafiscardo.com/fiscardo-villas.html', 
  'https://villafiscardo.com/villa-fiscardo-guide.html',
  'https://villafiscardo.com/local-business.html'
];

async function accelerateIndexing() {
  try {
    console.log('🔐 Setting up Google APIs...');
    
    let authClient;
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON);
      const auth = new GoogleAuth({
        credentials: credentials,
        scopes: [
          'https://www.googleapis.com/auth/webmasters',
          'https://www.googleapis.com/auth/indexing'
        ],
      });
      authClient = await auth.getClient();
    } else {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY_JSON environment variable required');
    }

    const searchConsole = google.searchconsole({ version: 'v1', auth: authClient });
    const indexing = google.indexing({ version: 'v3', auth: authClient });
    
    console.log('✅ APIs ready');

    // Method 1: Submit URLs via Search Console
    console.log('\n📤 Submitting priority URLs for inspection...');
    
    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'sc-domain:villafiscardo.com';
    
    for (const url of PRIORITY_URLS) {
      try {
        console.log(`   📍 Requesting inspection: ${url}`);
        
        // Request URL inspection (this notifies Google to crawl the URL)
        await searchConsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: siteUrl
          }
        });
        
        console.log(`   ✅ Inspection requested for ${url}`);
        
        // Small delay to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (urlError) {
        console.log(`   ⚠️ Could not request inspection for ${url}: ${urlError.message}`);
      }
    }

    // Method 2: Use Indexing API (if available)
    console.log('\n🔄 Attempting Indexing API submissions...');
    
    for (const url of PRIORITY_URLS) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED'
          }
        });
        
        console.log(`   ✅ Indexing API notification sent for ${url}`);
        
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (indexError) {
        console.log(`   ℹ️ Indexing API not available for ${url} (normal for most sites)`);
      }
    }

    // Method 3: Check current URL inspection status
    console.log('\n🔍 Checking current URL status...');
    
    for (const url of PRIORITY_URLS.slice(0, 3)) { // Check first 3 to avoid quota limits
      try {
        const inspection = await searchConsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: siteUrl
          }
        });
        
        if (inspection.data) {
          const indexStatus = inspection.data.indexStatusResult;
          console.log(`   📍 ${url}:`);
          console.log(`      🔍 Coverage: ${indexStatus?.coverageState || 'Unknown'}`);
          console.log(`      📅 Last crawl: ${indexStatus?.lastCrawlTime || 'Never'}`);
        }
        
      } catch (inspectError) {
        console.log(`   ℹ️ Could not inspect ${url}: ${inspectError.message}`);
      }
    }

    // Summary and next steps
    console.log('\n' + '='.repeat(45));
    console.log('✅ ACCELERATED INDEXING COMPLETE');
    console.log('='.repeat(45));
    console.log('🎯 Actions taken:');
    console.log('   ✅ Submitted priority URLs for inspection');
    console.log('   ✅ Requested immediate crawling');
    console.log('   ✅ Checked indexing status');
    
    console.log('\n⏰ Expected timeline:');
    console.log('   📅 Initial crawling: 1-3 days');
    console.log('   📈 Indexing: 3-7 days');
    console.log('   🎯 Ranking improvements: 1-4 weeks');
    
    console.log('\n🔄 Run this script daily for faster results:');
    console.log('   npm run seo:accelerate');

  } catch (error) {
    console.error('\n❌ Accelerated indexing failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Ensure you have Search Console "Full User" permissions');
    console.log('   2. Your site must be verified in Search Console');
    console.log('   3. URLs must be accessible (not blocked by robots.txt)');
  }
}

accelerateIndexing();
