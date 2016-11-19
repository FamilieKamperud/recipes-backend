var neo4j = require('neo4j-driver').v1;

module.exports.set = function(app) {

  app.get('/user/:name', (req, res) => {
    var driver = neo4j.driver("bolt://localhost:7687.", neo4j.auth.basic("neo4j", "hanna"));
    var session = driver.session();

    session
      .run( `MATCH (n:User) WHERE n.name="${req.params.name}" RETURN n` )
      .then( function( result ) {
        res.send(result);
        session.close();
        driver.close();
      })
      .catch(function(error) {
        console.log(error);
      });
  });
}
