const Cocktail = require('./models/Cocktail');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require('./db'); // Import the db object from db.js

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// Get all cocktails
app.get('/api/cocktails', async (req, res) => {
  try {
    console.log('Fetching all cocktails...');
    const cocktails = await Cocktail.find();
    console.log('Cocktails fetched:', cocktails);
    res.json(cocktails);
  } catch (error) {
    console.error('Error fetching cocktails:', error);
    res.status(500).json({ message: error.message });
  }
});


// Get cocktails by ingredient
app.get('/api/cocktails/search/:ingredient', async (req, res) => {
  try {
    const ingredient = req.params.ingredient;
    const cocktails = await Cocktail.find({ strIngredients: { $regex: ingredient, $options: 'i' } });
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  // Get a cocktail by id
  app.get('/api/cocktails/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const cocktail = await Cocktail.findOne({ idDrink: id });
      res.json(cocktail);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });  



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));