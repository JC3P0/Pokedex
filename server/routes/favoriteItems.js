const express = require('express');
const router = express.Router();
const FavoriteItem = require('../models/FavoriteItem');

// Get all favorite items
router.get('/', async (req, res) => {
  try {
    const favoriteItems = await FavoriteItem.find().populate('itemId');
    res.json(favoriteItems);
  } catch (err) {
    console.error('Error fetching favorite items:', err);
    res.status(500).json({ message: err.message });
  }
});

// Add a new favorite item
router.post('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const existingFavorite = await FavoriteItem.findOne({ itemId });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Item already in favorites' });
    }

    const favoriteItem = new FavoriteItem({ itemId });
    await favoriteItem.save();

    res.status(201).json(favoriteItem);
  } catch (err) {
    console.error('Error adding favorite item:', err);
    res.status(500).json({ message: err.message });
  }
});

// Remove a favorite item
router.delete('/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const favoriteItem = await FavoriteItem.findOneAndDelete({ itemId });

    if (!favoriteItem) {
      return res.status(404).json({ message: 'Favorite item not found' });
    }

    res.json({ message: 'Favorite item removed' });
  } catch (err) {
    console.error('Error removing favorite item:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
