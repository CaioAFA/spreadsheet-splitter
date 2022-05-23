var findRemoveSync = require('find-remove');

const { dirname } = require('path');
const appDir = dirname(require.main.filename);

function cleanOldFiles(){
  const extensions = ['.csv', '.zip']
  findRemoveSync(appDir + '/import', {age: {seconds: 600}, extensions });
  findRemoveSync(appDir + '/output', {age: {seconds: 600}, extensions });
}

module.exports = cleanOldFiles