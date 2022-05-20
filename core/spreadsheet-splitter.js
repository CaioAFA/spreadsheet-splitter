// Read and write csv files: https://stackabuse.com/reading-and-writing-csv-files-with-node-js/

const csvParser = require('./parser/csv')
const csvWriter = require('./writer/csv')
const zipWriter = require('./writer/zip')
const fileHelper = require('./helper/file')

async function split(filePath, splitSize){
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

  const outputZipFile = `./output/${fileName}.zip`
  zipWriter.createZipFile(splittedFiles, outputZipFile)

  return outputZipFile
}

module.exports = {
  split
}