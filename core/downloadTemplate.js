const download = require('download-git-repo')
const path = require('path')
const ora = require('ora')
const { CONFIG } = require('../config')
const TEMP = '.download-temp'

/* 下载模板 */
module.exports = target => {
  target = path.join(target || '.', TEMP)
  const spinner = ora({ color: 'green', text: '开始下载模版文件...' })
  spinner.start()
  return new Promise((resolve, reject) => {
    download(
      `${CONFIG.authorID}/${CONFIG.templateName}#${CONFIG.branch}`,
      target,
      err => {
        if (err) {
          spinner.fail()
          reject(err)
        } else {
          spinner.succeed('模版文件下载成功！')
          resolve({ tempName: TEMP })
        }
      }
    )
  })
}
