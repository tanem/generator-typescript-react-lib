'use strict'

const fs = require('fs')
const glob = require('glob')
const helpers = require('yeoman-test')
const path = require('path')
const templateMap = require('../generators/app/template-map')

const getFiles = () =>
  glob
    .sync('**', {
      cwd: path.join(process.cwd(), 'generators/app/templates'),
      dot: true,
      nodir: true
    })
    .map(file => (templateMap.has(file) ? templateMap.get(file) : file))

const readFile = file => {
  const data = fs.readFileSync(file, 'utf-8')
  return path.extname(file) === '.json' ? JSON.parse(data) : data
}

const usernameMock = jest.fn().mockResolvedValue('mockusername')
const nameMock = jest.fn().mockResolvedValue('Mock Name')
const emailMock = jest.fn().mockResolvedValue('mock.user@mock.com')

beforeAll(done => {
  helpers
    .run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      author: 'John Smith <john.smith@js.com>',
      packageDescription: 'Test package.',
      packageName: 'test-package',
      umdGlobalName: 'TestPkg',
      username: 'jsmith'
    })
    .on('ready', generator => {
      generator.user.github.username = usernameMock
      generator.user.git.name = nameMock
      generator.user.git.email = emailMock
    })
    .on('end', done)
})

test.each(getFiles())('creates %s', file => {
  expect(readFile(file)).toMatchSnapshot()
})
