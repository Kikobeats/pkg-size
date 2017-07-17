#!/usr/bin/env node
'use strict'

const prettyBytes = require('pretty-bytes')
const { promisify } = require('util')
const execa = require('execa')
const path = require('path')
const fs = require('fs')

const pkg = require('../package.json')
const unlink = promisify(fs.unlink)
const stat = promisify(fs.stat)

require('update-notifier')({ pkg }).notify()

require('meow')({
  pkg,
  help: require('fs').readFileSync(path.join(__dirname, 'help.txt'), 'utf8')
})
;(async () => {
  const { stdout: filename } = await execa('npm', ['pack'])
  const { size } = await stat(filename)
  unlink(filename)
  console.log('Your bundle size is', prettyBytes(size))
})()
