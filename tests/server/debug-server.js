#!/usr/bin/env node

'use strict'

let
  http = require('http')

let server = http.createServer((req, res) => {
  let body = [ ]
  req.on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString()
    console.log('request body', body)
  })
  res.setHeader('Access-Control-Allow-Origin', '*')
  if('POST' === req.method) {
    res.writeHead(201, {"Content-type": "text/plain"})
    res.end("Hello world\n")
  }
  else if('OPTIONS' === req.method) {
    res.setHeader('Access-Control-Allow-Methods', "GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE")
    res.setHeader('Vary', "Access-Control-Request-Headers")
    res.setHeader('Access-Control-Allow-Headers', "x-requested-with")
    res.end("")
  }
})

server.listen(3000)
