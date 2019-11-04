const inquirer = require('inquirer')
const { formatFeatures } = require('./util')
const defaultChoices = ['React-router', 'Redux', 'Less', 'Antd']

module.exports = async () => {
  let next = undefined
  const _data = {}

  const presetPrompt = [
    {
      type: 'list',
      message: '请选择一个预设值:',
      name: 'preset',
      choices: [
        {
          name: `默认 (${formatFeatures(defaultChoices)})`,
          value: 0
        },
        {
          name: '手动选择',
          value: 1
        }
      ]
    }
  ]
  const { preset } = await inquirer.prompt(presetPrompt)

  if (!preset) {
    return Promise.resolve({
      router: true,
      redux: true,
      less: true,
      antd: false,
      element: false
    })
  }

  const featuresPrompt = [
    {
      type: 'checkbox',
      message: '检查项目所需的功能:',
      name: 'features',
      choices: [
        {
          name: 'CSS 预处理器',
          value: 'cssPre',
          checked: true
        },
        {
          name: 'redux',
          value: 'redux'
        }
      ]
    }
  ]
  const { features } = await inquirer.prompt(featuresPrompt)

  features.forEach(currentValue => {
    _data[currentValue] = true
  })

  if (!_data.cssPre) {
    next = Promise.resolve(_data)
    return next
  }

  const cssPrePrompt = [
    {
      type: 'list',
      message: '请选择使用的css预处理器:',
      name: 'cssPre',
      choices: [
        {
          name: 'Sacc/SCSS',
          value: 'scss'
        },
        {
          name: 'Less',
          value: 'less'
        }
      ]
    }
  ]
  const { cssPre } = await inquirer.prompt(cssPrePrompt)

  _data[cssPre] = true
  next = Promise.resolve(_data)

  const uiPreComponent = [
    {
      type: 'list',
      message: '请选择使用的ui组件库:',
      name: 'uiComponent',
      choices: [
        {
          name: 'Antd',
          value: 'antd'
        },
        {
          name: 'Element',
          value: 'element'
        }
      ]
    }
  ]

  const { uiComponent } = await inquirer.prompt(uiPreComponent)

  _data[uiComponent] = true
  next = Promise.resolve(_data)

  return next
}
