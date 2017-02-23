const path = require('path')
const getBlueprints = require('../util/get-blueprints')

module.exports = (cwd) => {
  const bpDir = path.join(cwd, './blueprints')

  getBlueprints(bpDir)
    .forEach(name => console.log(name))
}