# Ladies / Gentlemen Icon Assets

ชุดไฟล์นี้เป็น assets ที่แยกจากส่วน **Ladies / Gentlemen** ของหน้า Dress Code
โดยแยกเฉพาะไอคอนและเส้น Divider สำหรับนำไปจัด Layout ด้วย HTML / CSS

## Files Included

| File name | Description | Suggested use |
|---|---|---|
| `00_source_ladies_gentlemen_section.png` | ภาพต้นฉบับของ Section | ใช้เทียบตำแหน่ง/สไตล์ |
| `01_icon_ladies_dress.png` | ไอคอนชุดผู้หญิงสีทอง | ใช้ประกอบหัวข้อ Ladies |
| `02_icon_gentlemen_suit.png` | ไอคอนสูทผู้ชายสีทอง | ใช้ประกอบหัวข้อ Gentlemen |
| `03_vertical_divider_gold.png` | เส้น Divider แนวตั้งสีทอง | ใช้คั่นระหว่าง Ladies และ Gentlemen |

## Notes

- ไฟล์ทั้งหมดเป็น `.png`
- พื้นหลังเป็นสีขาว
- ไม่มี Text ติดมากับ assets เพื่อให้เขียนหัวข้อและข้อความด้วย HTML/CSS ได้เอง
- เหมาะสำหรับใช้กับ Background สีอ่อน เช่น `#fffaf3`, `#fff7ed`, หรือสีขาว

## Recommended Path

```txt
/public/assets/dress-code/ladies-gentlemen/
```

## Suggested HTML

```html
<div class="dress-guide">
  <div class="dress-guide__item">
    <img src="/assets/dress-code/ladies-gentlemen/01_icon_ladies_dress.png" alt="Ladies dress icon">
    <div>
      <h3>LADIES</h3>
      <p>Dresses in soft tones<br>floats, satins,<br>or light fabrics.</p>
    </div>
  </div>

  <img
    src="/assets/dress-code/ladies-gentlemen/03_vertical_divider_gold.png"
    alt=""
    class="dress-guide__divider"
  >

  <div class="dress-guide__item">
    <img src="/assets/dress-code/ladies-gentlemen/02_icon_gentlemen_suit.png" alt="Gentlemen suit icon">
    <div>
      <h3>GENTLEMEN</h3>
      <p>Suits or shirts in neutral<br>or earthy tones.</p>
    </div>
  </div>
</div>
```

## Suggested CSS

```css
.dress-guide {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: clamp(24px, 5vw, 72px);
  max-width: 1100px;
  margin: 0 auto;
}

.dress-guide__item {
  display: flex;
  align-items: center;
  gap: clamp(16px, 3vw, 32px);
}

.dress-guide__item img {
  width: clamp(72px, 10vw, 140px);
  height: auto;
}

.dress-guide__divider {
  width: 18px;
  height: clamp(160px, 24vw, 300px);
  object-fit: contain;
}

.dress-guide h3 {
  margin: 0 0 16px;
  font-family: serif;
  font-size: clamp(24px, 4vw, 48px);
  letter-spacing: 0.12em;
  color: #2f5a43;
}

.dress-guide p {
  margin: 0;
  font-family: serif;
  font-size: clamp(18px, 3vw, 36px);
  line-height: 1.45;
  color: #2f5a43;
}

@media (max-width: 768px) {
  .dress-guide {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .dress-guide__item {
    justify-content: center;
    flex-direction: column;
  }

  .dress-guide__divider {
    display: none;
  }
}
```
