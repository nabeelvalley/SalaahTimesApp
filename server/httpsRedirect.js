/**
 * Express middleware to redirect http mto https
 * By using the X-FORWARDED-PROTO header
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * @example
 * const express = require('express')
 * const https = require('./httpsRedirect')
 * 
 * const app = express()
 * app.use(https)
 */
const httpsRedirect = function(req, res, next){
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] != 'https') {
      return res.redirect('https://' + req.headers.host + req.url)
    } else {
      return next()
    }
  } else {
    return next()
  }
}

module.exports = httpsRedirect
