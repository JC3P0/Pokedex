const mongoose = require('mongoose'); // Import mongoose for interacting with MongoDB
const Pokemon = require('../../server/models/Pokemon'); // Import the Pokemon model

// Connect to the MongoDB database using connection string from environment variables
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query; // Get the query parameter from the request
  const page = parseInt(event.queryStringParameters.page) || 1; // Get the page parameter or default to 1
  const limit = parseInt(event.queryStringParameters.limit) || 100; // Set a limit of 100 Pokémon per page or use the provided limit

  try {
    let pokemon;
    if (query) {
      // If a query is provided, search for a specific Pokémon by name or ID
      if (isNaN(query)) {
        pokemon = await Pokemon.findOne({ name: query.toLowerCase() }); // Search by name (case insensitive)
      } else {
        pokemon = await Pokemon.findOne({ id: query }); // Search by ID
      }
      if (!pokemon) {
        // Return a 404 status if the Pokémon is not found
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Pokemon not found' }),
        };
      }
      // Return the found Pokémon
      return {
        statusCode: 200,
        body: JSON.stringify([pokemon]),
      };
    } else {
      // If no query is provided, return a paginated list of Pokémon
      const skip = (page - 1) * limit; // Calculate the number of documents to skip
      pokemon = await Pokemon.find().skip(skip).limit(limit); // Fetch the Pokémon with pagination
      const total = await Pokemon.countDocuments(); // Get the total number of Pokémon documents
      // Return the paginated list of Pokémon and pagination details
      return {
        statusCode: 200,
        body: JSON.stringify({
          pokemon,
          total,
          page,
          pages: Math.ceil(total / limit),
        }),
      };
    }
  } catch (err) {
    console.error('Error fetching Pokemon:', err); // Log any errors
    // Return a 500 status with the error message
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
