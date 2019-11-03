#!/usr/bin/env node

const program = require('commander')
const checkNodeVersion = require('../core/checkNodeVersion')
const package = require('../package.json')

const { version, engines, description } = package

checkNodeVersion(engines.node)

program
  .version(version)
  .description(description)
  .usage('<command> [project-name]')
  .command('init', '创建新的工程')

program.on('--help', () => {
  console.log('')
  console.log('Example:')
  console.log('  $ joy init demo')
})

program.parse(process.argv)
