#!/usr/bin/env node

/**
 * Test Google Search Console API Setup
 * Quick verification that everything is configured correctly
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

class SetupTester {
  constructor() {
    this.tests = [];
    this.errors = [];
  }

  log(message, type = 'info') {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      warning: '⚠️'
    };
    
    console.log(`${icons[type]} ${message}`);
  }

  addTest(name, testFunction) {
    this.tests.push({ name, testFunction });
  }

  async runTests() {
    this.log('🔍 Testing Google Search Console API Setup for Villa Fiscardo', 'info');
    console.log('='.repeat(60));
    
    for (const test of this.tests) {
      try {
        await test.testFunction();
        this.log(`${test.name}`, 'success');
      } catch (error) {
        this.log(`${test.name}: ${error.message}`, 'error');
        this.errors.push({ test: test.name, error: error.message });
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    
    if (this.errors.length === 0) {
      this.log('All tests passed! Setup is ready for automation.', 'success');
      this.log('Next steps:', 'info');
      console.log('   1. Run: npm run seo:submit');
      console.log('   2. Run: npm run seo:monitor');
      console.log('   3. Set up Windows Task Scheduler (run setup-windows-scheduler.ps1)');
    } else {
      this.log(`${this.errors.length} test(s) failed. Please fix the issues below:`, 'error');
      this.errors.forEach((error, index) => {
        console.log(`\n${index + 1}. ${error.test}:`);
        console.log(`   ${error.error}`);
      });
    }
  }

  async run() {
    // Test 1: Check Node.js dependencies
    this.addTest('Node.js dependencies installed', async () => {
      try {
        await import('googleapis');
        await import('google-auth-library');
        await import('dotenv');
      } catch (error) {
        throw new Error('Missing dependencies. Run: npm install googleapis google-auth-library dotenv');
      }
    });

    // Test 2: Check environment configuration
    this.addTest('Environment configuration', async () => {
      if (!fs.existsSync('.env')) {
        throw new Error('.env file not found. Copy .env.example to .env and configure it');
      }
      
      const requiredVars = [
        'GOOGLE_PROJECT_ID',
        'GOOGLE_SERVICE_ACCOUNT_KEY_PATH',
        'GOOGLE_SEARCH_CONSOLE_SITE_URL'
      ];
      
      const missingVars = requiredVars.filter(varName => !process.env[varName]);
      
      if (missingVars.length > 0) {
        throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
      }
    });

    // Test 3: Check service account key file
    this.addTest('Service account key file', async () => {
      const keyPath = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH || './scripts/google-service-account-key.json';
      
      if (!fs.existsSync(keyPath)) {
        throw new Error(`Service account key file not found: ${keyPath}. Download it from Google Cloud Console.`);
      }
      
      try {
        const keyContent = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
        const requiredFields = ['type', 'project_id', 'private_key_id', 'private_key', 'client_email'];
        
        const missingFields = requiredFields.filter(field => !keyContent[field]);
        
        if (missingFields.length > 0) {
          throw new Error(`Invalid service account key. Missing fields: ${missingFields.join(', ')}`);
        }
        
        if (keyContent.type !== 'service_account') {
          throw new Error('Service account key must be of type "service_account"');
        }
        
      } catch (parseError) {
        if (parseError instanceof SyntaxError) {
          throw new Error('Service account key file is not valid JSON');
        }
        throw parseError;
      }
    });

    // Test 4: Check script files exist
    this.addTest('Automation scripts present', async () => {
      const requiredScripts = [
        './scripts/google-search-console-automation.js',
        './scripts/seo-health-monitor.js',
        './scripts/scheduled-seo-automation.js'
      ];
      
      const missingScripts = requiredScripts.filter(script => !fs.existsSync(script));
      
      if (missingScripts.length > 0) {
        throw new Error(`Missing script files: ${missingScripts.join(', ')}`);
      }
    });

    // Test 5: Check Google Search Console site URL format
    this.addTest('Site URL format', async () => {
      const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;
      
      if (!siteUrl.startsWith('https://villafiscardo.com')) {
        throw new Error('Site URL should be https://villafiscardo.com/ (with trailing slash)');
      }
      
      if (!siteUrl.endsWith('/')) {
        throw new Error('Site URL should end with a trailing slash');
      }
    });

    // Test 6: Basic API connection test
    this.addTest('Google API connection', async () => {
      try {
        const { GoogleAuth } = await import('google-auth-library');
        
        const auth = new GoogleAuth({
          keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH,
          scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });
        
        await auth.getClient();
        
      } catch (error) {
        if (error.message.includes('ENOENT')) {
          throw new Error('Service account key file not found or inaccessible');
        } else if (error.message.includes('invalid_grant')) {
          throw new Error('Service account credentials are invalid or expired');
        } else {
          throw new Error(`API connection failed: ${error.message}`);
        }
      }
    });

    // Test 7: Check .gitignore security
    this.addTest('Security configuration', async () => {
      if (fs.existsSync('.gitignore')) {
        const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
        
        if (!gitignoreContent.includes('google-service-account-key.json')) {
          throw new Error('Service account key file not properly excluded in .gitignore');
        }
        
        if (!gitignoreContent.includes('.env')) {
          throw new Error('.env file not properly excluded in .gitignore');
        }
      } else {
        throw new Error('.gitignore file missing - security risk for credentials');
      }
    });

    await this.runTests();
  }
}

// Run the tests
const tester = new SetupTester();
tester.run().catch(console.error);
