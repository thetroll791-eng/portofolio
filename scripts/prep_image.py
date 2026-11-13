"""Crop Spider-Man wallpaper into profile-ready assets."""
from PIL import Image, ImageEnhance

SRC = "/home/z/my-project/upload/7b2e31e6fe2807adc21e19cf656a245c.jpg"

img = Image.open(SRC).convert("RGB")
w, h = img.size
print(f"Original: {w}x{h}")

# Square crop: full height, centered horizontally (Spidey is centered per description)
side = h  # 2304
x0 = (w - side) // 2  # 896
square = img.crop((x0, 0, x0 + side, side))

# Slight contrast/saturation boost for a punchy comic look
square = ImageEnhance.Contrast(square).enhance(1.05)
square = ImageEnhance.Color(square).enhance(1.08)

# Profile square 1200x1200
square.resize((1200, 1200), Image.LANCZOS).save(
    "/home/z/my-project/public/ad4m-spidey.jpg", quality=88, optimize=True
)

# Portrait 4:5 crop (tighter on the figure) 1000x1250
# take central 80% width band, full height
band_w = int(side * 0.8)
bx0 = (side - band_w) // 2
portrait = square.crop((bx0, 0, bx0 + band_w, side))
portrait.resize((1000, 1250), Image.LANCZOS).save(
    "/home/z/my-project/public/ad4m-spidey-portrait.jpg", quality=88, optimize=True
)

print("Saved: ad4m-spidey.jpg (1200x1200), ad4m-spidey-portrait.jpg (1000x1250)")
