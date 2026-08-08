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

// The LICENSE template stamps the current year, so a snapshot holding it
// verbatim goes stale on 1 January and stays stale until someone notices.
const normaliseYear = (data) =>
  typeof data === 'string'
    ? data.replace(/Copyright \(c\) \d{4}/, 'Copyright (c) <year>')
    : data

const emailMock = jest.fn().mockResolvedValue('mock.user@mock.com')
const nameMock = jest.fn().mockResolvedValue('Mock Name')
const githubUsernameMock = jest.fn().mockResolvedValue('mockgithubusername')
const packageName = 'test-package'

beforeAll((done) => {
  helpers
    .run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      author: 'John Smith <john.smith@js.com>',
      packageDescription: 'Test package.',
      packageName,
      umdGlobalName: 'TestPkg',
      githubUsername: 'jsmith',
    })
    .on('ready', (generator) => {
      generator.user.github.githubUsername = githubUsernameMock
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
    expect(normaliseYear(readFile(file))).toMatchSnapshot()
  }
})

// The snapshots above would catch a change to any of the following, but they
// record it rather than assert it: a reviewer approving an updated snapshot has
// no way to see which lines were load-bearing. These say so out loud.
describe('the generated release setup', () => {
  // A manual dispatch can target any branch. Without the guard, dispatching
  // against a version branch bumps, tags and publishes that branch to npm as
  // latest. The pilot repo lost this in migration and had to have it restored.
  test('guards the release job against a non-default branch', () => {
    expect(readFile('.github/workflows/release.yml')).toContain(
      'if: github.ref_name == github.event.repository.default_branch',
    )
  })

  test('pins the action to a full commit SHA', () => {
    expect(readFile('.github/workflows/release.yml')).toMatch(
      /uses: tanem\/release-action@[0-9a-f]{40} # v\d+\.\d+\.\d+$/m,
    )
  })

  // npm publish runs the package's build, which needs node_modules, and the
  // test run is the gate the release gets to pass through.
  test('installs and tests before releasing', () => {
    const workflow = readFile('.github/workflows/release.yml')
    expect(workflow.indexOf('- run: npm ci')).toBeLessThan(
      workflow.indexOf('- run: npm test'),
    )
    expect(workflow.indexOf('- run: npm test')).toBeLessThan(
      workflow.indexOf('uses: tanem/release-action@'),
    )
  })

  test('categorises generated release notes by the labels the bump reads', () => {
    const categories = readFile('.github/release.yml')
    expect(categories).toContain('- breaking')
    expect(categories).toContain('- enhancement')
  })

  // GitHub creates new repos on main. A workflow naming a branch the repo does
  // not have never runs, and does so silently and forever.
  test.each(['.github/workflows/release.yml', '.github/workflows/ci.yml'])(
    '%s names no branch a fresh repo will not have',
    (workflow) => {
      expect(readFile(workflow)).not.toContain('master')
    },
  )

  // Without this, dist/ exists at publish time only because `npm test` happens
  // to run build before the tests that consume it, and reordering test would
  // ship an empty tarball with nothing to catch it.
  test('builds the package as part of publishing it', () => {
    const { scripts } = readFile('package.json')
    expect(scripts.prepublishOnly).toBe('npm run build')
  })

  test('leaves no tanem-scripts wiring in the package manifest', () => {
    const { devDependencies, scripts } = readFile('package.json')
    expect(devDependencies).not.toHaveProperty('tanem-scripts')
    expect(Object.values(scripts).join('\n')).not.toContain('tanem-scripts')
  })
})
