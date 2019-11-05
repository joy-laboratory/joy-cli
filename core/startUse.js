const chalk = require('chalk')
const { CONFIG } = require('../config')
const log = console.log

module.exports = function({ name }) {
  log('')
  log(chalk.bold.white('开始使用:'))
  log(
    '   Issues: ' +
      chalk.green(
        `https://github.com/${CONFIG.authorID}/${CONFIG.projectName}/issues`
      )
  )
  log(
    '   Update log: ' +
      chalk.green(`https://github.com/${CONFIG.authorID}/${CONFIG.projectName}`)
  )
  log(chalk.bold.white('建议做以下尝试:'))
  log(`   cd ${name}`)
  log(`   npm install`)
  log(`   npm run dev`)
  log('')
}
