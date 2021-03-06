const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const dateHelper = require('../helper/time')

function splitDataToFiles(fileName, data, splitSize){
  let exportCounter = 1
  let i = 0
  let contentToWrite = []
  const splittedFiles = []
  data.forEach(d => {
    contentToWrite.push(d)
    i += 1

    if(i == splitSize){
      let splittedFileName = getSplittedFileName(fileName, exportCounter)
      splittedFiles.push(splittedFileName)
      writeCsvFile(splittedFileName, contentToWrite)
      contentToWrite = []
      i = 0
      exportCounter += 1
    }
  });

  if(contentToWrite.length){
    let splittedFileName = getSplittedFileName(fileName, exportCounter)
    splittedFiles.push(splittedFileName)
    writeCsvFile(splittedFileName, contentToWrite)
  }

  return splittedFiles
}

const getSplittedFileName = (fileName, exportCounter) => {
  return `./output/${fileName}-${dateHelper.getNowInMilliseconds()}-${exportCounter}.csv`
}

async function writeCsvFile(outputFile, data){
  const firstRow = data[0]

  let headers = []
  Object.keys(firstRow).forEach(h => {
    headers.push({
      id: h, title: h
    })
  })
  
  const csvWriter = createCsvWriter({
    path: outputFile,
    header: headers
  });

  await csvWriter.writeRecords(data)
}

module.exports = {
  splitDataToFiles
}