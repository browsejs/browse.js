#!/usr/bin/env node

'use strict'

const
  path = require('path'),
  fs = require('fs'),
  beautify = require('js-beautify').js_beautify,
  uglifyJs = require('uglify-js'),
  targetJs = path.resolve(__dirname, '../browse.js'),
  targetMinJs = path.resolve(__dirname, '../browse.min.js'),
  orderFile = path.resolve(__dirname, '../lib/.order'),
  order = fs.readFileSync(orderFile, 'utf8').trim().split('\n')

function createJs() {
  console.log('adding header...')
  fs.writeFileSync(targetJs, "(/* eslint-disable complexity */ /* eslint-disable max-statements */ /* eslint-disable no-shadow-restricted-names */\nfunction(ns, undefined) {\n/* eslint-enable complexity */ /* eslint-enable max-statements */ /* eslint-enable no-shadow-restricted-names */")
  order.forEach(src => {
    console.log('adding src %s', src)
    fs.appendFileSync(targetJs, '\n' + fs.readFileSync(path.resolve(__dirname, '../lib/' + src)))
  })
  console.log('adding footer...')
  fs.appendFileSync(targetJs, '\n}(window.browse = window.browse || {}))')
}

function beautifyJs() {
  console.log('beautifying...')
  let jsContent = beautify(fs.readFileSync(targetJs, 'utf8'), {
    "indent_size": 2,
  })
  console.log('writing %s...', targetJs)
  fs.writeFileSync(targetJs, jsContent)
  return jsContent
}

function minifyJs(jsContent) {
  console.log('minifying js...')
  let jsMinifyResult = uglifyJs.minify(jsContent, {
    mangle: { toplevel: true, eval: true },
    compress: { properties: true, dead_code: true, drop_debugger: true, conditionals: true, comparisons: true, evaluate: true, booleans: true, loops: true, unused: true, hoist_funs: true, if_return: true, join_vars: true, warnings: true, negate_iife: true, drop_console: true }
  })
  if(jsMinifyResult.error) {
    console.error('failed min js', jsMinifyResult.error)
    fs.writeFileSync(targetMinJs, '')
  }
  else {
    console.log('writing min js %s...', targetMinJs)
    fs.writeFileSync(targetMinJs, jsMinifyResult.code)
  }
}

createJs()
let jsContent = beautifyJs()
minifyJs(jsContent)
