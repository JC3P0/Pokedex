import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import detail from '../styles/PokemonDetail.module.css';
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

  // Mapping of stat names for display
  const statNames = {
    hp: "HP",
    attack: "ATT",
    defense: "DEF",
    "special-attack": "SPATK",
    "special-defense": "SPDEF",
    speed: "SPD"
  };

  useEffect(() => {
    // Function to fetch Pokémon data from IndexedDB
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

    // Function to fetch favorite Pokémon from IndexedDB
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

  // Utility function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  };

  // Function to toggle between shiny and normal sprite
  const toggleImage = () => {
    setIsShiny(!isShiny);
  };

  // Function to convert weight from kilograms to pounds
  const convertWeightKgToLbs = (weightKg) => {
    return Math.round(weightKg * 2.20462);
  };

  // Function to convert height from meters to feet and inches
  const convertHeightMToFtIn = (heightM) => {
    const totalInches = heightM * 39.3701;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return inches === 12 ? `${feet + 1}'0"` : `${feet}'${inches}"`;
  };

  // Function to toggle the favorite status of a Pokémon
  const toggleFavorite = async (_id, entity) => {
    await togglePokemonFavoriteInIndexedDB(_id, entity);
    const updatedFavorites = await getPokemonFavoritesFromIndexedDB();
    setFavorites(updatedFavorites);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details: {error.message}</div>;

  const type1 = pokemon.types && pokemon.types[0]?.name; // Primary type of the Pokémon
  const type2 = pokemon.types && pokemon.types[1]?.name; // Secondary type of the Pokémon, if any
  const typeColor1 = typeColors[type1]; // Color for the primary type
  const typeColor2 = type2 ? typeColors[type2] : '#2a3439'; // Color for the secondary type, if any
  const baseColor1 = typeColor1; // Assign the first type color to one cube face
  const baseColor2 = typeColor2; // Assign the second type color to the other cube face
  
  // Set background color and gradient based on Pokémon types
  const backgroundImage = `linear-gradient(30deg, ${baseColor1} 12%, transparent 12.5%, transparent 87%, ${baseColor1} 87.5%, ${baseColor1}),
  linear-gradient(150deg, ${baseColor1} 12%, transparent 12.5%, transparent 87%, ${baseColor1} 87.5%, ${baseColor1}),
  linear-gradient(30deg, ${baseColor1} 12%, transparent 12.5%, transparent 87%, ${baseColor1} 87.5%, ${baseColor1}),
  linear-gradient(150deg, ${baseColor1} 12%, transparent 12.5%, transparent 87%, ${baseColor1} 87.5%, ${baseColor1}),
  linear-gradient(60deg, ${baseColor2} 25%, transparent 25.5%, transparent 75%, ${baseColor2} 75%, ${baseColor2}), 
  linear-gradient(60deg, ${baseColor2} 25%, transparent 25.5%, transparent 75%, ${baseColor2} 75%, ${baseColor2})`;
  
  const cardStyle = {
    backgroundColor: '#556', // Overall background color
    backgroundImage: backgroundImage,
    backgroundSize: '80px 140px',
    backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
  };
  
  // Get the maximum stat value for scaling the stat bars
  const maxStat = Math.max(...pokemon.stats.map(stat => stat.base_stat));

  const weightKg = pokemon.weight / 10;
  const heightM = pokemon.height / 10;

  const weightLbs = convertWeightKgToLbs(weightKg);
  const heightFtIn = convertHeightMToFtIn(heightM);

  return (
    <div className={detail.pokemonDetail}>
      <div className={detail.detailCard} style={cardStyle}>
        <span className={detail.pokemonId}>#{pokemon.id}</span>
        <button className={detail.favoriteButton} onClick={() => toggleFavorite(pokemon._id, pokemon)}>
          {favorites.some(f => f._id === pokemon._id) ? '❤️' : '♡'}
        </button>
        <button className={detail.backButton} onClick={() => navigate('/', { state: { tab: 'pokemon' } })}>
         🡄
        </button>
        <button className={detail.shinyButton} onClick={toggleImage}>
          {isShiny ? 'Normal' : 'Shiny'}
        </button>
        <h1 className={detail.pokemonName}>{capitalizeFirstLetter(pokemon.name)}</h1>
        <img className={detail.pokemonImage} src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default} alt={pokemon.name} />
        <div className={detail.baseExperience}>
          Base Exp {pokemon.base_experience}
        </div>
        <div className={detail.pokemonTypes}>
          {type1 && <span className={detail.pokemonType} style={{ backgroundColor: typeColors[type1] }}>{capitalizeFirstLetter(type1)}</span>}
          {type2 && <span className={detail.pokemonType} style={{ backgroundColor: typeColors[type2], marginLeft: '10px' }}>{capitalizeFirstLetter(type2)}</span>}
        </div>
        <div className={detail.pokemonMeasurementsContainer}>
          <div className={detail.measurement}>
            <div className={detail.measurementValue}>{heightFtIn}</div>
            <div className={detail.measurementLabel}>Height</div>
          </div>
          <div className={detail.baseStatsTitle}>Base Stats</div>
          <div className={detail.measurement}>
            <div className={detail.measurementValue}>{weightLbs} lbs</div>
            <div className={detail.measurementLabel}>Weight</div>
          </div>
        </div>
        <div className={detail.pokemonStats}>
          {pokemon.stats.map((stat, index) => (
            <div key={index} className={detail.stat}>
              <span className={detail.statName}>{statNames[stat.name]}</span>
              <div className={detail.statBar} data-value={stat.base_stat}>
                <div
                  className={detail.statBarFill}
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
