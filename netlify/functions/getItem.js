const mongoose = require('mongoose'); // Import mongoose for interacting with MongoDB
const Item = require('../../server/models/Item'); // Import the Item model

// Connect to the MongoDB database using connection string from environment variables
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query; // Get the query parameter from the request
  const page = parseInt(event.queryStringParameters.page) || 1; // Get the page parameter or default to 1
  const limit = parseInt(event.queryStringParameters.limit) || 100; // Set a limit of 100 items per page or use the provided limit

  try {
    let item;
    if (query) {
      // If a query is provided, search for a specific item by name or ID
      if (isNaN(query)) {
        item = await Item.findOne({ name: query.toLowerCase() }); // Search by name (case insensitive)
      } else {
        item = await Item.findOne({ id: query }); // Search by ID
      }
      if (!item) {
        // Return a 404 status if the item is not found
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Item not found' }),
        };
      }
      // Return the found item
      return {
        statusCode: 200,
        body: JSON.stringify([item]),
      };
    } else {
      // If no query is provided, return a paginated list of items
      const category = event.queryStringParameters.category; // Get the category parameter from the request
      const query = category ? { 'category.name': category } : {}; // Build the query object based on the category
      const skip = (page - 1) * limit; // Calculate the number of documents to skip
      const items = await Item.find(query).skip(skip).limit(limit); // Fetch the items with pagination
      const total = await Item.countDocuments(query); // Get the total number of item documents matching the query
      // Return the paginated list of items and pagination details
      return {
        statusCode: 200,
        body: JSON.stringify({
          items,
          total,
          page,
          pages: Math.ceil(total / limit),
        }),
      };
    }
  } catch (err) {
    console.error('Error fetching item:', err); // Log any errors
    // Return a 500 status with the error message
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
