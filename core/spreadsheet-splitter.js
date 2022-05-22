const csvParser = require('./parser/csv')
const csvWriter = require('./writer/csv')
const zipWriter = require('./writer/zip')
const fileHelper = require('./helper/file')
const dateHelper = require('./helper/time')

const split = async (filePath, splitSize) => {
  const fileName = fileHelper.getFileName(filePath)
  const fileExtension = fileHelper.getFileExtension(filePath)

  let data = []
  switch(fileExtension){
    case 'csv':
      data = await csvParser.parseCsvFile(filePath)
      break

    default:
      throw Error(`Can't process this type of file: ${fileExtension}`)
      break
  }

  if(!data.length){
    throw Error(`No data found`)
  }

  const splittedFiles = csvWriter.splitDataToFiles(fileName, data, splitSize)

  const nowInMilliseconds = dateHelper.getNowInMilliseconds()
  const completeFileName = `${fileName}-${nowInMilliseconds}.zip`
  const outputZipFile = `./output/${completeFileName}`
  await zipWriter.createZipFile(splittedFiles, outputZipFile)

  return completeFileName
}

module.exports = {
  split
}