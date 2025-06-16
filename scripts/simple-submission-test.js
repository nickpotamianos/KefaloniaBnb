#!/usr/bin/env node

/**
 * Simple URL Submission Test
 * Test submitting a single URL to verify the setup works
 */

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

async function testSubmission() {
  console.log('🔄 Villa Fiscardo - Simple URL Submission Test');
  console.log('='.repeat(50));
  
  try {
    // Initialize authentication
    console.log('🔐 Authenticating...');
    const auth = new GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
      scopes: [
        'https://www.googleapis.com/auth/webmasters',
        'https://www.googleapis.com/auth/indexing'
      ],
    });

    const authClient = await auth.getClient();
    console.log('✅ Authentication successful');

    // Test 1: Submit using Indexing API
    console.log('\n📤 Testing Indexing API submission...');
    const indexing = google.indexing({ version: 'v3', auth: authClient });
    
    const testUrl = 'https://villafiscardo.com/';
    
    try {
      const response = await indexing.urlNotifications.publish({
        requestBody: {
          url: testUrl,
          type: 'URL_UPDATED'
        }
      });
      
      console.log(`✅ Successfully submitted: ${testUrl}`);
      console.log('📊 Response:', JSON.stringify(response.data, null, 2));
      
    } catch (indexError) {
      console.log('❌ Indexing API submission failed:', indexError.message);
      console.log('💡 This might be normal - Indexing API has strict limits');
    }

    // Test 2: Check Search Console access
    console.log('\n📊 Testing Search Console access...');
    const searchConsole = google.searchconsole({ version: 'v1', auth: authClient });
    
    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;
    console.log(`🎯 Checking access to: ${siteUrl}`);
    
    try {
      const siteResponse = await searchConsole.sites.get({
        siteUrl: siteUrl
      });
      
      console.log('✅ Search Console access confirmed');
      console.log(`   Permission Level: ${siteResponse.data.permissionLevel}`);
      console.log(`   Site URL: ${siteResponse.data.siteUrl}`);
      
    } catch (siteError) {
      console.log('❌ Search Console access failed:', siteError.message);
    }

    // Test 3: List all sites to see what's available
    console.log('\n📋 Listing all available sites...');
    try {
      const sitesResponse = await searchConsole.sites.list();
      
      if (sitesResponse.data.siteEntry && sitesResponse.data.siteEntry.length > 0) {
        console.log('🏠 Available properties:');
        sitesResponse.data.siteEntry.forEach(site => {
          console.log(`   📍 ${site.siteUrl} (${site.permissionLevel})`);
        });
      } else {
        console.log('❌ No sites found');
      }
      
    } catch (listError) {
      console.log('❌ Could not list sites:', listError.message);
    }

    console.log('\n🎯 TEST COMPLETE');
    console.log('📈 If you see successful submissions above, the automation is ready!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testSubmission().catch(console.error);
