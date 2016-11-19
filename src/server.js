var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

var controllers = require('./controllers');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser()); //TODO, stop using body parser like this

controllers.set(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
