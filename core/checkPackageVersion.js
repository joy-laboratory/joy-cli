const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const ora = require('ora')
const package = require('../package.json')
const { CONFIG } = require('../config')
const log = console.log

/* 获取当前包的版本 */
module.exports = (id, callback) => {
  const spinner = ora({
    color: 'white',
    text: '获取更新信息...'
  })
  spinner.start()
  request(
    {
      url: CONFIG.npmReg + id
    },
    (err, res, body) => {
      const localVersion = package.version
      if (!err && res.statusCode === 200) {
        const latestVersion = JSON.parse(body)['dist-tags'].latest
        if (semver.lt(localVersion, latestVersion)) {
          spinner.stop()
          log(chalk.white('  新版本的joy可用.'))
          log()
          log('  最新:    ' + chalk.green(latestVersion))
          log('  安装: ' + chalk.white(localVersion))
          log()
          log(
            chalk.white('  +-------------------------------------------------+')
          )
          log(
            `  ${chalk.white(
              '|'
            )}                                                 ${chalk.white(
              '|'
            )}`
          )
          log(
            `  ${chalk.white('|')}   运行 ${chalk.white(
              `npm i -g ${package.name}`
            )} 去更新   ${chalk.white('|')}`
          )
          log(
            `  ${chalk.white(
              '|'
            )}                                                 ${chalk.white(
              '|'
            )}`
          )
          log(
            chalk.white('  +-------------------------------------------------+')
          )
          log()
          process.exit(0)
        } else {
          spinner.succeed(
            `本地joy是最新版本（${chalk.green(`v${localVersion}`)}）`
          )
          callback && callback()
        }
      } else {
        spinner.fail()
        log(err)
      }
    }
  )
}
