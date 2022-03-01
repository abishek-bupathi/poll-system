var express = require('express');
var todoController = require('./controllers/pollController');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

// listen to port
app.listen(3000);
console.log('Listeneing on port 3000');
