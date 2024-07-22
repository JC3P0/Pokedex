import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetail.css';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShiny, setIsShiny] = useState(false);
  const navigate = useNavigate();

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

  const statNames = {
    hp: "HP",
    attack: "ATT",
    defense: "DEF",
    "special-attack": "SPATK",
    "special-defense": "SPDEF",
    speed: "SPD"
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokemon:', error);
        setError(error);
        setLoading(false);
      });

    axios.get('http://localhost:3001/api/favorites')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => console.error('Error fetching favorites:', error));
  }, [id]);

  const toggleFavorite = () => {
    const isFavorite = favorites.some(f => f.pokemonId.id === parseInt(id));
    const url = `http://localhost:3001/api/favorites/${id}`;
    const method = isFavorite ? 'DELETE' : 'POST';

    axios({ method, url })
      .then(() => {
        const newFavorites = isFavorite
          ? favorites.filter(f => f.pokemonId.id !== parseInt(id))
          : [...favorites, { pokemonId: { id: parseInt(id), name: pokemon.name } }];
        setFavorites(newFavorites);
      })
      .catch(error => console.error('Error toggling favorite:', error));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleImage = () => {
    setIsShiny(!isShiny);
  };

  const convertWeightKgToLbs = (weightKg) => {
    return Math.round(weightKg * 2.20462);
  };

  const convertHeightMToFtIn = (heightM) => {
    const totalInches = heightM * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return inches === 12 ? `${feet + 1}'0"` : `${feet}'${inches}"`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details: {error.message}</div>;

  const type1 = pokemon.types && pokemon.types[0]?.name;
  const type2 = pokemon.types && pokemon.types[1]?.name;
  const typeColor1 = typeColors[type1] || '#f0f0f0';
  const maxStat = Math.max(...pokemon.stats.map(stat => stat.base_stat));

  const weightKg = pokemon.weight / 10;
  const heightM = pokemon.height / 10;

  const weightLbs = convertWeightKgToLbs(weightKg);
  const heightFtIn = convertHeightMToFtIn(heightM);

  return (
    <div className="pokemon-detail">
      <div className="detail-card" style={{ backgroundColor: typeColor1 }}>
        <span className="pokemon-id">#{pokemon.id}</span>
        <button className="favorite-button" onClick={toggleFavorite}>
          {favorites.some(f => f.pokemonId.id === parseInt(id)) ? '❤️' : '♡'}
        </button>
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <button className="toggle-image-button" onClick={toggleImage}>
          {isShiny ? 'Normal' : 'Shiny'}
        </button>
        <h1 className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</h1>
        <img className="pokemon-image" src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} alt={pokemon.name} />
        <div className="base-experience">
          Base Exp {pokemon.base_experience}
        </div>
        <div className="pokemon-types">
          {type1 && <span className="pokemon-type" style={{ backgroundColor: typeColors[type1] }}>{capitalizeFirstLetter(type1)}</span>}
          {type2 && <span className="pokemon-type" style={{ backgroundColor: typeColors[type2], marginLeft: '10px' }}>{capitalizeFirstLetter(type2)}</span>}
        </div>
        <div className="pokemon-measurements-container">
          <div className="measurement">
            <div className="measurement-value">{heightFtIn}</div>
            <div className="measurement-label">Height</div>
          </div>
          <div className="base-stats-title">Base Stats</div>
          <div className="measurement">
            <div className="measurement-value">{weightLbs} lbs</div>
            <div className="measurement-label">Weight</div>
          </div>
        </div>
        <div className="pokemon-stats">
          {pokemon.stats.map((stat, index) => (
            <div key={index} className="stat">
              <span className="stat-name">{statNames[stat.name]}</span>
              <div className="stat-bar" data-value={stat.base_stat}>
                <div
                  className="stat-bar-fill"
                  style={{ width: `${(stat.base_stat / maxStat) * 100}%` }}
                >
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
