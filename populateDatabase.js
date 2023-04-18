const axios = require('axios');
const mongoose = require('mongoose');
const Cocktail = require('./models/Cocktail');

const connectionString = 'mongodb+srv://CocktailTest:Fantasy719@cocktail-pwa.wf9yxo3.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB!');
});

async function fetchAndPopulateCocktails() {
    try {
      // Fetch cocktail recipes from the external API
      const response = await axios.get(
        'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail'
      );
      const cocktails = response.data.drinks;
  
      // Iterate through the fetched cocktail recipes
      for (const cocktail of cocktails) {
        // Fetch detailed information about the cocktail
        const detailsResponse = await axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktail.idDrink}`
        );
        const details = detailsResponse.data.drinks[0];
  
        // Insert the cocktail recipe into the MongoDB database
        await Cocktail.create({
          idDrink: details.idDrink,
          strDrink: details.strDrink,
          strDrinkThumb: details.strDrinkThumb,
          strInstructions: details.strInstructions,
          strGlass: details.strGlass,
          strIngredients: [
            details.strIngredient1,
            details.strIngredient2,
            // ... Add other ingredients if needed
          ].join(', '),
          strIngredient1: details.strIngredient1,
          strIngredient2: details.strIngredient2,
          // ... Add other ingredients if needed
          strMeasure1: details.strMeasure1,
          strMeasure2: details.strMeasure2,
          // ... Add other measures if needed
        });
      }
  
      console.log('Cocktail recipes populated successfully!');
    } catch (error) {
      console.error('Error populating the database:', error.message);
    } finally {
      mongoose.connection.close();
    }
  }
  
  fetchAndPopulateCocktails();
