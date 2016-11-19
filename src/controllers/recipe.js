var neo4j = require('neo4j-driver').v1;

module.exports.set = function(app) {

  app.get('/recipe', (req, res) => {
    res.send('Yo hoe!');
  });
}
