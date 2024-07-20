
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/favorites')
      .then(response => setFavorites(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {favorites.map(f => (
        <div key={f.pokemonId._id}>{f.pokemonId.name}</div>
      ))}
    </div>
  );
};

export default Favorites;
