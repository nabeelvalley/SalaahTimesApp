var express = require('express')
const path = require('path')
var router = express.Router()

router.use('/:location_key', (req, res) => {
  const location_key = req.params.location_key
  res.json(require(path.join(__dirname, '../db/index.json')).find(index => index.key == location_key))
})

router.use('/', (req, res) => {
  res.json(require(path.join(__dirname, '../db/index.json')))
})

module.exports = router
