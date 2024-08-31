import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseLayout from '../utils/BaseLayout';
import renderPokemonCategory from '../utils/renderPokemonCategory';
import renderItemCategory from '../utils/renderItemCategory';
import { checkCacheAndRedirect } from '../utils/checkCacheAndRedirect';
import { getPokemonFavoritesFromIndexedDB, getItemFavoritesFromIndexedDB, togglePokemonFavoriteInIndexedDB, toggleItemFavoriteInIndexedDB } from '../utils/indexedDB';
import PreviewPage from '../styles/PreviewPage.module.css';
import '../styles/ItemsPage.css';

const FavoritesPage = () => {
  const [favoritePokemon, setFavoritePokemon] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      await checkCacheAndRedirect(navigate, null, null); // Check both items and Pokémon

      const pokemonFavorites = await getPokemonFavoritesFromIndexedDB();
      const itemFavorites = await getItemFavoritesFromIndexedDB();

      setFavoritePokemon(pokemonFavorites);
      setFavoriteItems(itemFavorites);
    };

    fetchFavorites();
  }, [navigate]);

  const handleNavigate = (id, isPokemon) => {
    navigate(isPokemon ? `/pokemon/${id}` : `/items/${id}`);
  };
  
  const toggleFavoritePokemon = async (id, pokemon) => {
    await togglePokemonFavoriteInIndexedDB(id, pokemon);
    const updatedFavorites = await getPokemonFavoritesFromIndexedDB();
    setFavoritePokemon(updatedFavorites);
  }; 

  const toggleFavoriteItem = async (id, item) => {
    await toggleItemFavoriteInIndexedDB(id, item);
    const updatedFavorites = await getItemFavoritesFromIndexedDB();
    setFavoriteItems(updatedFavorites);
  };

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
            favorites: favoritePokemon,
            handleNavigate: (id) => handleNavigate(id, true),
            toggleFavorite: toggleFavoritePokemon,
          })}
        </div>
        
        <h2>Items</h2>
        <div className="item-list">
          {renderItemCategory({
            showCategory: null,
            showFavorites: true,
            items: favoriteItems,
            activeItemCategory: null,
            itemsFavorites: favoriteItems,
            handleNavigate: (id) => handleNavigate(id, false),
            toggleItemFavorite: toggleFavoriteItem,
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default FavoritesPage;
