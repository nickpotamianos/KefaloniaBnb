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
  
  // Summary
  const correct = results.filter(r => r.isCorrect).length;
  
  console.log('\nSUMMARY:');
  console.log(`${correct} of ${results.length} URLs have correct canonical tags`);
  
  if (correct < results.length) {
    console.log('\n⚠️ Some URLs have incorrect canonical tags. Fix them before resubmitting to Google.');
  } else {
    console.log('\n✅ All canonical tags are correct! You can resubmit to Google Search Console.');
  }
  
  // Save results to file
  const report = {
    timestamp: new Date().toISOString(),
    results,
    summary: {
      total: results.length,
      correct,
      incorrect: results.length - correct
    }
  };
  
  await fs.writeFile('canonical-check-report.json', JSON.stringify(report, null, 2));
  console.log('\nReport saved to canonical-check-report.json');
}

// Run the script
main().catch(console.error);
