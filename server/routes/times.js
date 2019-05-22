const facebookScraper = require('../helpers/facebookScraper')
const saveMasjid = require('../helpers/firebase').saveMasjid

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

router.get('/adminupdate/submitform', (req, res) => {
  const key = req.query.key
  if (key === 'adminKey' || process.env.ADMINKEY) {
    const content = req.query.message
    const salaahTimes = facebookScraper(content)
    salaahTimes.forEach(masjid => {
      saveMasjid(masjid)
    })
    res.json(salaahTimes)
  }
})

router.get('/adminupdate', (req, res) => res.send(`
<html>
<head>
  <title>Admin page</title>
</head>
<body>
  <h4>Not to be used for production, just for teporary updates</h4>

  <h2>HTML Forms</h2>
    <form action="/api/times/adminupdate/submitform" method="get">
      Admin Key:<br>
      <input type="text" name="key">
      <br>
      Times Update<br>
      <textarea rows="4" cols="50" name="message"></textarea></textarea>
      <br><br>
      <input type="submit" value="Submit">
    </form>
</body>

</html>
`))

module.exports = router
