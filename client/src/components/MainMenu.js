import React, { useState, useEffect } from 'react';
import './MainMenu.css';
import axios from 'axios';

const MainMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showPokemon, setShowPokemon] = useState(true);

  const typeColors = {
    normal: "#A4A4A4",
    fire: "#FFA07A",
    fighting: "#C66F39",
    water: "#539AD4",
    flying: "#4866AC",
    grass: "#52A938",
    poison: "#7C57A1",
    electric: "#FFD700",
    ground: "#DEB887",
    psychic: "#FF69B4",
    rock: "#B8860B",
    ice: "#ADD8E6",
    bug: "#9A70AE",
    dragon: "#6A5ACD",
    ghost: "#4B0082",
    dark: "#0B0E0F",
    steel: "#C0C0C0",
    fairy: "#FFC0CB"
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/pokemon')
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => console.error('Error fetching Pokemon:', error));

    axios.get('http://localhost:3001/api/favorites')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3001/api/pokemon/${searchTerm}`)
      .then(response => {
        setPokemon([response.data]);
      })
      .catch(error => console.error('Error fetching Pokemon:', error));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleFavorite = (id) => {
    const isFavorite = favorites.some(f => f.pokemonId.id === id);
    const url = `http://localhost:3001/api/favorites/${id}`;
    const method = isFavorite ? 'DELETE' : 'POST';

    axios({ method, url })
      .then(() => {
        const newFavorites = isFavorite
          ? favorites.filter(f => f.pokemonId.id !== id)
          : [...favorites, { pokemonId: pokemon.find(p => p.id === id) }];
        setFavorites(newFavorites);
      })
      .catch(error => console.error('Error toggling favorite:', error));
  };

  return (
    <div className="main-menu">
      <img src="/path/to/pokedex-image.png" alt="Pokedex" className="pokedex-image" />
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search Pokémon by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="content">
        <h2>{showPokemon ? 'Pokémon' : 'Favorites'}</h2>
        <button onClick={() => setShowPokemon(!showPokemon)}>
          {showPokemon ? 'Show Favorites' : 'Show Pokémon'}
        </button>
        <div className="pokemon-list">
          {(showPokemon ? pokemon : favorites.map(f => f.pokemonId).sort((a, b) => a.id - b.id)).map(p => {
            const type1 = p.types && p.types[0]?.name;
            const type2 = p.types && p.types[1]?.name;
            const typeColor1 = typeColors[type1] || '#f0f0f0';
            const typeColor2 = type2 ? (typeColors[type2] || '#f0f0f0') : null;
            return (
              <div key={p._id} className={`pokemon-card ${type1}`}>
                <div className="card-header">
                  <span className="pokemon-id">#{p.id}</span>
                  <button className="favorite-button" onClick={() => toggleFavorite(p.id)}>
                    {favorites.some(f => f.pokemonId.id === p.id) ? '❤️' : '♡'}
                  </button>
                </div>
                <img src={p.sprites.front_default} alt={p.name} />
                <p className="pokemon-name">{capitalizeFirstLetter(p.name)}</p>
                <div className="pokemon-types">
                  <span className="pokemon-type" style={{ backgroundColor: typeColor1 }}>{capitalizeFirstLetter(type1)}</span>
                  {type2 && <span className="pokemon-type" style={{ backgroundColor: typeColor2 }}>{capitalizeFirstLetter(type2)}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
