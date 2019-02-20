const path = require('path')

console.log(__dirname)

console.log(require(path.join(__dirname, '../app/public/manifest.json')))