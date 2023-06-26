
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-native-barcode-mask.cjs.production.min.js')
} else {
  module.exports = require('./react-native-barcode-mask.cjs.development.js')
}
