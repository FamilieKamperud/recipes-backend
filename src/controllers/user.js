module.exports.set = function(app, driver) {

  app.get('/user/:name', (req, res) => {
    var session = driver.session();

    session
      .run( `MATCH (n:User) WHERE n.name="${req.params.name}" RETURN n` )
      .then( function( result ) {
        session.close();
        res.send(result);
      })
      .catch(function(error) {
        session.close();
        console.log(error);
      });
  });
}
