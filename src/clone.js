const path = require('path')
const xlsx = require('node-xlsx')
const { childProcessExec } = require('./utils')

const childProcess = childProcessExec()


const xlsxReg = new RegExp(/仓库地址|repositoryUrl/)

function clone(filepath) {
  const currentDir = process.cwd()
  const absFilePath = path.join(currentDir, filepath)

  const extname = path.extname(absFilePath)

  let cloneUrls
  
  if (extname === '.json') {
    cloneUrls = getRepositoryUrlByJson()
  } else if (extname === '.xlsx') {
    // if extname .xlsx
    cloneUrls = getRepositoryUrlByXlsx()
  } else {
    throw new Error('Config file type need .json or .xlsx')
  }

  cloneUrls.forEach(url => {
    childProcess(`git clone ${url}`, () => {
      console.log('repository' + url + "clone complete")
    })
  })

  /**
   * parse json config
   * @returns urls
   */
  function getRepositoryUrlByJson() {
    const typeErrorText = 'Config json file context need Array, like [ "https://xxxx/xx", "https://xxxx/xx" ] or [{"url": "https://xxxx/xx"}]'
    const configJson = require(absFilePath)
    const urls = []
    if (!Array.isArray(configJson)) {
      throw new Error(typeErrorText)
    }

    if (typeof configJson[0] !== 'object') { 
      // not't object or array
      configJson.forEach(url => {
        if (!url) {
          throw new Error('Config item can\'t of null undefined or ""')
        }
        urls.push(url)
      })
    } else {
      if (!configJson[0].url) {
        throw new Error(typeErrorText)
      } else {
        configJson.forEach(item => {
          if (!item.url) {
            throw new Error('Config item url can\'t of null undefined or ""')
          }
          urls.push(item.url)
        })
      }
    }

    return urls
  }

  /**
   * parse xlsx config
   * @returns urls
   */
  function getRepositoryUrlByXlsx() {
    const sheets = xlsx.parse(absFilePath)
    const urls = []
      sheets.forEach(sheet => {
        const data = []
        sheet.data.forEach(row => row.length && data.push(row))
        const sheetHead = data.shift()
        dressUrlIndex = null
        sheetHead.forEach((item, index) => {
          item.match(xlsxReg) && (dressUrlIndex = index)
        })
        if (dressUrlIndex) {
          data.forEach(row => {
            let url = row[dressUrlIndex]
            if (url) {
              url = url.match(/\.git$/) ? url : url + '.git'
              urls.push(url)
            }
          })
        } else {
          throw new Error('请在表格第一行表头中设置 仓库地址 或者 repositoryUrl 列，并在表格对应列中填写仓库地址')
        }
      })
    console.log('urls: ', urls)
    return urls
  }
}

module.exports = {
  clone
}