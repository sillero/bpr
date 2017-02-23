const fs = require('fs')
const path = require('path')
const srcPath = 'src/components'
const components = (
  fs
    .readdirSync(srcPath)
    .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
)

module.exports = {
  locals() {
    return {
      components
    }
  }
}