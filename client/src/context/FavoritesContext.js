// src/context/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from '../config';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('http://localhost:3001/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (id, pokemon) => {
    const isFavorite = favorites.some(f => f.pokemonId.id === id);
    const url = `http://localhost:3001/api/favorites/${id}`;
    const method = isFavorite ? 'DELETE' : 'POST';

    try {
      await api({ method, url });
      const updatedFavorites = isFavorite
        ? favorites.filter(f => f.pokemonId.id !== id)
        : [...favorites, { pokemonId: pokemon }];
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
