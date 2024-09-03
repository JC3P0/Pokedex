// src/utils/hooks/usePreview.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getItemsFromIndexedDB,
  getPokemonFromIndexedDB,
  getItemFavoritesFromIndexedDB,
  getPokemonFavoritesFromIndexedDB,
  toggleItemFavoriteInIndexedDB,
  togglePokemonFavoriteInIndexedDB,
} from '../indexedDB';

const usePreview = (type) => {
  const [entities, setEntities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (type === 'item') {
        const items = await getItemsFromIndexedDB();
        setEntities(items);
        setFavorites(await getItemFavoritesFromIndexedDB());
      } else if (type === 'pokemon') {
        const pokemon = await getPokemonFromIndexedDB();
        setEntities(pokemon);
        setFavorites(await getPokemonFavoritesFromIndexedDB());
      }
    };

    fetchData();
  }, [type]);

  const handleNavigate = (id) => {
    navigate(`/${type === 'item' ? 'items' : 'pokemon'}/${id}`);
  };

  const toggleFavorite = async (_id, entity) => {
    if (type === 'item') {
      await toggleItemFavoriteInIndexedDB(_id, entity);
      setFavorites(await getItemFavoritesFromIndexedDB());
    } else if (type === 'pokemon') {
      await togglePokemonFavoriteInIndexedDB(_id, entity);
      setFavorites(await getPokemonFavoritesFromIndexedDB());
    }
  };

  const toggleShowCategory = (category) => {
    setActiveCategory(category);
  };

  return {
    entities,
    favorites,
    activeCategory,
    handleNavigate,
    toggleFavorite,
    toggleShowCategory,
  };
};

export default usePreview;
