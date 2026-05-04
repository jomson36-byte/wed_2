const fs = require('node:fs');
const path = require('node:path');

const viteConfigPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'vite',
  'dist',
  'node',
  'chunks',
  'config.js',
);

if (!fs.existsSync(viteConfigPath)) {
  process.exit(0);
}

const source = fs.readFileSync(viteConfigPath, 'utf8');
const target = `\texec("net use", (error$1, stdout) => {
\t\tif (error$1) return;
\t\tconst lines = stdout.split("\\n");
\t\tfor (const line of lines) {
\t\t\tconst m = parseNetUseRE.exec(line);
\t\t\tif (m) windowsNetworkMap.set(m[2], m[1]);
\t\t}
\t\tif (windowsNetworkMap.size === 0) safeRealpathSync = fs.realpathSync.native;
\t\telse safeRealpathSync = windowsMappedRealpathSync;
\t});`;
const replacement = `\tsafeRealpathSync = fs.realpathSync.native;`;

if (source.includes(replacement)) {
  process.exit(0);
}

if (!source.includes(target)) {
  console.warn('Vite realpath patch skipped: expected source was not found.');
  process.exit(0);
}

fs.writeFileSync(viteConfigPath, source.replace(target, replacement));
