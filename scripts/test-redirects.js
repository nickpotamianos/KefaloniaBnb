#!/usr/bin/env node

const https = require('https');

// URLs to test redirects
const urlsToTest = [
  'https://www.villafiscardo.com/',
  'https://www.villafiscardo.com/blog',
  'https://www.villafiscardo.com/blog/beach-exploration',
  'https://www.villafiscardo.com/blog-redirect-test.html'
];

// Function to test a URL and check the redirect
function testRedirect(url) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'HEAD',
      followRedirect: false,
    };

    const req = https.request(url, options, (res) => {
      console.log(`\n[${url}]`);
      console.log(`Status Code: ${res.statusCode}`);
      
      if (res.statusCode >= 300 && res.statusCode < 400) {
        console.log(`Redirect Location: ${res.headers.location}`);
      }
      
      // Output all headers for debugging
      console.log('Headers:');
      Object.keys(res.headers).forEach(key => {
        console.log(`  ${key}: ${res.headers[key]}`);
      });
      
      resolve({
        url,
        statusCode: res.statusCode,
        location: res.headers.location,
        headers: res.headers
      });
    });

    req.on('error', (error) => {
      console.error(`Error testing ${url}:`, error.message);
      reject(error);
    });

    req.end();
  });
}

// Test all URLs
async function testAllRedirects() {
  console.log('Testing redirects for Villa Fiscardo website...');
  
  for (const url of urlsToTest) {
    try {
      await testRedirect(url);
    } catch (error) {
      console.error(`Failed to test ${url}:`, error);
    }
  }
  
  console.log('\nRedirect testing completed.');
}

testAllRedirects();
