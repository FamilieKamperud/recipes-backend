module.exports.set = function(app, driver) {

  // List all recipes
  app.get('/recipes', (req, res) => {
    var session = driver.session();

    session
      .run( `MATCH (n:Recipe) RETURN n`)
      .then( function( result ) {
        session.close();
        res.send(result);
      })
      .catch(function(error) {
        session.close();
        console.log(error);
      });
  });

  // Create a Recipe authored by a User
  app.post('/recipe', (req, res) => {
    var session = driver.session();

    var userName = req.body.username,
        title = req.body.title,
        ingredients = req.body.ingredients,
        steps = req.body.steps;

    session
      .run( `
        MATCH (n:User) WHERE n.username="${userName}"
        CREATE (a:Recipe { title:'${title}', ingredients:'${ingredients}', steps:'${steps}'})
        CREATE (n)-[:AUTHOR]->(a)
        `)
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
