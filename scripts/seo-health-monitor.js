#!/usr/bin/env node

/**
 * SEO Health Monitor for Villa Fiscardo
 * Monitors indexing status, search performance, and SEO health
 */

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

class SEOHealthMonitor {
  constructor() {
    this.siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'https://villafiscardo.com/';
    this.serviceAccountKeyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './scripts/google-service-account-key.json';
    
    // Key pages to monitor
    this.keyPages = [
      'https://villafiscardo.com/',
      'https://villafiscardo.com/fiscardo-villa.html',
      'https://villafiscardo.com/fiscardo-villas.html',
      'https://villafiscardo.com/villa-fiscardo-guide.html'
    ];
    
    // Target keywords to monitor
    this.targetKeywords = [
      'villa fiscardo',
      'fiscardo villa',
      'fiscardo villas',
      'fiscardo villa rental',
      'kefalonia villa',
      'villa fiscardo kefalonia',
      'best villa fiscardo',
      'luxury villa fiscardo'
    ];
  }

  async initializeAuth() {
    try {
      const auth = new GoogleAuth({
        keyFile: this.serviceAccountKeyPath,
        scopes: [
          'https://www.googleapis.com/auth/webmasters',
          'https://www.googleapis.com/auth/webmasters.readonly'
        ],
      });

      this.authClient = await auth.getClient();
      this.searchConsole = google.searchconsole({ version: 'v1', auth: this.authClient });
      
      return true;
    } catch (error) {
      console.error('❌ Authentication failed:', error.message);
      return false;
    }
  }

  /**
   * Get search performance data
   */
  async getSearchPerformance(days = 30) {
    try {
      console.log(`📊 Getting search performance for last ${days} days...`);
      
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const response = await this.searchConsole.searchanalytics.query({
        siteUrl: this.siteUrl,
        requestBody: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          dimensions: ['query', 'page'],
          rowLimit: 100,
          aggregationType: 'auto'
        }
      });
      
      const rows = response.data.rows || [];
      
      // Filter for our target keywords
      const targetKeywordData = rows.filter(row => {
        const query = row.keys[0].toLowerCase();
        return this.targetKeywords.some(keyword => 
          query.includes(keyword.toLowerCase())
        );
      });
      
      console.log(`✅ Found ${targetKeywordData.length} relevant keyword results`);
      
      // Top performing keywords
      const topKeywords = targetKeywordData
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 10);
      
      console.log('\n🔍 Top Keywords for Villa Fiscardo:');
      topKeywords.forEach((row, index) => {
        console.log(`${index + 1}. "${row.keys[0]}"`);
        console.log(`   Impressions: ${row.impressions}, Clicks: ${row.clicks}`);
        console.log(`   CTR: ${(row.ctr * 100).toFixed(2)}%, Position: ${row.position.toFixed(1)}`);
        console.log(`   Page: ${row.keys[1]}`);
        console.log('');
      });
      
