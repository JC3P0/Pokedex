// src/utils/ItemToggleHandlers.js

// Function to toggle the display of favorite items
export const toggleShowFavorites = ({ setShowFavorites, setActiveItemCategory, ...setters }) => {
    setShowFavorites(prev => !prev);
    setActiveItemCategory(''); 
};

export const toggleShowPokeBalls = ({ setShowPokeBalls, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('pokeballs');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowMedicalItems = ({ setShowMedicalItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('medical');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowAllItems = ({ setShowAllItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('all');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowBattleItems = ({ setShowBattleItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('battle');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowLoot = ({ setShowLoot, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('loot');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowBerries = ({ setShowBerries, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('berries');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowEvolutionItems = ({ setShowEvolutionItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('evolution');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowTMsHMsTRs = ({ setShowTMsHMsTRs, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('tms');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowHeldItems = ({ setShowHeldItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('held');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowValuableItems = ({ setShowValuableItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('valuable');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowIngredients = ({ setShowIngredients, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('ingredients');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowKeyItems = ({ setShowKeyItems, setActiveItemCategory, ...setters }) => {
    setActiveItemCategory('key');
    Object.keys(setters).forEach(key => setters[key](false));
};

// Function to filter unique items from an array of items
export const uniqueItems = (itemsArray) => {
    const unique = [];
    const itemIds = new Set();
    itemsArray.forEach(item => {
        if (!itemIds.has(item.id)) {
            itemIds.add(item.id);
            unique.push(item);
        }
    });
    return unique;
};
