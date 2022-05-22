const express = require('express')
const app = express()

// Body-Parser - Parse Form Data Send To Server
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect-Multiparty - Receive files from client
const multiparty = require('connect-multiparty');
app.use(multiparty({uploadDir: './import'}))

// EJS - View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files
app.use(express.static('static'))

module.exports = app