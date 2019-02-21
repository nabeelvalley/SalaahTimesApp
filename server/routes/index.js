const express = require('express')
const path = require('path')
const router = express.Router()
const index = require(path.join(__dirname, '../db/index.json'))

router.use('/:location_key', (req, res) => {
  const location_key = req.params.location_key
  res.json(index.find(index => index.key == location_key))
})

router.use('/', (req, res) => {
  res.json(index)
})

module.exports = router
