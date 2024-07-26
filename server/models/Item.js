// server/models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    cost: { type: Number },
    fling_power: { type: Number },
    fling_effect: {
        name: { type: String },
        url: { type: String }
    },
    attributes: [{
        name: { type: String },
        url: { type: String }
    }],
    category: {
        name: { type: String },
        url: { type: String }
    },
    effect: { type: String },
    short_effect: { type: String },
    language: {
        name: { type: String },
        url: { type: String }
    },
    text: { type: String },
    version_group: {
        name: { type: String },
        url: { type: String }
    },
    game_index: { type: Number },
    generation: {
        name: { type: String },
        url: { type: String }
    },
    sprites: {
        default: { type: String }
    },
    held_by: [{
        name: { type: String },
        url: { type: String }
    }],
    evolution_chain: {
        url: { type: String }
    }
});

module.exports = mongoose.model('Item', itemSchema);
