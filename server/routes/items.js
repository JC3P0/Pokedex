const express = require('express'); // Import Express for routing
const router = express.Router(); // Create a new router object
const Item = require('../models/Item'); // Import the Item model

// Route to get all items or items by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query; // Get the category query parameter from the request
    let query = {};
    if (category) {
      // If a category is provided, build a query to filter items by category
      query = { 'category.name': category };
    }
    const items = await Item.find(query); // Fetch items from the database based on the query
    res.json(items); // Return the fetched items as JSON
  } catch (err) {
    console.error('Error fetching items:', err); // Log any errors
    res.status(500).json({ message: err.message }); // Return a 500 status with the error message
  }
});

// Route to get a single item by ID or name
router.get('/:query', async (req, res) => {
  try {
    const query = req.params.query; // Get the query parameter from the request URL
    let item;
    if (isNaN(query)) {
      // If the query is not a number, search by name
      item = await Item.findOne({ name: query.toLowerCase() });
    } else {
      // If the query is a number, search by ID
      item = await Item.findOne({ id: query });
    }
    if (!item) {
      return res.status(404).json({ message: 'Item not found' }); // Return a 404 status if the item is not found
    }
    res.json(item); // Return the found item as JSON
  } catch (err) {
    console.error('Error fetching item:', err); // Log any errors
    res.status(500).json({ message: err.message }); // Return a 500 status with the error message
  }
});

module.exports = router; // Export the router to be used in other parts of the application
