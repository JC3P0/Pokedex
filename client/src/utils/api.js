import axios from 'axios';

// Create an axios instance with a base URL depending on the environment
const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/.netlify/functions' : 'http://localhost:8888/.netlify/functions'
});

// Function to fetch paginated data from a given URL
const fetchPaginatedData = async (url, limit = 100) => {
    let allData = [];
    let page = 1;
    let totalPages = 1;

    // Loop through all pages until all data is fetched
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

// Function to fetch a Pokémon by its ID
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

// Function to fetch an item by its ID
export const fetchItemById = async (id) => {
    try {
        const response = await api.get(`/getItem?query=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Item by ID:', error);
        throw error;
    }
};

// Function to search Pokémon by a search term
export const searchPokemon = async (searchTerm) => {
    try {
        const response = await api.get(`/getPokemon?query=${searchTerm}`);
        return response.data;
    } catch (error) {
        console.error('Error searching Pokémon:', error);
        throw error;
    }
};

// Function to toggle the favorite status of an entity (Pokémon or item)
export const toggleFavorite = async (id, entity) => {
    try {
        // Placeholder for any API request to save/remove the favorite on a server if needed
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw error;
    }
};
