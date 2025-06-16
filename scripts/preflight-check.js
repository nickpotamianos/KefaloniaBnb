#!/usr/bin/env node

/**
 * Villa Fiscardo - Pre-flight Setup Checker
 * Quick verification before running automation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class PreflightChecker {
  constructor() {
    this.checks = [];
    this.warnings = [];
    this.errors = [];
  }

  log(message, type = 'info') {
    const icons = {
      info: 'ℹ️',
      success: '✅',
      error: '❌',
      warning: '⚠️',
      step: '🔍'
    };
    
    console.log(`${icons[type]} ${message}`);
  }

  check(description, testFn) {
    try {
      const result = testFn();
      if (result === true) {
        this.log(`${description}`, 'success');
        return true;
      } else {
        this.log(`${description}: ${result}`, 'error');
        this.errors.push(description);
        return false;
      }
    } catch (error) {
      this.log(`${description}: ${error.message}`, 'error');
      this.errors.push(description);
      return false;
    }
  }

  warn(description, testFn) {
    try {
      const result = testFn();
      if (result === true) {
        this.log(`${description}`, 'success');
      } else {
        this.log(`${description}: ${result}`, 'warning');
        this.warnings.push(description);
      }
    } catch (error) {
      this.log(`${description}: ${error.message}`, 'warning');
      this.warnings.push(description);
    }
  }

  async run() {
    console.log('🚀 Villa Fiscardo SEO Automation - Pre-flight Check');
    console.log('='.repeat(55));
    
    this.log('Checking if you\'re ready to launch SEO automation...', 'step');
    console.log();

    // Check Node.js dependencies
    this.log('📦 Checking Dependencies', 'step');
    this.check('package.json exists', () => {
      return fs.existsSync(path.join(__dirname, '..', 'package.json')) || 'Missing package.json';
    });

    this.check('node_modules installed', () => {
      return fs.existsSync(path.join(__dirname, '..', 'node_modules')) || 'Run: npm install';
    });

    console.log();

    // Check environment setup
    this.log('🔧 Checking Environment Configuration', 'step');
    
    this.check('.env file exists', () => {
      return fs.existsSync(path.join(__dirname, '..', '.env')) || 'Copy .env.example to .env and configure';
    });

    this.check('Service account key exists', () => {
      const keyPath = path.join(__dirname, 'google-service-account-key.json');
      return fs.existsSync(keyPath) || 'Download service account key to scripts/google-service-account-key.json';
    });

    console.log();

    // Check SEO files
    this.log('📄 Checking SEO Files', 'step');
    
    const seoFiles = [
      'client/public/fiscardo-villa.html',
      'client/public/fiscardo-villas.html', 
      'client/public/villa-fiscardo-guide.html',
      'client/public/sitemap.xml',
      'client/public/robots.txt'
    ];

    seoFiles.forEach(file => {
      this.check(`${file} exists`, () => {
        return fs.existsSync(path.join(__dirname, '..', file)) || 'SEO file missing';
      });
    });

    console.log();

    // Check automation scripts
    this.log('🤖 Checking Automation Scripts', 'step');
    
    const scripts = [
      'scripts/google-search-console-automation.js',
      'scripts/seo-health-monitor.js',
      'scripts/scheduled-seo-automation.js',
      'scripts/test-setup.js'
    ];

    scripts.forEach(script => {
      this.check(`${script} exists`, () => {
        return fs.existsSync(path.join(__dirname, '..', script)) || 'Script missing';
      });
    });

    console.log();

    // Check .gitignore security
    this.log('🔐 Checking Security', 'step');
    
    this.warn('.gitignore includes .env', () => {
      const gitignorePath = path.join(__dirname, '..', '.gitignore');
      if (!fs.existsSync(gitignorePath)) return 'No .gitignore file';
      
      const gitignore = fs.readFileSync(gitignorePath, 'utf8');
      return gitignore.includes('.env') || 'Add .env to .gitignore';
    });

    this.warn('.gitignore includes service account key', () => {
      const gitignorePath = path.join(__dirname, '..', '.gitignore');
      if (!fs.existsSync(gitignorePath)) return 'No .gitignore file';
      
      const gitignore = fs.readFileSync(gitignorePath, 'utf8');
      return gitignore.includes('google-service-account-key.json') || 'Add service account key to .gitignore';
    });

    console.log();

    // Summary
    this.log('📊 Pre-flight Summary', 'step');
    
    if (this.errors.length === 0) {
      this.log('🎉 All systems ready! You can proceed with automation setup.', 'success');
      console.log();
      this.log('Next steps:', 'info');
      console.log('   1. Configure your .env file with Google Cloud credentials');
      console.log('   2. Run: npm run seo:test');
      console.log('   3. Run: npm run seo:submit');
      console.log('   4. Set up scheduling: .\\scripts\\setup-windows-scheduler.ps1');
    } else {
      this.log(`❌ Found ${this.errors.length} critical issues that need to be fixed:`, 'error');
      this.errors.forEach(error => console.log(`     • ${error}`));
    }

    if (this.warnings.length > 0) {
      console.log();
      this.log(`⚠️  Found ${this.warnings.length} security warnings:`, 'warning');
      this.warnings.forEach(warning => console.log(`     • ${warning}`));
    }

    console.log();
    this.log('📚 For detailed setup instructions, see: scripts/quick-start-guide.md', 'info');

    return this.errors.length === 0;
  }
}

// Run the preflight check
const checker = new PreflightChecker();
checker.run().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('❌ Preflight check failed:', error);
  process.exit(1);
});
