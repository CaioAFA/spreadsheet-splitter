const app = require('./config/config')
const fs = require('fs')
const spreadsheetSplitter = require('./core/spreadsheet-splitter')
require('./cron/scheduler')

// Get Port Passed By CLI
const myArgs = process.argv.slice(2);
var PORT;
if(myArgs.length == 0){
	console.log('No Port Informed. Default Port: 3000.')
	PORT = 3000;
}
else{
	PORT = parseInt(myArgs[0]);
}

app.post('/split', async function(req, res){
	try{
		const splitSize = req.body.splitSize ?? 1000
		const file = req.files.file

		if(!file || (file && !file.originalFilename.includes('.csv'))){
			throw new Error("You should send a .csv file to split")
		}

		// Move file to import folder with the correct name
		const newFilePath = `./import/${file.originalFilename}`
		fs.renameSync(file.path, newFilePath)

		const zipFile = await spreadsheetSplitter.split(newFilePath, splitSize)
		res.send(`/download/${zipFile}`)
	}
	catch(error){
		console.log(error)
		res.status(500)
		res.send(error.message)
	}
})

app.get('/', function(req, res){
	res.render('index')
})

app.get('/download/:file', function(req, res){
	const downloadFile = req.params.file
	res.download(`./output/${downloadFile}`)
})

app.listen(PORT, function(){
  console.log(`Server ONLINE on port ${PORT}`)
})