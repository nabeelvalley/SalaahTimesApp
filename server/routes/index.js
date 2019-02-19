var express = require('express')
var router = express.Router()

router.use('/:location_key', (req, res) => {
  const location_key = req.params.location_key
  res.json(require('../db/index.json').find(index => index.key == location_key))
})

router.use('/', (req, res) => {
  res.json(require('../db/index.json'))
})

module.exports = router
