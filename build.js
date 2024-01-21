// 依次对子项目进行打包；
const fs = require('fs')
const spawn = require('cross-spawn')
const path = require('path')

const subProjects = ['ieo', 'hongbao']

subProjects.forEach((subProj) => {
  const subProjPath = path.join(__dirname, subProj)
  console.log(subProjPath)
  spawn.sync('npm', ['install'], {
    stdio: 'inherit',
    cwd: subProjPath,
  })
  spawn.sync('npm', ['run', 'build'], {
    stdio: 'inherit',
    cwd: subProjPath,
  })
  console.log(`${subProjPath}打包成功`)
})
