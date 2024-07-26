// src/utils/ItemToggleHandlers.js
export const toggleShowFavorites = ({ setShowFavorites, setActiveItemCategory, ...setters }) => {
    setShowFavorites(prev => !prev);
    setActiveItemCategory('');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowPokeBalls = ({ setShowPokeBalls, setActiveItemCategory, ...setters }) => {
    setShowPokeBalls(prev => !prev);
    setActiveItemCategory('pokeballs');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowMedicalItems = ({ setShowMedicalItems, setActiveItemCategory, ...setters }) => {
    setShowMedicalItems(prev => !prev);
    setActiveItemCategory('medical');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowAllItems = ({ setShowAllItems, setActiveItemCategory, ...setters }) => {
    setShowAllItems(prev => !prev);
    setActiveItemCategory('all');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowBattleItems = ({ setShowBattleItems, setActiveItemCategory, ...setters }) => {
    setShowBattleItems(prev => !prev);
    setActiveItemCategory('battle');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowLoot = ({ setShowLoot, setActiveItemCategory, ...setters }) => {
    setShowLoot(prev => !prev);
    setActiveItemCategory('loot');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowBerries = ({ setShowBerries, setActiveItemCategory, ...setters }) => {
    setShowBerries(prev => !prev);
    setActiveItemCategory('berries');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowEvolutionItems = ({ setShowEvolutionItems, setActiveItemCategory, ...setters }) => {
    setShowEvolutionItems(prev => !prev);
    setActiveItemCategory('evolution');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowTMsHMsTRs = ({ setShowTMsHMsTRs, setActiveItemCategory, ...setters }) => {
    setShowTMsHMsTRs(prev => !prev);
    setActiveItemCategory('tms');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowHeldItems = ({ setShowHeldItems, setActiveItemCategory, ...setters }) => {
    setShowHeldItems(prev => !prev);
    setActiveItemCategory('held');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowValuableItems = ({ setShowValuableItems, setActiveItemCategory, ...setters }) => {
    setShowValuableItems(prev => !prev);
    setActiveItemCategory('valuable');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowIngredients = ({ setShowIngredients, setActiveItemCategory, ...setters }) => {
    setShowIngredients(prev => !prev);
    setActiveItemCategory('ingredients');
    Object.keys(setters).forEach(key => setters[key](false));
};

export const toggleShowKeyItems = ({ setShowKeyItems, setActiveItemCategory, ...setters }) => {
    setShowKeyItems(prev => !prev);
    setActiveItemCategory('key');
    Object.keys(setters).forEach(key => setters[key](false));
};

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
