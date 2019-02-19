const express = require('express')
const path = require('path')
const app = express()
const port = process.env.port || 3001

app.use(express.static('../app/build'))

app.get('/api/test', (req, res) => res.send('<h1>Test Successful<h2>'))

app.use('/api/index', (req, res) => {
  res.json(require('./db/index.json'))
})

app.use('/api/times', require('./routes/times'));

app.use('/api/info/:location_key', (req, res) => {
  const location_key = req.params.location_key
  const info = require(`./db/info/${location_key}.json`)
  res.json(info)
})

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
