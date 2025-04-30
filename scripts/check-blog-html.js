#!/usr/bin/env node

import https from 'https';
import { promises as fs } from 'fs';

// URLs to check for HTML issues
const blogUrls = [
  'https://villafiscardo.com/blog/beach-exploration',
  'https://villafiscardo.com/blog/culinary-delights',
  'https://villafiscardo.com/blog/nature-hikes',
];

// Function to get full HTML content of a URL
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirect
        console.log(`Redirect from ${url} to ${res.headers.location}`);
        fetchHtml(res.headers.location).then(resolve).catch(reject);
        return;
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP error! Status: ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Function to check an HTML page for SEO issues
function checkHtmlForIssues(html, url) {
  const issues = [];
  const warnings = [];

  // Check for canonical link
  const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    issues.push('Missing canonical link tag');
  } else {
    const canonicalUrl = canonicalMatch[1];
    if (canonicalUrl !== url && !url.endsWith('/') && canonicalUrl !== url + '/') {
      issues.push(`Canonical URL (${canonicalUrl}) doesn't match current URL (${url})`);
    }
  }

  // Check for title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    issues.push('Missing title tag');
  } else if (titleMatch[1].length < 10 || titleMatch[1].length > 60) {
    warnings.push(`Title length (${titleMatch[1].length}) outside recommended range (10-60)`);
  }

  // Check for meta description
  const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!descriptionMatch) {
    issues.push('Missing meta description');
  } else if (descriptionMatch[1].length < 50 || descriptionMatch[1].length > 160) {
    warnings.push(`Description length (${descriptionMatch[1].length}) outside recommended range (50-160)`);
  }

  // Check for open graph tags
  if (!html.includes('property="og:title"') && !html.includes('property="og:title"')) {
    warnings.push('Missing Open Graph title tag');
  }
  
  if (!html.includes('property="og:description"') && !html.includes('property="og:description"')) {
    warnings.push('Missing Open Graph description tag');
  }
  
  if (!html.includes('property="og:image"') && !html.includes('property="og:image"')) {
    warnings.push('Missing Open Graph image tag');
  }

  // Check for redirect meta tags or JS redirects
  if (html.includes('<meta http-equiv="refresh"')) {
    issues.push('Contains meta refresh redirect');
  }
  
  if (html.toLowerCase().includes('window.location') && html.includes('redirect')) {
    warnings.push('Possible JavaScript redirect detected');
  }

  return { issues, warnings };
}

// Run the checks and generate a report
async function runChecks() {
  console.log('=== BLOG HTML CHECK ===');
  console.log('Checking blog posts for HTML/SEO issues');
  console.log('Date: ' + new Date().toLocaleString());
  console.log('========================\n');

  const results = [];

  for (const url of blogUrls) {
    console.log(`Checking ${url}...`);
    try {
      const html = await fetchHtml(url);
      const { issues, warnings } = checkHtmlForIssues(html, url);
      
      results.push({
        url,
        status: 'checked',
        issueCount: issues.length,
        warningCount: warnings.length,
        issues,
        warnings,
      });

      // Output results for this URL
      console.log(`- Status: ${issues.length > 0 ? 'ISSUES FOUND' : 'OK'}`);
      if (issues.length > 0) {
        console.log('  ISSUES:');
        issues.forEach(issue => console.log(`  - ${issue}`));
      }
      
      if (warnings.length > 0) {
        console.log('  WARNINGS:');
        warnings.forEach(warning => console.log(`  - ${warning}`));
      }
      
      if (issues.length === 0 && warnings.length === 0) {
        console.log('  No issues or warnings found.');
      }
      
      console.log('');
    } catch (error) {
      console.error(`Error checking ${url}:`, error.message);
      results.push({
        url,
        status: 'error',
        error: error.message,
      });
    }
  }

  // Generate report
  const report = {
    date: new Date().toISOString(),
    results,
    summary: {
      total: results.length,
      withIssues: results.filter(r => r.status === 'checked' && r.issueCount > 0).length,
      withWarnings: results.filter(r => r.status === 'checked' && r.warningCount > 0).length,
      errors: results.filter(r => r.status === 'error').length,
    }
  };

  // Save report to file
  await fs.writeFile('blog-html-report.json', JSON.stringify(report, null, 2));
  console.log('Report saved to blog-html-report.json');
}

// Run the checks
runChecks();
