const express = require('express');
const router = express.Router();
const Cocktail = require('../models/Cocktail');

router.get('/', async (req, res) => {
  try {
    const query = req.query.q || '';
    const cocktails = await Cocktail.find({
      ingredients: { $regex: query, $options: 'i' },
    });

    console.log(`Filtered results for '${query}':`, cocktails); // Add this line for debugging

    res.json(cocktails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
