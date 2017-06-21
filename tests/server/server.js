#!/usr/bin/env node

'use strict'

let
  bodyParser = require('body-parser'),
  multer = require('multer'),
  express = require('express'),
  cors = require('cors'),
  app = express(),
  xml = require('xml'),
  Log = require('./log').Log,
  log = new Log()

app.use(cors({"methods": "GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE"}))
app.use(bodyParser.json({limit: '4mb'}))
app.use(bodyParser.urlencoded({limit: '4mb', extended: true }))
app.use(multer().array())

const msleep = ms => {
  const start = (new Date()).getTime()
  let end
  do {
    for(let x = 0; x < 100; ++x){
      /** some comment */
    }
    end = (new Date()).getTime()
  }
  while((end - start) < ms)
}

app.get('/timeout', function(req, res) {
  log.debug('simulating timeout by sleeping for', parseInt(req.query.duration) || 2000, 'ms')
  msleep(parseInt(req.query.duration) || 2000)
  res.sendStatus(200)
})

app.get('/json', function(req, res) {
  res.status(200).json({ x: 1, y: 2})
})

app.get('/xml', function(req, res) {
  res.header('Content-type', 'text/xml').status(200).send(xml({ x: [{ _attr: { a: 1, b: 2}}, {y: [3]}]}))
})

app.get('/bad-json', function(req, res) {
  res.set('Content-type', 'application/json').status(200).send('{"x" dd}')
})

app.route('/form-post')
.post(function(req, res) {
  let data = [ ]
  for(let key in req.body) {
    data.push(key + '=' + req.body[key])
  }
  res.status(201).send(data.join('&'))
})
.put(function(req, res) {
  let data = [ ]
  for(let key in req.body) {
    data.push(key + '=' + req.body[key])
  }
  res.status(200).send(data.join('&'))
})
.patch(function(req, res) {
  res.sendStatus(204)
})

app.post('/form-json', function(req, res) {
  res.status(201).json(req.body)
})

app.post('/form-multipart', function(req, res) {
  let data = [ ]
  for(let key in req.body) {
    if('file' !== key) {
      data.push(key + '=' + req.body[key])
    }
  }
  log.debug('data', data)
  res.status(201).send(data.join('&'))
})

/*app.post('/form-multipart', function(req, res) {
  log.debug(req.body)
  res.sendStatus(201)
})*/

app.delete('/delete-it', function(req, res) {
  res.sendStatus(202)
})

app.use('/500', function(req, res) {
  throw new Error('simulating 500')
})

/*app.post('/scrollY', function(req, res) {
  console.log('expected position %s, measured position %s', req.body.expected, req.body.measured)
  res.sendStatus(201)
})*/

app.head('/test-1.html', function(req, res) {
  res.send()
})

app.use('/', express.static(__dirname + '/public'))

app.use(function(req, res) {
  log.warn('cannot serve %s %s', req.method, req.url)
  res.sendStatus(404)
})
app.use(function(err, req, res, next) {
  error(err, res)
})

function error(err, res) {
  log.error('error processing request', err)
  if('InputError' === err.name || 'SyntaxError' === err.name) {
    res.status(400).json({error : err.message})
  }
  else {
    res.status(500).json({error: err.message})
  }
}

log.debug('listening on 3000')
app.listen(3000, 'build.browsejs.org')
