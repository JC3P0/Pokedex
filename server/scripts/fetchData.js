const axios = require('axios'); // Import axios for making HTTP requests
const mongoose = require('mongoose'); // Import mongoose for interacting with MongoDB
const Pokemon = require('../models/Pokemon'); // Import the Pokemon model
const Item = require('../models/Item'); // Import the Item model
const dotenv = require('dotenv'); // Import dotenv for environment variables

dotenv.config(); // Load environment variables from a .env file

// Connect to the MongoDB database using connection string from environment variables
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error)); // Log connection errors
db.once('open', () => console.log('Connected to Database')); // Confirm connection to database

// Function to fetch and save Pokémon data from the PokéAPI to MongoDB
const fetchPokemonData = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'; // Initial URL to fetch first batch of Pokémon
        while (url) {
            const response = await axios.get(url); // Fetch data from the API
            const pokemons = response.data.results; // Extract Pokémon list from response

            for (const pokemon of pokemons) {
                const pokemonDetails = await axios.get(pokemon.url); // Fetch detailed data for each Pokémon
                const data = pokemonDetails.data;

                const existingPokemon = await Pokemon.findOne({ id: data.id }); // Check if Pokémon already exists in the database
                if (existingPokemon) {
                    console.log(`Pokemon ${data.name} already exists in the database`);
                    continue; // Skip saving if Pokémon exists
                }

                // Create a new Pokémon document using the fetched data
                const newPokemon = new Pokemon({
                    id: data.id,
                    name: data.name,
                    base_experience: data.base_experience,
                    height: data.height,
                    weight: data.weight,
                    sprites: {
                        front_default: data.sprites.front_default,
                        back_default: data.sprites.back_default,
                        front_shiny: data.sprites.front_shiny,
                        back_shiny: data.sprites.back_shiny,
                    },
                    abilities: data.abilities.map(ability => ({
                        name: ability.ability.name,
                        url: ability.ability.url
                    })),
                    types: data.types.map(type => ({
                        name: type.type.name,
                        url: type.type.url
                    })),
                    moves: data.moves.map(move => ({
                        name: move.move.name,
                        url: move.move.url
                    })),
                    stats: data.stats.map(stat => ({
                        base_stat: stat.base_stat,
                        name: stat.stat.name
                    }))
                });

                await newPokemon.save(); // Save the new Pokémon to the database
                console.log(`Saved ${newPokemon.name}`);
            }

            url = response.data.next; // Get the URL for the next batch of Pokémon

            // Adding a delay to prevent rate limit issues
            if (url) {
                await new Promise(resolve => setTimeout(resolve, 200)); // 200ms delay
            }
        }

        console.log('All Pokémon data fetched and saved!');
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
};

// Function to fetch and save item data from the PokéAPI to MongoDB
const fetchItems = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/item?limit=100'; // Initial URL to fetch first batch of items
        while (url) {
            const response = await axios.get(url); // Fetch data from the API
            const items = response.data.results; // Extract item list from response

            for (const item of items) {
                const itemDetails = await axios.get(item.url); // Fetch detailed data for each item
                const data = itemDetails.data;

                if (!data.id || !data.name) {
                    console.warn(`Item with invalid data: ${JSON.stringify(data)}`);
                    continue; // Skip saving if item data is invalid
                }

                const existingItem = await Item.findOne({ id: data.id }); // Check if item already exists in the database
                if (existingItem) {
                    console.log(`Item ${data.name} already exists in the database`);
                    continue; // Skip saving if item exists
                }

                // Create a new item document using the fetched data
                const newItem = new Item({
                    id: data.id,
                    name: data.name,
                    cost: data.cost,
                    fling_power: data.fling_power,
                    fling_effect: data.fling_effect ? { name: data.fling_effect.name, url: data.fling_effect.url } : {},
                    attributes: data.attributes ? data.attributes.map(attr => ({ name: attr.name, url: attr.url })) : [],
                    category: data.category ? { name: data.category.name, url: data.category.url } : {},
                    effect: data.effect_entries && data.effect_entries.length > 0 ? data.effect_entries[0].effect : '',
                    short_effect: data.effect_entries && data.effect_entries.length > 0 ? data.effect_entries[0].short_effect : '',
                    language: data.effect_entries && data.effect_entries.length > 0 ? { name: data.effect_entries[0].language.name, url: data.effect_entries[0].language.url } : {},
                    text: data.flavor_text_entries && data.flavor_text_entries.length > 0 ? data.flavor_text_entries[0].text : '',
                    version_group: data.flavor_text_entries && data.flavor_text_entries.length > 0 ? { name: data.flavor_text_entries[0].version_group.name, url: data.flavor_text_entries[0].version_group.url } : {},
                    game_index: data.game_index,
                    generation: data.generation ? { name: data.generation.name, url: data.generation.url } : {},
                    sprites: data.sprites ? { default: data.sprites.default } : {},
                    held_by: data.held_by_pokemon ? data.held_by_pokemon.map(hp => ({ name: hp.pokemon.name, url: hp.pokemon.url })) : [],
                    evolution_chain: data.evolution_chain ? { url: data.evolution_chain.url } : {}
                });

                await newItem.save(); // Save the new item to the database
                console.log(`Saved item ${newItem.name}`);
            }

            url = response.data.next; // Get the URL for the next batch of items

            // Adding a delay to prevent rate limit issues
            if (url) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1000ms delay
            }
        }

        console.log('All item data fetched and saved!');
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

// Function to fetch both Pokémon and item data
const fetchData = async () => {
    await fetchPokemonData(); // Fetch and save Pokémon data
    await fetchItems(); // Fetch and save item data
    mongoose.connection.close(); // Close the database connection
};

fetchData(); // Run the fetchData function
