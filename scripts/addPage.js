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
    await fs.move(`${url}/demo.tsx`, `${url}/${name}.tsx`)
    await reIndexWrite(`${url}/index.ts`, name)
    await reWrite(`${url}/${name}.tsx`, name)
    console.log('add page success!')
  } catch (err) {
    console.error(err)
  }
}

async function reIndexWrite(url, name) {
  const packageObj = await fs.readFile(url)
  const content = packageObj.toString()
  await fs.writeFile(url, content.replace('demo', name))
}

async function reWrite(url, name) {
  const packageObj = await fs.readFile(url)
  const content = packageObj.toString()
  const newName = `${name[0].toLocaleUpperCase()}${name.slice(1)}`
  const newContent = content.replace(new RegExp('Demo', 'g'), newName)
  await fs.writeFile(url, newContent)
}

copyFiles('templates/page', 'src/pages')
