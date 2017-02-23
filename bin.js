#!/usr/bin/env node

const {
  create,
  list,
  help,
} = require('./lib')

const CWD = process.cwd()
const [ COMMAND, BLUEPRINT, NAME ] = process.argv.slice(2)

console.log('CWD:', CWD)
console.log('Action:', COMMAND, BLUEPRINT, NAME)

switch(COMMAND) {
  case 'create':
    create(CWD, BLUEPRINT, NAME)
    break
  case 'list':
    list(CWD)
    break
  default:
    help(CWD)
}

