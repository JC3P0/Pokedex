import React from 'react';
import BaseLayout from '../utils/BaseLayout';
import renderPokemonCategory from '../utils/renderPokemonCategory';
import renderItemCategory from '../utils/renderItemCategory';
import usePreview from '../utils/hooks/usePreview';
import PreviewPage from '../styles/PreviewPage.module.css';

const FavoritesPage = () => {
  const {
    entities: favoritePokemon,
    favorites: pokemonFavorites,
    handleNavigate: handleNavigatePokemon,
    toggleFavorite: toggleFavoritePokemon,
  } = usePreview('pokemon');

  const {
    entities: favoriteItems,
    favorites: itemFavorites,
    handleNavigate: handleNavigateItem,
    toggleFavorite: toggleFavoriteItem,
  } = usePreview('item');

  return (
    <BaseLayout>
      <h2>Favorites</h2>
      <div className={PreviewPage.previewContainer}>
        <h2>Pokémon</h2>
        <div className={PreviewPage.previewList}>
          {renderPokemonCategory({
            activePokemonCategory: null,
            showFavorites: true,
            pokemon: favoritePokemon,
            favorites: pokemonFavorites,
            handleNavigate: (id) => handleNavigatePokemon(id),
            toggleFavorite: toggleFavoritePokemon,
          })}
        </div>

        <h2>Items</h2>
        <div className={PreviewPage.previewList}>
          {renderItemCategory({
            showCategory: null,
            showFavorites: true,
            items: favoriteItems,
            activeItemCategory: null,
            itemsFavorites: itemFavorites,
            handleNavigate: (id) => handleNavigateItem(id),
            toggleItemFavorite: toggleFavoriteItem,
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default FavoritesPage;
