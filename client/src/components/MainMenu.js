import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import { FavoritesContext } from '../context/FavoritesContext';
import { ItemsContext } from '../context/ItemsContext';
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
  toggleShowPokemonFavorites,
} from '../utils/PokemonToggleHandlers';
import {
  toggleShowAllItems,
  toggleShowPokeBalls,
  toggleShowMedicalItems,
  toggleShowBattleItems,
  toggleShowLoot,
  toggleShowBerries,
  toggleShowEvolutionItems,
  toggleShowTMsHMsTRs,
  toggleShowHeldItems,
  toggleShowValuableItems,
  toggleShowIngredients,
  toggleShowKeyItems,
  toggleShowFavorites as toggleShowItemFavorites,
} from '../utils/ItemToggleHandlers';
import renderItemCategory from '../utils/renderItemCategory';
import renderPokemonCategory from '../utils/renderPokemonCategory';
import { fetchPokemon, searchPokemon } from '../utils/api';
import { savePokemonToIndexedDB, getPokemonFromIndexedDB } from '../utils/indexedDB';

const MainMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState([]);
  const [showPokemon, setShowPokemon] = useState(true);
  const [showFavorites, setShowFavorites] = useState(false);
  const [activePokemonCategory, setActivePokemonCategory] = useState(null);
  const [activeItemCategory, setActiveItemCategory] = useState(null);

  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { items, itemsFavorites, toggleItemFavorite } = useContext(ItemsContext);
  const scrollPositionRef = useRef(0);
  const showPokemonRef = useRef(true);

  useEffect(() => {
    const fetchAndCachePokemon = async () => {
      const cachedPokemon = await getPokemonFromIndexedDB();
      if (cachedPokemon.length) {
        setPokemon(cachedPokemon);
        console.log('Using cached Pokémon data');
      } else {
        console.log('Fetching Pokémon data...');
        try {
          const data = await fetchPokemon();
          setPokemon(data);
          await savePokemonToIndexedDB(data);
          console.log('Pokémon data fetched and saved to IndexedDB:', data);
        } catch (error) {
          console.error('Error fetching Pokémon:', error);
        }
      }
    };

    const savedShowPokemon = JSON.parse(localStorage.getItem('showPokemon'));
    const savedScrollPosition = JSON.parse(localStorage.getItem('scrollPosition'));

    if (savedShowPokemon !== null) {
      setShowPokemon(savedShowPokemon);
      showPokemonRef.current = savedShowPokemon;
    }

    if (savedScrollPosition !== null) {
      scrollPositionRef.current = savedScrollPosition;
      window.scrollTo(0, savedScrollPosition);
    }

    fetchAndCachePokemon();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for Pokémon: ${searchTerm}`);
    searchPokemon(searchTerm)
      .then(data => {
        console.log('Search result:', data);
        setPokemon([data]);
      })
      .catch(error => console.error('Error fetching Pokémon:', error));
  };

  const handleNavigate = (id) => {
    scrollPositionRef.current = window.scrollY; // Save scroll position
    localStorage.setItem('scrollPosition', JSON.stringify(window.scrollY));
    localStorage.setItem('showPokemon', JSON.stringify(showPokemonRef.current)); // Save showPokemon state
    navigate(`/pokemon/${id}`);
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
        <button className={`tab ${showPokemon ? 'active' : ''}`} onClick={() => { setShowPokemon(true); setShowFavorites(false); setActiveItemCategory(null); }}>Pokémon</button>
        <button className={`tab ${!showPokemon ? 'active' : ''}`} onClick={() => { setShowPokemon(false); setShowFavorites(false); setActivePokemonCategory(null); }}>Items</button>
      </div>
      <div className="content">
        <h2>{showPokemon ? 'Pokémon' : 'Items'}</h2>
        {showPokemon ? (
          <>
            <button className="toggle-button" onClick={() => toggleShowPokemonFavorites({ setShowFavorites, setActivePokemonCategory, setActiveItemCategory })}>
              {showFavorites ? 'Back to Pokémon' : 'Show Favorites'}
            </button>
            {!showFavorites && (
              <div className="category-buttons">
                <button className={`category-button ${activePokemonCategory === 'all' ? 'active' : ''}`} onClick={() => toggleShowAllPokemon({ setActivePokemonCategory, setShowFavorites })}>Show All Pokémon</button>
                <button className={`category-button ${activePokemonCategory === 'gen1' ? 'active' : ''}`} onClick={() => toggleShowGen1({ setActivePokemonCategory, setShowFavorites })}>Gen I</button>
                <button className={`category-button ${activePokemonCategory === 'gen2' ? 'active' : ''}`} onClick={() => toggleShowGen2({ setActivePokemonCategory, setShowFavorites })}>Gen II</button>
                <button className={`category-button ${activePokemonCategory === 'gen3' ? 'active' : ''}`} onClick={() => toggleShowGen3({ setActivePokemonCategory, setShowFavorites })}>Gen III</button>
                <button className={`category-button ${activePokemonCategory === 'gen4' ? 'active' : ''}`} onClick={() => toggleShowGen4({ setActivePokemonCategory, setShowFavorites })}>Gen IV</button>
                <button className={`category-button ${activePokemonCategory === 'gen5' ? 'active' : ''}`} onClick={() => toggleShowGen5({ setActivePokemonCategory, setShowFavorites })}>Gen V</button>
                <button className={`category-button ${activePokemonCategory === 'gen6' ? 'active' : ''}`} onClick={() => toggleShowGen6({ setActivePokemonCategory, setShowFavorites })}>Gen VI</button>
                <button className={`category-button ${activePokemonCategory === 'gen7' ? 'active' : ''}`} onClick={() => toggleShowGen7({ setActivePokemonCategory, setShowFavorites })}>Gen VII</button>
                <button className={`category-button ${activePokemonCategory === 'gen8' ? 'active' : ''}`} onClick={() => toggleShowGen8({ setActivePokemonCategory, setShowFavorites })}>Gen VIII</button>
                <button className={`category-button ${activePokemonCategory === 'gen9' ? 'active' : ''}`} onClick={() => toggleShowGen9({ setActivePokemonCategory, setShowFavorites })}>Gen IX</button>
              </div>
            )}
          </>
        ) : (
          <>
            <button className="toggle-button" onClick={() => toggleShowItemFavorites({ setShowFavorites, setActiveItemCategory })}>
              {showFavorites ? 'Back to Items' : 'Show Favorites'}
            </button>
            {!showFavorites && (
              <div className="category-buttons">
                <button className={`category-button ${activeItemCategory === 'all' ? 'active' : ''}`} onClick={() => toggleShowAllItems({ setActiveItemCategory, setShowFavorites, setShowAllItems: () => setActiveItemCategory('all') })}>Show All Items</button>
                <button className={`category-button ${activeItemCategory === 'pokeballs' ? 'active' : ''}`} onClick={() => toggleShowPokeBalls({ setActiveItemCategory, setShowFavorites, setShowPokeBalls: () => setActiveItemCategory('pokeballs') })}>Poke Balls</button>
                <button className={`category-button ${activeItemCategory === 'medical' ? 'active' : ''}`} onClick={() => toggleShowMedicalItems({ setActiveItemCategory, setShowFavorites, setShowMedicalItems: () => setActiveItemCategory('medical') })}>Medical Items</button>
                <button className={`category-button ${activeItemCategory === 'battle' ? 'active' : ''}`} onClick={() => toggleShowBattleItems({ setActiveItemCategory, setShowFavorites, setShowBattleItems: () => setActiveItemCategory('battle') })}>Battle Items</button>
                <button className={`category-button ${activeItemCategory === 'loot' ? 'active' : ''}`} onClick={() => toggleShowLoot({ setActiveItemCategory, setShowFavorites, setShowLoot: () => setActiveItemCategory('loot') })}>Loot</button>
                <button className={`category-button ${activeItemCategory === 'berries' ? 'active' : ''}`} onClick={() => toggleShowBerries({ setActiveItemCategory, setShowFavorites, setShowBerries: () => setActiveItemCategory('berries') })}>Berries</button>
                <button className={`category-button ${activeItemCategory === 'evolution' ? 'active' : ''}`} onClick={() => toggleShowEvolutionItems({ setActiveItemCategory, setShowFavorites, setShowEvolutionItems: () => setActiveItemCategory('evolution') })}>Evolution Items</button>
                <button className={`category-button ${activeItemCategory === 'tms' ? 'active' : ''}`} onClick={() => toggleShowTMsHMsTRs({ setActiveItemCategory, setShowFavorites, setShowTMsHMsTRs: () => setActiveItemCategory('tms') })}>TMs HMs TRs</button>
                <button className={`category-button ${activeItemCategory === 'held' ? 'active' : ''}`} onClick={() => toggleShowHeldItems({ setActiveItemCategory, setShowFavorites, setShowHeldItems: () => setActiveItemCategory('held') })}>Held Items</button>
                <button className={`category-button ${activeItemCategory === 'valuable' ? 'active' : ''}`} onClick={() => toggleShowValuableItems({ setActiveItemCategory, setShowFavorites, setShowValuableItems: () => setActiveItemCategory('valuable') })}>Valuable Items</button>
                <button className={`category-button ${activeItemCategory === 'ingredients' ? 'active' : ''}`} onClick={() => toggleShowIngredients({ setActiveItemCategory, setShowFavorites, setShowIngredients: () => setActiveItemCategory('ingredients') })}>Ingredients</button>
                <button className={`category-button ${activeItemCategory === 'key' ? 'active' : ''}`} onClick={() => toggleShowKeyItems({ setActiveItemCategory, setShowFavorites, setShowKeyItems: () => setActiveItemCategory('key') })}>Key Items</button>
              </div>
            )}
          </>
        )}
        <div className="pokemon-list">
          {renderPokemonCategory({ 
            activePokemonCategory,
            showFavorites,
            favorites,
            toggleFavorite,
            pokemon,
            handleNavigate,
          })}
        </div>
        <div className="item-list">
          {renderItemCategory({
            showCategory: activeItemCategory,
            items,
            filter: (i) => {
              switch (activeItemCategory) {
                case 'pokeballs':
                  return i.category.name === 'standard-balls' || i.category.name === 'special-balls' || i.category.name === 'apricorn-balls';
                case 'medical':
                  return i.category.name === 'healing' || i.category.name === 'revival' || i.category.name === 'status-cures' || i.category.name === 'vitamins' || i.category.name === 'pp-recovery' || i.category.name === 'flutes' || i.category.name === 'species-candies';
                case 'battle':
                  return i.category.name === 'stat-boosts' || i.category.name === 'spelunking' || i.category.name === 'vitamins';
                case 'loot':
                  return i.category.name === 'loot';
                case 'berries':
                  return i.category.name === 'effort-drop' || i.category.name === 'other' || i.category.name === 'in-a-pinch' || i.category.name === 'picky-healing' || i.category.name === 'type-protection' || i.category.name === 'mulch' || i.category.name === 'catching-bonus';
                case 'evolution':
                  return i.category.name === 'evolution' || i.category.name === 'tera-shard';
                case 'tms':
                  return i.category.name === 'all-machines';
                case 'held':
                  return i.category.name === 'held-items' || i.category.name === 'choice' || i.category.name === 'effort-training' || i.category.name === 'bad-held-items' || i.category.name === 'training' || i.category.name === 'species-specific' || i.category.name === 'type-enhancement' || i.category.name === 'all-mail' || i.category.name === 'scarves' || i.category.name === 'jewels' || i.category.name === 'mega-stones' || i.category.name === 'memories' || i.category.name === 'z-crystals';
                case 'valuable':
                  return i.category.name === 'collectibles' || i.category.name === 'loot' || i.category.name === 'dex-completion';
                case 'ingredients':
                  return i.category.name === 'curry-ingredients' || i.category.name === 'sandwich-ingredients' || i.category.name === 'baking-only' || i.category.name === 'mulch' || i.category.name === 'apricorn-box' || i.category.name === 'tm-materials' || i.category.name === 'picnic';
                case 'key':
                  return i.category.name === 'plates' || i.category.name === 'event-items' || i.category.name === 'gameplay' || i.category.name === 'plot-advancement' || i.category.name === 'unused' || i.category.name === 'data-cards' || i.category.name === 'miracle-shooter';
                default:
                  return true;
              }
            },
            toggleItemFavorite,
            itemsFavorites,
          })}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
