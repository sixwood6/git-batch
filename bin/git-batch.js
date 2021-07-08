#! /usr/bin/env node
const { program } = require('commander')
const { clone } = require('../src/clone.js')
const version = require('../package.json').version

program
  .name('git-batch')
  .version(version)

// const cmdConfig = program.opts()


program
.command('clone <filepath>')
.description('clone a repositories url config')
.action((filepath, destination) => {
  clone(filepath)
})

program.parse()