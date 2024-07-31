// src/utils/PokemonToggleHandlers.js

// Function to show all Pokemon by setting the active category to 'all' and resetting other state values
export const toggleShowAllPokemon = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('all'); // Set the active category to 'all'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 1 Pokemon by setting the active category to 'gen1' and resetting other state values
export const toggleShowGen1 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen1'); // Set the active category to 'gen1'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 2 Pokemon by setting the active category to 'gen2' and resetting other state values
export const toggleShowGen2 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen2'); // Set the active category to 'gen2'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 3 Pokemon by setting the active category to 'gen3' and resetting other state values
export const toggleShowGen3 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen3'); // Set the active category to 'gen3'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 4 Pokemon by setting the active category to 'gen4' and resetting other state values
export const toggleShowGen4 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen4'); // Set the active category to 'gen4'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 5 Pokemon by setting the active category to 'gen5' and resetting other state values
export const toggleShowGen5 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen5'); // Set the active category to 'gen5'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 6 Pokemon by setting the active category to 'gen6' and resetting other state values
export const toggleShowGen6 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen6'); // Set the active category to 'gen6'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 7 Pokemon by setting the active category to 'gen7' and resetting other state values
export const toggleShowGen7 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen7'); // Set the active category to 'gen7'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 8 Pokemon by setting the active category to 'gen8' and resetting other state values
export const toggleShowGen8 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen8'); // Set the active category to 'gen8'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show Gen 9 Pokemon by setting the active category to 'gen9' and resetting other state values
export const toggleShowGen9 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen9'); // Set the active category to 'gen9'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to toggle the display of favorite Pokemon
export const toggleShowPokemonFavorites = ({ setShowFavorites, setActivePokemonCategory, setActiveItemCategory }) => {
    setShowFavorites(prev => !prev); // Toggle the favorites flag
    setActivePokemonCategory(''); // Reset the active Pokemon category
    setActiveItemCategory(''); // Reset the active item category
};
