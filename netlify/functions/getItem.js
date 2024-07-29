const mongoose = require('mongoose');
const Item = require('../../server/models/Item'); // Adjust path as needed

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;
  const page = parseInt(event.queryStringParameters.page) || 1;
  const limit = parseInt(event.queryStringParameters.limit) || 100; // Set a limit of 100 items per page

  try {
    let item;
    if (query) {
      if (isNaN(query)) {
        item = await Item.findOne({ name: query.toLowerCase() });
      } else {
        item = await Item.findOne({ id: query });
      }
      if (!item) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Item not found' }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify([item]),
      };
    } else {
      const category = event.queryStringParameters.category;
      const query = category ? { 'category.name': category } : {};
      const skip = (page - 1) * limit;
      const items = await Item.find(query).skip(skip).limit(limit);
      const total = await Item.countDocuments(query);
      return {
        statusCode: 200,
        body: JSON.stringify({
          items,
          total,
          page,
          pages: Math.ceil(total / limit)
        }),
      };
    }
  } catch (err) {
    console.error('Error fetching item:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
