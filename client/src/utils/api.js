// src/utils/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api'
});

export const fetchPokemon = async () => {
    try {
        const response = await api.get('/pokemon');
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};

export const searchPokemon = async (searchTerm) => {
    try {
        const response = await api.get(`/pokemon/${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};
