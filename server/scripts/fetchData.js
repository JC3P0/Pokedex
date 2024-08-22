const axios = require('axios');
const mongoose = require('mongoose');
const Pokemon = require('../models/Pokemon');
const Item = require('../models/Item');
const dotenv = require('dotenv');

dotenv.config();

// Connect to the MongoDB database using connection string from environment variables
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Function to fetch and save Pokémon data from the PokéAPI to MongoDB
const fetchPokemonData = async () => {
    try {
        let url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
        while (url) {
            const response = await axios.get(url);
            const pokemons = response.data.results;

            for (const pokemon of pokemons) {
                const pokemonDetails = await axios.get(pokemon.url);
                const data = pokemonDetails.data;

                const existingPokemon = await Pokemon.findOne({ id: data.id });
                if (existingPokemon) {
                    console.log(`Pokemon ${data.name} already exists in the database`);
                    continue;
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

                await newPokemon.save();
                console.log(`Saved ${newPokemon.name}`);
            }

            url = response.data.next;

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
        let url = 'https://pokeapi.co/api/v2/item?limit=100';
        while (url) {
            const response = await axios.get(url);
            const items = response.data.results;

            for (const item of items) {
                const itemDetails = await axios.get(item.url);
                const data = itemDetails.data;

                if (!data.id || !data.name) {
                    console.warn(`Item with invalid data: ${JSON.stringify(data)}`);
                    continue;
                }

                const existingItem = await Item.findOne({ id: data.id });
                if (existingItem) {
                    console.log(`Item ${data.name} already exists in the database`);
                    continue;
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

                await newItem.save();
                console.log(`Saved item ${newItem.name}`);
            }

            url = response.data.next;

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
    await fetchPokemonData();
    await fetchItems();
    mongoose.connection.close();
};

fetchData();
