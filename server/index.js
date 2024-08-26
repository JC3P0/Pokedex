const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const pokemonRoutes = require('./routes/pokemon');
const itemsRoutes = require('./routes/items');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the MongoDB database using connection string from environment variables
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Use the imported routes for handling requests to /api/pokemon and /api/items
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/items', itemsRoutes);

// Start the server and listen on port 3001
app.listen(3001, () => console.log('Server Started on port 3001'));
