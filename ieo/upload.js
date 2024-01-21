const exec = require('child_process').exec
const path = require('path')
const AWS_ACCESS_KEY_ID = process.env.WEB_AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.WEB_AWS_SECRET_ACCESS_KEY
const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION

const pathurl = path.join(__dirname, 'build/static')
const targetpath = 'static/activity/xo/static'
const upload = [
  `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}`,
  `AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}`,
  'aws s3 sync',
  pathurl,
  `s3://static.headsc.dev/${targetpath} --exclude '*.svg' --cache-control max-age=31536000 --region ${AWS_DEFAULT_REGION} --acl public-read`,
].join(' ')
const upload_svg = [
  `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}`,
  `AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}`,
  'aws s3 sync',
  pathurl,
  `s3://static.headsc.dev/${targetpath} --exclude '*' --include '*.svg' --content-type='image/svg+xml' --cache-control max-age=31536000 --region ${AWS_DEFAULT_REGION} --acl public-read`,
].join(' ')

exec(upload, (error, stdout, stderr) => {
  console.log('stdout: ' + stdout, '+++++++++++', 'stderr: ' + stderr)
  if (error !== null) {
    console.log('execSync error: ' + error)
  }
  exec(upload_svg, (error, stdout, stderr) => {
    console.log('stdout: ' + stdout, '+++++++++++', 'stderr: ' + stderr)
    if (error !== null) {
      console.log('execSync error: ' + error)
    }
  })
})
