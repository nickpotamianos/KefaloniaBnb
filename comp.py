from PIL import Image
import os
from pathlib import Path
import shutil

BASE_DIR = Path.cwd()
IMAGE_DIR = BASE_DIR / 'client' / 'public' / 'images'
BACKUP_DIR = BASE_DIR / 'client' / 'public' / 'images-backup'
SKIP_FILES = {'logokef1.png', '2logokef1.png', 'wairbnb.svg', 'alex.png'}
SKIP_EXTENSIONS = {'.svg', '.ico', '.mp4', '.gif', '.webp'}
SETTINGS = {
    'large': {'max_size': (1920, 1080), 'quality': 85, 'patterns': ['summer', 'homepage', 'cropped']},
    'gallery': {'max_size': (800, 600), 'quality': 82, 'patterns': ['master_bedroom', 'bathroom', 'living_room', 'dinning', 'room2', 'kitchen', 'mageirio', 'backyard']},
    'experience': {'max_size': (600, 400), 'quality': 80, 'patterns': ['myrtos', 'fiskardo', 'alaties', 'Robola', 'hikepng', 'DJI_']},
    'default': {'max_size': (1200, 900), 'quality': 82, 'patterns': []}
}

def get_settings(fp):
    s = str(fp).lower()
    for n, c in SETTINGS.items():
        if n != 'default':
            for p in c['patterns']:
                if p.lower() in s: return c
    return SETTINGS['default']

def skip(fp):
    return fp.name in SKIP_FILES or fp.suffix.lower() in SKIP_EXTENSIONS

def compress(path, settings):
    try:
        orig = os.path.getsize(path)
        with Image.open(path) as img:
            if img.mode in ('RGBA', 'LA', 'P'):
                if path.suffix.lower() != '.png':
                    bg = Image.new('RGB', img.size, (255,255,255))
                    if img.mode == 'P': img = img.convert('RGBA')
                    bg.paste(img, mask=img.split()[-1] if img.mode=='RGBA' else None)
                    img = bg
            ow, oh = img.size
            mw, mh = settings['max_size']
            resized = False
            if ow > mw or oh > mh:
                img.thumbnail((mw, mh), Image.Resampling.LANCZOS)
                resized = True
            wp = path.with_suffix('.webp')
            img.save(wp, 'WebP', quality=settings['quality'], method=6)
            os.remove(path)
        new = os.path.getsize(wp)
        return {'ok': True, 'orig': orig, 'new': new, 'save': (orig-new)/orig*100, 'resized': resized}
    except Exception as e:
        return {'ok': False, 'err': str(e)}

def find(d):
    imgs = []
    for root, dirs, files in os.walk(d):
        for f in files:
            p = Path(root) / f
            if p.suffix.lower() in {'.jpg', '.jpeg', '.png'}: imgs.append(p)
    return imgs

print('Compressing images...')
if not IMAGE_DIR.exists():
    print(f'Not found: {IMAGE_DIR}')
    exit(1)
if not BACKUP_DIR.exists():
    shutil.copytree(IMAGE_DIR, BACKUP_DIR)
    print('Backup created')
all_imgs = find(IMAGE_DIR)
to_process = [i for i in all_imgs if not skip(i)]
print(f'Processing {len(to_process)} images')
done = 0
tot_orig = 0
tot_new = 0
for i, p in enumerate(to_process, 1):
    rel = p.relative_to(IMAGE_DIR)
    settings = get_settings(p)
    r = compress(p, settings)
    if r['ok']:
        done += 1
        tot_orig += r['orig']
        tot_new += r['new']
        print(f'[{i}/{len(to_process)}] {rel.name}: {r["orig"]/1024:.0f}KB -> {r["new"]/1024:.0f}KB')
print(f'Done: {done}')
print(f'Before: {tot_orig/1024/1024:.2f} MB')
print(f'After: {tot_new/1024/1024:.2f} MB')
print(f'Saved: {(tot_orig-tot_new)/1024/1024:.2f} MB')
