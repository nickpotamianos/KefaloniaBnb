"""
Aggressive image compression for PageSpeed optimization.
1. Re-compress poster image (cropped_83A0388.webp) to quality 40
2. Resize gallery images from 708x533 to 400x300 max and compress at quality 50
"""
from PIL import Image
import os

IMG_DIR = r"c:\Users\DaNi2\KefaloniaBnb\client\public\images"

# --- 1. Poster image: aggressive compression ---
poster = os.path.join(IMG_DIR, "cropped_83A0388.webp")
if os.path.exists(poster):
    original_size = os.path.getsize(poster)
    img = Image.open(poster)
    img.save(poster, "WEBP", quality=40, method=6)
    new_size = os.path.getsize(poster)
    print(f"Poster: {original_size//1024}KB -> {new_size//1024}KB (saved {(original_size-new_size)//1024}KB)")

# --- 2. Gallery images: resize to 400x300 max and compress ---
gallery_dirs = ["living_room", "dinning", "master_bedroom", "room2"]
total_saved = 0

for subdir in gallery_dirs:
    dir_path = os.path.join(IMG_DIR, subdir)
    if not os.path.isdir(dir_path):
        continue
    for fname in os.listdir(dir_path):
        if not fname.lower().endswith(".webp"):
            continue
        fpath = os.path.join(dir_path, fname)
        original_size = os.path.getsize(fpath)
        img = Image.open(fpath)
        img.thumbnail((400, 300), Image.LANCZOS)
        img.save(fpath, "WEBP", quality=50, method=6)
        new_size = os.path.getsize(fpath)
        saved = original_size - new_size
        total_saved += saved
        print(f"  {subdir}/{fname}: {original_size//1024}KB -> {new_size//1024}KB (saved {saved//1024}KB) [{img.size[0]}x{img.size[1]}]")

print(f"\nTotal gallery savings: {total_saved//1024}KB")

# --- 3. Also compress the top oversized root images ---
root_images = ["foki.webp", "summer.webp", "fiskardo.webp", "winter.webp", 
               "emplisi.webp", "odysseas.webp", "assos.webp", "spring.webp",
               "boat-rental-02.webp"]
root_saved = 0
for fname in root_images:
    fpath = os.path.join(IMG_DIR, fname)
    if not os.path.exists(fpath):
        continue
    original_size = os.path.getsize(fpath)
    img = Image.open(fpath)
    img.thumbnail((800, 600), Image.LANCZOS)
    img.save(fpath, "WEBP", quality=45, method=6)
    new_size = os.path.getsize(fpath)
    saved = original_size - new_size
    root_saved += saved
    print(f"  root/{fname}: {original_size//1024}KB -> {new_size//1024}KB (saved {saved//1024}KB) [{img.size[0]}x{img.size[1]}]")

print(f"\nTotal root image savings: {root_saved//1024}KB")
print(f"GRAND TOTAL SAVINGS: {(total_saved + root_saved)//1024}KB")
