const mongoose = require('mongoose');
const Pokemon = require('../../server/models/Pokemon'); // Adjust path as needed

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;
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
    } else {
      pokemon = await Pokemon.find();
    }
    return {
      statusCode: 200,
      body: JSON.stringify(pokemon),
    };
  } catch (err) {
    console.error('Error fetching Pokemon:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
