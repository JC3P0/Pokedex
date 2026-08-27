const mongoose = require('mongoose');
const dns = require('dns');

// Netlify Functions run on AWS Lambda; point at public DNS to avoid the SRV
// lookup issues documented in the other functions in this folder.
dns.setServers(['8.8.8.8', '8.8.4.4']);

// This is a public URL like any other Netlify function, not just an internal
// cron job, so it's worth gatekeeping even though all it does is ping the
// database. Netlify's own scheduled invocation sends a JSON body containing
// `next_run` - anything else needs to present the shared secret instead.
function isAuthorized(event) {
  try {
    const body = event.body ? JSON.parse(event.body) : null;
    if (body && body.next_run) return true;
  } catch {
    // not JSON / no body - fall through to the secret check
  }

  const provided =
    (event.headers && (event.headers['x-keepalive-secret'] || event.headers['X-Keepalive-Secret'])) ||
    (event.queryStringParameters && event.queryStringParameters.secret);

  return Boolean(process.env.KEEPALIVE_SECRET) && provided === process.env.KEEPALIVE_SECRET;
}

// Runs on a schedule (see netlify.toml) purely to keep an active connection
// on the MongoDB Atlas free-tier cluster, which auto-pauses after 30 days
// with zero connections. A weekly ping is comfortably under that threshold.
//
// Reuses the existing DATABASE_URL, which already connects as Atlas's
// read-only 'reader' user - this connection can never write or delete
// anything, so there's no need for a second, separate credential here.
exports.handler = async (event) => {
  if (!isAuthorized(event)) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
    };
  }

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
