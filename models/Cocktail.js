const mongoose = require('mongoose');

const cocktailSchema = new mongoose.Schema({
  idDrink: String,
  strDrink: String,
  strDrinkThumb: String,
  strInstructions: String,
  strGlass: String,
  strIngredients: String,
  strIngredient1: String,
  strIngredient2: String,
  // ... Add other ingredients if needed
  strMeasure1: String,
  strMeasure2: String,
  // ... Add other measures if needed
});

const Cocktail = mongoose.model('Cocktail', cocktailSchema);

module.exports = Cocktail;