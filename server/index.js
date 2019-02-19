const express = require('express')
const path = require('path')
const app = express()
const port = process.env.port || 3001

app.use(express.static('../app/build'))

app.get('/api/test', (req, res) => res.send('<h1>Test Successful<h2>'))

app.use('/api/times', require('./routes/times'));
app.use('/api/index', require('./routes/index'));

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
