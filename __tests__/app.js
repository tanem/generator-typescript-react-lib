'use strict'

const fs = require('fs')
const glob = require('glob')
const helpers = require('yeoman-test')
const path = require('path')

const getFiles = () =>
  glob.sync('**', {
    cwd: path.join(process.cwd(), 'generators/app/templates'),
    dot: true,
    nodir: true
  })

const readFile = file => {
  const data = fs.readFileSync(file, 'utf-8')
  return path.extname(file) === '.json' ? JSON.parse(data) : data
}

beforeAll(() =>
  helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
    author: 'John Smith <john.smith@js.com>',
    packageDescription: 'Test package.',
    packageName: 'test-package',
    umdGlobalName: 'TestPkg',
    username: 'jsmith'
  }))

test.each(getFiles())('creates %s', file => {
  expect(readFile(file)).toMatchSnapshot()
})
