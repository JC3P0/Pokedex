const express = require('express'); // Import Express for routing
const router = express.Router(); // Create a new router object
const Pokemon = require('../models/Pokemon'); // Import the Pokemon model

// Route to get all Pokemon
router.get('/', async (req, res) => {
    try {
        const pokemon = await Pokemon.find(); // Fetch all Pokemon from the database
        res.json(pokemon); // Return the fetched Pokemon as JSON
    } catch (err) {
        console.error('Error fetching all Pokemon:', err); // Log any errors
        res.status(500).json({ message: err.message }); // Return a 500 status with the error message
    }
});

// Route to get a single Pokemon by ID or name
router.get('/:query', async (req, res) => {
    try {
        const query = req.params.query; // Get the query parameter from the request URL
        let pokemon;
        if (isNaN(query)) {
            // If the query is not a number, search by name
            pokemon = await Pokemon.findOne({ name: query.toLowerCase() });
        } else {
            // If the query is a number, search by ID
            pokemon = await Pokemon.findOne({ id: query });
        }
        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon not found' }); // Return a 404 status if the Pokemon is not found
        }
        res.json(pokemon); // Return the found Pokemon as JSON
    } catch (err) {
        console.error('Error fetching Pokemon:', err); // Log any errors
        res.status(500).json({ message: err.message }); // Return a 500 status with the error message
    }
});

module.exports = router; // Export the router to be used in other parts of the application
