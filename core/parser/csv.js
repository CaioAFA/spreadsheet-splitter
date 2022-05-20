const fs = require("fs");
const csv = require("csv-parser");

function parseCsvFile(filePath){
  var data = []

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", function (row) {
      data.push(row);
    })
    .on("end", function () {
      resolve(data);
    })
    .on("error", function (error) {
      reject("Error at csv parsing: " + error.message)
    });
  })
}

module.exports = {
  parseCsvFile
}