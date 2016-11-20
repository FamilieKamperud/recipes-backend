var neo4j = require('neo4j-driver').v1;
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');

var controllers = require('./controllers');

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser()); //TODO, stop using body parser like this

// Create one driver to reuse accross all routes
var router = express.Router();
var driver = neo4j.driver("bolt://localhost:7687.", neo4j.auth.basic("neo4j", "hanna"));
controllers.use(router, driver);

app.use('/api', router);

var server = http.createServer(app);
server.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

function closeServer() {
  driver.close();
  server.close();
}

process.on('SIGINT', closeServer);
process.on('uncaughtException', closeServer);
