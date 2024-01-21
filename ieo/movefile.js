const path = require('path')
const exec = require('child_process').exec

const src = path.join(__dirname, 'build/index.html')
const target = [path.join(__dirname, '../build/activity/xo/')]

target.map((item) => {
  const str = `cp ${src} ${item}`
  console.log(str)
  exec(str)
})
