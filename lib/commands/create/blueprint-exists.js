const fs = require('fs')
const path = require('path')

module.exports = (bpDir, blueprint) => new Promise(resolve => {
  const blueprintPath = path.join(bpDir, blueprint)

  try {
    fs.statSync(blueprintPath).isDirectory()
  } catch (err) {
    return console.error(`Blueprint ${blueprint} not found`)
  }

  try {
    fs.statSync(path.join(blueprintPath, '/files')).isDirectory()
  } catch (err) {
    return console.error(`Blueprint ${blueprint}'s directory structure should be inside the 'files/' dir`)
  }

  resolve()
})




