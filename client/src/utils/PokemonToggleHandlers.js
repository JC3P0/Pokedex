// src/utils/PokemonToggleHandlers.js

// Function to show all Pokemon by setting the active category to 'all' and resetting other state values
export const toggleShowAllPokemon = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('all');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen1 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen1');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen2 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen2');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen3 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen3');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen4 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen4');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen5 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen5');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen6 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen6');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen7 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen7');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen8 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen8');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowGen9 = ({ setActivePokemonCategory, ...setters }) => {
    setActivePokemonCategory('gen9');
    Object.keys(setters).forEach(key => setters[key](false));
};

// Function to toggle the display of favorite Pokemon
export const toggleShowPokemonFavorites = ({ setShowFavorites, setActivePokemonCategory, setActiveItemCategory }) => {
    setShowFavorites(prev => !prev);
    setActivePokemonCategory('');
    setActiveItemCategory('');
};
