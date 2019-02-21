const express = require('express')
const path = require('path')
var enforce = require('express-sslify')
const app = express()
const port = process.env.PORT || 3001

app.use(function(req, res, next){
  const host = req.headers.host
  const isLocal = Boolean(
    host.includes('localhost') ||
      host.includes('[::1]') ||
      host.match(/(\d*\.){3}(\d*){1}/)
  )
  return isLocal? next() : enforce.HTTPS({ trustProtoHeader: true })(req, res, next)
})

app.use(express.static(path.join(__dirname, '../app/build/')))

app.get('/api/test', (req, res) => res.send('<h1>Test Successful<h2>'))

app.use('/api/times', require(path.join(__dirname, './routes/times')))
app.use('/api/index', require(path.join(__dirname, './routes/index')))

app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
