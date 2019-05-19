const facebookScraper = require('../helpers/facebookScraper')
const saveMasjid = require('../helpers/firebase').saveMasjid

const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')

router.use(bodyParser())

router.post('/manualUpdate', (req, res) => {
    const content = req.body.post
    const salaahTimes = facebookScraper(content)
    salaahTimes.forEach(masjid => {
        saveMasjid(masjid)
    })
    res.json(salaahTimes)
})

module.exports = router
