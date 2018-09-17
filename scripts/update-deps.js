const shell = require('shelljs')

const packageFiles = ['generators/app/templates/_package.json', 'package.json']
packageFiles.forEach(packageFile =>
  shell.exec(`ncu -a --packageFile ${packageFile}`)
)

if (
  shell
    .exec('git ls-files --exclude-standard --modified --others')
    .split('\n')
    .some(f => f === 'package.json')
) {
  shell.exec('npm i')
}
