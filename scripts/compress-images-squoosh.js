#!/usr/bin/env node

/**
 * SIMPLE Image Compression using Squoosh CLI
 * 
 * This uses @squoosh/cli which is much easier than sharp
 * 
 * Installation:
 *   npm install -g @squoosh/cli
 * 
 * Usage:
 *   node scripts/compress-images-squoosh.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IMAGE_DIR = path.join(__dirname, '../client/public/images');
const BACKUP_DIR = path.join(__dirname, '../client/public/images-backup');
const OUTPUT_DIR = path.join(__dirname, '../client/public/images-compressed');

console.log('🖼️  Image Compression Script\n');

// Check if squoosh is installed
try {
  execSync('squoosh-cli --version', { stdio: 'ignore' });
} catch (error) {
  console.log('❌ Squoosh CLI not found. Installing now...\n');
  console.log('Running: npm install -g @squoosh/cli\n');
  try {
    execSync('npm install -g @squoosh/cli', { stdio: 'inherit' });
    console.log('\n✅ Squoosh CLI installed!\n');
  } catch (installError) {
    console.error('\n❌ Failed to install Squoosh CLI.');
    console.error('Please run manually: npm install -g @squoosh/cli');
    process.exit(1);
  }
}

// Create backup
console.log('📦 Creating backup...');
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`Copying ${IMAGE_DIR} to ${BACKUP_DIR}...`);
  execSync(`xcopy /E /I /Y "${IMAGE_DIR}" "${BACKUP_DIR}"`, { stdio: 'inherit' });
  console.log('✅ Backup created!\n');
} else {
  console.log('⏭️  Backup already exists, skipping...\n');
}

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🔄 Compressing images with Squoosh...\n');
console.log('This will take 5-10 minutes for all images.\n');

// Priority images (biggest files)
const priorityImages = [
  'summer.jpg',
  'master_bedroom/master.png',
  'bathroom/_83A0836.jpg',
  'living_room/_83A0140.jpg',
  'dinning/_83A0691.jpg',
  'living_room/_83A0113.jpg',
  'living_room/_83A0121.jpg',
  'living_room/_83A0128.jpg'
];

console.log('📸 Compressing PRIORITY images first (biggest savings)...\n');

priorityImages.forEach((img, index) => {
  const fullPath = path.join(IMAGE_DIR, img);
  
  if (fs.existsSync(fullPath)) {
    console.log(`[${index + 1}/${priorityImages.length}] Compressing ${img}...`);
    
    try {
      const outputPath = path.join(OUTPUT_DIR, path.dirname(img));
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }
      
      // For large files, resize to 1920px width, for others 800px
      const isLarge = img.includes('summer') || img.includes('master.png');
      const resize = isLarge ? '--resize 1920' : '--resize 800';
      
      execSync(
        `squoosh-cli --webp '{"quality":82}' ${resize} -d "${outputPath}" "${fullPath}"`,
        { stdio: 'inherit' }
      );
      
      console.log(`✅ Done!\n`);
    } catch (error) {
      console.log(`⚠️  Failed to compress ${img}: ${error.message}\n`);
    }
  }
});

console.log('\n🎉 Compression complete!\n');
console.log('📊 Next steps:\n');
console.log('1. Check compressed images in: client/public/images-compressed/');
console.log('2. Compare file sizes');
console.log('3. If happy, replace originals:');
console.log('   - Delete client/public/images/*');
console.log('   - Move compressed files back');
console.log('4. Run: node scripts/update-image-references.js');
console.log('5. Test: npm run dev\n');
