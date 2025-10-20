#!/usr/bin/env node

/**
 * EASIEST Image Compression - Uses TinyPNG API (No Dependencies!)
 * 
 * Get FREE API key: https://tinypng.com/developers
 * - 500 images/month free
 * - No installation needed
 * - Best compression
 * 
 * Usage:
 *   1. Get API key from tinypng.com/developers
 *   2. Set environment variable: $env:TINYPNG_API_KEY = "your-key-here"
 *   3. Run: node scripts/compress-images-tinypng.js
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_KEY = process.env.TINYPNG_API_KEY;

if (!API_KEY) {
  console.log('❌ TinyPNG API key not found!\n');
  console.log('📝 Steps to get started:\n');
  console.log('1. Go to: https://tinypng.com/developers');
  console.log('2. Enter your email to get FREE API key (500 images/month)');
  console.log('3. Set the key:\n');
  console.log('   PowerShell:');
  console.log('   $env:TINYPNG_API_KEY = "your-key-here"\n');
  console.log('4. Run this script again:\n');
  console.log('   node scripts/compress-images-tinypng.js\n');
  process.exit(1);
}

const IMAGE_DIR = path.join(__dirname, '../client/public/images');
const BACKUP_DIR = path.join(__dirname, '../client/public/images-backup');

// Priority images to compress
const priorityImages = [
  { path: 'summer.jpg', resize: { width: 1920 } },
  { path: 'master_bedroom/master.png', resize: { width: 800 } },
  { path: 'bathroom/_83A0836.jpg', resize: { width: 800 } },
  { path: 'living_room/_83A0140.jpg', resize: { width: 800 } },
  { path: 'dinning/_83A0691.jpg', resize: { width: 800 } },
  { path: 'living_room/_83A0113.jpg', resize: { width: 800 } },
  { path: 'living_room/_83A0121.jpg', resize: { width: 800 } },
  { path: 'living_room/_83A0128.jpg', resize: { width: 800 } },
  { path: 'master_bedroom/_83A0303.jpg', resize: { width: 800 } },
  { path: 'room2/_83A0236.jpg', resize: { width: 800 } }
];

function compressImage(imagePath, resizeOptions) {
  return new Promise((resolve, reject) => {
    const fullPath = path.join(IMAGE_DIR, imagePath);
    
    if (!fs.existsSync(fullPath)) {
      return reject(new Error(`File not found: ${fullPath}`));
    }
    
    const originalSize = fs.statSync(fullPath).size;
    const imageBuffer = fs.readFileSync(fullPath);
    
    const options = {
      hostname: 'api.tinify.com',
      path: '/shrink',
      method: 'POST',
      auth: `api:${API_KEY}`,
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 201) {
          const response = JSON.parse(data);
          const compressedUrl = response.output.url;
          const compressedSize = response.output.size;
          
          // If resize needed, resize first then download
          if (resizeOptions) {
            const resizeReq = https.request({
              hostname: 'api.tinify.com',
              path: '/output',
              method: 'POST',
              auth: `api:${API_KEY}`,
              headers: {
                'Content-Type': 'application/json'
              }
            }, (resizeRes) => {
              let resizedData = '';
              
              resizeRes.on('data', (chunk) => {
                resizedData += chunk;
              });
              
              resizeRes.on('end', () => {
                const resizedResponse = JSON.parse(resizedData);
                downloadImage(resizedResponse.url, fullPath, originalSize, compressedSize, resolve, reject);
              });
            });
            
            resizeReq.write(JSON.stringify({
              source: { url: compressedUrl },
              resize: resizeOptions
            }));
            resizeReq.end();
          } else {
            downloadImage(compressedUrl, fullPath, originalSize, compressedSize, resolve, reject);
          }
        } else {
          reject(new Error(`TinyPNG API error: ${res.statusCode} - ${data}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(imageBuffer);
    req.end();
  });
}

function downloadImage(url, savePath, originalSize, compressedSize, resolve, reject) {
  https.get(url, (res) => {
    const fileStream = fs.createWriteStream(savePath);
    
    res.pipe(fileStream);
    
    fileStream.on('finish', () => {
      fileStream.close();
      const savedPercent = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
      resolve({
        originalSize,
        compressedSize,
        savedPercent
      });
    });
    
    fileStream.on('error', reject);
  }).on('error', reject);
}

async function main() {
  console.log('🖼️  TinyPNG Image Compression\n');
  console.log(`📁 Working directory: ${IMAGE_DIR}\n`);
  
  // Create backup
  console.log('📦 Creating backup...');
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    
    // Copy directory recursively
    function copyDir(src, dest) {
      fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src, { withFileTypes: true });
      
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
          copyDir(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    }
    
    copyDir(IMAGE_DIR, BACKUP_DIR);
    console.log('✅ Backup created!\n');
  } else {
    console.log('⏭️  Backup exists, skipping...\n');
  }
  
  console.log(`🚀 Compressing ${priorityImages.length} priority images...\n`);
  
  let totalOriginal = 0;
  let totalCompressed = 0;
  let successCount = 0;
  
  for (let i = 0; i < priorityImages.length; i++) {
    const img = priorityImages[i];
    console.log(`[${i + 1}/${priorityImages.length}] ${img.path}...`);
    
    try {
      const result = await compressImage(img.path, img.resize);
      totalOriginal += result.originalSize;
      totalCompressed += result.compressedSize;
      successCount++;
      
      console.log(`   ✅ ${(result.originalSize / 1024).toFixed(0)}KB → ${(result.compressedSize / 1024).toFixed(0)}KB (-${result.savedPercent}%)\n`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('='.repeat(60));
  console.log('📊 COMPRESSION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully compressed: ${successCount}/${priorityImages.length} images`);
  console.log(`📦 Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 Compressed size: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Saved: ${((totalOriginal - totalCompressed) / 1024 / 1024).toFixed(2)} MB (${((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1)}%)`);
  console.log('\n✅ Done! Images have been compressed in place.');
  console.log('📁 Original images backed up to: images-backup/\n');
  console.log('🚀 Next steps:');
  console.log('   1. Test: npm run dev');
  console.log('   2. If happy, commit changes');
  console.log('   3. If issues, restore from images-backup/');
}

main().catch(console.error);
