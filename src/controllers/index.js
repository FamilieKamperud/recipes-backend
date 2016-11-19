var user = require('./user');
var recipe = require('./recipe');

module.exports.set = function(app, driver) {

  user.set(app, driver);
  recipe.set(app, driver);

}
