
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
    'index.csr.html': {size: 11671, hash: 'c7376da5aca6d1d58cfc3f66e85b6bd732763f4d8fad43efebef0bdadb6bac74', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1209, hash: '943d18028b08135587076f70c37f3e22eef83b6cde2f7b67e3817e6c045f4c35', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'svg/index.html': {size: 23923, hash: 'c493ed9d8af366439aa7b272ec348e1b1a4237456fba49c26d416b32b381a8f0', text: () => import('./assets-chunks/svg_index_html.mjs').then(m => m.default)},
    'cards/index.html': {size: 25715, hash: 'e4faa5875e43da6360a56edd4d6e72d54156efc7c183ffb947d6f5cfef87fd13', text: () => import('./assets-chunks/cards_index_html.mjs').then(m => m.default)},
    'text/index.html': {size: 24297, hash: '4f931601c5679c522cf662a66cffd05c0b37326b01fe3fd08bef2f1c156213ee', text: () => import('./assets-chunks/text_index_html.mjs').then(m => m.default)},
    'timeline/index.html': {size: 27156, hash: '27e7f7ae9afde0f2ae82793729773a4e10ea1d8e4796588b5fe03e6041e3234f', text: () => import('./assets-chunks/timeline_index_html.mjs').then(m => m.default)},
    'styles-H7IIGEV5.css': {size: 11050, hash: 'jkWUbeF1zNw', text: () => import('./assets-chunks/styles-H7IIGEV5_css.mjs').then(m => m.default)}
  },
};
