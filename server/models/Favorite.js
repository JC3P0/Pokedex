
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    pokemonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
