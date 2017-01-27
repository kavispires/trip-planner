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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
var env = nunjucks.configure('views', {noCache: true});

// routes
app.use('/', morgan('dev'));

app.use('/', routes);

// ERROR doesn't use ERROR page
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	console.error(err);
	res.render('error', {error: err});
});

// server
models.Data.sync({force: true})
.then(function() {
	if (!module.parent) app.listen('3000', () => console.log('\nListening on port 3000\n'));
});

module.exports = app;
