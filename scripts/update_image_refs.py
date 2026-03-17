"""
Update Image References from .jpg/.png to .webp

Run this AFTER compress_images.py

Usage:
    python scripts/update_image_refs.py
"""

import re
from pathlib import Path

# Directories to scan
SRC_DIRS = [
    Path(__file__).parent.parent / "client" / "src",
    Path(__file__).parent.parent / "client" / "index.html",
]

# Images to skip (logos)
SKIP_IMAGES = [
    "logokef1.png",
    "2logokef1.png",
    "wairbnb.svg",
    "alex.png"
]


def should_skip_image(image_name):
    """Check if image should be skipped"""
    return any(skip in image_name for skip in SKIP_IMAGES)


def update_file(filepath):
    """Update image references in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        changes = 0
        
        # Pattern 1: src="/images/something.jpg"
        pattern1 = r'((?:src|href)=["\'](/images/[^"\']+)\.(jpg|jpeg|png)(["\']))'
        
        def replace_func(match):
            nonlocal changes
            full_match = match.group(0)
            prefix = match.group(1).split('=')[0] + '="'
            image_path = match.group(2)
            ext = match.group(3)
            quote = match.group(4)
            
            # Check if should skip
            image_name = image_path.split('/')[-1]
            if should_skip_image(image_name):
                return full_match
            
            changes += 1
            return f'{prefix}{image_path}.webp{quote}'
        
        content = re.sub(pattern1, replace_func, content)
        
        # Pattern 2: url("/images/something.jpg")
        pattern2 = r'(url\(["\']?)(/images/[^"\')\s]+)\.(jpg|jpeg|png)(["\']?\))'
        
        def replace_func2(match):
            nonlocal changes
            full_match = match.group(0)
            prefix = match.group(1)
            image_path = match.group(2)
            ext = match.group(3)
            suffix = match.group(4)
            
            # Check if should skip
            image_name = image_path.split('/')[-1]
            if should_skip_image(image_name):
                return full_match
            
            changes += 1
            return f'{prefix}{image_path}.webp{suffix}'
        
        content = re.sub(pattern2, replace_func2, content)
        
        # Only write if changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return {"updated": True, "changes": changes}
        
        return {"updated": False, "changes": 0}
    
    except Exception as e:
        return {"error": str(e)}


def find_code_files(directory):
    """Find all code files to update"""
    extensions = {".tsx", ".ts", ".jsx", ".js", ".html", ".css"}
    files = []
    
    if directory.is_file():
        return [directory]
    
    for root, dirs, filenames in directory.walk():
        # Skip node_modules, dist, build, etc
        dirs[:] = [d for d in dirs if d not in 
                   {"node_modules", "dist", "build", ".git", "images-backup", "images"}]
        
        for filename in filenames:
            filepath = root / filename
            if filepath.suffix in extensions:
                files.append(filepath)
    
    return files


def main():
    print("🔄 Updating image references to WebP...\n")
    
    total_files = 0
    updated_files = 0
    total_changes = 0
    errors = 0
    
    for src_path in SRC_DIRS:
        if not src_path.exists():
            print(f"⚠️  Path not found: {src_path}")
            continue
        
        files = find_code_files(src_path)
        
        for filepath in files:
            total_files += 1
            result = update_file(filepath)
            
            if "error" in result:
                errors += 1
                print(f"❌ Error in {filepath.name}: {result['error']}")
            elif result["updated"]:
                updated_files += 1
                total_changes += result["changes"]
                relative = filepath.relative_to(Path(__file__).parent.parent)
                print(f"✅ {relative} ({result['changes']} changes)")
    
    print("\n" + "=" * 70)
    print("📊 UPDATE SUMMARY")
    print("=" * 70)
    print(f"📄 Files scanned: {total_files}")
    print(f"✅ Files updated: {updated_files}")
    print(f"🔄 Total references changed: {total_changes}")
    print(f"❌ Errors: {errors}")
    print("\n⚠️  NEXT STEPS:")
    print("   1. Run: npm run dev")
    print("   2. Test all pages and images")
    print("   3. Check browser console for 404 errors")
    print("   4. If all good, commit: git add . && git commit -m 'Compress images to WebP'")
    print("=" * 70)


if __name__ == "__main__":
    main()
