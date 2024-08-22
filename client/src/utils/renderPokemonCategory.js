import React from 'react';
import typeColors from './typeColors';
import capitalizeFirstLetter from './capitalizeFirstLetter';

// Function to render the Pokemon category based on active category or favorites
const renderPokemonCategory = ({
    activePokemonCategory,
    showFavorites,
    favorites,
    toggleFavorite,
    pokemon,
    handleNavigate,
}) => {
    // If no category is active and favorites are not to be shown, return null
    if (!activePokemonCategory && !showFavorites) return null;

    // Filter Pokemon based on the active category or favorites
    const filteredPokemon = showFavorites
        ? pokemon.filter(p => favorites.some(f => f.id === p.id))
        : activePokemonCategory
        ? pokemon.filter(p => {
            // Filter Pokemon based on the active generation category
            switch (activePokemonCategory) {
                case 'gen1':
                    return p.id <= 151;
                case 'gen2':
                    return p.id > 151 && p.id <= 251;
                case 'gen3':
                    return p.id > 251 && p.id <= 386;
                case 'gen4':
                    return p.id > 386 && p.id <= 493;
                case 'gen5':
                    return p.id > 493 && p.id <= 649;
                case 'gen6':
                    return p.id > 649 && p.id <= 721;
                case 'gen7':
                    return p.id > 721 && p.id <= 809;
                case 'gen8':
                    return p.id > 809 && p.id <= 898;
                case 'gen9':
                    return p.id > 898;
                case 'all':
                default:
                    return true;
            }
        })
        : [];

    // Map through the filtered Pokemon and render each one
    return filteredPokemon.map(p => {
        if (!p) return null;
        const type1 = p.types && p.types[0]?.name;
        const type2 = p.types && p.types[1]?.name;
        const typeColor1 = typeColors[type1] || '#f0f0f0';
        const typeColor2 = type2 ? (typeColors[type2] || '#f0f0f0') : null;

        // Render the Pokemon card
        return (
            <div key={p.id} className={`pokemon-card ${type1}`} onClick={() => handleNavigate(p.id)}>
                <div className="card-header">
                    <span className="pokemon-id">#{p.id}</span>
                    <button className="favorite-button" onClick={(e) => { e.stopPropagation(); toggleFavorite(p._id, p); }}>
                        {favorites.some(f => f._id === p._id) ? '❤️' : '♡'}
                    </button>
                </div>
                {p.sprites && p.sprites.front_default && (
                    <img src={p.sprites.front_default} alt={p.name} />
                )}
                <p className="pokemon-name">{capitalizeFirstLetter(p.name)}</p>
                <div className="pokemon-types">
                    <span className="pokemon-type" style={{ backgroundColor: typeColor1 }}>{capitalizeFirstLetter(type1)}</span>
                    {type2 && <span className="pokemon-type" style={{ backgroundColor: typeColor2 }}>{capitalizeFirstLetter(type2)}</span>}
                </div>
            </div>
        );
    });
};

export default renderPokemonCategory;
