const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const Transform = require('stream').Transform

module.exports = (origin, target, context) => () => {
  if (structureHasErrors(origin, target, context)) {
    throw `Some files already exist. Stopping blueprint creation.`
  } else {
    createStructure(origin, target, context)
  }
}

function structureHasErrors (origin, target, context) {
  let errors = 0

  fs
    .readdirSync(origin)
    .forEach(item => {
      const originPath = path.join(origin, item)
      const targetPath = path.join(target, generateBasename(item, context))

      try {
        fs.statSync(targetPath)
      } catch (err) {
        return // Cool, doesn't exist
      }

      if (fs.statSync(targetPath).isDirectory()) {
        errors += structureHasErrors(originPath, targetPath, context)
      } else {
        console.error(`File ${targetPath} already exists`)
        errors++
      }
    })

  return errors
}

function createStructure (origin, target, context) {
  fs
    .readdirSync(origin)
    .forEach(item => {
      const originPath = path.join(origin, item)
      const targetPath = path.join(target, generateBasename(item, context))

      if (fs.statSync(originPath).isDirectory()) {
        try {
          fs.mkdirSync(targetPath)
          console.log('Created dir:', targetPath)
        } catch (err) {
          // Dir exists. No need to stop or throw.
        }
        createStructure(originPath, targetPath, context)
      } else {
        createFile(originPath, targetPath, context)
      }
    })
}

function generateBasename (basename, context) {
  return Object
    .keys(context)
    .reduce((out, key) => out.replace(`__${key}__`, context[key]), basename)
}

function createFile (originPath, targetPath, context) {
  const rs = fs.createReadStream(originPath)
  const ws = fs.createWriteStream(targetPath)

  ws.on('close', () => console.log('Created file:', targetPath))

  if (/.jpg$|.png$|.gif$|.ico$/.test(targetPath)) {
    rs.pipe(ws)
  } else {
    rs.setEncoding('utf8')
    rs.on('data', (contents) => {
      ws.write(ejs.compile(contents)(context), 'utf8')
      ws.end()
    })
  }
}