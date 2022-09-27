const fs = require('fs-extra')

/**
 * @des 复制文件到指定为止
 */
async function copyFiles(copiedPath, resultPath) {
  const args = process.argv.slice(2)
  const name = args[0]
  const url = `${resultPath}/${name}`
  // 创建文件夹
  fs.ensureDirSync(url)
  try {
    await fs.copySync(copiedPath, url)
    await fs.move(`${url}/Custom.tsx`, `${url}/${name}.tsx`)
    await reWrite(`${url}/index.ts`, name)
    await reWrite(`${url}/${name}.tsx`, name)
    console.log('add page success!')
  } catch (err) {
    console.error(err)
  }
}

async function reWrite(url, name) {
  const packageObj = await fs.readFile(url)
  const content = packageObj.toString()
  await fs.writeFile(url, content.replace(new RegExp('Custom', 'g'), name))
}

copyFiles('templates/component', 'src/components')
