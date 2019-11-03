const semver = require('semver')
const chalk = require('chalk')

module.exports = versionRequired => {
  if (!semver.satisfies(process.version, versionRequired)) {
    console.log(
      chalk.red(
        `本机使用的node版本是${process.version},要求的最低node版本是${versionRequired},请更新你的本机node版本`
      )
    )
    process.exit(1)
  }
}
