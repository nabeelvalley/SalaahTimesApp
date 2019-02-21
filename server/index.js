const express = require('express')
const path = require('path')
var enforce = require('express-sslify');
const app = express()
const port = process.env.PORT || 3001

app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.use(express.static(path.join(__dirname,'../app/build/')))

app.get('/api/test', (req, res) => res.send('<h1>Test Successful<h2>'))

app.use('/api/times', require(path.join(__dirname, './routes/times')))
app.use('/api/index', require(path.join(__dirname, './routes/index')))

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
