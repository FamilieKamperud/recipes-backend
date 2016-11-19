module.exports.set = function(app, driver) {

  app.get('/recipe', (req, res) => {
    res.send('Yo hoe!');
  });
}
