import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pokemonPage from '../styles/PreviewPage.module.css';
import BaseLayout from '../utils/BaseLayout';
import { checkCacheAndRedirect } from '../utils/checkCacheAndRedirect';
import { getPokemonFavoritesFromIndexedDB, togglePokemonFavoriteInIndexedDB, } from '../utils/indexedDB';
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

  const toggleShowPokemonByGeneration = ({ setActivePokemonCategory, generation }) => {
    setActivePokemonCategory(generation);
  };

  return (
    <BaseLayout>
      <div className={pokemonPage.previewContainer}>
        <div className={pokemonPage.categoryButtons}>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'all' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'all' })}>Show All Pokémon</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen1' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen1' })}>Gen I</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen2' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen2' })}>Gen II</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen3' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen3' })}>Gen III</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen4' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen4' })}>Gen IV</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen5' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen5' })}>Gen V</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen6' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen6' })}>Gen VI</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen7' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen7' })}>Gen VII</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen8' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen8' })}>Gen VIII</button>
          <button className={`${pokemonPage.categoryButton} ${activePokemonCategory === 'gen9' ? 'active' : ''}`} onClick={() => toggleShowPokemonByGeneration({ setActivePokemonCategory, generation: 'gen9' })}>Gen IX</button>
        </div>
        <div className={pokemonPage.previewList}>
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
