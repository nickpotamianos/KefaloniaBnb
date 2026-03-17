#!/usr/bin/env node

/**
 * Image Optimization Script for PageSpeed Performance
 * 
 * This script will:
 * 1. Convert all JPG/PNG images to WebP format (50-80% size reduction)
 * 2. Resize images appropriately (max 1920px width for featured, 800px for gallery)
 * 3. Compress images to quality 85 for optimal balance
 * 4. Update all image references in components
 * 
 * Requirements: npm install sharp (already in package.json for this project)
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGE_DIR = path.join(__dirname, '../client/public/images');
const BACKUP_DIR = path.join(__dirname, '../client/public/images-backup');

// Image processing configurations
const CONFIG = {
  // Featured/hero images - high quality, larger size
  featured: {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 85,
    pattern: /\/(master\.png|_83A0388\.jpg|cropped_83A0388\.jpg|homepage\.mp4)/
  },
  // Gallery thumbnails - medium size
  gallery: {
    maxWidth: 800,
    maxHeight: 600,
    quality: 82,
    pattern: /\/(master_bedroom|bathroom|living_room|dinning|room2|kitchen|mageirio|backyard)\//
  },
  // Experience/location images
  experience: {
    maxWidth: 600,
    maxHeight: 400,
    quality: 80,
    pattern: /\/(myrtos|fiskardo|summer|alaties|Robola|hikepng|DJI_)/
  },
  // Icons and logos
  small: {
    maxWidth: 200,
    maxHeight: 200,
    quality: 90,
    pattern: /\/(logo|alex|wairbnb|favicon)/
  }
};

// Files to skip (already optimized or not images)
const SKIP_FILES = [
  '.mp4', '.svg', '.gif', '.ico',
  'logokef1.png', '2logokef1.png' // Keep logos as-is
];

async function shouldSkipFile(filename) {
  return SKIP_FILES.some(skip => filename.includes(skip));
}

function getConfigForFile(filepath) {
  for (const [name, config] of Object.entries(CONFIG)) {
    if (config.pattern.test(filepath)) {
      return { name, ...config };
    }
  }
  // Default config for unmatched files
  return {
    name: 'default',
    maxWidth: 1200,
    maxHeight: 900,
    quality: 82
  };
}

async function processImage(inputPath, outputPath, config) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    
    // Skip if not an image or in skip list
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return { skipped: true, reason: 'Not a processable image format' };
    }
    
    if (await shouldSkipFile(inputPath)) {
      return { skipped: true, reason: 'In skip list' };
    }
    
    const stats = await fs.stat(inputPath);
    const originalSize = stats.size;
    
    // Process image
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Resize if necessary
    let shouldResize = false;
    if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
      shouldResize = true;
      image.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert to WebP
    const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await image.webp({ quality: config.quality }).toFile(webpPath);
    
    const newStats = await fs.stat(webpPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    return {
      success: true,
      originalSize,
      newSize,
      savings,
      resized: shouldResize,
      originalDimensions: `${metadata.width}x${metadata.height}`,
      config: config.name
    };
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
}

async function walkDirectory(dir, baseDir = dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const results = [];
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    const relativePath = path.relative(baseDir, fullPath);
    
    if (file.isDirectory()) {
      const subResults = await walkDirectory(fullPath, baseDir);
      results.push(...subResults);
    } else {
      results.push({
        fullPath,
        relativePath,
        filename: file.name
      });
    }
  }
  
  return results;
}

async function main() {
  console.log('🖼️  Image Optimization Script Starting...\n');
  
  // Check if sharp is installed
  try {
    await import('sharp');
  } catch (error) {
    console.error('❌ Error: sharp package not found. Please run: npm install sharp');
    process.exit(1);
  }
  
  // Create backup directory
  console.log('📦 Creating backup of original images...');
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
  } catch (error) {
    // Backup dir already exists
  }
  
  // Find all images
  console.log('🔍 Scanning for images...');
  const imageFiles = await walkDirectory(IMAGE_DIR);
  
  console.log(`Found ${imageFiles.length} files\n`);
  
  // Process each image
  let processed = 0;
  let skipped = 0;
  let errors = 0;
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  
  for (const file of imageFiles) {
    const ext = path.extname(file.filename).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }
    
    const config = getConfigForFile(file.relativePath);
    
    // Backup original
    const backupPath = path.join(BACKUP_DIR, file.relativePath);
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.copyFile(file.fullPath, backupPath);
    
    // Process
    const outputPath = file.fullPath;
    const result = await processImage(file.fullPath, outputPath, config);
    
    if (result.skipped) {
      skipped++;
      console.log(`⏭️  Skipped: ${file.relativePath} (${result.reason})`);
    } else if (result.error) {
      errors++;
      console.log(`❌ Error processing ${file.relativePath}: ${result.message}`);
    } else if (result.success) {
      processed++;
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
      console.log(
        `✅ ${file.relativePath}\\n` +
        `   Config: ${result.config} | ` +
        `${(result.originalSize / 1024).toFixed(1)}KB → ${(result.newSize / 1024).toFixed(1)}KB | ` +
        `-${result.savings}% | ` +
        `${result.originalDimensions}${result.resized ? ' (resized)' : ''}`
      );
    }
  }
  
  // Summary
  console.log('\\n' + '='.repeat(80));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully optimized: ${processed} images`);
  console.log(`⏭️  Skipped: ${skipped} files`);
  console.log(`❌ Errors: ${errors} files`);
  console.log(`\\n💾 Total size reduction:`);
  console.log(`   Before: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   After: ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Saved: ${(( totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2)} MB (${((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1)}%)`);
  console.log('\\n📁 Original images backed up to: images-backup/');
  console.log('\\n⚠️  NEXT STEPS:');
  console.log('   1. Update image references in components (.jpg/.png → .webp)');
  console.log('   2. Run: node scripts/update-image-references.js');
  console.log('   3. Test the site: npm run dev');
  console.log('   4. If all looks good, delete images-backup/ folder');
  console.log('='.repeat(80));
}

main().catch(console.error);
