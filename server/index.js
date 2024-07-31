const express = require('express'); // Import Express for creating the server
const mongoose = require('mongoose'); // Import mongoose for interacting with MongoDB
const cors = require('cors'); // Import CORS middleware for enabling Cross-Origin Resource Sharing
const dotenv = require('dotenv'); // Import dotenv for environment variables
const pokemonRoutes = require('./routes/pokemon'); // Import routes for Pokemon
const itemsRoutes = require('./routes/items'); // Import routes for items

dotenv.config(); // Load environment variables from a .env file

const app = express(); // Create an Express application
app.use(cors()); // Use CORS middleware to allow cross-origin requests
app.use(express.json()); // Use middleware to parse JSON bodies

// Connect to the MongoDB database using connection string from environment variables
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error)); // Log connection errors
db.once('open', () => console.log('Connected to Database')); // Confirm connection to database

// Use the imported routes for handling requests to /api/pokemon and /api/items
app.use('/api/pokemon', pokemonRoutes);
app.use('/api/items', itemsRoutes); // Include items routes

// Start the server and listen on port 3001
app.listen(3001, () => console.log('Server Started on port 3001'));
