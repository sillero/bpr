const fs = require('fs')

const rs = fs.createReadStream('/Users/sillero/Projects/bpr/package.json')
rs.setEncoding('utf8')
rs.on('data', (chunk) => {
  console.log('chunk', chunk)
})