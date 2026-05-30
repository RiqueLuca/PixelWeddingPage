"""Trim fully-transparent padding from every PNG in the asset folders.

Makes height-based CSS sizing line up: a character's feet end at the bottom
edge, a prop's base sits on the ground. Idempotent — re-running does nothing
once an image is already tight.
"""
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
DIRS = [
    ROOT / "public" / "assets" / "props",
    ROOT / "public" / "assets" / "characters",
]


def trim(path: Path) -> str:
    img = Image.open(path).convert("RGBA")
    alpha = img.getchannel("A")
    bbox = alpha.getbbox()  # box of non-zero-alpha pixels
    if not bbox:
        return "empty"
    if bbox == (0, 0, img.width, img.height):
        return "already tight"
    img.crop(bbox).save(path)
    return f"{img.size} -> {(bbox[2]-bbox[0], bbox[3]-bbox[1])}"


def main() -> None:
    total = 0
    for d in DIRS:
        if not d.exists():
            continue
        for png in sorted(d.glob("*.png")):
            print(f"{png.name:24} {trim(png)}")
            total += 1
    print(f"\nprocessed {total} files")


if __name__ == "__main__":
    main()
