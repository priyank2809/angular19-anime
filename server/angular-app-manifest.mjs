
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular19-anime/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/angular19-anime/cards",
    "route": "/angular19-anime"
  },
  {
    "renderMode": 2,
    "route": "/angular19-anime/cards"
  },
  {
    "renderMode": 2,
    "route": "/angular19-anime/svg"
  },
  {
    "renderMode": 2,
    "route": "/angular19-anime/text"
  },
  {
    "renderMode": 2,
    "route": "/angular19-anime/timeline"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 11671, hash: '9d232f39f0f053ea2a7f3a4e88f0b597889ff137d3d40e7db77231790da9ea94', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1209, hash: '97d343068721bbf1d2b1f96370af9fc4087f6e71b700bb4019e7a27d792a469b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'text/index.html': {size: 24297, hash: '4f931601c5679c522cf662a66cffd05c0b37326b01fe3fd08bef2f1c156213ee', text: () => import('./assets-chunks/text_index_html.mjs').then(m => m.default)},
    'svg/index.html': {size: 23923, hash: 'c493ed9d8af366439aa7b272ec348e1b1a4237456fba49c26d416b32b381a8f0', text: () => import('./assets-chunks/svg_index_html.mjs').then(m => m.default)},
    'timeline/index.html': {size: 27156, hash: '27e7f7ae9afde0f2ae82793729773a4e10ea1d8e4796588b5fe03e6041e3234f', text: () => import('./assets-chunks/timeline_index_html.mjs').then(m => m.default)},
    'cards/index.html': {size: 25715, hash: '72b2396058e9b4d114ef5b4227340e41caa5dde69ec3e1373310105fb511e0a7', text: () => import('./assets-chunks/cards_index_html.mjs').then(m => m.default)},
    'styles-H7IIGEV5.css': {size: 11050, hash: 'jkWUbeF1zNw', text: () => import('./assets-chunks/styles-H7IIGEV5_css.mjs').then(m => m.default)}
  },
};
