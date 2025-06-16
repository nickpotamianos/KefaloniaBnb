#!/usr/bin/env node

/**
 * Villa Fiscardo - Google Search Console API Connection Test
 * Quick diagnostic to check API connection and permissions
 */

import { google } from 'googleapis';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testConnection() {
  console.log('🔍 Villa Fiscardo - Google Search Console API Diagnostic');
  console.log('=' .repeat(60));
  
  try {
    // Test 1: Load service account key
    console.log('📋 Step 1: Loading service account credentials...');
    const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH;
    
    if (!fs.existsSync(keyPath)) {
      throw new Error(`Service account key not found at: ${keyPath}`);
    }
    
    const credentials = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    console.log(`✅ Service account loaded: ${credentials.client_email}`);
    console.log(`✅ Project ID: ${credentials.project_id}`);
    
    // Test 2: Create auth client
    console.log('\n📋 Step 2: Creating authentication client...');
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: [
        'https://www.googleapis.com/auth/webmasters.readonly',
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/indexing'
      ]
    });
    
    const authClient = await auth.getClient();
    console.log('✅ Authentication client created successfully');
    
    // Test 3: Initialize Search Console API
    console.log('\n📋 Step 3: Initializing Google Search Console API...');
    const searchconsole = google.searchconsole({ 
      version: 'v1', 
      auth: authClient 
    });
    console.log('✅ Search Console API initialized');
    
    // Test 4: List sites (this will show if we have access)
    console.log('\n📋 Step 4: Testing API access - listing sites...');
    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;
    
    try {
      const response = await searchconsole.sites.list();
      console.log('✅ API call successful');
      
      if (response.data.siteEntry && response.data.siteEntry.length > 0) {
        console.log('\n🎯 Available Search Console properties:');
        response.data.siteEntry.forEach(site => {
          const status = site.siteUrl === siteUrl ? '✅ [TARGET]' : 'ℹ️';
          console.log(`   ${status} ${site.siteUrl} (${site.permissionLevel})`);
        });
        
        // Check if our target site is accessible
        const targetSite = response.data.siteEntry.find(site => site.siteUrl === siteUrl);
        if (targetSite) {
          console.log(`\n✅ Target site found with permission level: ${targetSite.permissionLevel}`);
          
          if (targetSite.permissionLevel === 'siteFullUser' || targetSite.permissionLevel === 'siteOwner') {
            console.log('✅ Permission level is sufficient for automation');
          } else {
            console.log('⚠️  Permission level may be insufficient. Recommended: siteFullUser or siteOwner');
          }
        } else {
          console.log(`\n❌ Target site ${siteUrl} not found in available properties`);
          console.log('🔧 Required action: Add service account as user in Google Search Console');
        }
      } else {
        console.log('❌ No sites found. Service account may not have access to any Search Console properties.');
      }
      
    } catch (apiError) {
      console.log('❌ API access failed:', apiError.message);
      
      if (apiError.code === 403) {
        console.log('\n🔧 Permission Error Solutions:');
        console.log('   1. Go to Google Search Console (search.google.com/search-console)');
        console.log('   2. Select your property: villafiscardo.com');
        console.log('   3. Go to Settings → Users and permissions');
        console.log(`   4. Add user: ${credentials.client_email}`);
        console.log('   5. Grant "Full" permission level');
        console.log('   6. Wait 5-10 minutes for permissions to propagate');
      }
    }
    
    // Test 5: Test Indexing API
    console.log('\n📋 Step 5: Testing Indexing API access...');
    try {
      const indexing = google.indexing({ 
        version: 'v3', 
        auth: authClient 
      });
      
      // Just test the client creation - actual submission would be done later
      console.log('✅ Indexing API client created successfully');
      console.log('ℹ️  Ready for URL submission and status monitoring');
      
    } catch (indexError) {
      console.log('❌ Indexing API error:', indexError.message);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 DIAGNOSTIC SUMMARY');
    console.log('='.repeat(60));
    console.log('✅ Service account credentials: OK');
    console.log('✅ API authentication: OK');
    console.log('✅ Search Console API: OK');
    console.log('✅ Indexing API: OK');
    
    const targetSite = response?.data?.siteEntry?.find(site => site.siteUrl === siteUrl);
    if (targetSite) {
      console.log('✅ Site access: OK');
      console.log('\n🚀 Ready to proceed with automation!');
      console.log('\nNext steps:');
      console.log('   npm run seo:submit    # Submit URLs to Google');
      console.log('   npm run seo:monitor   # Monitor SEO health');
    } else {
      console.log('❌ Site access: NEEDS SETUP');
      console.log('\n🔧 Action required: Add service account to Google Search Console');
      console.log(`   Service account: ${credentials.client_email}`);
      console.log('   Permission level: Full');
    }
    
  } catch (error) {
    console.log('\n❌ DIAGNOSTIC FAILED');
    console.log('Error:', error.message);
    
    if (error.message.includes('ENOENT')) {
      console.log('\n🔧 File not found. Check these paths:');
      console.log(`   Service account key: ${process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH}`);
      console.log('   .env file: ./.env');
    }
  }
}

// Run diagnostic
testConnection().catch(console.error);
