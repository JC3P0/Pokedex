const mongoose = require('mongoose');

const favoriteItemSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  }
});

module.exports = mongoose.model('FavoriteItem', favoriteItemSchema);
