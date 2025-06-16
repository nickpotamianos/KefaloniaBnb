#!/usr/bin/env node

/**
 * Villa Fiscardo Keyword Performance Tracker
 * Monitors ranking progress for target keywords
 */

import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

console.log('📊 Villa Fiscardo Keyword Performance Tracker');
console.log('=' .repeat(50));

// Target keywords we want to rank for
const TARGET_KEYWORDS = [
  'villa fiscardo',
  'villa in fiscardo',
  'fiscardo villa rental',
  'fiscardo accommodation',
  'fiscardo villas',
  'kefalonia villa fiscardo',
  'vacation rental fiscardo',
  'holiday villa fiscardo',
  'fiscardo kefalonia villa'
];

async function trackKeywordPerformance() {
  try {
    console.log('🔐 Connecting to Google Search Console...');
    
    let authClient;
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON);
      const auth = new GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters'],
      });
      authClient = await auth.getClient();
    } else {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY_JSON environment variable required');
    }

    const searchConsole = google.searchconsole({ version: 'v1', auth: authClient });
    console.log('✅ Connected successfully');

    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || 'sc-domain:villafiscardo.com';
    
    // Get last 30 days of data
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    console.log(`\n📈 Analyzing performance from ${startDate} to ${endDate}`);

    // Search for our target keywords
    console.log('\n🎯 TARGET KEYWORD ANALYSIS');
    console.log('-'.repeat(50));

    let targetKeywordFound = false;
    let allQueries = [];

    // Get all search queries
    const response = await searchConsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: startDate,
        endDate: endDate,
        dimensions: ['query'],
        rowLimit: 1000
      }
    });

    if (response.data && response.data.rows) {
      allQueries = response.data.rows;
      
      // Check each target keyword
      for (const targetKeyword of TARGET_KEYWORDS) {
        const found = allQueries.find(row => 
          row.keys[0].toLowerCase().includes(targetKeyword.toLowerCase())
        );
        
        if (found) {
          targetKeywordFound = true;
          console.log(`✅ "${targetKeyword}"`);
          console.log(`   📊 Impressions: ${found.impressions}`);
          console.log(`   👆 Clicks: ${found.clicks}`);
          console.log(`   📈 CTR: ${(found.ctr * 100).toFixed(2)}%`);
          console.log(`   📍 Avg Position: ${found.position.toFixed(1)}`);
        } else {
          console.log(`⏳ "${targetKeyword}" - Not yet ranking`);
        }
      }
    }

    if (!targetKeywordFound) {
      console.log('📝 TARGET KEYWORDS STATUS: Not yet appearing in search results');
      console.log('   This is normal for new SEO optimization');
      console.log('   Expected timeline: 2-8 weeks for initial ranking');
    }

    // Show current performing keywords
    console.log('\n📊 CURRENT TOP PERFORMING KEYWORDS');
    console.log('-'.repeat(50));

    if (allQueries && allQueries.length > 0) {
      // Sort by impressions and show top 10
      const topQueries = allQueries
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 10);

      topQueries.forEach((query, index) => {
        console.log(`${index + 1}. "${query.keys[0]}"`);
        console.log(`   📊 ${query.impressions} impressions, ${query.clicks} clicks`);
        console.log(`   📈 ${(query.ctr * 100).toFixed(2)}% CTR, Position ${query.position.toFixed(1)}`);
      });
    } else {
      console.log('📝 No search data available yet');
    }

    // URL performance for our villa pages
    console.log('\n🏠 VILLA PAGE PERFORMANCE');
    console.log('-'.repeat(50));

    const villaPages = [
      '/fiscardo-villa.html',
      '/fiscardo-villas.html',
      '/villa-fiscardo-guide.html',
      '/' // homepage
    ];

    for (const page of villaPages) {
      try {
        const pageResponse = await searchConsole.searchanalytics.query({
          siteUrl: siteUrl,
          requestBody: {
            startDate: startDate,
            endDate: endDate,
            dimensions: ['page'],
            dimensionFilterGroups: [{
              filters: [{
                dimension: 'page',
                expression: page,
                operator: 'equals'
              }]
            }]
          }
        });

        if (pageResponse.data && pageResponse.data.rows && pageResponse.data.rows[0]) {
          const data = pageResponse.data.rows[0];
          console.log(`📄 ${page}`);
          console.log(`   📊 ${data.impressions} impressions, ${data.clicks} clicks`);
          console.log(`   📈 ${(data.ctr * 100).toFixed(2)}% CTR, Position ${data.position.toFixed(1)}`);
        } else {
          console.log(`📄 ${page} - No search traffic yet`);
        }
      } catch (error) {
        console.log(`📄 ${page} - Error getting data`);
      }
    }

    // SEO Health Summary
    console.log('\n🏥 SEO HEALTH SUMMARY');
    console.log('-'.repeat(50));

    // Index coverage check
    try {
      const sitemapResponse = await searchConsole.sitemaps.list({
        siteUrl: siteUrl
      });

      if (sitemapResponse.data && sitemapResponse.data.sitemap) {
        console.log('📋 Sitemap Status:');
        sitemapResponse.data.sitemap.forEach(sitemap => {
          console.log(`   📍 ${sitemap.path}`);
          console.log(`   📊 Submitted: ${sitemap.contents?.[0]?.submitted || 0}`);
          console.log(`   ✅ Indexed: ${sitemap.contents?.[0]?.indexed || 0}`);
        });
      }
    } catch (error) {
      console.log('📋 Sitemap data not available');
    }

    // Generate tracking report
    const report = {
      date: new Date().toISOString(),
      targetKeywords: TARGET_KEYWORDS,
      foundKeywords: allQueries ? allQueries.filter(q => 
        TARGET_KEYWORDS.some(tk => 
          q.keys[0].toLowerCase().includes(tk.toLowerCase())
        )
      ) : [],
      topPerformingQueries: allQueries ? allQueries.slice(0, 10) : [],
      totalImpressions: allQueries ? allQueries.reduce((sum, q) => sum + q.impressions, 0) : 0,
      totalClicks: allQueries ? allQueries.reduce((sum, q) => sum + q.clicks, 0) : 0
    };

    // Save report
    const reportPath = `reports/keyword-tracking-${endDate}.json`;
    fs.mkdirSync('reports', { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n✅ TRACKING COMPLETE');
    console.log(`📁 Report saved: ${reportPath}`);
    console.log('\n🔄 Run daily to track progress:');
    console.log('   npm run seo:track');

  } catch (error) {
    console.error('\n❌ Keyword tracking failed:', error.message);
  }
}

trackKeywordPerformance();
