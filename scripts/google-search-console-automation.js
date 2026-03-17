#!/usr/bin/env node

/**
 * Google Search Console Automated URL Submission
 * This script automatically submits URLs to Google Search Console for indexing
 */

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class GoogleSearchConsoleManager {
  constructor() {
    this.siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'https://villafiscardo.com/';
    this.serviceAccountKeyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './scripts/google-service-account-key.json';
    
    // URLs to submit for indexing
    this.urlsToSubmit = [
      'https://villafiscardo.com/',
      'https://villafiscardo.com/fiscardo-villa.html',
      'https://villafiscardo.com/fiscardo-villas.html',
      'https://villafiscardo.com/villa-fiscardo-guide.html',
      'https://villafiscardo.com/local-business.html',
      'https://villafiscardo.com/blog',
      'https://villafiscardo.com/blog/beach-exploration',
      'https://villafiscardo.com/blog/culinary-delights',
      'https://villafiscardo.com/blog/nature-hikes',
      'https://villafiscardo.com/blog/island-cruising',
      'https://villafiscardo.com/about'
    ];
  }

  /**
   * Initialize Google Auth
   */
  async initializeAuth() {
    try {
      if (!fs.existsSync(this.serviceAccountKeyPath)) {
        throw new Error(`Service account key file not found: ${this.serviceAccountKeyPath}`);
      }

      const auth = new GoogleAuth({
        keyFile: this.serviceAccountKeyPath,
        scopes: [
          'https://www.googleapis.com/auth/webmasters',
          'https://www.googleapis.com/auth/webmasters.readonly',
          'https://www.googleapis.com/auth/indexing'
        ],
      });

      this.authClient = await auth.getClient();
      this.searchConsole = google.searchconsole({ version: 'v1', auth: this.authClient });
      this.indexing = google.indexing({ version: 'v3', auth: this.authClient });
      
      console.log('✅ Google API authentication successful');
      return true;
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      return false;
    }
  }

  /**
   * Submit URLs using Google Indexing API (faster)
   */
  async submitURLsForIndexing() {
    console.log('\n🔄 Submitting URLs for indexing...');
    
    const results = [];
    
    for (const url of this.urlsToSubmit) {
      try {
        const response = await this.indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED'
          }
        });
        
        console.log(`✅ Submitted: ${url}`);
        results.push({ url, status: 'success', response: response.data });
        
        // Rate limiting - wait 100ms between requests
        await this.sleep(100);
        
      } catch (error) {
        console.error(`❌ Failed to submit ${url}:`, error.message);
        results.push({ url, status: 'error', error: error.message });
      }
    }
    
    return results;
  }

  /**
   * Submit sitemap to Google Search Console
   */
  async submitSitemap() {
    try {
      console.log('\n🗺️ Submitting sitemap...');
      
      const sitemapUrl = `${this.siteUrl}sitemap.xml`;
      
      const response = await this.searchConsole.sitemaps.submit({
        siteUrl: this.siteUrl,
        feedpath: sitemapUrl
      });
      
      console.log(`✅ Sitemap submitted: ${sitemapUrl}`);
      return { status: 'success', response: response.data };
      
    } catch (error) {
      console.error('❌ Sitemap submission failed:', error.message);
      return { status: 'error', error: error.message };
    }
  }

  /**
   * Get site information and verification status
   */
  async getSiteInfo() {
    try {
      console.log('\n📊 Getting site information...');
      
      const response = await this.searchConsole.sites.get({
        siteUrl: this.siteUrl
      });
      
      console.log('✅ Site verified and accessible');
      console.log(`   Permission Level: ${response.data.permissionLevel}`);
      console.log(`   Site URL: ${response.data.siteUrl}`);
      
      return response.data;
      
    } catch (error) {
      console.error('❌ Could not get site info:', error.message);
      console.log('💡 Make sure to:');
      console.log('   1. Verify your domain in Google Search Console');
      console.log('   2. Add your service account email as a user with Full permissions');
      return null;
    }
  }

  /**
   * Get indexing status for URLs
   */
  async getIndexingStatus() {
    try {
      console.log('\n📈 Checking indexing status...');
      
      const results = [];
      
      for (const url of this.urlsToSubmit.slice(0, 5)) { // Check first 5 URLs to avoid quota issues
        try {
          const response = await this.searchConsole.urlInspection.index.inspect({
            requestBody: {
              inspectionUrl: url,
              siteUrl: this.siteUrl
            }
          });
          
          const indexResult = response.data.indexStatusResult;
          console.log(`📄 ${url}:`);
          console.log(`   Coverage State: ${indexResult.coverageState}`);
          console.log(`   Indexability: ${indexResult.indexabilityState}`);
          
          results.push({
            url,
            coverageState: indexResult.coverageState,
            indexabilityState: indexResult.indexabilityState
          });
          
          await this.sleep(200); // Rate limiting
          
        } catch (error) {
          console.error(`❌ Could not check ${url}:`, error.message);
        }
      }
      
      return results;
      
    } catch (error) {
      console.error('❌ Indexing status check failed:', error.message);
      return [];
    }
  }

  /**
   * Utility function for delays
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Save results to file
   */
  async saveResults(results) {
    const timestamp = new Date().toISOString();
    const report = {
      timestamp,
      siteUrl: this.siteUrl,
      results
    };
    
    const reportPath = './scripts/gsc-automation-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📁 Results saved to: ${reportPath}`);
  }

  /**
   * Main execution function
   */
  async run() {
    console.log('🚀 Villa Fiscardo - Google Search Console Automation');
    console.log('=' .repeat(60));
    
    // Initialize authentication
    const authSuccess = await this.initializeAuth();
    if (!authSuccess) {
      console.log('\n💡 Setup required:');
      console.log('1. Follow the setup guide in GOOGLE_API_SETUP.md');
      console.log('2. Ensure service account key file exists');
      console.log('3. Verify domain ownership in Google Search Console');
      console.log('4. Add service account as user in Search Console');
      return;
    }

    // Get site info
    const siteInfo = await this.getSiteInfo();
    if (!siteInfo) {
      return;
    }

    // Submit URLs for indexing
    const indexingResults = await this.submitURLsForIndexing();
    
    // Submit sitemap
    const sitemapResult = await this.submitSitemap();
    
    // Check indexing status
    const statusResults = await this.getIndexingStatus();
    
    // Save results
    await this.saveResults({
      indexingResults,
      sitemapResult,
      statusResults
    });
    
    console.log('\n✅ Automation complete!');
    console.log('📊 Monitor results in Google Search Console');
    console.log('🔄 Run this script regularly to maintain SEO health');
  }
}

// Execute if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new GoogleSearchConsoleManager();
  manager.run().catch(console.error);
}

export default GoogleSearchConsoleManager;
