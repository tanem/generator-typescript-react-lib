const Generator = require('yeoman-generator')
const glob = require('glob')
const path = require('path')
const templateMap = require('./template-map')
const { join, map, pipe, upperFirst, words } = require('lodash/fp')

module.exports = class extends Generator {
  async prompting() {
    let githubUsername
    try {
      githubUsername = await this.user.github.username()
    } catch (e) {}

    const gitName = await this.user.git.name()
    const gitEmail = await this.user.git.email()
    const defaultAuthor = `${gitName} <${gitEmail}>`

    const defaultPackageName = path.basename(this.destinationRoot())
    const convertToUmdGlobalName = pipe(words, map(upperFirst), join(''))
    const defaultUmdGlobalName = convertToUmdGlobalName(defaultPackageName)

    const prompts = [
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name:',
        default: defaultPackageName,
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'Package description:',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: defaultAuthor,
      },
      {
        type: 'input',
        name: 'githubUsername',
        message: 'GitHub username:',
        default: githubUsername,
      },
      {
        type: 'input',
        name: 'umdGlobalName',
        message: 'UMD global variable name:',
        default: defaultUmdGlobalName,
      },
    ]

    this.props = await this.prompt(prompts)
  }

  writing() {
    this.props.repoURL = `github:${this.props.githubUsername}/${this.props.packageName}`

    glob
      .sync('**', {
        cwd: this.sourceRoot(),
        dot: true,
        nodir: true,
      })
      .forEach((template) => {
        this.fs.copyTpl(
          this.templatePath(template),
          this.destinationPath(
            templateMap.has(template) ? templateMap.get(template) : template
          ),
          this.props
        )
      })
  }

  install() {
    this.env.options.nodePackageManager = 'npm'
  }

  end() {
    this.spawnCommandSync('git', ['init', '--quiet'], {
      cwd: this.destinationPath(),
    })

    this.spawnCommandSync(
      'git',
      [
        'remote',
        'add',
        'origin',
        `git@github.com:${this.props.githubUsername}/${this.props.packageName}.git`,
      ],
      {
        cwd: this.destinationPath(),
      }
    )
  }
}
