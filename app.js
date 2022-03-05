var express = require('express');
var pollController = require('./controllers/pollController');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

//fire controllers
pollController(app);

// listen to port
app.listen(3000);
console.log('Listening on port 3000');
