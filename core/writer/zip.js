const admZip = require("adm-zip");
const fs = require('fs').promises
const fileHelper = require('../helper/file')

const createZipFile = async (files, outputFilePath) => {
  const zip = new admZip();

  for(let i = 0; i < files.length; i++){
    f = files[i]

    const content = await fs.readFile(f)
    let zipFileName = fileHelper.getFileNameAndExtension(f)
    zip.addFile(zipFileName, content)
  }

  zip.writeZip(outputFilePath);

  console.log(`Created ${outputFilePath} successfully`);
}

module.exports = {
  createZipFile
};