// src/utils/ItemToggleHandlers.js

// Function to toggle the display of favorite items
export const toggleShowFavorites = ({ setShowFavorites, setActiveItemCategory, ...setters }) => {
    setShowFavorites(prev => !prev); // Toggle the favorites flag
    setActiveItemCategory(''); // Reset the active item category
    // Object.keys(setters).forEach(key => setters[key](false)); // Commented out, possibly to reset other state values
};

// Function to show Poké Balls by setting the active category to 'pokeballs' and resetting other state values
export const toggleShowPokeBalls = ({ setShowPokeBalls, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('pokeballs'); // Set the active category to 'pokeballs'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show medical items by setting the active category to 'medical' and resetting other state values
export const toggleShowMedicalItems = ({ setShowMedicalItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('medical'); // Set the active category to 'medical'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show all items by setting the active category to 'all' and resetting other state values
export const toggleShowAllItems = ({ setShowAllItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('all'); // Set the active category to 'all'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show battle items by setting the active category to 'battle' and resetting other state values
export const toggleShowBattleItems = ({ setShowBattleItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('battle'); // Set the active category to 'battle'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show loot items by setting the active category to 'loot' and resetting other state values
export const toggleShowLoot = ({ setShowLoot, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('loot'); // Set the active category to 'loot'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show berries by setting the active category to 'berries' and resetting other state values
export const toggleShowBerries = ({ setShowBerries, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('berries'); // Set the active category to 'berries'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show evolution items by setting the active category to 'evolution' and resetting other state values
export const toggleShowEvolutionItems = ({ setShowEvolutionItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('evolution'); // Set the active category to 'evolution'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show TMs, HMs, and TRs by setting the active category to 'tms' and resetting other state values
export const toggleShowTMsHMsTRs = ({ setShowTMsHMsTRs, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('tms'); // Set the active category to 'tms'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show held items by setting the active category to 'held' and resetting other state values
export const toggleShowHeldItems = ({ setShowHeldItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('held'); // Set the active category to 'held'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show valuable items by setting the active category to 'valuable' and resetting other state values
export const toggleShowValuableItems = ({ setShowValuableItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('valuable'); // Set the active category to 'valuable'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show ingredients by setting the active category to 'ingredients' and resetting other state values
export const toggleShowIngredients = ({ setShowIngredients, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('ingredients'); // Set the active category to 'ingredients'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to show key items by setting the active category to 'key' and resetting other state values
export const toggleShowKeyItems = ({ setShowKeyItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('key'); // Set the active category to 'key'
    Object.keys(setters).forEach(key => setters[key](false)); // Reset other state values
};

// Function to filter unique items from an array of items
export const uniqueItems = (itemsArray) => {
    const unique = [];
    const itemIds = new Set();
    itemsArray.forEach(item => {
        if (!itemIds.has(item.id)) {
            itemIds.add(item.id); // Add item ID to the set if it is not already present
            unique.push(item); // Add the item to the unique array
        }
    });
    return unique; // Return the array of unique items
};
