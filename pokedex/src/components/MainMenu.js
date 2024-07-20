import React, { useState, useEffect } from 'react';
import './MainMenu.css';
import axios from 'axios';

const MainMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showPokemon, setShowPokemon] = useState(true);
  const [showFavorites, setShowFavorites] = useState(true);

  useEffect(() => {
    // Fetch all Pokémon and favorites
    axios.get('http://localhost:3001/api/pokemon')
      .then(response => {
        console.log('Pokemon data:', response.data);
        setPokemon(response.data);
      })
      .catch(error => console.error('Error fetching Pokemon:', error));

    axios.get('http://localhost:3001/api/favorites')
      .then(response => {
        console.log('Favorites data:', response.data);
        setFavorites(response.data);
      })
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3001/api/pokemon/${searchTerm}`)
      .then(response => {
        console.log('Search result:', response.data);
        setPokemon([response.data]);
      })
      .catch(error => console.error('Error fetching Pokemon:', error));
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
      <div className="tabs">
        <div className="tab left-tab">
          <h2>Pokémon</h2>
          {showPokemon && (
            <div className="pokemon-list">
              {pokemon.map(p => (
                <div key={p._id} className={`pokemon-card ${p.types[0]?.type?.name}`}>
                  <img src={p.sprites.front_default} alt={p.name} />
                  <p>{p.name}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => setShowPokemon(!showPokemon)}>
            {showPokemon ? 'Hide Pokémon' : 'Show Pokémon'}
          </button>
        </div>
        <div className="tab right-tab">
          <h2>Favorites</h2>
          {showFavorites && (
            <div className="favorites-list">
              {favorites.map(f => (
                <div key={f._id} className="pokemon-card">
                  <img src={f.pokemonId.sprites.front_default} alt={f.pokemonId.name} />
                  <p>{f.pokemonId.name}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => setShowFavorites(!showFavorites)}>
            {showFavorites ? 'Hide Favorites' : 'Show Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
