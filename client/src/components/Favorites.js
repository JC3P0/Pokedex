// src/components/Favorites.js
import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      {favorites.map((f, index) => (
        <div key={index}>
          {f.isPokemon ? (
            <div>{f.item.name}</div>
          ) : (
            <div>{f.item.name}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Favorites;
