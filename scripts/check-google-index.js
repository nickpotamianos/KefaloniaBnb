#!/usr/bin/env node

import https from 'https';
import { promises as fs } from 'fs';

// URLs to check against Google's indexing report
const problemUrls = [
  'https://villafiscardo.com/blog/beach-exploration',
  'https://villafiscardo.com/blog/culinary-delights',
  'https://villafiscardo.com/blog/nature-hikes',
  // Add any other URLs mentioned in Google Search Console
];

// These are the URLs that Google is trying to crawl
const googleCrawlUrls = [
  'https://www.villafiscardo.com/blog/beach-exploration',
  'https://www.villafiscardo.com/blog/culinary-delights',
  'https://www.villafiscardo.com/blog/nature-hikes',
];

// Function to check a URL and follow redirects
async function checkUrlWithRedirects(url, maxRedirects = 5) {
  let currentUrl = url;
  let redirectChain = [url];
  let redirectCount = 0;

  while (redirectCount < maxRedirects) {
    try {
      const result = await new Promise((resolve, reject) => {
        const req = https.request(currentUrl, { method: 'HEAD' }, (res) => {
          resolve({
            url: currentUrl,
            statusCode: res.statusCode,
            location: res.headers.location,
          });
        });
        
        req.on('error', (error) => {
          reject(error);
        });
        
        req.end();
      });

      if (result.statusCode >= 300 && result.statusCode < 400 && result.location) {
        redirectCount++;
        currentUrl = new URL(result.location, currentUrl).href;
        redirectChain.push(currentUrl);
      } else {
        // We've reached a non-redirect status
        return {
          originalUrl: url,
          finalUrl: currentUrl,
          statusCode: result.statusCode,
          redirectCount,
          redirectChain,
        };
      }
    } catch (error) {
      return {
        originalUrl: url,
        error: error.message,
        redirectChain,
      };
    }
  }

  return {
    originalUrl: url,
    error: 'Max redirects exceeded',
    redirectCount,
    redirectChain,
  };
}

// Run the tests and generate a report
async function runTests() {
  console.log('=== GOOGLE INDEXING TEST ===');
  console.log('Testing URLs from Google Search Console');
  console.log('Date: ' + new Date().toLocaleString());
  console.log('==============================\n');

  console.log('TESTING CANONICAL URLS:');
  const canonicalResults = [];
  for (const url of problemUrls) {
    console.log(`\nTesting ${url}`);
    const result = await checkUrlWithRedirects(url);
    console.log(JSON.stringify(result, null, 2));
    canonicalResults.push(result);
  }

  console.log('\n\nTESTING GOOGLE CRAWL URLS:');
  const googleResults = [];
  for (const url of googleCrawlUrls) {
    console.log(`\nTesting ${url}`);
    const result = await checkUrlWithRedirects(url);
    console.log(JSON.stringify(result, null, 2));
    googleResults.push(result);
  }

  // Generate report
  const report = {
    date: new Date().toISOString(),
    canonicalResults,
    googleResults,
    summary: {
      canonicalUrlsWithIssues: canonicalResults.filter(r => r.statusCode !== 200).length,
      googleUrlsWithIssues: googleResults.filter(r => r.error || r.redirectCount > 1).length,
    }
  };

  // Save report to file
  await fs.writeFile('google-index-report.json', JSON.stringify(report, null, 2));
  console.log('\n\nReport saved to google-index-report.json');
}

// Run the tests
runTests();
