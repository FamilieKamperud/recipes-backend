var validator = require('paperwork');

var recipeTemplate = {
  title: String,
  ingredients: [String],
  steps: [String],
  id: validator.optional(String),
  username: String
};

module.exports = recipeTemplate;
