import React from 'react';
import capitalizeFirstLetter from './capitalizeFirstLetter';
import { getImageOrPlaceholder } from '../utils/getImageOrPlaceholder';
import preview from '../styles/PreviewPage.module.css';

// Function to render the item category based on active category or favorites
const renderItemCategory = ({
    showCategory,
    showFavorites,
    items,
    activeItemCategory,
    toggleItemFavorite,
    itemsFavorites,
    handleNavigate,
}) => {
    // If no category is active and favorites are not to be shown, return null
    if (!showCategory && !showFavorites) return null;

    // Filter items based on the active category or favorites
    const filteredItems = showFavorites
        ? items.filter(i => itemsFavorites.some(f => f.id === i.id))
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
        <div key={i.id} className={preview.previewCard} onClick={() => handleNavigate(i.id)}>
            <span className={preview.previewId}>#{i.id}</span>
            <button className={`${preview.previewFavoriteButton} ${itemsFavorites.some(f => f._id === i._id) ? preview.active : ''}`} onClick={(e) => { e.stopPropagation(); toggleItemFavorite(i._id, i); }}>
                {itemsFavorites.some(f => f._id === i._id) ? '❤️' : '♡'}
            </button>
            <img src={getImageOrPlaceholder(i.sprites?.default)} alt={i.name} style={{ width: '75px' }}/>
            <p className={preview.previewName}>{capitalizeFirstLetter(i.name)}</p>
        </div>
    ));
};

export default renderItemCategory;
