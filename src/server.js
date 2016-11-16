var neo4j = require('neo4j-driver').v1;

var express = require('express')
  , bodyParser = require('body-parser')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());


app.get('/', function (req, res) {
  res.send('Mah server!!');
});

app.get('/person', (req, res) => {
  var driver = neo4j.driver("bolt://localhost:7687.", neo4j.auth.basic("neo4j", "hanna"));
  var session = driver.session();

  session
    .run( "CREATE (a:Person {name:'Nancy', title:'Queen'})" )
    .then( function( result ) {
      res.send(result);
      session.close();
      driver.close();
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
