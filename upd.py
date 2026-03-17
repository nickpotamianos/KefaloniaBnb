import re
from pathlib import Path

BASE_DIR = Path.cwd()
SRC_DIRS = [BASE_DIR / "client" / "src", BASE_DIR / "client" / "index.html"]
SKIP_IMAGES = ["logokef1.png", "2logokef1.png", "wairbnb.svg", "alex.png"]

def should_skip(img):
    return any(s in img for s in SKIP_IMAGES)

def update_file(fp):
    try:
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()
        original = content
        changes = 0
        pattern1 = r"((?:src|href)=[\"'](?:/images/[^\"']*))\.(jpg|jpeg|png)([\"'])"
        def repl1(m):
            nonlocal changes
            if should_skip(m.group(0)): return m.group(0)
            changes += 1
            return m.group(1) + ".webp" + m.group(3)
        content = re.sub(pattern1, repl1, content)
        pattern2 = r"(url\([\"']?(?:/images/[^\"'\)]*?))\.(jpg|jpeg|png)([\"']?\))"
        def repl2(m):
            nonlocal changes
            if should_skip(m.group(0)): return m.group(0)
            changes += 1
            return m.group(1) + ".webp" + m.group(3)
        content = re.sub(pattern2, repl2, content)
        if content != original:
            with open(fp, "w", encoding="utf-8") as f:
                f.write(content)
            return {"updated": True, "changes": changes}
        return {"updated": False, "changes": 0}
    except Exception as e:
        return {"error": str(e)}

def find_files(d):
    exts = {".tsx", ".ts", ".jsx", ".js", ".html", ".css"}
    files = []
    if d.is_file(): return [d]
    for root, dirs, filenames in d.walk():
        dirs[:] = [x for x in dirs if x not in {"node_modules", "dist", "build", ".git", "images-backup", "images"}]
        for f in filenames:
            p = root / f
            if p.suffix in exts: files.append(p)
    return files

print("Updating image references...")
total = 0
updated = 0
total_changes = 0
for src in SRC_DIRS:
    if not src.exists(): continue
    for fp in find_files(src):
        total += 1
        r = update_file(fp)
        if "error" not in r and r["updated"]:
            updated += 1
            total_changes += r["changes"]
            print(f"Updated: {fp.name} ({r['changes']} changes)")
print(f"Files scanned: {total}, Updated: {updated}, Total changes: {total_changes}")
