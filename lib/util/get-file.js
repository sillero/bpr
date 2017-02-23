const fs = require('fs')
const ejs = require('ejs')

module.exports = (pathname, context) => ejs.compile(fs.readFileSync(pathname, 'utf8'))(context)