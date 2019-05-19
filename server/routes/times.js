const express = require('express')
var router = express.Router()
const getAllTimes = require('../helpers/firebase').getAllTimes

router.get('/', async (req, res) => {
  try {
    const snapshot = await getAllTimes()
    let times = []

    snapshot.forEach(doc => {
      times.push(doc.data())
    })
    res.json(times)
  } catch (error) {
    res.status(500).json({ error })
  }
})

module.exports = router
