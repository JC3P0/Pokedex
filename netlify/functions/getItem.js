const mongoose = require('mongoose');
const Item = require('../../server/models/Item'); // Adjust path as needed

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;
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
    } else {
      const category = event.queryStringParameters.category;
      const items = await Item.find(category ? { 'category.name': category } : {});
      return {
        statusCode: 200,
        body: JSON.stringify(items),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (err) {
    console.error('Error fetching item:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
