const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const ora = require('ora')

const cwd = process.cwd()

/* 生成项目目录 */
module.exports = projectName => {
  let next = undefined
  const fileList = glob.sync('*')
  const spinner = ora({ color: 'white', text: '正在创建目录...' })

  if (fileList.length) {
    if (
      fileList.filter(name => {
        const fileName = path.resolve(cwd, name)
        // 判断是否存在文件目录
        const isDir = fs.statSync(fileName).isDirectory()
        return name === projectName && isDir
      }).length !== 0
    ) {
      spinner.fail(`项目 ${projectName} 已经存在`)
      process.exit(1)
    }
    next = Promise.resolve({
      projectRoot: path.resolve(cwd, projectName),
      name: projectName
    })
  }
  return next
}
