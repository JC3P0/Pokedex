const mongoose = require('mongoose'); // Import mongoose for creating and interacting with MongoDB schemas

// Define the schema for a Pokemon document
const pokemonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Unique ID for the Pokemon, required
    name: { type: String, required: true }, // Name of the Pokemon, required
    base_experience: { type: Number, required: true }, // Base experience of the Pokemon, required
    height: { type: Number, required: true }, // Height of the Pokemon, required
    weight: { type: Number, required: true }, // Weight of the Pokemon, required
    sprites: {
        front_default: { type: String }, // URL to the default front sprite
        back_default: { type: String }, // URL to the default back sprite
        front_shiny: { type: String }, // URL to the shiny front sprite
        back_shiny: { type: String }, // URL to the shiny back sprite
    },
    abilities: [{
        name: { type: String }, // Name of the ability
        url: { type: String } // URL to the ability details
    }],
    types: [{
        name: { type: String }, // Name of the type
        url: { type: String } // URL to the type details
    }],
    moves: [{
        name: { type: String }, // Name of the move
        url: { type: String } // URL to the move details
    }],
    stats: [{
        base_stat: { type: Number }, // Base value of the stat
        name: { type: String } // Name of the stat
    }]
});

// Create a model for Pokemon using the defined schema
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon; // Export the Pokemon model to be used in other parts of the application
