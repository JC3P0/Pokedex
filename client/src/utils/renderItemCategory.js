// src/utils/renderItemCategory.js
import React from 'react';
import capitalizeFirstLetter from './capitalizeFirstLetter';

const renderItemCategory = ({
    showCategory,
    items,
    filter,
    toggleItemFavorite,
    itemsFavorites,
}) => {
    if (!showCategory) return null;

    return items.filter(filter).map(i => (
        <div key={i.id} className="item-card">
            <div className="card-header">
                <span className="item-id">#{i.id}</span>
                <button className="favorite-button" onClick={(e) => { e.stopPropagation(); toggleItemFavorite(i.id, i); }}>
                    {itemsFavorites.some(f => f.itemId.id === i.id) ? '❤️' : '♡'}
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
