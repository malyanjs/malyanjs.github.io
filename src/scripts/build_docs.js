const path = require('path')
const shell = require('shelljs')
const ora = require('ora')
const symbols = require('log-symbols')
const chalk = require('chalk')
const cwd = process.cwd()
const TEMP_DIR = '_temp'
// const REPO_URL = 'github:HarryChen0506/malyan'
const REPO_NAME = 'malyan'
const REPO_DEST = path.resolve(cwd, TEMP_DIR, REPO_NAME)

function buildDocs() {
  installModules({
    name: REPO_DEST,
    onSuccess: function () {
      createHtml()
    }
  })
}

// 安装依赖
function installModules({ name, onSuccess }) {
  let spinner = ora('Installing...')
  spinner.start()
  // 命令行操作安装依赖
  shell.exec("cd " + name + " && cd docs && npm i", function (err, stdout, stderr) {
    if (err) {
      spinner.fail()
      console.log(symbols.error, chalk.red(err))
    }
    else {
      spinner.succeed();
      console.log(symbols.success, chalk.green('The object has installed dependence successfully!'))
      typeof onSuccess === 'function' && onSuccess()
    }
  })
}
// 生成HTML
function createHtml() {
  console.log('createHtml')
  shell.exec("cd " + REPO_DEST + " && cd docs && npx gitbook build", function (err, stdout, stderr) {
    if (err) {
      spinner.fail()
      console.log(symbols.error, chalk.red(err))
    }
    else {
      spinner.succeed();
      console.log(symbols.success, chalk.green('The docs HTML has created successfully!'))
    }
  })
}

module.exports.buildDocs = buildDocs