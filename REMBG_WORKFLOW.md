# Rembg Background Removal Workflow

Workflow สำหรับลบพื้นหลังภาพโดยใช้ AI (`rembg`) เพื่อนำไปใช้ในโปรเจกต์งานแต่งงาน

## 1. การเตรียมความพร้อม (Setup)
รันคำสั่งนี้เพียงครั้งเดียวเพื่อติดตั้ง Library ที่จำเป็น:
```powershell
npm run rembg:install
```

---

## 2. วิธีการใช้งาน (Usage)

### แบบที่ 1: ใช้ผ่าน VS Code (แนะนำ - ง่ายที่สุด)
1. กด `Ctrl + Shift + P`
2. พิมพ์ `Run Task` แล้วกด Enter
3. เลือก Task ที่ต้องการ:
   - **Rembg: Remove Background (Single File)**: จะลบพื้นหลังของไฟล์ภาพที่คุณ **กำลังเปิดหน้าจอค้างไว้** อยู่ขณะนั้น
   - **Rembg: Remove Background (Folder)**: จะลบพื้นหลังทุกภาพในโฟลเดอร์ `./assets/rembg_input`

---

### แบบที่ 2: ใช้ผ่าน Terminal (Manual)
คุณสามารถรันคำสั่งผ่าน `npm run` ได้โดยตรง:

**ลบภาพเดียว:**
```powershell
npm run rembg -- path/to/image.jpg ./output_folder
```

**ลบทั้งโฟลเดอร์:**
```powershell
npm run rembg -- ./input_folder ./output_folder
```

---

## 3. โครงสร้างโฟลเดอร์ที่แนะนำ
เพื่อความเป็นระเบียบ ผมแนะนำให้วางไฟล์ดังนี้:
- **Input:** `./assets/rembg_input/` (ใส่ภาพต้นฉบับที่มีพื้นหลังสีขาว)
- **Output:** `./assets/rembg_output/` (ไฟล์ที่ลบพื้นหลังแล้วจะมาโผล่ที่นี่)

---

## หมายเหตุ
- ไฟล์ผลลัพธ์จะเป็นนามสกุล `.png` เสมอ เพื่อรักษาความโปร่งใส (Transparency)
- หากรันครั้งแรกแล้วค้าง ไม่ต้องตกใจ โมเดล AI กำลังดาวน์โหลดครับ (ประมาณ 170MB)
