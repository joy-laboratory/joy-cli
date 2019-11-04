const chalk = require('chalk')

exports.formatFeatures = (features, lead, joiner) => {
  return features
    .map(dep => {
      return `${lead || ''}${chalk.yellow(dep)}`
    })
    .join(joiner || ', ')
}
