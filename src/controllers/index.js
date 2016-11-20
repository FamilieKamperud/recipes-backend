var user = require('./user');
var recipe = require('./recipe');

module.exports.use = function(app, driver) {

  user.use(app, driver);
  recipe.use(app, driver);

}
