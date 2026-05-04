const fs = require('fs');
const path = 'src/App.js';
let content = fs.readFileSync(path, 'utf8');

const target = `      h(
        motion.div,
        { 
          className: 'story-text-container',`;

const replacement = `      h(
        motion.div,
        { 
          className: 'story-text-container',
          initial: { y: 20, opacity: 0 },
          animate: isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 },
          transition: { duration: 1.2, delay: 0.8 }
        },
        h('p', null, 'จากวันแรกที่เราได้พบกัน'),
        h('p', null, 'เรื่องราวของเราค่อย ๆ เติบโต'),
        h('p', null, 'เต็มไปด้วยรอยยิ้ม ความอบอุ่น'),
        h('p', null, 'และวันนี้ เราพร้อมเริ่มต้นบทใหม่ไปด้วยกัน')
      )
    ),`;

// We want to replace from the start of the div until the corrupted end.
// We know the corrupted part ends at "// Added closing parenthesis for 'our-story-inner' h call"
const endMarker = "// Added closing parenthesis for 'our-story-inner' h call";
const startIndex = content.indexOf(target);
const endIndex = content.indexOf(endMarker) + endMarker.length;

if (startIndex !== -1 && content.indexOf(endMarker) !== -1) {
    const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
    fs.writeFileSync(path, newContent, 'utf8');
    console.log('File updated successfully');
} else {
    console.log('Target or marker not found');
    console.log('startIndex:', startIndex);
    console.log('endIndex:', content.indexOf(endMarker));
}
