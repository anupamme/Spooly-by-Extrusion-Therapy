const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'build/fallback', `${process.platform}-${process.arch}`);
fs.mkdirSync(out, { recursive: true });
if (process.platform === 'win32') {
  execFileSync('cl.exe', ['/nologo', '/std:c++17', '/O2', '/EHsc', '/MT', '/DNDEBUG', '/D_CRT_SECURE_NO_WARNINGS', path.join(root, 'native/bambu-fallback.cpp'), `/Fo:${path.join(out, 'bambu-fallback.obj')}`, `/Fe:${path.join(out, 'bambu-fallback.exe')}`], { stdio: 'inherit' });
} else {
  execFileSync(process.platform === 'darwin' ? 'clang++' : 'g++', ['-std=c++17', '-O2', '-pthread', path.join(root, 'native/bambu-fallback.cpp'), '-o', path.join(out, 'bambu-fallback'), ...(process.platform === 'linux' ? ['-ldl'] : [])], { stdio: 'inherit' });
}
