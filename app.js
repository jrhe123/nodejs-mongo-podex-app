var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

// Image
var upload = multer({
	dest: __dirname + '/uploads'
});


// connect mongoDB
mongoose.connect('mongodb://localhost:27017/pokedex');

// express server
var app = express();
app.use(bodyParser.urlencoded());
app.use(upload.single('file'));



// static upload folder
app.use('/uploads', express.static(__dirname + '/uploads'));



// html folder
nunjucks.configure('views', {
	autoescape: true,
	express: app
});



// static folder path
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));



// schema
require('./models/Pokemon');
require('./models/Type');
// routes
var pokemons = require('./routes/pokemons');
var types = require('./routes/types');
// pokemon APIs
app.use('/', pokemons);
// type APIs
app.use('/types', types);




app.get('/', (req, res) => {
	res.send('hello world');
});


app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});