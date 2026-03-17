#!/usr/bin/env node

/**
 * Final SEO Verification Script
 * 
 * This script performs a comprehensive verification of all SEO elements
 * for Villa Fiscardo, ensuring everything is properly configured for
 * Google Search Console and SEO optimization.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Villa Fiscardo SEO - Final Verification');
console.log('==========================================');

// Check sitemap.xml
function checkSitemap() {
  console.log('\n📋 Checking sitemap.xml...');
  
  try {
    const sitemapPath = path.join(__dirname, '../client/public/sitemap.xml');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');    // Basic XML validation
    const openTags = (sitemapContent.match(/<[^\/!?][^>]*[^\/]>/g) || []).length; // Regular opening tags
    const selfClosingTags = (sitemapContent.match(/<[^\/!?][^>]*\/>/g) || []).length; // Self-closing tags
    const closeTags = (sitemapContent.match(/<\/[^>]+>/g) || []).length;
    
    console.log(`✅ Sitemap file exists (${sitemapContent.length} characters)`);
    console.log(`✅ XML structure: ${openTags} open tags, ${closeTags} close tags, ${selfClosingTags} self-closing`);
      // Check for the specific merged tag issues that Google reported (now fixed)
    const mergedPriorityTags = sitemapContent.match(/changefreq>[^<\n\r]*<priority/g);
    const mergedImageTags = sitemapContent.match(/title>[^<\n\r]*<\/image:image/g);
    
    if (mergedPriorityTags && mergedPriorityTags.length > 0) {
      console.log('❌ Found merged changefreq/priority tags');
      console.log('Issues:', mergedPriorityTags);
      return false;
    } else if (mergedImageTags && mergedImageTags.length > 0) {
      console.log('❌ Found merged image tags');
      console.log('Issues:', mergedImageTags);
      return false;
    } else {
      console.log('✅ No problematic merged XML tags found');
    }
    
    // Count URLs
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    console.log(`✅ Contains ${urlCount} URLs`);
    
    // Check for required namespaces
    if (sitemapContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
      console.log('✅ Standard sitemap namespace present');
    }
    if (sitemapContent.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')) {
      console.log('✅ Image sitemap namespace present');
    }
    
    return true;
  } catch (error) {
    console.log(`❌ Error reading sitemap: ${error.message}`);
    return false;
  }
}

// Check robots.txt
function checkRobots() {
  console.log('\n🤖 Checking robots.txt...');
  
  try {
    const robotsPath = path.join(__dirname, '../client/public/robots.txt');
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    
    console.log('✅ robots.txt exists');
    
    if (robotsContent.includes('Sitemap: https://villafiscardo.com/sitemap.xml')) {
      console.log('✅ Sitemap reference present');
    } else {
      console.log('❌ Sitemap reference missing');
      return false;
    }
    
    return true;
  } catch (error) {
    console.log(`❌ Error reading robots.txt: ${error.message}`);
    return false;
  }
}

// Check main index.html for SEO elements
function checkIndexSEO() {
  console.log('\n🏠 Checking index.html SEO...');
  
  try {
    const indexPath = path.join(__dirname, '../client/index.html');
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    const checks = [
      { name: 'Title tag', pattern: /<title>.*Villa Fiscardo.*<\/title>/ },
      { name: 'Meta description', pattern: /<meta\s+name="description"/ },
      { name: 'Meta keywords', pattern: /<meta\s+name="keywords"/ },
      { name: 'Open Graph title', pattern: /<meta\s+property="og:title"/ },
      { name: 'Open Graph description', pattern: /<meta\s+property="og:description"/ },
      { name: 'Open Graph image', pattern: /<meta\s+property="og:image"/ },
      { name: 'Twitter Card', pattern: /<meta\s+name="twitter:card"/ },
      { name: 'Canonical URL', pattern: /<link\s+rel="canonical"/ },
      { name: 'Structured data', pattern: /<script\s+type="application\/ld\+json">/ }
    ];
    
    let passed = 0;
    checks.forEach(check => {
      if (check.pattern.test(indexContent)) {
        console.log(`✅ ${check.name} present`);
        passed++;
      } else {
        console.log(`❌ ${check.name} missing`);
      }
    });
    
    console.log(`📊 SEO elements: ${passed}/${checks.length} present`);
    return passed === checks.length;
  } catch (error) {
    console.log(`❌ Error reading index.html: ${error.message}`);
    return false;
  }
}

// Check SEO landing pages
function checkSEOPages() {
  console.log('\n📄 Checking SEO landing pages...');
  
  const pages = [
    'fiscardo-villa.html',
    'fiscardo-villas.html', 
    'villa-fiscardo-guide.html',
    'local-business.html'
  ];
  
  let allPresent = true;
  
  pages.forEach(page => {
    try {
      const pagePath = path.join(__dirname, '../client/public', page);
      const pageContent = fs.readFileSync(pagePath, 'utf8');
      console.log(`✅ ${page} exists (${pageContent.length} characters)`);
    } catch (error) {
      console.log(`❌ ${page} missing`);
      allPresent = false;
    }
  });
  
  return allPresent;
}

// Check Google API scripts
function checkAPIScripts() {
  console.log('\n🔧 Checking Google API scripts...');
  
  const scripts = [
    'production-seo-automation.js',
    'google-search-console-automation.js',
    'seo-health-monitor.js'
  ];
  
  let allPresent = true;
  
  scripts.forEach(script => {
    try {
      const scriptPath = path.join(__dirname, script);
      const scriptContent = fs.readFileSync(scriptPath, 'utf8');
      console.log(`✅ ${script} exists (${scriptContent.length} characters)`);
    } catch (error) {
      console.log(`❌ ${script} missing`);
      allPresent = false;
    }
  });
  
  return allPresent;
}

// Check environment setup
function checkEnvironment() {
  console.log('\n🔐 Checking environment setup...');
  
  try {
    const envExamplePath = path.join(__dirname, '../.env.example');
    const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
    
    const requiredVars = [
      'GOOGLE_SERVICE_ACCOUNT_KEY_JSON',
      'GOOGLE_SEARCH_CONSOLE_SITE_URL'
    ];
    
    let allPresent = true;
    requiredVars.forEach(varName => {
      if (envExampleContent.includes(varName)) {
        console.log(`✅ ${varName} defined in .env.example`);
      } else {
        console.log(`❌ ${varName} missing from .env.example`);
        allPresent = false;
      }
    });
    
    return allPresent;
  } catch (error) {
    console.log(`❌ Error reading .env.example: ${error.message}`);
    return false;
  }
}

// Main verification function
async function runVerification() {
  console.log('Starting comprehensive SEO verification...\n');
  
  const results = {
    sitemap: checkSitemap(),
    robots: checkRobots(),
    indexSEO: checkIndexSEO(),
    seoPages: checkSEOPages(),
    apiScripts: checkAPIScripts(),
    environment: checkEnvironment()
  };
  
  console.log('\n📊 VERIFICATION SUMMARY');
  console.log('========================');
  
  const categories = Object.keys(results);
  const passed = categories.filter(cat => results[cat]).length;
  
  categories.forEach(category => {
    const status = results[category] ? '✅' : '❌';
    console.log(`${status} ${category.charAt(0).toUpperCase() + category.slice(1)}`);
  });
  
  console.log(`\n📈 Overall Score: ${passed}/${categories.length} (${Math.round(passed/categories.length*100)}%)`);
  
  if (passed === categories.length) {
    console.log('\n🎉 ALL SEO ELEMENTS VERIFIED!');
    console.log('🚀 Villa Fiscardo is ready for Google Search Console');
    console.log('📈 Your site should start appearing in search results soon');
  } else {
    console.log('\n⚠️  Some issues found - please review and fix');
  }
  
  console.log('\n🔗 Next steps:');
  console.log('1. Monitor Google Search Console for indexing progress');
  console.log('2. Check search rankings for "villa fiscardo" keywords');
  console.log('3. Run this verification weekly to ensure everything stays optimal');
}

// Run the verification
runVerification().catch(console.error);
