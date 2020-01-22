const path = require('path')
const fs = require('fs')
const shell = require('shelljs')
const ora = require('ora')
const symbols = require('log-symbols')
const chalk = require('chalk')
const { rmDir, copyDir } = require('../shell/command')
const cwd = process.cwd()
const TEMP_DIR = '_temp'
// const REPO_URL = 'github:HarryChen0506/malyan'
const REPO_NAME = 'malyan'
const REPO_DEST = path.resolve(cwd, TEMP_DIR, REPO_NAME)
const TARGET_DIR = 'docs'

async function  buildDocs() {
  installModules()
  createHtml()
  afterBuild()
}

// 安装依赖
function installModules() {
  let spinner = ora('Installing...')
  spinner.start()
  // 命令行操作安装依赖
  shell.exec("cd " + REPO_DEST + " && cd docs && npm i")
  spinner.succeed()
  console.log(symbols.success, chalk.green('The docs package.json has installed dependence successfully!'))
}
// 生成HTML
function createHtml() {
  let spinner = ora('Crate HTML...')
  spinner.start()
  shell.exec("cd " + REPO_DEST + " && cd docs && npx gitbook build")
  spinner.succeed()
  console.log(symbols.success, chalk.green('The docs HTML has created successfully!'))
}

function afterBuild() {
  cleanOldDir()
  copyTargetDir()
  console.log(symbols.success, chalk.green('docs has built successfully!'))
}

// 清除旧目录
function cleanOldDir() {
  const target = path.resolve(cwd, TARGET_DIR)
  if (fs.existsSync(target)) {
    rmDir(target)
    console.log(symbols.success, chalk.green('clean old docs successfully!'))
  }
}
// 拷贝目标文件夹
function copyTargetDir() {
  const from = path.resolve(REPO_DEST, TARGET_DIR, '_book')
  const to = path.resolve(cwd, TARGET_DIR)
  copyDir(from, to)
}

// 移除缓存
function removeTemp() {
  const target = path.resolve(cwd, TEMP_DIR)
  if (fs.existsSync(target)) {
    rmDir(target)
    console.log(symbols.success, chalk.green('remove temp successfully!'))
  }
}
module.exports.buildDocs = buildDocs
module.exports.removeTemp = removeTemp