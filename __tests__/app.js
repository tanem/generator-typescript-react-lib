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
      nodir: true,
    })
    .map((file) => (templateMap.has(file) ? templateMap.get(file) : file))

const readFile = (file) => {
  const data = fs.readFileSync(file, 'utf-8')
  return path.extname(file) === '.json' ? JSON.parse(data) : data
}

const emailMock = jest.fn().mockResolvedValue('mock.user@mock.com')
const nameMock = jest.fn().mockResolvedValue('Mock Name')
const usernameMock = jest.fn().mockResolvedValue('mockusername')
const packageName = 'test-package'

beforeAll((done) => {
  helpers
    .run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      author: 'John Smith <john.smith@js.com>',
      packageDescription: 'Test package.',
      packageName,
      umdGlobalName: 'TestPkg',
      username: 'jsmith',
    })
    .on('ready', (generator) => {
      generator.user.github.username = usernameMock
      generator.user.git.name = nameMock
      generator.user.git.email = emailMock
    })
    .on('end', done)
})

test.each(getFiles())('creates %s', (file) => {
  if (path.basename(file) === 'package.json') {
    const data = readFile(file)
    const { dependencies, devDependencies, peerDependencies } = data
    const setAsymmetricMatchers = (object) => {
      for (const key in object) {
        if (key !== packageName) {
          object[key] = expect.any(String)
        }
      }
      return object
    }
    expect(data).toMatchSnapshot({
      ...(dependencies
        ? { dependencies: setAsymmetricMatchers(dependencies) }
        : {}),
      ...(devDependencies
        ? { devDependencies: setAsymmetricMatchers(devDependencies) }
        : {}),
      ...(peerDependencies
        ? { peerDependencies: setAsymmetricMatchers(peerDependencies) }
        : {}),
    })
  } else {
    expect(readFile(file)).toMatchSnapshot()
  }
})
