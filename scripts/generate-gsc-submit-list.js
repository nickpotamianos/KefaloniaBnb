#!/usr/bin/env node

/**
 * Google Search Console URL List Generator
 * This script generates a list of URLs to submit to Google Search Console
 * for indexing validation after fixing canonical tag issues.
 */

const fs = require('fs').promises;

// Define the URLs that need to be submitted to Google
const urlsToSubmit = [
  // Blog posts with dynamic React pages
  'https://villafiscardo.com/blog/beach-exploration',
  'https://villafiscardo.com/blog/culinary-delights',
  'https://villafiscardo.com/blog/nature-hikes',
  
  // Static canonical helper pages
  'https://villafiscardo.com/beach-exploration-canonical.html',
  'https://villafiscardo.com/culinary-delights-canonical.html',
  'https://villafiscardo.com/nature-hikes-canonical.html',
];

// Also include www versions as Google might have indexed those
const wwwUrls = urlsToSubmit.map(url => url.replace('https://villafiscardo.com', 'https://www.villafiscardo.com'));

const allUrls = [...urlsToSubmit, ...wwwUrls];

async function generateUrlList() {
  console.log('========================================');
  console.log('GOOGLE SEARCH CONSOLE SUBMISSION HELPER');
  console.log('========================================');
  console.log(`Generating list of ${allUrls.length} URLs to submit to Google Search Console...`);
  
  // Create a text file with the URLs
  await fs.writeFile('google-submit-urls.txt', allUrls.join('\n'));
  
  console.log('\nURL list has been saved to google-submit-urls.txt');
  console.log('\nInstructions:');
  console.log('1. Open Google Search Console: https://search.google.com/search-console');
  console.log('2. Select your property: villafiscardo.com');
  console.log('3. In the sidebar, click "URL Inspection"');
  console.log('4. Submit each URL from the list for indexing');
  console.log('5. For each URL, click "Request Indexing"');
  console.log('\nNote: Google limits how many URLs you can submit per day, so you may need to do this over several days.');
}

generateUrlList().catch(console.error);
