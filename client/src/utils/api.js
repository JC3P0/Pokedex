import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/.netlify/functions' : 'http://localhost:3001/api'
});

export const fetchPokemon = async () => {
    try {
        const response = await api.get('/getPokemon');
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
};

export const fetchPokemonById = async (id) => {
    try {
        const response = await api.get(`/getPokemon?query=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error);
        throw error;
    }
};

export const fetchItems = async () => {
    try {
        const response = await api.get('/getItem');
        return response.data;
    } catch (error) {
        console.error('Error fetching Items:', error);
        throw error;
    }
};

export const fetchItemById = async (id) => {
    try {
        const response = await api.get(`/getItem?query=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Item by ID:', error);
        throw error;
    }
};

export const searchPokemon = async (searchTerm) => {
    try {
        const response = await api.get(`/getPokemon?query=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error searching Pokémon:', error);
        throw error;
    }
};

export const toggleFavorite = async (id, entity) => {
    try {
        // You can add any API request here to save/remove the favorite on a server if needed.
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
};
