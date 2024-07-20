// backend/routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Pokemon = require('../models/Pokemon');

// Get all favorites
router.get('/', async (req, res) => {
    try {
        const favorites = await Favorite.find().populate('pokemonId');
        res.json(favorites);
    } catch (err) {
        console.error('Error fetching favorites:', err);
        res.status(500).json({ message: err.message });
    }
});

// Add to favorites by numerical ID
router.post('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ id: req.params.id });
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        const favorite = new Favorite({ pokemonId: pokemon._id });
        await favorite.save();
        res.status(201).json(favorite);
    } catch (err) {
        console.error('Error adding to favorites:', err);
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
