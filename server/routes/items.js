const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Route to get all items or items by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query = { 'category.name': category };
    }
    const items = await Item.find(query);
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/:query', async (req, res) => {
  try {
    const query = req.params.query;
    let item;
    if (isNaN(query)) {
      item = await Item.findOne({ name: query.toLowerCase() });
    } else {
      item = await Item.findOne({ id: query });
    }
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    console.error('Error fetching item:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
