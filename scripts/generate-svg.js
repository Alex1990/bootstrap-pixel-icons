const shell = require('shelljs')
const path = require('path')

const root = process.cwd()
const svgDir = path.join(root, 'svg')
let asepriteCmd

switch (process.platform) {
  case 'win32':
    asepriteCmd = 'C:\\Program Files\\Aseprite\\Aseprite.exe'
    break
  case 'darwin':
    asepriteCmd = '/Applications/Aseprite.app/Contents/MacOS/aseprite'
    break
  default:
    console.error(`platform ${process.platform} is not supported`)
    process.exit(1)
}

function convertToSvg({ file, index, total }) {
  const filename = path.basename(file, '.aseprite')
  const cmd = `${asepriteCmd} -b --layer="Layer 1" src/${filename}.aseprite --save-as "svg/${filename}.svg"`
  const { code, stdout, stderr } = shell.exec(cmd)
  if (code !== 0) {
    console.log(stderr)
    process.exit(1)
  } else {
    console.log(`${index + 1}/${total} completed`)
  }
}

function generatePng() {
  const files = shell.ls('src/*.aseprite')
  const total = files.length
  for (let i = 0; i < total; i++) {
    convertToSvg({ file: files[i], index: i, total })
  }
}

generatePng()
