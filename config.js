let config = {
  'notGetBlocks': [
    'blocks-demo.html',
  ],
  'ignoredBlocks': [
    'no-js',
  ],
  'alwaysAddBlocks': [
    // 'sprite-svg',
    // 'sprite-png',
  ],
  'addStyleBefore': [
    'src/scss/fontface.scss',
    'src/scss/consts.scss',
    'src/scss/extends.scss',
    'src/scss/reset.scss',
    'src/scss/global.scss',
    'src/scss/slider.scss',
    'src/scss/controls.scss',
    'src/scss/overlayscrollbars.scss',
    'baguettebox.js/dist/baguetteBox.min.css',
    'tippy.js/dist/tippy.css',
    // 'somePackage/dist/somePackage.css', // для 'node_modules/somePackage/dist/somePackage.css',
  ],
  'addStyleAfter': [
    // 'src/scss/print.scss',
  ],
  'addJsBefore': [
    // 'somePackage/dist/somePackage.js', // для 'node_modules/somePackage/dist/somePackage.js',
  ],
  'addJsAfter': [
    './script.js',
    './utils/overlayscrollbars',
    './utils/copy-btn',
    'lazysizes/plugins/parent-fit/ls.parent-fit',
  ],
  'addAssets': {
    'src/img/**/*.{png,svg,jpg,jpeg}': 'img/',
    'src/fonts/**/*.{woff,woff2}': 'fonts/',
    // 'src/favicon/*.{png,ico,svg,xml,webmanifest}': 'img/favicon',
    // 'node_modules/somePackage/images/*.{png,svg,jpg,jpeg}': 'img/',
  },
  'dir': {
    'src': 'src/',
    'build': 'build/',
    'blocks': 'src/blocks/'
  }
};

module.exports = config;
