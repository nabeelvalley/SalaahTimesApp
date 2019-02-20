var express = require('express')
const path = require('path')
var router = express.Router()

router.use('/:location_key/:month/:day', (req, res) => {
  const location_key = req.params.location_key
  const month = req.params.month
  const day = req.params.day
  const salaah_times = require(path.join(__dirname, `../db/times/${location_key}.json`)).filter(
    times => times.month == month && times.day == day
  )[0]
  res.json(salaah_times)
})

router.use('/:location_key/:month', (req, res) => {
  const location_key = req.params.location_key
  const month = req.params.month
  const salaah_times = require(path.join(__dirname, `../db/times/${location_key}.json`)).filter(
    times => times.month == month
  )
  res.json(salaah_times)
})

router.use('/:location_key', (req, res) => {
  const location_key = req.params.location_key
  res.json(require(path.join(__dirname, `../db/times/${location_key}.json`)))
})

module.exports = router
