// Google Search Console URL Submission Script
// Run this after deploying your SEO improvements

const urlsToSubmit = [
  'https://villafiscardo.com/',
  'https://villafiscardo.com/fiscardo-villa.html',
  'https://villafiscardo.com/fiscardo-villas.html', 
  'https://villafiscardo.com/villa-fiscardo-guide.html',
  'https://villafiscardo.com/local-business.html',
  'https://villafiscardo.com/#house',
  'https://villafiscardo.com/#booking',
  'https://villafiscardo.com/blog',
  'https://villafiscardo.com/blog/beach-exploration',
  'https://villafiscardo.com/blog/culinary-delights',
  'https://villafiscardo.com/blog/nature-hikes'
];

console.log('URLs to submit to Google Search Console:');
console.log('===========================================');

urlsToSubmit.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

console.log('\nNext Steps:');
console.log('1. Go to Google Search Console (search.google.com/search-console)');
console.log('2. Select your property (villafiscardo.com)');
console.log('3. Go to URL Inspection tool');
console.log('4. Submit each URL above for indexing');
console.log('5. Also submit your updated sitemap: https://villafiscardo.com/sitemap.xml');

// For automated submission (requires Google Search Console API setup)
const submitToGoogleSearchConsole = () => {
  console.log('\nTo automate this process:');
  console.log('1. Set up Google Search Console API credentials');
  console.log('2. Use the Indexing API for faster submission');
  console.log('3. Monitor indexing status in Search Console');
};

submitToGoogleSearchConsole();
