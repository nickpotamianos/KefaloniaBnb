"""
Simple Image Compression Script using Pillow
No API keys needed, runs 100% locally

Installation:
    pip install Pillow

Usage:
    python scripts/compress_images.py
"""

from PIL import Image
import os
from pathlib import Path
import shutil

# Configuration
IMAGE_DIR = Path(__file__).parent.parent / "client" / "public" / "images"
BACKUP_DIR = Path(__file__).parent.parent / "client" / "public" / "images-backup"

# Skip these files
SKIP_FILES = {
    "logokef1.png",
    "2logokef1.png",
    "wairbnb.svg",
    "alex.png"  # Small enough already
}

SKIP_EXTENSIONS = {".svg", ".ico", ".mp4", ".gif"}

# Compression settings
SETTINGS = {
    "large": {
        "max_size": (1920, 1080),
        "quality": 85,
        "patterns": ["summer", "homepage", "cropped"]
    },
    "gallery": {
        "max_size": (800, 600),
        "quality": 82,
        "patterns": ["master_bedroom", "bathroom", "living_room", "dinning", "room2", "kitchen", "mageirio", "backyard"]
    },
    "experience": {
        "max_size": (600, 400),
        "quality": 80,
        "patterns": ["myrtos", "fiskardo", "alaties", "Robola", "hikepng", "DJI_"]
    },
    "default": {
        "max_size": (1200, 900),
        "quality": 82,
        "patterns": []
    }
}


def get_settings_for_file(filepath):
    """Determine compression settings based on file path"""
    filepath_str = str(filepath).lower()
    
    for setting_name, config in SETTINGS.items():
        if setting_name == "default":
            continue
        for pattern in config["patterns"]:
            if pattern.lower() in filepath_str:
                return config
    
    return SETTINGS["default"]


def should_skip_file(filepath):
    """Check if file should be skipped"""
    if filepath.name in SKIP_FILES:
        return True
    if filepath.suffix.lower() in SKIP_EXTENSIONS:
        return True
    return False


def compress_image(image_path, settings):
    """Compress a single image"""
    try:
        original_size = os.path.getsize(image_path)
        
        # Open image
        with Image.open(image_path) as img:
            # Convert RGBA to RGB if saving as JPEG
            if img.mode in ("RGBA", "LA", "P"):
                if image_path.suffix.lower() == ".png":
                    # Keep as PNG for transparency
                    pass
                else:
                    # Convert to RGB for JPEG
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    if img.mode == "P":
                        img = img.convert("RGBA")
                    background.paste(img, mask=img.split()[-1] if img.mode == "RGBA" else None)
                    img = background
            
            # Get original dimensions
            original_width, original_height = img.size
            
            # Resize if needed
            max_width, max_height = settings["max_size"]
            if original_width > max_width or original_height > max_height:
                img.thumbnail((max_width, max_height), Image.Resampling.LANCZOS)
                resized = True
            else:
                resized = False
            
            # Save compressed
            if image_path.suffix.lower() == ".png":
                # For PNG, convert to WebP for better compression
                webp_path = image_path.with_suffix(".webp")
                img.save(webp_path, "WebP", quality=settings["quality"], method=6)
                
                # Remove original PNG, keep WebP
                os.remove(image_path)
                final_path = webp_path
            else:
                # For JPEG, save as WebP
                webp_path = image_path.with_suffix(".webp")
                img.save(webp_path, "WebP", quality=settings["quality"], method=6)
                
                # Remove original JPEG, keep WebP
                os.remove(image_path)
                final_path = webp_path
        
        # Get new size
        new_size = os.path.getsize(final_path)
        savings = ((original_size - new_size) / original_size * 100)
        
        return {
            "success": True,
            "original_size": original_size,
            "new_size": new_size,
            "savings": savings,
            "resized": resized,
            "original_dims": f"{original_width}x{original_height}",
            "format_changed": final_path.suffix != image_path.suffix
        }
    
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def find_images(directory):
    """Recursively find all images"""
    image_extensions = {".jpg", ".jpeg", ".png"}
    images = []
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            filepath = Path(root) / file
            if filepath.suffix.lower() in image_extensions:
                images.append(filepath)
    
    return images


def main():
    print("🖼️  Image Compression Script (Python + Pillow)\n")
    
    # Check if Pillow is installed
    try:
        from PIL import Image
    except ImportError:
        print("❌ Pillow not installed!")
        print("\nInstall it with:")
        print("  pip install Pillow\n")
        return
    
    # Create backup
    print("📦 Creating backup...")
    if not BACKUP_DIR.exists():
        print(f"Copying {IMAGE_DIR} to {BACKUP_DIR}...")
        shutil.copytree(IMAGE_DIR, BACKUP_DIR)
        print("✅ Backup created!\n")
    else:
        print("⏭️  Backup exists, skipping...\n")
    
    # Find all images
    print("🔍 Scanning for images...")
    all_images = find_images(IMAGE_DIR)
    print(f"Found {len(all_images)} image files\n")
    
    # Filter images to process
    images_to_process = [img for img in all_images if not should_skip_file(img)]
    print(f"Processing {len(images_to_process)} images (skipped {len(all_images) - len(images_to_process)})\n")
    
    # Process images
    processed = 0
    skipped = 0
    errors = 0
    total_original = 0
    total_new = 0
    
    for i, image_path in enumerate(images_to_process, 1):
        relative_path = image_path.relative_to(IMAGE_DIR)
        settings = get_settings_for_file(image_path)
        
        print(f"[{i}/{len(images_to_process)}] {relative_path}")
        
        result = compress_image(image_path, settings)
        
        if result["success"]:
            processed += 1
            total_original += result["original_size"]
            total_new += result["new_size"]
            
            original_kb = result["original_size"] / 1024
            new_kb = result["new_size"] / 1024
            
            resize_note = " (resized)" if result["resized"] else ""
            format_note = " → WebP" if result["format_changed"] else ""
            
            print(f"   ✅ {original_kb:.0f}KB → {new_kb:.0f}KB (-{result['savings']:.1f}%)"
                  f"{resize_note}{format_note}\n")
        else:
            errors += 1
            print(f"   ❌ Error: {result['error']}\n")
    
    # Summary
    print("=" * 70)
    print("📊 COMPRESSION SUMMARY")
    print("=" * 70)
    print(f"✅ Successfully compressed: {processed} images")
    print(f"❌ Errors: {errors}")
    print(f"\n💾 Total size reduction:")
    print(f"   Before: {total_original / 1024 / 1024:.2f} MB")
    print(f"   After:  {total_new / 1024 / 1024:.2f} MB")
    print(f"   Saved:  {(total_original - total_new) / 1024 / 1024:.2f} MB "
          f"({(total_original - total_new) / total_original * 100:.1f}%)")
    print(f"\n📁 Original images backed up to: {BACKUP_DIR.name}/")
    print("\n⚠️  IMPORTANT: Images converted to WebP format!")
    print("Next steps:")
    print("   1. Run: python scripts/update_image_refs.py")
    print("   2. Test: npm run dev")
    print("   3. If happy, commit changes")
    print("=" * 70)


if __name__ == "__main__":
    main()
