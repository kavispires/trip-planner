// node modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

// local modules
const routes = require('./routes');
const models = require('./models');

// configuration
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({extended: false})); // extended: false requires that the values can only be a string or an array
app.use(bodyParser.json());

app.use('/font-awesome', express.static(__dirname + '/node_modules/font-awesome/css/font-awesome.min.css'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/public'));

var env = nunjucks.configure('views', {noCache: true});

// routes
app.use('/', morgan('dev'));

app.use('/', routes);

// process errors
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.error(err);
	res.render('error', {error: err});
});

// server
if (!module.parent) app.listen('8080', () => console.log('\nListening on port 8080\n'));

module.exports = app;
