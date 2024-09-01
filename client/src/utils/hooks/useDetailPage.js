// src/utils/hooks/useDetailPage.js
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemonByIdFromIndexedDB, getItemByIdFromIndexedDB, togglePokemonFavoriteInIndexedDB, toggleItemFavoriteInIndexedDB, getPokemonFavoritesFromIndexedDB, getItemFavoritesFromIndexedDB } from '../indexedDB';

const useDetailPage = (type) => {
  const { id } = useParams();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (type === 'pokemon') {
          data = await getPokemonByIdFromIndexedDB(id);
        } else if (type === 'item') {
          data = await getItemByIdFromIndexedDB(id);
        }

        if (!data) {
          throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} not found in IndexedDB`);
        }

        setEntity(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        setError(error);
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        let favoritesData;
        if (type === 'pokemon') {
          favoritesData = await getPokemonFavoritesFromIndexedDB();
        } else if (type === 'item') {
          favoritesData = await getItemFavoritesFromIndexedDB();
        }
        setFavorites(favoritesData);
      } catch (error) {
        console.error(`Error fetching favorites:`, error);
      }
    };

    fetchData();
    fetchFavorites();
  }, [id, type]);

  const toggleFavorite = async (_id, entity) => {
    if (type === 'pokemon') {
      await togglePokemonFavoriteInIndexedDB(_id, entity);
      setFavorites(await getPokemonFavoritesFromIndexedDB());
    } else if (type === 'item') {
      await toggleItemFavoriteInIndexedDB(_id, entity);
      setFavorites(await getItemFavoritesFromIndexedDB());
    }
  };

  return {
    entity,
    loading,
    error,
    favorites,
    toggleFavorite,
    navigate,
  };
};

export default useDetailPage;
