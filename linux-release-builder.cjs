module.exports = {
  ...require('./package.json').build,
  directories: { output: 'dist-linux-release' },
  appImage: { executableArgs: ['--ozone-platform=x11', '--disable-gpu'] },
  linux: {
    extraResources: [{ from: 'build/fallback/linux-x64/bambu-fallback', to: 'fallback/bambu-fallback' }],
    executableName: 'spooly',
    category: 'Utility',
    icon: 'assets/spooly-idle-full.png',
    maintainer: 'Extrusion Therapy',
    artifactName: 'Spooly-${version}-Linux-${arch}.${ext}',
    target: ['AppImage'],
  },
};
