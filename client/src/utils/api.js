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

export const fetchPokemonById = async (id) => {
    try {
        const response = await api.get(`/pokemon/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error);
        throw error;
    }
};

export const fetchItems = async () => {
    try {
        const response = await api.get('/items');
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

export const fetchItemById = async (id) => {
    try {
        const response = await api.get(`/items/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching item by ID:', error);
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

export const toggleFavorite = async (id, entity) => {
    try {
        // You can add any API request here to save/remove the favorite on a server if needed.
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
};
