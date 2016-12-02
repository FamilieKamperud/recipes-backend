module.exports.use = function(app, driver) {

  // List all Users
  app.get('/users', (req, res) => {
    var session = driver.session();

    session
      .run( `MATCH (n:User) RETURN n`)
      .then( function( result ) {
        session.close();
        res.send(result);
      })
      .catch(function(error) {
        session.close();
        console.log(error);
      });
  });

  // Create a User
  app.post('/user/:username', (req, res) => {
    var session = driver.session();

    var username = req.params.username,
        joined = new Date();


    session
      .run( `CREATE (a:User { username:'${username}', joined:'${joined}'})`)
      .then( function( result ) {
        session.close();
        res.send(result);
      })
      .catch(function(error) {
        session.close();
        console.log(error);
      });
  });

  // Get info of one User
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
