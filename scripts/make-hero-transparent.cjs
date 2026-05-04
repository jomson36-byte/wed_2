const fs = require('node:fs');
const path = require('node:path');
const { PNG } = require('pngjs');

const root = path.join(__dirname, '..');
const files = ['names.png', 'date.png', 'leaf_left.png', 'leaf_right.png', 'heart.png'];

function trimTransparent(image, padding = 8) {
  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const idx = (image.width * y + x) << 2;
      if (image.data[idx + 3] > 8) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return image;
  }

  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(image.width - 1, maxX + padding);
  maxY = Math.min(image.height - 1, maxY + padding);

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const output = new PNG({ width, height });

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const sourceIdx = (image.width * (minY + y) + (minX + x)) << 2;
      const targetIdx = (width * y + x) << 2;
      image.data.copy(output.data, targetIdx, sourceIdx, sourceIdx + 4);
    }
  }

  return output;
}

function transparentize(inputName) {
  const inputPath = path.join(root, 'assets', inputName);
  const outputName = inputName.replace(/\.png$/i, '_transparent.png');
  const outputPath = path.join(root, 'assets', outputName);
  const image = PNG.sync.read(fs.readFileSync(inputPath));

  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const idx = (image.width * y + x) << 2;
      const r = image.data[idx];
      const g = image.data[idx + 1];
      const b = image.data[idx + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const whiteness = (r + g + b) / 3;
      const neutral = max - min;

      if (whiteness > 238 && neutral < 18) {
        image.data[idx + 3] = 0;
      } else if (whiteness > 224 && neutral < 24) {
        const alpha = Math.round(Math.max(0, Math.min(255, (238 - whiteness) * 18)));
        image.data[idx + 3] = Math.min(image.data[idx + 3], alpha);
      }
    }
  }

  const trimmed = trimTransparent(image);
  fs.writeFileSync(outputPath, PNG.sync.write(trimmed));
  console.log(outputName);
}

files.forEach(transparentize);
