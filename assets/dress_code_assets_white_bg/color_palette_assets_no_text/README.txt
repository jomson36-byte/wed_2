# Color Palette Assets

ชุดไฟล์นี้เป็น assets สำหรับส่วน **Our Color Palette** ของหน้า Dress Code  
เหมาะสำหรับนำไปใช้ใน HTML / CSS / Web Animation

## Files Included

| File name | Description | Suggested use |
|---|---|---|
| `01_gold_flourish_left.png` | ลายเส้นทองตกแต่งฝั่งซ้าย | ใช้วางซ้ายของหัวข้อ Section |
| `02_gold_flourish_right.png` | ลายเส้นทองตกแต่งฝั่งขวา | ใช้วางขวาของหัวข้อ Section |
| `03_sage_green_texture_1x1.png` | Texture สี Sage Green แบบ 1:1 | ใช้เป็น swatch สี |
| `04_ivory_texture_1x1.png` | Texture สี Ivory แบบ 1:1 | ใช้เป็น swatch สี |
| `05_beige_texture_1x1.png` | Texture สี Beige แบบ 1:1 | ใช้เป็น swatch สี |
| `06_dusty_pink_texture_1x1.png` | Texture สี Dusty Pink แบบ 1:1 | ใช้เป็น swatch สี |
| `07_soft_peach_texture_1x1.png` | Texture สี Soft Peach แบบ 1:1 | ใช้เป็น swatch สี |
| `08_light_brown_texture_1x1.png` | Texture สี Light Brown แบบ 1:1 | ใช้เป็น swatch สี |

## Design Notes

- ไฟล์สีทั้งหมดเป็นภาพ texture อัตราส่วน `1:1`
- ไม่มี text ติดมากับ texture เพื่อให้สามารถเขียน label ด้วย HTML/CSS ได้เอง
- ลายเส้นทองแยกซ้ายและขวา เพื่อจัดวางหัวข้อได้ยืดหยุ่น
- แนะนำให้ใช้ `img` หรือ `background-image` สำหรับ swatch
- สามารถครอบเป็นวงกลมด้วย CSS ได้โดยใช้ `border-radius: 50%`

## Suggested HTML Structure

```html
<section class="color-palette">
  <div class="palette-heading">
    <img src="./01_gold_flourish_left.png" alt="" class="flourish flourish-left">
    <h2>OUR COLOR PALETTE</h2>
    <img src="./02_gold_flourish_right.png" alt="" class="flourish flourish-right">
  </div>

  <div class="palette-list">
    <div class="palette-item">
      <img src="./03_sage_green_texture_1x1.png" alt="Sage Green" class="color-swatch">
      <p>Sage Green</p>
    </div>

    <div class="palette-item">
      <img src="./04_ivory_texture_1x1.png" alt="Ivory" class="color-swatch">
      <p>Ivory</p>
    </div>

    <div class="palette-item">
      <img src="./05_beige_texture_1x1.png" alt="Beige" class="color-swatch">
      <p>Beige</p>
    </div>

    <div class="palette-item">
      <img src="./06_dusty_pink_texture_1x1.png" alt="Dusty Pink" class="color-swatch">
      <p>Dusty Pink</p>
    </div>

    <div class="palette-item">
      <img src="./07_soft_peach_texture_1x1.png" alt="Soft Peach" class="color-swatch">
      <p>Soft Peach</p>
    </div>

    <div class="palette-item">
      <img src="./08_light_brown_texture_1x1.png" alt="Light Brown" class="color-swatch">
      <p>Light Brown</p>
    </div>
  </div>
</section>