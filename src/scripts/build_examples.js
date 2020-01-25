const fs = require('fs')
const path = require('path')
const chalk = require('chalk') // 字体加颜色
const symbols = require('log-symbols') // 图标
const { rmDir, copyDir } = require('../shell/command')
const { REPO_DEST } = require('./dowload_repo')

const cwd = process.cwd()
const TARGET_DIR = 'examples'

// 清除旧目录
function cleanOldDir() {
  const target = path.resolve(cwd, TARGET_DIR)
  if (fs.existsSync(target)) {
    rmDir(target)
    console.log(symbols.success, chalk.green('clean old examples directions successfully!'))
  }
}
// 拷贝目标文件夹
function copyTargetDir() {
  const from = path.resolve(REPO_DEST, TARGET_DIR)
  const to = path.resolve(cwd, TARGET_DIR)
  copyDir(from, to)
}

function buildExamples() {
  cleanOldDir()
  copyTargetDir()
  console.log(symbols.success, chalk.green('examples has copyed successfully!'))
}

module.exports.buildExamples = buildExamples
