const mongoose = require('mongoose');
const dns = require('dns');

// Netlify Functions run on AWS Lambda, where the default DNS resolver can
// fail to resolve the SRV records that mongodb+srv:// connection strings
// depend on (Error: querySrv ENOTFOUND). Pointing explicitly at public DNS
// servers works around that.
dns.setServers(['8.8.8.8', '8.8.4.4']);
const Pokemon = require('../../server/models/Pokemon');

mongoose.connect(process.env.DATABASE_URL, {}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;
  const page = parseInt(event.queryStringParameters.page) || 1;
  const limit = parseInt(event.queryStringParameters.limit) || 100;

  try {
    let pokemon;
    if (query) {
      // If a query is provided, search for a specific Pokémon by name or ID
      if (isNaN(query)) {
        pokemon = await Pokemon.findOne({ name: query.toLowerCase() });
      } else {
        pokemon = await Pokemon.findOne({ id: query });
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
      const skip = (page - 1) * limit;
      pokemon = await Pokemon.find().skip(skip).limit(limit);
      const total = await Pokemon.countDocuments();
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
    console.error('Error fetching Pokemon:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
