#!/usr/bin/env node

const program = require('commander')
const checkPackageVersion = require('../core/checkPackageVersion')
const checkProjectName = require('../core/checkProjectName')
const packageName = require('../package.json').name
const inquirer = require('../core/inquirer')
const downloadTemplate = require('../core/downloadTemplate')
const generateTemplate = require('../core/generateTemplate')
const startUse = require('../core/startUse')

// 将process.argv参数赋值给program
program.usage('<project-name>').parse(process.argv)

// 命令输入的根目录名称 joy init wq
const projectName = program.args[0]
if (!projectName) {
  program.help()
  return
}

checkPackageVersion(packageName, () => {
  init()
})

async function init() {
  // 创建项目根目录并且测目录是否存在
  const projectData = await checkProjectName(projectName)
  // 询问集成库
  const inquirerData = await inquirer()
  // 下载项目模版
  const downData = await downloadTemplate(projectName)

  // 渲染模板 输出
  await generateTemplate({
    ...projectData,
    ...inquirerData,
    ...downData
  })

  startUse(projectData)

  process.exit(1)
}
