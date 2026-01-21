#!/usr/bin/env python3
"""
Populate categories.json `image` fields with slug-based paths and copy a placeholder SVG to each image path.
Run from project root: python3 scripts/populate_images.py
"""
import json
import re
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
CATEGORIES = ROOT / 'categories.json'
PLACEHOLDER = ROOT / 'images' / 'placeholder.svg'


def slugify(title: str) -> str:
    s = title.lower()
    # remove characters that are problematic in filenames
    s = re.sub(r"[’'\"/,:()\\]+", '', s)
    s = re.sub(r"\s+", '-', s.strip())
    s = re.sub(r"[^a-z0-9\-+_\.]+", '', s)
    return s


def main():
    data = json.loads(CATEGORIES.read_text())
    for item in data:
        title = item.get('title', '')
        if not title:
            slug = f"item-{item.get('id', 'unknown')}"
        else:
            slug = slugify(title)
            if not slug:
                slug = f"item-{item.get('id', 'unknown')}"
        img_name = f"{slug}.svg"
        img_path = Path('images') / img_name
        item['image'] = str(img_path)

        # copy placeholder to target path (create images/ if needed)
        dest = ROOT / img_path
        dest.parent.mkdir(parents=True, exist_ok=True)
        try:
            shutil.copyfile(PLACEHOLDER, dest)
        except Exception as e:
            print(f"Failed to copy placeholder to {dest}: {e}")

    # write back with pretty formatting
    CATEGORIES.write_text(json.dumps(data, indent=2, ensure_ascii=False))
    print(f"Updated {CATEGORIES} with {len(data)} image paths and created SVG files in images/")


if __name__ == '__main__':
    main()
