import React from 'react';
import capitalizeFirstLetter from './capitalizeFirstLetter';

const renderItemCategory = ({
    showCategory,
    showFavorites,
    items,
    activeItemCategory,
    toggleItemFavorite,
    itemsFavorites,
    handleNavigate,
}) => {
    if (!showCategory && !showFavorites) return null;

    const filteredItems = showFavorites
        ? items.filter(i => itemsFavorites.some(f => f.id === i.id))
        : items.filter(i => {
            switch (activeItemCategory) {
                case 'pokeballs':
                    return i.category.name === 'standard-balls' || i.category.name === 'special-balls' || i.category.name === 'apricorn-balls';
                case 'medical':
                    return i.category.name === 'healing' || i.category.name === 'revival' || i.category.name === 'status-cures' || i.category.name === 'vitamins' || i.category.name === 'pp-recovery' || i.category.name === 'flutes' || i.category.name === 'species-candies';
                case 'battle':
                    return i.category.name === 'stat-boosts' || i.category.name === 'spelunking' || i.category.name === 'vitamins';
                case 'loot':
                    return i.category.name === 'loot';
                case 'berries':
                    return i.category.name === 'effort-drop' || i.category.name === 'other' || i.category.name === 'in-a-pinch' || i.category.name === 'picky-healing' || i.category.name === 'type-protection' || i.category.name === 'mulch' || i.category.name === 'catching-bonus';
                case 'evolution':
                    return i.category.name === 'evolution' || i.category.name === 'tera-shard';
                case 'tms':
                    return i.category.name === 'all-machines';
                case 'held':
                    return i.category.name === 'held-items' || i.category.name === 'choice' || i.category.name === 'effort-training' || i.category.name === 'bad-held-items' || i.category.name === 'training' || i.category.name === 'species-specific' || i.category.name === 'type-enhancement' || i.category.name === 'all-mail' || i.category.name === 'scarves' || i.category.name === 'jewels' || i.category.name === 'mega-stones' || i.category.name === 'memories' || i.category.name === 'z-crystals';
                case 'valuable':
                    return i.category.name === 'collectibles' || i.category.name === 'loot' || i.category.name === 'dex-completion';
                case 'ingredients':
                    return i.category.name === 'curry-ingredients' || i.category.name === 'sandwich-ingredients' || i.category.name === 'baking-only' || i.category.name === 'mulch' || i.category.name === 'apricorn-box' || i.category.name === 'tm-materials' || i.category.name === 'picnic';
                case 'key':
                    return i.category.name === 'plates' || i.category.name === 'event-items' || i.category.name === 'gameplay' || i.category.name === 'plot-advancement' || i.category.name === 'unused' || i.category.name === 'data-cards' || i.category.name === 'miracle-shooter';
                case 'all':
                default:
                    return true;
            }
        });

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

export default renderItemCategory;
