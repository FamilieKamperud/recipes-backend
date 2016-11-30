var uuid = require('uuid');

module.exports.use = function(app, driver) {

  // List all recipes
  app.get('/recipes', (req, res) => {
    var session = driver.session();

    session
      .run( `MATCH (n:Recipe {active:'true'}) RETURN n`)
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
        steps = req.body.steps,
        id = req.body.id || uuid.v4(); //Use provided id or uuid

        //TODO, Validate unique provided Id

    session
      .run( `
        MATCH (n:User) WHERE n.username="${userName}"
        CREATE (a:Recipe { title:'${title}', ingredients:'${ingredients}', steps:'${steps}', uniqueid:'${id}', active:'true', author:'${userName}'})
        CREATE (n)-[:AUTHOR]->(a)
        `)
      .then( ( result ) => {
        session.close();
        res.send(result);
      })
      .catch( (error) => {
        session.close();
        console.log(error);
      });
  });

  // Get one recipe
  app.get('/recipe/:id', (req, res) => {
    var session = driver.session();

    var id = req.params.id;

    session
      .run( `MATCH (n:Recipe {uniqueid:'${id}', active:'true'}) RETURN n`)
      .then( function( result ) {
        session.close();
        res.send(result);
      })
      .catch(function(error) {
        session.close();
        console.log(error);
      });
  });

  // Edit a Recipe authored by a User
  app.put('/recipe/:id', (req, res) => {
    var session = driver.session();

    var userName = req.body.username,
        title = req.body.title,
        ingredients = req.body.ingredients,
        steps = req.body.steps,
        id = req.params.id;


    session
      .run( `
        MATCH (user:User) WHERE user.username="${userName}"
        MATCH (old:Recipe {uniqueid:'${id}', active:'true'})
        MATCH (p:User)-[r:AUTHOR]->(old:Recipe)
        SET old.active='false'
        CREATE (new:Recipe {
          title:'${title}',
          ingredients:'${ingredients}',
          steps:'${steps}',
          uniqueid:'${id}',
          active:'true',
          author:'${userName}'
        })
        CREATE (user)-[:AUTHOR]->(new)
        CREATE (new)-[:PREVIOUS_VERSION]->(old)
        DELETE r
        RETURN new
        `)
      .then( ( result ) => {
        session.close();
        res.send(result);
      })
      .catch( (error) => {
        session.close();
        console.log(error);
      });
  });
}
