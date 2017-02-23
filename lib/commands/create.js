const fs = require('fs')
const path = require('path')
const changeCase = require('change-case')

const getFile = require('../util/get-file')

module.exports = (cwd, blueprint, name) => {
  if (!name) {
    return console.error(`Please provide a name for the blueprint ${blueprint}`)
  }

  const bpDir = path.join(cwd, './blueprints')

  blueprintExists(bpDir, blueprint)
    .then(createBlueprint(cwd, bpDir, blueprint, name))
    .catch(err => console.error(err))
}

function blueprintExists (bpDir, blueprint) {
  return new Promise(resolve => {
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
}

function createContext (name) {
  return {
    name,
    changeCase
  }
}

function createBlueprint (cwd, bpDir, blueprint, name) {
  return () => {
    createStructure(path.join(bpDir, blueprint, 'files'), cwd, createContext(name))
  }
}

function generateBasename (basename, context) {
  return Object
    .keys(context)
    .reduce((out, key) => out.replace(`__${key}__`, context[key]), basename)
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
        } catch (err) {}
        createStructure(originPath, targetPath, context)
      } else {
        try {
          fs.statSync(targetPath)
          return console.error('File already exists:', targetPath)
        } catch (err) {
          fs.writeFileSync(targetPath, getFile(originPath, context))
          console.log('Created file:', targetPath)
        }
      }
    })
}

