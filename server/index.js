const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const pokemonRoutes = require('./routes/pokemon');
const favoritesRoutes = require('./routes/favorites');
const itemsRoutes = require('./routes/items'); // Add this line
const favoriteItemsRoutes = require('./routes/favoriteItems'); // Add this line

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use('/api/pokemon', pokemonRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/items', itemsRoutes); // Add this line
app.use('/api/favoriteItems', favoriteItemsRoutes); // Add this line

app.listen(3001, () => console.log('Server Started on port 3001'));
