#!/usr/bin/env node

const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const program = require('commander')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const { CONFIG_FILENAME } = require('../config/const.js')

program
    .option('--name [name]', '项目名称')
    .option('-t, --template <template>', 'set template when init')
    .option('-c, --clone', 'use git clone')
    .parse(process.argv)

const projectName = program.args[0] || program.name

let template = 'babel' // default use `base` template
if (program.template) template = program.template
let isUseDefault = !~template.indexOf('/')
if (isUseDefault) template = `XiaoZaoFE/${template}-templates`

const clone = program.clone || false

ask()
    .then(answers => {
      create(answers.projectName)
    })

function ask() {
  const prompts = [];
  if (typeof projectName !== 'string') {
    prompts.push({
      type: 'input',
      name: 'projectName',
      message: '请输入项目名称！',
      validate (input) {
        if (!input) {
          return '项目名不能为空！'
        }
        if (fs.existsSync(input)) {
          return '当前目录已经存在同名项目，请换一个项目名:'
        }
        return true
      }
    })
  } else if (fs.existsSync(projectName)) {
    prompts.push({
      type: 'input',
      name: 'projectName',
      message: '当前目录已经存在同名项目，请换一个项目名:',
      validate (input) {
        if (!input) {
          return '项目名不能为空！'
        }
        if (fs.existsSync(input)) {
          return '项目名依然重复！'
        }
        return true
      }
    })
  }
  return inquirer.prompt(prompts)
}

function create(pathName) {
  console.log('')
  console.log(chalk.green(`即将创建一个新项目!`))
  fs.ensureDirSync(path.resolve(pathName))
  init(template, path.resolve(pathName))
}

function init(from, to) {
  const spinner = ora('Downloading template').start()
  download(from, to, { clone }, function (err) {
    spinner.stop()
    if (err) {
      console.log('')
      console.log('  Failed to download repo ' + chalk.red(template) + ': ' + err.message.trim())
      console.log('')
    } else {
      const destConfigPath = path.join(to, CONFIG_FILENAME)
      // 当模板中不存在配置文件时，则使用默认的配置文件
      if (!fs.existsSync(destConfigPath)) {
        const defualtConfigPath = path.join(__dirname, '../config/default.out.js')
        fs.copySync(defualtConfigPath, destConfigPath)
      }

      console.log('')
      console.log('  Base on ' + chalk.green(template) + ' init project success')
      console.log('')
      if (projectName) {
        console.log(chalk.cyan('  $ cd ' + projectName + ' && npm install'))
      } else {
        console.log(chalk.cyan('  $ npm install'))
      }
      console.log(chalk.cyan('  $ xiao-zao start'))
      console.log('')
    }
  })
}
