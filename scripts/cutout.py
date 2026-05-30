"""Remove an opaque flat background from PixelLab map-object PNGs.

Some downloaded objects come back with a solid background instead of
transparency. PixelLab draws each subject with a dark outline, so a flood
fill seeded from the image border (matching the corner background color
within a tolerance) clears the background without eating into the subject.

Idempotent: images whose corners are already transparent are skipped.
"""
from collections import deque
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PROPS = ROOT / "public" / "assets" / "props"
TOL = 90  # manhattan RGB distance from the detected background color


def manhattan(a, b) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


def cutout(path: Path) -> str:
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()
    corners = [px[0, 0], px[w - 1, 0], px[0, h - 1], px[w - 1, h - 1]]
    opaque = [c for c in corners if c[3] == 255]
    if len(opaque) < 3:
        return "transparent already"
    bg = (
        sum(c[0] for c in opaque) // len(opaque),
        sum(c[1] for c in opaque) // len(opaque),
        sum(c[2] for c in opaque) // len(opaque),
    )

    visited = bytearray(w * h)
    dq: deque[tuple[int, int]] = deque()
    for x in range(w):
        dq.append((x, 0))
        dq.append((x, h - 1))
    for y in range(h):
        dq.append((0, y))
        dq.append((w - 1, y))

    cleared = 0
    while dq:
        x, y = dq.popleft()
        if x < 0 or y < 0 or x >= w or y >= h:
            continue
        idx = y * w + x
        if visited[idx]:
            continue
        visited[idx] = 1
        c = px[x, y]
        if c[3] == 0 or manhattan(c, bg) <= TOL:
            if c[3] != 0:
                px[x, y] = (c[0], c[1], c[2], 0)
                cleared += 1
            dq.append((x + 1, y))
            dq.append((x - 1, y))
            dq.append((x, y + 1))
            dq.append((x, y - 1))

    img.save(path)
    return f"cleared {cleared}px (bg={bg})"


def main() -> None:
    for p in sorted(PROPS.glob("*.png")):
        print(f"{p.name:14} {cutout(p)}")


if __name__ == "__main__":
    main()
