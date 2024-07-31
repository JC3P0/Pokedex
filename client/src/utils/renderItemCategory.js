import React from 'react';
import capitalizeFirstLetter from './capitalizeFirstLetter'; // Import utility to capitalize the first letter

// Function to render the item category based on active category or favorites
const renderItemCategory = ({
    showCategory, // Flag to show items by category
    showFavorites, // Flag to show favorite items
    items, // List of all items
    activeItemCategory, // Currently active item category
    toggleItemFavorite, // Function to toggle favorite status
    itemsFavorites, // List of favorite items
    handleNavigate, // Function to navigate to an item's detail page
}) => {
    // If no category is active and favorites are not to be shown, return null
    if (!showCategory && !showFavorites) return null;

    // Filter items based on the active category or favorites
    const filteredItems = showFavorites
        ? items.filter(i => itemsFavorites.some(f => f.id === i.id)) // Show only favorite items
        : items.filter(i => {
            // Filter items based on the active category
            switch (activeItemCategory) {
                case 'pokeballs':
                    return ['standard-balls', 'special-balls', 'apricorn-balls'].includes(i.category.name);
                case 'medical':
                    return ['healing', 'revival', 'status-cures', 'vitamins', 'pp-recovery', 'flutes', 'species-candies'].includes(i.category.name);
                case 'battle':
                    return ['stat-boosts', 'spelunking', 'vitamins'].includes(i.category.name);
                case 'loot':
                    return i.category.name === 'loot';
                case 'berries':
                    return ['effort-drop', 'other', 'in-a-pinch', 'picky-healing', 'type-protection', 'mulch', 'catching-bonus'].includes(i.category.name);
                case 'evolution':
                    return ['evolution', 'tera-shard'].includes(i.category.name);
                case 'tms':
                    return i.category.name === 'all-machines';
                case 'held':
                    return ['held-items', 'choice', 'effort-training', 'bad-held-items', 'training', 'species-specific', 'type-enhancement', 'all-mail', 'scarves', 'jewels', 'mega-stones', 'memories', 'z-crystals'].includes(i.category.name);
                case 'valuable':
                    return ['collectibles', 'loot', 'dex-completion'].includes(i.category.name);
                case 'ingredients':
                    return ['curry-ingredients', 'sandwich-ingredients', 'baking-only', 'mulch', 'apricorn-box', 'tm-materials', 'picnic'].includes(i.category.name);
                case 'key':
                    return ['plates', 'event-items', 'gameplay', 'plot-advancement', 'unused', 'data-cards', 'miracle-shooter'].includes(i.category.name);
                case 'all':
                default:
                    return true;
            }
        });

    // Map through the filtered items and render each one
    return filteredItems.map(i => (
        <div key={i.id} className="item-card" onClick={() => handleNavigate(i.id)}>
            <div className="card-header">
                <span className="item-id">#{i.id}</span>
                <button className="favorite-button" onClick={(e) => { e.stopPropagation(); toggleItemFavorite(i._id, i); }}>
                    {itemsFavorites.some(f => f._id === i._id) ? '❤️' : '♡'}
                </button>
            </div>
            {i.sprites && i.sprites.default && (
                <img src={i.sprites.default} alt={i.name} />
            )}
            <p className="item-name">{capitalizeFirstLetter(i.name)}</p>
        </div>
    ));
};

export default renderItemCategory; // Export the function for use in other parts of the application
