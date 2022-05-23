var cron = require('node-cron');
const cleanOldFiles = require('./cleanOldFiles/main')

cron.schedule('0 * * * *', () => {
  console.log('Running cronjob: cleanOldFiles')
  cleanOldFiles()
});