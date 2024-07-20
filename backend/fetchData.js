
const axios = require('axios');
const mongoose = require('mongoose');
const Pokemon = require('./models/Pokemon');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const fetchPokemonData = async () => {
    try {
        for (let i = 1; i <= 151; i++) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = response.data;
            const pokemon = new Pokemon({
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

            await pokemon.save();
            console.log(`Saved ${pokemon.name}`);
        }
        console.log('All data fetched and saved!');
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        mongoose.connection.close();
    }
};

fetchPokemonData();
