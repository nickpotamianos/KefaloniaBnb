#!/usr/bin/env node

/**
 * Update Image References Script
 * 
 * After running optimize-images.js, this script will:
 * 1. Find all .tsx, .ts, .jsx, .js, .html files
 * 2. Replace .jpg, .jpeg, .png references with .webp
 * 3. Skip references in skip list (logos, etc.)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIRS = [
  path.join(__dirname, '../client/src'),
  path.join(__dirname, '../client/index.html'),
  path.join(__dirname, '../client/public')
];

// Images to skip (logos that should stay PNG)
const SKIP_IMAGES = [
  'logokef1.png',
  '2logokef1.png',
  'wairbnb.svg',
  'favicon',
  'alex.png' // Host photo - small enough
];

async function readFile(filepath) {
  return await fs.readFile(filepath, 'utf-8');
}

async function writeFile(filepath, content) {
  await fs.writeFile(filepath, content, 'utf-8');
}

async function walkDirectory(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  const results = [];
  
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      // Skip node_modules, dist, build
      if (['node_modules', 'dist', 'build', '.git', 'images-backup'].includes(file.name)) {
        continue;
      }
      const subResults = await walkDirectory(fullPath);
      results.push(...subResults);
    } else {
      // Only process code files
      if (/\.(tsx?|jsx?|html)$/.test(file.name)) {
        results.push(fullPath);
      }
    }
  }
  
  return results;
}

function shouldSkipImage(imageName) {
  return SKIP_IMAGES.some(skip => imageName.includes(skip));
}

async function updateImageReferences(filepath) {
  let content = await readFile(filepath);
  const originalContent = content;
  let changes = 0;
  
  // Pattern to match image sources: src="/images/..." or url("/images/...")
  const patterns = [
    // src="/images/something.jpg"
    /(src=["'])(\/images\/[^"']+\.(jpg|jpeg|png))(["'])/gi,
    // url("/images/something.jpg")
    /(url\(["']?)(\/images\/[^"')]+\.(jpg|jpeg|png))(["']?\))/gi,
    // href="/images/something.jpg"
    /(href=["'])(\/images\/[^"']+\.(jpg|jpeg|png))(["'])/gi,
    // backgroundImage: "url(/images/something.jpg)"
    /(background-image:\s*url\(["']?)(\/images\/[^"')]+\.(jpg|jpeg|png))(["']?\))/gi,
    // style="background-image: url(/images/something.jpg)"
    /(style=["'][^"']*background-image:\s*url\(["']?)([^"']+\/images\/[^"')]+\.(jpg|jpeg|png))(["']?\)[^"']*["'])/gi
  ];
  
  patterns.forEach(pattern => {
    content = content.replace(pattern, (match, prefix, imagePath, ext, suffix) => {
      // Extract just the filename
      const filename = path.basename(imagePath);
      
      // Skip if in skip list
      if (shouldSkipImage(filename)) {
        return match;
      }
      
      // Replace extension with .webp
      const newImagePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      changes++;
      
      return `${prefix}${newImagePath}${suffix}`;
    });
  });
  
  if (content !== originalContent) {
    await writeFile(filepath, content);
    return { updated: true, changes };
  }
  
  return { updated: false, changes: 0 };
}

async function main() {
  console.log('🔄 Updating image references to WebP format...\n');
  
  let totalFiles = 0;
  let updatedFiles = 0;
  let totalChanges = 0;
  
  // Process each source directory
  for (const srcPath of SRC_DIRS) {
    try {
      const stats = await fs.stat(srcPath);
      
      if (stats.isDirectory()) {
        const files = await walkDirectory(srcPath);
        
        for (const file of files) {
          totalFiles++;
          const result = await updateImageReferences(file);
          
          if (result.updated) {
            updatedFiles++;
            totalChanges += result.changes;
            console.log(`✅ Updated: ${path.relative(path.join(__dirname, '..'), file)} (${result.changes} changes)`);
          }
        }
      } else if (stats.isFile()) {
        // Single file (index.html)
        totalFiles++;
        const result = await updateImageReferences(srcPath);
        
        if (result.updated) {
          updatedFiles++;
          totalChanges += result.changes;
          console.log(`✅ Updated: ${path.relative(path.join(__dirname, '..'), srcPath)} (${result.changes} changes)`);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${srcPath}:`, error.message);
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('📊 UPDATE SUMMARY');
  console.log('='.repeat(80));
  console.log(`📄 Files scanned: ${totalFiles}`);
  console.log(`✅ Files updated: ${updatedFiles}`);
  console.log(`🔄 Total image references changed: ${totalChanges}`);
  console.log('\n⚠️  NEXT STEPS:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Test all pages and images');
  console.log('   3. Check browser console for 404 errors');
  console.log('   4. If all looks good, commit changes');
  console.log('='.repeat(80));
}

main().catch(console.error);
