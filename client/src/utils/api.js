import axios from 'axios'; // Import axios for making HTTP requests

// Create an axios instance with a base URL depending on the environment
const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/.netlify/functions' : 'http://localhost:3001/api'
});

// Function to fetch paginated data from a given URL
const fetchPaginatedData = async (url, limit = 100) => {
    let allData = []; // Initialize an array to store all fetched data
    let page = 1; // Start with the first page
    let totalPages = 1; // Initialize total pages

    // Loop through all pages until all data is fetched
    while (page <= totalPages) {
        try {
            const response = await api.get(`${url}?page=${page}&limit=${limit}`); // Make GET request to fetch data
            const data = response.data; // Extract data from the response
            allData = allData.concat(data.items || data.pokemon); // Concatenate the new data to the existing array
            totalPages = data.pages; // Update the total pages
            page++; // Increment the page number
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error); // Log any errors
            throw error; // Throw the error to be handled by the caller
        }
    }
    return allData; // Return the concatenated data
};

// Function to fetch all Pokémon
export const fetchPokemon = async () => {
    return await fetchPaginatedData('/getPokemon'); // Fetch paginated Pokémon data
};

// Function to fetch a Pokémon by its ID
export const fetchPokemonById = async (id) => {
    try {
        const response = await api.get(`/getPokemon?query=${id}`); // Make GET request to fetch Pokémon by ID
        return response.data; // Return the Pokémon data
    } catch (error) {
        console.error('Error fetching Pokémon by ID:', error); // Log any errors
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to fetch all items
export const fetchItems = async () => {
    return await fetchPaginatedData('/getItem'); // Fetch paginated item data
};

// Function to fetch an item by its ID
export const fetchItemById = async (id) => {
    try {
        const response = await api.get(`/getItem?query=${id}`); // Make GET request to fetch item by ID
        return response.data; // Return the item data
    } catch (error) {
        console.error('Error fetching Item by ID:', error); // Log any errors
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to search Pokémon by a search term
export const searchPokemon = async (searchTerm) => {
    try {
        const response = await api.get(`/getPokemon?query=${searchTerm}`); // Make GET request to search Pokémon
        return response.data; // Return the search results
    } catch (error) {
        console.error('Error searching Pokémon:', error); // Log any errors
        throw error; // Throw the error to be handled by the caller
    }
};

// Function to toggle the favorite status of an entity (Pokémon or item)
export const toggleFavorite = async (id, entity) => {
    try {
        // Placeholder for any API request to save/remove the favorite on a server if needed
    } catch (error) {
        console.error('Error toggling favorite:', error); // Log any errors
        throw error; // Throw the error to be handled by the caller
    }
};
