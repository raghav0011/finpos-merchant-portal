/* config-overrides.js */

const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addExternalBabelPlugins,
} = require('customize-cra');
const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    // libraryName: 'antd',
    // libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
  }),
  addWebpackAlias({
    ['@styles']: path.resolve(__dirname, 'src/styles'),
  }),
  ...addExternalBabelPlugins(
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods'
  )
);
