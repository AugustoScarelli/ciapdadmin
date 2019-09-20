const path = require('path')
const override = require('customize-cra').override
const addWebpackAlias = require('customize-cra').addWebpackAlias

// See:
// https://github.com/arackaf/customize-cra,
// https://github.com/timarney/react-app-rewired/

module.exports = override(
  addWebpackAlias({
    src: path.resolve(__dirname, 'src'),
    utils: path.resolve(__dirname, 'src/utils'),
    media: path.resolve(__dirname, 'src/media'),
    pages: path.resolve(__dirname, 'src/pages'),
    services: path.resolve(__dirname, 'src/services'),
    components: path.resolve(__dirname, 'src/components'),
    reducers: path.resolve(__dirname, 'src/redux-flow/reducers')
  })
)
