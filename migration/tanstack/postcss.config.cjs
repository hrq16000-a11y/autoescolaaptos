const path = require('node:path');
const loadConfig = require('../../node_modules/tailwindcss/loadConfig');
const theme = loadConfig(path.resolve(__dirname, '../../tailwind.config.ts'));
module.exports = { plugins: [
  require('../../node_modules/tailwindcss')({
    ...theme,
    content: [path.resolve(__dirname, '../../src/**/*.{ts,tsx}'), path.resolve(__dirname, 'src/**/*.{ts,tsx}')],
  }),
  require('../../node_modules/autoprefixer')(),
] };
