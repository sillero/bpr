const fs = require('fs')
const path = require('path')

module.exports = (blueprintsPath) => (
  fs
    .readdirSync(blueprintsPath)
    .filter(name => fs.statSync(path.join(blueprintsPath, name)).isDirectory())
)