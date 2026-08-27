const mongoose = require('mongoose');
const dns = require('dns');

// Netlify Functions run on AWS Lambda; point at public DNS to avoid the SRV
// lookup issues documented in the other functions in this folder.
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Runs on a schedule (see netlify.toml) purely to keep an active connection
// on the MongoDB Atlas free-tier cluster, which auto-pauses after 30 days
// with zero connections. A weekly ping is comfortably under that threshold.
exports.handler = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE_URL, {});
    }
    await mongoose.connection.db.admin().ping();
    console.log('Keep-alive ping succeeded at', new Date().toISOString());
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'ok', timestamp: new Date().toISOString() }),
    };
  } catch (err) {
    console.error('Keep-alive ping failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }
};
