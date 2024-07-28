import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PokemonDetail.css';
import { getPokemonByIdFromIndexedDB, getPokemonFavoritesFromIndexedDB, togglePokemonFavoriteInIndexedDB } from '../utils/indexedDB';
import typeColors from '../utils/typeColors';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShiny, setIsShiny] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const statNames = {
    hp: "HP",
    attack: "ATT",
    defense: "DEF",
    "special-attack": "SPATK",
    "special-defense": "SPDEF",
    speed: "SPD"
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonByIdFromIndexedDB(id);
        if (!data) {
          throw new Error("Pokemon not found in IndexedDB");
        }
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setError(error);
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const favoritesData = await getPokemonFavoritesFromIndexedDB();
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchPokemon();
    fetchFavorites();
  }, [id]);

  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
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

  const toggleFavorite = async (_id, entity) => {
    await togglePokemonFavoriteInIndexedDB(_id, entity);
    const updatedFavorites = await getPokemonFavoritesFromIndexedDB();
    setFavorites(updatedFavorites);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details: {error.message}</div>;

  const type1 = pokemon.types && pokemon.types[0]?.name;
  const type2 = pokemon.types && pokemon.types[1]?.name;
  const typeColor1 = typeColors[type1] || '#f0f0f0';
  const typeColor2 = type2 ? typeColors[type2] : null;
  const typeColor3 = '#f0f0f0';

  const backgroundColor = typeColor1;
  const backgroundImage = type2
    ? `linear-gradient(30deg, ${typeColor2} 12%, transparent 12.5%, transparent 87%, ${typeColor2} 87.5%, ${typeColor2}), 
       linear-gradient(150deg, ${typeColor2} 12%, transparent 12.5%, transparent 87%, ${typeColor2} 87.5%, ${typeColor2}), 
       linear-gradient(30deg, ${typeColor2} 12%, transparent 12.5%, transparent 87%, ${typeColor2} 87.5%, ${typeColor2}), 
       linear-gradient(150deg, ${typeColor2} 12%, transparent 12.5%, transparent 87%, ${typeColor2} 87.5%, ${typeColor2}), 
       linear-gradient(60deg, ${typeColor2}77 25%, transparent 25.5%, transparent 75%, ${typeColor2}77 75%, ${typeColor2}77), 
       linear-gradient(60deg, ${typeColor2}77 25%, transparent 25.5%, transparent 75%, ${typeColor2}77 75%, ${typeColor2}77)`
    : `linear-gradient(30deg, ${typeColor3} 12%, transparent 12.5%, transparent 87%, ${typeColor3} 87.5%, ${typeColor3}), 
       linear-gradient(150deg, ${typeColor3} 12%, transparent 12.5%, transparent 87%, ${typeColor3} 87.5%, ${typeColor3}), 
       linear-gradient(30deg, ${typeColor3} 12%, transparent 12.5%, transparent 87%, ${typeColor3} 87.5%, ${typeColor3}), 
       linear-gradient(150deg, ${typeColor3} 12%, transparent 12.5%, transparent 87%, ${typeColor3} 87.5%, ${typeColor3}), 
       linear-gradient(60deg, ${typeColor3}77 25%, transparent 25.5%, transparent 75%, ${typeColor3}77 75%, ${typeColor3}77), 
       linear-gradient(60deg, ${typeColor3}77 25%, transparent 25.5%, transparent 75%, ${typeColor3}77 75%, ${typeColor3}77)`;

  const maxStat = Math.max(...pokemon.stats.map(stat => stat.base_stat));

  const weightKg = pokemon.weight / 10;
  const heightM = pokemon.height / 10;

  const weightLbs = convertWeightKgToLbs(weightKg);
  const heightFtIn = convertHeightMToFtIn(heightM);

  return (
    <div className="pokemon-detail">
      <div 
        className="detail-card" 
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: backgroundImage,
          opacity: 0.8,
          backgroundSize: '20px 35px',
          backgroundPosition: '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px'
        }}
      >
        <span className="pokemon-id">#{pokemon.id}</span>
        <button className="favorite-button" onClick={() => toggleFavorite(pokemon._id, pokemon)}>
          {favorites.some(f => f._id === pokemon._id) ? '❤️' : '♡'}
        </button>
        <button className="back-button" onClick={() => navigate('/', { state: { tab: 'pokemon' } })}>
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
