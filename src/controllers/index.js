var user = require('./user');
var recipe = require('./recipe');

module.exports.set = function(app) {

  user.set(app);
  recipe.set(app);

}
