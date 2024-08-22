const express = require('express');
const router = express.Router();
const Pokemon = require('../models/Pokemon');

// Route to get all Pokemon
router.get('/', async (req, res) => {
    try {
        const pokemon = await Pokemon.find();
        res.json(pokemon);
    } catch (err) {
        console.error('Error fetching all Pokemon:', err);
        res.status(500).json({ message: err.message });
    }
});

// Route to get a single Pokemon by ID or name
router.get('/:query', async (req, res) => {
    try {
        const query = req.params.query;
        let pokemon;
        if (isNaN(query)) {
            pokemon = await Pokemon.findOne({ name: query.toLowerCase() });
        } else {
            pokemon = await Pokemon.findOne({ id: query });
        }
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' });
        }
        res.json(pokemon);
    } catch (err) {
        console.error('Error fetching Pokemon:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
