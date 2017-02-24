const fs = require('fs')
const path = require('path')

module.exports = (bpDir, blueprint) => new Promise(resolve => {
  const blueprintPath = path.join(bpDir, blueprint)

  try {
    fs.statSync(blueprintPath).isDirectory()
  } catch (err) {
    throw `Blueprint ${blueprint} not found`
  }

  try {
    const filesDir = path.join(blueprintPath, '/files')

    fs.statSync(filesDir).isDirectory()

    if (fs.readdirSync(filesDir).length) {
      return resolve()
    } else {
      throw `Blueprint ${blueprint} has no files`
    }
  } catch (err) {
    throw `Blueprint ${blueprint}'s directory structure should be inside the 'files/' dir`
  }
})





