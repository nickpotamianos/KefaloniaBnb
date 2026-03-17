#!/usr/bin/env node

/**
 * Canonical URL Checker Script
 * This script tests whether the canonical URLs on your blog posts are set correctly.
 */

import https from 'https';
import { promises as fs } from 'fs';

// Blog posts to check
const blogPosts = [
  'beach-exploration',
  'culinary-delights',
  'nature-hikes'
];

// Static canonical pages to check
const staticCanonicalPages = [
  'beach-exploration-canonical.html',
  'culinary-delights-canonical.html',
  'nature-hikes-canonical.html'
];

// Function to fetch HTML and check for canonical URL
async function checkCanonicalUrl(slug) {
  const url = `https://villafiscardo.com/blog/${slug}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve({
          url,
          status: `Error: HTTP ${res.statusCode}`,
          canonical: null,
          isCorrect: false
        });
        return;
      }

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        // Check for canonical link
        const canonicalMatch = data.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
        const canonical = canonicalMatch ? canonicalMatch[1] : null;
        const expectedCanonical = `https://villafiscardo.com/blog/${slug}`;
        
        resolve({
          url,
          status: 'OK',
          canonical,
          expectedCanonical,
          isCorrect: canonical === expectedCanonical
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: `Error: ${err.message}`,
        canonical: null,
        isCorrect: false
      });
    });
  });
}

// Function to check canonical tag in static pages
async function checkStaticCanonical(filename) {
  const url = `https://villafiscardo.com/${filename}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        resolve({
          url,
          status: `Error: HTTP ${res.statusCode}`,
          canonical: null,
          isCorrect: false
        });
        return;
      }

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        // Check for canonical link
        const canonicalMatch = data.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
        const canonical = canonicalMatch ? canonicalMatch[1] : null;
        
        // Expected canonical should be the blog URL
        const blogSlug = filename.split('-canonical.html')[0];
        const expectedCanonical = `https://villafiscardo.com/blog/${blogSlug}`;
        
        resolve({
          url,
          status: 'OK',
          canonical,
          expectedCanonical,
          isCorrect: canonical === expectedCanonical,
          isStaticHelperPage: true
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        status: `Error: ${err.message}`,
        canonical: null,
        isCorrect: false
      });
    });
  });
}

// Main function
async function main() {
  console.log('======================================');
  console.log('  CANONICAL URL CHECKER');
  console.log('======================================');
  console.log(`Checking ${blogPosts.length} blog posts...`);
  console.log('--------------------------------------');
  
  const results = [];
  
  for (const slug of blogPosts) {
    console.log(`Checking: blog/${slug}...`);
    const result = await checkCanonicalUrl(slug);
    results.push(result);
    
    console.log(`  Status: ${result.status}`);
    console.log(`  Canonical: ${result.canonical || 'Not found'}`);
    console.log(`  Expected: ${result.expectedCanonical}`);
    console.log(`  Result: ${result.isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}`);
    console.log('--------------------------------------');
  }
  
  console.log('\nChecking static canonical helper pages...');
  console.log('--------------------------------------');
  
  for (const filename of staticCanonicalPages) {
    console.log(`Checking: ${filename}...`);
    const result = await checkStaticCanonical(filename);
    results.push(result);
    
    console.log(`  Status: ${result.status}`);
    console.log(`  Canonical: ${result.canonical || 'Not found'}`);
    console.log(`  Expected: ${result.expectedCanonical}`);
    console.log(`  Result: ${result.isCorrect ? '✅ CORRECT' : '❌ INCORRECT'}`);
    console.log('--------------------------------------');
  }
    // Summary
  const dynamicResults = results.filter(r => !r.isStaticHelperPage);
  const staticResults = results.filter(r => r.isStaticHelperPage);
  
  const dynamicCorrect = dynamicResults.filter(r => r.isCorrect).length;
  const staticCorrect = staticResults.filter(r => r.isCorrect).length;
  
  console.log('\nSUMMARY:');
  console.log(`Dynamic pages: ${dynamicCorrect} of ${dynamicResults.length} URLs have correct canonical tags`);
  console.log(`Static helper pages: ${staticCorrect} of ${staticResults.length} URLs have correct canonical tags`);
  
  if (staticCorrect === staticResults.length) {
    console.log('\n✅ All static helper pages have correct canonical tags! Google should be able to index them.');
    console.log('   These will help even if the React pages have issues.');
  }
  
  if (dynamicCorrect < dynamicResults.length && staticCorrect === staticResults.length) {
    console.log('\n⚠️ React pages still have issues, but static helper pages are working correctly.');
    console.log('   You can submit to Google Search Console now since the static pages will help indexing.');
  } else if (dynamicCorrect < dynamicResults.length && staticCorrect < staticResults.length) {
    console.log('\n⚠️ Both React pages and static helper pages have issues. Fix them before resubmitting to Google.');
  } else if (dynamicCorrect === dynamicResults.length) {
    console.log('\n✅ All canonical tags are correct! You can resubmit to Google Search Console.');
  }
  
  // Save results to file
  const report = {
    timestamp: new Date().toISOString(),
    results,
    summary: {
      total: results.length,
      dynamicPages: {
        total: dynamicResults.length,
        correct: dynamicCorrect,
        incorrect: dynamicResults.length - dynamicCorrect
      },
      staticHelperPages: {
        total: staticResults.length,
        correct: staticCorrect,
        incorrect: staticResults.length - staticCorrect
      }
    }
  };
  
  await fs.writeFile('canonical-check-report.json', JSON.stringify(report, null, 2));
  console.log('\nReport saved to canonical-check-report.json');
}

// Run the script
main().catch(console.error);