      return {
        totalRows: rows.length,
        targetKeywordData,
        topKeywords
      };
      
    } catch (error) {
      console.error('❌ Failed to get search performance:', error.message);
      return null;
    }
  }

  /**
   * Check indexing status of key pages
   */
  async checkIndexingStatus() {
    console.log('\n🔍 Checking indexing status of key pages...');
    
    const results = [];
    
    for (const url of this.keyPages) {
      try {
        const response = await this.searchConsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: this.siteUrl
          }
        });
        
        const result = response.data.indexStatusResult;
        const status = {
          url,
          indexed: result.coverageState === 'Submitted and indexed',
          coverageState: result.coverageState,
          indexabilityState: result.indexabilityState,
          lastCrawled: result.lastCrawlTime
        };
        
        results.push(status);
        
        const statusIcon = status.indexed ? '✅' : '❌';
        console.log(`${statusIcon} ${url}`);
        console.log(`   Status: ${status.coverageState}`);
        console.log(`   Last Crawled: ${status.lastCrawled || 'Never'}`);
        console.log('');
        
        await this.sleep(200); // Rate limiting
        
      } catch (error) {
        console.error(`❌ Could not check ${url}:`, error.message);
        results.push({
          url,
          error: error.message
        });
      }
    }
    
    return results;
  }

  /**
   * Get sitemap status
   */
  async getSitemapStatus() {
    try {
      console.log('\n🗺️ Checking sitemap status...');
      
      const response = await this.searchConsole.sitemaps.list({
        siteUrl: this.siteUrl
      });
      
      const sitemaps = response.data.sitemap || [];
      
      sitemaps.forEach(sitemap => {
        console.log(`📄 Sitemap: ${sitemap.feedpath}`);
        console.log(`   Status: ${sitemap.type}`);
        console.log(`   Last Downloaded: ${sitemap.lastDownloaded || 'Never'}`);
        console.log(`   Submitted: ${sitemap.lastSubmitted || 'Never'}`);
        console.log(`   URLs Submitted: ${sitemap.contents?.[0]?.submitted || 0}`);
        console.log(`   URLs Indexed: ${sitemap.contents?.[0]?.indexed || 0}`);
        console.log('');
      });
      
      return sitemaps;
      
    } catch (error) {
      console.error('❌ Failed to get sitemap status:', error.message);
      return [];
    }
  }

  /**
   * Generate SEO health report
   */
  generateHealthReport(data) {
    const { searchPerformance, indexingStatus, sitemapStatus } = data;
    
    console.log('\n📋 SEO HEALTH REPORT - Villa Fiscardo');
    console.log('=' .repeat(50));
    
    // Indexing Health
    const indexedPages = indexingStatus.filter(page => page.indexed).length;
    const totalPages = indexingStatus.length;
    const indexingHealth = (indexedPages / totalPages) * 100;
    
    console.log(`\n🔍 INDEXING HEALTH: ${indexingHealth.toFixed(1)}%`);
    console.log(`   ${indexedPages}/${totalPages} key pages indexed`);
    
    if (indexingHealth < 100) {
      console.log('\n⚠️  ACTIONS NEEDED:');
      indexingStatus
        .filter(page => !page.indexed)
        .forEach(page => {
          console.log(`   - Re-submit: ${page.url}`);
        });
    }
    
    // Search Performance
    if (searchPerformance && searchPerformance.targetKeywordData.length > 0) {
      const avgPosition = searchPerformance.targetKeywordData
        .reduce((sum, row) => sum + row.position, 0) / searchPerformance.targetKeywordData.length;
      
      const totalClicks = searchPerformance.targetKeywordData
        .reduce((sum, row) => sum + row.clicks, 0);
      
      const totalImpressions = searchPerformance.targetKeywordData
        .reduce((sum, row) => sum + row.impressions, 0);
      
      console.log(`\n📈 SEARCH PERFORMANCE (30 days):`);
      console.log(`   Total Impressions: ${totalImpressions}`);
      console.log(`   Total Clicks: ${totalClicks}`);
      console.log(`   Average Position: ${avgPosition.toFixed(1)}`);
      console.log(`   Keywords Tracked: ${searchPerformance.targetKeywordData.length}`);
      
      // Position analysis
      const firstPageKeywords = searchPerformance.targetKeywordData
        .filter(row => row.position <= 10).length;
      
      console.log(`   First Page Keywords: ${firstPageKeywords}/${searchPerformance.targetKeywordData.length}`);
      
      if (avgPosition > 10) {
        console.log('\n⚠️  IMPROVEMENT NEEDED:');
        console.log('   - Average position is beyond first page');
        console.log('   - Consider increasing content quality and relevance');
        console.log('   - Build more high-quality backlinks');
      }
    }
    
    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('   ✅ Continue monitoring key page indexing');
    console.log('   ✅ Create more content targeting Villa Fiscardo keywords');
    console.log('   ✅ Build local citations and backlinks');
    console.log('   ✅ Optimize for "fiscardo villa" variations');
    console.log('   ✅ Encourage more guest reviews mentioning location');
  }

  /**
   * Save monitoring report
   */
  saveReport(data) {
    const timestamp = new Date().toISOString();
    const report = {
      timestamp,
      siteUrl: this.siteUrl,
      ...data
    };
    
    const reportPath = `./scripts/seo-health-report-${timestamp.split('T')[0]}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📁 Detailed report saved: ${reportPath}`);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async run() {
    console.log('🔍 Villa Fiscardo - SEO Health Monitor');
    console.log('=' .repeat(60));
    
    const authSuccess = await this.initializeAuth();
    if (!authSuccess) {
      console.log('❌ Authentication failed. Check your setup.');
      return;
    }

    // Gather all monitoring data
    const searchPerformance = await this.getSearchPerformance(30);
    const indexingStatus = await this.checkIndexingStatus();
    const sitemapStatus = await this.getSitemapStatus();
    
    const monitoringData = {
      searchPerformance,
      indexingStatus,
      sitemapStatus
    };
    
    // Generate health report
    this.generateHealthReport(monitoringData);
    
    // Save detailed report
    this.saveReport(monitoringData);
    
    console.log('\n✅ SEO health check complete!');
  }
}

// Execute if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const monitor = new SEOHealthMonitor();
  monitor.run().catch(console.error);
}

export default SEOHealthMonitor;
