const fs = require('fs')
const path = require('path')

const blueprintExists = require('./blueprint-exists')
const createFromBlueprint = require('./create-from-blueprint')
const generateContext = require('./generate-context')


module.exports = (cwd, blueprint, name) => {
  if (!name) {
    return console.error(`Please provide a name for the blueprint ${blueprint}`)
  }

  const bpDir = path.join(cwd, './blueprints')

  return (
    blueprintExists(bpDir, blueprint)
      .then(createFromBlueprint(path.join(bpDir, blueprint, 'files'), cwd, generateContext(name)))
      .catch(err => console.error(err))
  )
}

