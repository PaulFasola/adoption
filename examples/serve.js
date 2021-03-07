// eslint-disable-next-line @typescript-eslint/no-var-requires
const servor = require('servor');

const root = `demos/${process.env.DEMO_ROOT}`;

if (!root) {
  throw 'Please define DEMO_ROOT before calling serve.js';
}

(async function () {
  await servor({
    root,
    fallback: 'index.html',
    module: false,
    static: false,
    reload: false,
    inject: '',
    credentials: null,
    port: 8080,
  });
})();
