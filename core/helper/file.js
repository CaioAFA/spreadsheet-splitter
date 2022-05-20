function getFileName(filePath){
  const splittedFilePath = filePath.split('/')
  const fileNameWithExtension = splittedFilePath[splittedFilePath.length - 1]
  const splittedFileNameWithExtension = fileNameWithExtension.split('.')
  return splittedFileNameWithExtension[0]
}

function getFileExtension(filePath){
  const splittedFilePath = filePath.split('/')
  const fileNameWithExtension = splittedFilePath[splittedFilePath.length - 1]
  const splittedFileNameWithExtension = fileNameWithExtension.split('.')
  return splittedFileNameWithExtension[splittedFileNameWithExtension.length - 1]
}

function getFileNameAndExtension(filePath){
  const splittedFilePath = filePath.split('/')
  const fileNameWithExtension = splittedFilePath[splittedFilePath.length - 1]
  return fileNameWithExtension
}

module.exports = {
  getFileName,
  getFileExtension,
  getFileNameAndExtension
}