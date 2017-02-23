const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

module.exports = function createStructure (origin, target, context) {
  fs
    .readdirSync(origin)
    .forEach(item => {
      const originPath = path.join(origin, item)
      const targetPath = path.join(target, generateBasename(item, context))

      if (fs.statSync(originPath).isDirectory()) {
        try {
          fs.mkdirSync(targetPath)
          console.log('Created dir:', targetPath)
        } catch (err) {}
        createStructure(originPath, targetPath, context)
      } else {
        try {
          fs.statSync(targetPath)
          return console.error('File already exists:', targetPath)
        } catch (err) {
          fs.writeFileSync(targetPath, generateFile(originPath, context))
          console.log('Created file:', targetPath)
        }
      }
    })
}

function generateBasename (basename, context) {
  return Object
    .keys(context)
    .reduce((out, key) => out.replace(`__${key}__`, context[key]), basename)
}

function generateFile (pathname, context) {
  return ejs.compile(fs.readFileSync(pathname, 'utf8'))(context)
}