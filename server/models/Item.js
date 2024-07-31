// server/models/Item.js

const mongoose = require('mongoose'); // Import mongoose for creating and interacting with MongoDB schemas

// Define the schema for an Item document
const itemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // Unique ID for the item, required
    name: { type: String, required: true }, // Name of the item, required
    cost: { type: Number }, // Cost of the item
    fling_power: { type: Number }, // Fling power of the item
    fling_effect: {
        name: { type: String }, // Name of the fling effect
        url: { type: String } // URL to the fling effect details
    },
    attributes: [{
        name: { type: String }, // Name of the attribute
        url: { type: String } // URL to the attribute details
    }],
    category: {
        name: { type: String }, // Name of the category
        url: { type: String } // URL to the category details
    },
    effect: { type: String }, // Effect of the item
    short_effect: { type: String }, // Short effect description of the item
    language: {
        name: { type: String }, // Language of the effect description
        url: { type: String } // URL to the language details
    },
    text: { type: String }, // Flavor text of the item
    version_group: {
        name: { type: String }, // Name of the version group
        url: { type: String } // URL to the version group details
    },
    game_index: { type: Number }, // Game index of the item
    generation: {
        name: { type: String }, // Name of the generation
        url: { type: String } // URL to the generation details
    },
    sprites: {
        default: { type: String } // URL to the default sprite of the item
    },
    held_by: [{
        name: { type: String }, // Name of the Pokémon that holds the item
        url: { type: String } // URL to the Pokémon details
    }],
    evolution_chain: {
        url: { type: String } // URL to the evolution chain details
    }
});

// Create a model for Item using the defined schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item; // Export the Item model to be used in other parts of the application
