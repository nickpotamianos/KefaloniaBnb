#!/usr/bin/env node

/**
 * Scheduled SEO Automation for Villa Fiscardo
 * Run this script daily/weekly to maintain SEO health
 */

import GoogleSearchConsoleManager from './google-search-console-automation.js';
import SEOHealthMonitor from './seo-health-monitor.js';
import fs from 'fs';
import path from 'path';

class ScheduledSEOAutomation {
  constructor() {
    this.logFile = './scripts/automation-log.txt';
    this.reportDir = './scripts/reports';
    
    // Ensure reports directory exists
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    console.log(message);
    fs.appendFileSync(this.logFile, logMessage);
  }

  async runDailyTasks() {
    this.log('🚀 Starting daily SEO automation for Villa Fiscardo');
    
    try {
      // 1. Submit new/updated URLs for indexing
      this.log('📤 Running URL submission...');
      const gscManager = new GoogleSearchConsoleManager();
      await gscManager.run();
      
      this.log('✅ Daily URL submission completed');
      
    } catch (error) {
      this.log(`❌ Daily tasks failed: ${error.message}`);
      throw error;
    }
  }

  async runWeeklyTasks() {
    this.log('📊 Starting weekly SEO health check');
    
    try {
      // Run comprehensive health monitoring
      const healthMonitor = new SEOHealthMonitor();
      await healthMonitor.run();
      
      this.log('✅ Weekly health check completed');
      
    } catch (error) {
      this.log(`❌ Weekly tasks failed: ${error.message}`);
      throw error;
    }
  }

  async runMonthlyTasks() {
    this.log('📈 Starting monthly SEO report generation');
    
    try {
      // Generate comprehensive monthly report
      const healthMonitor = new SEOHealthMonitor();
      const searchPerformance = await healthMonitor.getSearchPerformance(30);
      
      // Create monthly summary
      const monthlySummary = {
        date: new Date().toISOString(),
        type: 'monthly_summary',
        searchPerformance,
        recommendations: this.generateMonthlyRecommendations(searchPerformance)
      };
      
      const reportPath = path.join(this.reportDir, `monthly-seo-report-${new Date().getMonth() + 1}-${new Date().getFullYear()}.json`);
      fs.writeFileSync(reportPath, JSON.stringify(monthlySummary, null, 2));
      
      this.log(`📁 Monthly report saved: ${reportPath}`);
      this.log('✅ Monthly tasks completed');
      
    } catch (error) {
      this.log(`❌ Monthly tasks failed: ${error.message}`);
      throw error;
    }
  }

  generateMonthlyRecommendations(searchPerformance) {
    const recommendations = [];
    
    if (!searchPerformance || !searchPerformance.targetKeywordData.length) {
      recommendations.push('Setup Google Search Console API to get performance data');
      return recommendations;
    }
    
    const avgPosition = searchPerformance.targetKeywordData
      .reduce((sum, row) => sum + row.position, 0) / searchPerformance.targetKeywordData.length;
    
    if (avgPosition > 10) {
      recommendations.push('Focus on improving content for "villa fiscardo" keywords - currently beyond first page');
      recommendations.push('Increase local SEO efforts and citations');
      recommendations.push('Build more high-quality backlinks from travel and tourism sites');
    }
    
    if (avgPosition > 5 && avgPosition <= 10) {
      recommendations.push('Good progress! Focus on moving into top 5 positions');
      recommendations.push('Optimize for long-tail keywords like "best villa fiscardo kefalonia"');
    }
    
    if (avgPosition <= 5) {
      recommendations.push('Excellent rankings! Focus on maintaining position and expanding keyword coverage');
      recommendations.push('Create more content about Fiscardo attractions and activities');
    }
    
    // Always include these recommendations
    recommendations.push('Continue regular content updates and fresh blog posts');
    recommendations.push('Monitor and respond to guest reviews mentioning location');
    recommendations.push('Ensure all new pages are submitted for indexing promptly');
    
    return recommendations;
  }

  async run(taskType = 'daily') {
    this.log(`Starting ${taskType} SEO automation`);
    
    try {
      switch (taskType) {
        case 'daily':
          await this.runDailyTasks();
          break;
        case 'weekly':
          await this.runWeeklyTasks();
          break;
        case 'monthly':
          await this.runMonthlyTasks();
          break;
        case 'all':
          await this.runDailyTasks();
          await this.runWeeklyTasks();
          await this.runMonthlyTasks();
          break;
        default:
          throw new Error(`Unknown task type: ${taskType}`);
      }
      
      this.log(`✅ ${taskType} automation completed successfully`);
      
    } catch (error) {
      this.log(`❌ ${taskType} automation failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Command line interface
const taskType = process.argv[2] || 'daily';
const automation = new ScheduledSEOAutomation();
automation.run(taskType).catch(console.error);

export default ScheduledSEOAutomation;
