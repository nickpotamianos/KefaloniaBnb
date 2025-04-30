#!/usr/bin/env node

import https from 'https';

// URLs to test redirects
const urlsToTest = [
  'https://www.villafiscardo.com/',
  'https://www.villafiscardo.com/blog',
  'https://www.villafiscardo.com/blog/beach-exploration',
  'https://www.villafiscardo.com/blog/culinary-delights',
  'https://www.villafiscardo.com/blog/nature-hikes',
  'https://www.villafiscardo.com/redirect-test.html'
];

// Function to test a URL and check the redirect
function testRedirect(url) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'HEAD',
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

// Execute the redirect tests
async function runTests() {
  console.log('=== REDIRECT TEST RESULTS ===');
  console.log('Testing redirects for villafiscardo.com');
  console.log('Date: ' + new Date().toLocaleString());
  console.log('==============================');

  for (const url of urlsToTest) {
    try {
      await testRedirect(url);
    } catch (error) {
      console.error(`Failed to test ${url}`);
    }
  }
  
  console.log('\n=== TEST SUMMARY ===');
  console.log('All tests completed. Check results above for any issues.');
  console.log('For pages that 301 redirect, verify that they reach a 200 status code page.');
}

// Run the tests
runTests();

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
