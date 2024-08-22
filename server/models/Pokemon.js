const mongoose = require('mongoose');

// Define the schema for a Pokemon document
const pokemonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    base_experience: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    sprites: {
        front_default: { type: String },
        back_default: { type: String },
        front_shiny: { type: String },
        back_shiny: { type: String },
    },
    abilities: [{
        name: { type: String },
        url: { type: String }
    }],
    types: [{
        name: { type: String },
        url: { type: String }
    }],
    moves: [{
        name: { type: String },
        url: { type: String }
    }],
    stats: [{
        base_stat: { type: Number },
        name: { type: String }
    }]
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
