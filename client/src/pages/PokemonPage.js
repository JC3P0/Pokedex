import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PokemonPage.css';
import BaseLayout from '../utils/BaseLayout';
import {
  toggleShowAllPokemon,
  toggleShowGen1,
  toggleShowGen2,
  toggleShowGen3,
  toggleShowGen4,
  toggleShowGen5,
  toggleShowGen6,
  toggleShowGen7,
  toggleShowGen8,
  toggleShowGen9,
} from '../utils/PokemonToggleHandlers';
import { checkCacheAndRedirect } from '../utils/checkCacheAndRedirect';
import {
  getPokemonFavoritesFromIndexedDB,
  togglePokemonFavoriteInIndexedDB,
} from '../utils/indexedDB';
import renderPokemonCategory from '../utils/renderPokemonCategory';

const PokemonPage = () => {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonFavorites, setPokemonFavorites] = useState([]);
  const [activePokemonCategory, setActivePokemonCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await checkCacheAndRedirect(navigate, null, setPokemon);

      const cachedPokemonFavorites = await getPokemonFavoritesFromIndexedDB();
      setPokemonFavorites(cachedPokemonFavorites);
    };

    fetchData();
  }, [navigate]);

  const handleNavigate = (id) => {
    navigate(`/pokemon/${id}`);
  };

  const togglePokemonFavorite = async (_id, entity) => {
    await togglePokemonFavoriteInIndexedDB(_id, entity);
    setPokemonFavorites(await getPokemonFavoritesFromIndexedDB());
  };

  return (
    <BaseLayout>
      <div className="pokemon-container">
        <div className="tabs">
          <div className="category-buttons">
            <button className={`category-button ${activePokemonCategory === 'all' ? 'active' : ''}`} onClick={() => toggleShowAllPokemon({ setActivePokemonCategory })}>Show All Pokémon</button>
            <button className={`category-button ${activePokemonCategory === 'gen1' ? 'active' : ''}`} onClick={() => toggleShowGen1({ setActivePokemonCategory })}>Gen I</button>
            <button className={`category-button ${activePokemonCategory === 'gen2' ? 'active' : ''}`} onClick={() => toggleShowGen2({ setActivePokemonCategory })}>Gen II</button>
            <button className={`category-button ${activePokemonCategory === 'gen3' ? 'active' : ''}`} onClick={() => toggleShowGen3({ setActivePokemonCategory })}>Gen III</button>
            <button className={`category-button ${activePokemonCategory === 'gen4' ? 'active' : ''}`} onClick={() => toggleShowGen4({ setActivePokemonCategory })}>Gen IV</button>
            <button className={`category-button ${activePokemonCategory === 'gen5' ? 'active' : ''}`} onClick={() => toggleShowGen5({ setActivePokemonCategory })}>Gen V</button>
            <button className={`category-button ${activePokemonCategory === 'gen6' ? 'active' : ''}`} onClick={() => toggleShowGen6({ setActivePokemonCategory })}>Gen VI</button>
            <button className={`category-button ${activePokemonCategory === 'gen7' ? 'active' : ''}`} onClick={() => toggleShowGen7({ setActivePokemonCategory })}>Gen VII</button>
            <button className={`category-button ${activePokemonCategory === 'gen8' ? 'active' : ''}`} onClick={() => toggleShowGen8({ setActivePokemonCategory })}>Gen VIII</button>
            <button className={`category-button ${activePokemonCategory === 'gen9' ? 'active' : ''}`} onClick={() => toggleShowGen9({ setActivePokemonCategory })}>Gen IX</button>
          </div>
        </div>
        <div className="pokemon-list">
          {renderPokemonCategory({
            activePokemonCategory,
            pokemon,
            favorites: pokemonFavorites,
            toggleFavorite: togglePokemonFavorite,
            handleNavigate,
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default PokemonPage;
