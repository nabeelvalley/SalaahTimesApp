const facebookScraper = require('../helpers/facebookScraper')
const updateMasjid = require('../helpers/firebase').updateMasjd

const express = require('express')
const bodyParser = require('body-parser')

var router = express.Router()
const getAllTimes = require('../helpers/firebase').getAllTimes

router.use(bodyParser.json())

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

router.post('/adminupdate/submitform', (req, res) => {
  const salaahTimes = []
  const key = req.body.key
  if (key === process.env.ADMINKEY) {
    const content = req.body.message
    console.log(content)
    salaahTimes = facebookScraper(content)
    salaahTimes.forEach(masjid => {
      // updateMasjid(masjid)
    })
  }
  res.json(salaahTimes)
})

router.get('/adminupdate', (req, res) => res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Admin page</title>
</head>
<body>
  <h4>Not to be used for production, just for teporary updates</h4>

  <h2>HTML Forms</h2>
    <form onsubmit="return handleSubmit(event)" method="get">
      Admin Key:<br>
      <input type="text" name="key">
      <br>
      Times Update<br>
      <textarea rows="4" cols="50" name="message"></textarea>
      <br><br>
      <input type="submit" value="Submit">
    </form>

    <script>
    function handleSubmit(event){
      event.preventDefault()
      let body = {key: document.querySelector('input').value, message: document.querySelector('textarea').value}
      fetch('/api/times/adminupdate/submitform' , {method: 'post', body: JSON.stringify(body), headers: new Headers({
        'Content-Type': 'application/json'
      })})
      .then(val => document.write('message sent'))
      .catch(err => document.write(JSON.stringify(err)))
    }
    </script>

</body>

</html>
`))

module.exports = router
