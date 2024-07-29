import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/.netlify/functions' : 'http://localhost:3001/api'
});

const fetchPaginatedData = async (url, limit = 100) => {
    let allData = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
        try {
            const response = await api.get(`${url}?page=${page}&limit=${limit}`);
            const data = response.data;
            allData = allData.concat(data.items || data.pokemon);
            totalPages = data.pages;
            page++;
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            throw error;
        }
    }
    return allData;
};

export const fetchPokemon = async () => {
    return await fetchPaginatedData('/getPokemon');
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
    return await fetchPaginatedData('/getItem');
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
