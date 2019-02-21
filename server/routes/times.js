const express = require('express')
const path = require('path')
const fs = require('fs')
var router = express.Router()

router.use('/:location_key/:month/:day', (req, res, next) => {
  const location_key = req.params.location_key
  const month = req.params.month
  const day = req.params.day
  fs.readFile(
    path.join(__dirname, `../db/times/${location_key}.json`),
    (err, data) => {
      let salaah_times = JSON.parse(data)

      salaah_times = salaah_times.filter(
        times => times.month == month && times.day == day
      )[0]
      res.json(salaah_times)
    }
  )
})

router.use('/:location_key/:month', (req, res) => {
  const location_key = req.params.location_key
  const month = req.params.month
  fs.readFile(
    path.join(__dirname, `../db/times/${location_key}.json`),
    (err, data) => {
      let salaah_times = JSON.parse(data)

      salaah_times = salaah_times.filter(times => times.month == month)
      res.json(salaah_times)
    }
  )
})

router.use('/:location_key', (req, res) => {
  const location_key = req.params.location_key
  fs.readFile(
    path.join(__dirname, `../db/times/${location_key}.json`),
    (err, data) => {
      let salaah_times = JSON.parse(data)
      res.json(salaah_times)
    }
  )
})

module.exports = router
