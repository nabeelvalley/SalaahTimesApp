const facebookScraper = require('../facebookScraper')

const express = require('express')
const router = express.Router()

const bodyParser = require('body-parser')

router.use(bodyParser())

router.post('/', (req, res) => {
    const content = req.body.posts.data[0].message
    const salaahTimes = facebookScraper(content)
    res.json(salaahTimes)
})

module.exports = router
