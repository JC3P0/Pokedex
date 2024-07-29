const mongoose = require('mongoose');
const Pokemon = require('../../server/models/Pokemon'); // Adjust path as needed

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;
  const page = parseInt(event.queryStringParameters.page) || 1;
  const limit = parseInt(event.queryStringParameters.limit) || 100; // Set a limit of 100 Pokémon per page

  try {
    let pokemon;
    if (query) {
      if (isNaN(query)) {
        pokemon = await Pokemon.findOne({ name: query.toLowerCase() });
      } else {
        pokemon = await Pokemon.findOne({ id: query });
      }
      if (!pokemon) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Pokemon not found' }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify([pokemon]),
      };
    } else {
      const skip = (page - 1) * limit;
      pokemon = await Pokemon.find().skip(skip).limit(limit);
      const total = await Pokemon.countDocuments();
      return {
        statusCode: 200,
        body: JSON.stringify({
          pokemon,
          total,
          page,
          pages: Math.ceil(total / limit)
        }),
      };
    }
  } catch (err) {
    console.error('Error fetching Pokemon:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
