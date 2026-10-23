const path = require('node:path');
const builder = require.resolve('app-builder-lib', { paths: [path.dirname(require.resolve('electron-builder'))] });
const { signAsync } = require(require.resolve('@electron/osx-sign', { paths: [path.dirname(builder)] }));
exports.sign = async function sign(options) {
  const defaults = options.optionsForFile;
  await signAsync({ ...options, optionsForFile(file) {
    const value = defaults(file);
    return path.basename(file) === 'bambu-fallback'
      ? { ...value, entitlements: path.join(__dirname, '../build/entitlements.fallback.mac.plist') }
      : value;
  } });
};
