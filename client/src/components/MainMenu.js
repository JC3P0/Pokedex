import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MainMenu.css';
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
} from '../utils/ItemToggleHandlers';
import renderItemCategory from '../utils/renderItemCategory';
import renderPokemonCategory from '../utils/renderPokemonCategory';
import {
  fetchPokemon,
  fetchItems,
} from '../utils/api';
import {
  savePokemonToIndexedDB,
  getPokemonFromIndexedDB,
  saveItemsToIndexedDB,
  getItemsFromIndexedDB,
  getPokemonFavoritesFromIndexedDB,
  getItemFavoritesFromIndexedDB,
  togglePokemonFavoriteInIndexedDB,
  toggleItemFavoriteInIndexedDB,
} from '../utils/indexedDB';
import pokedexImage from '../assets/pokedex-image.png';

const MainMenu = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search input value
  const [pokemon, setPokemon] = useState([]); // State to store Pokémon data
  const [items, setItems] = useState([]); // State to store items data
  const [filteredPokemon, setFilteredPokemon] = useState([]); // State for filtered Pokémon based on search
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered items based on search
  const [showPokemon, setShowPokemon] = useState(true); // State to toggle between showing Pokémon or items
  const [showFavorites, setShowFavorites] = useState(false); // State to toggle between showing all or favorite items
  const [pokemonFavorites, setPokemonFavorites] = useState([]); // State to store favorite Pokémon
  const [itemFavorites, setItemFavorites] = useState([]); // State to store favorite items
  const [activePokemonCategory, setActivePokemonCategory] = useState(null); // State to track active Pokémon category
  const [activeItemCategory, setActiveItemCategory] = useState(null); // State to track active item category

  const navigate = useNavigate(); // Hook to navigate programmatically
  const location = useLocation(); // Hook to access the current location

  useEffect(() => {
    // Function to fetch data in chunks and save to IndexedDB
    const fetchDataInChunks = async (fetchFunction, saveFunction, setFunction) => {
      let allData = [];
      let page = 1;
      let limit = 100;
      let chunk;

      do {
        chunk = await fetchFunction(page, limit);
        if (chunk.length > 0) {
          allData = allData.concat(chunk);
          await saveFunction(chunk);
        }
        page++;
      } while (chunk.length === limit);

      setFunction(allData);
    };

    // Fetch and load data from IndexedDB or API
    const fetchData = async () => {
      let cachedPokemon = await getPokemonFromIndexedDB();
      let cachedItems = await getItemsFromIndexedDB();

      if (cachedPokemon.length === 0) {
        await fetchDataInChunks(fetchPokemon, savePokemonToIndexedDB, setPokemon);
      } else {
        setPokemon(cachedPokemon);
      }

      if (cachedItems.length === 0) {
        await fetchDataInChunks(fetchItems, saveItemsToIndexedDB, setItems);
      } else {
        setItems(cachedItems);
      }

      const cachedPokemonFavorites = await getPokemonFavoritesFromIndexedDB();
      const cachedItemFavorites = await getItemFavoritesFromIndexedDB();

      setPokemonFavorites(cachedPokemonFavorites);
      setItemFavorites(cachedItemFavorites);
    };

    fetchData();

    // Set tab state based on navigation
    setShowPokemon(location.state?.tab !== 'items');
  }, [location.state?.tab]);

  // Handle search input changes
  const handleSearch = (e) => {
    const { value } = e.target;
    const validatedValue = value.replace(/[^a-zA-Z]/g, '').substring(0, 20);
    setSearchTerm(validatedValue);

    const term = validatedValue.toLowerCase();
    if (validatedValue === '') {
      setFilteredPokemon([]);
      setFilteredItems([]);
      return;
    }

    if (showPokemon) {
      setFilteredPokemon(pokemon.filter(p => p.name.toLowerCase().startsWith(term)));
    } else {
      setFilteredItems(items.filter(i => i.name.toLowerCase().startsWith(term)));
    }
  };

  // Handle navigation to detail views
  const handleNavigate = (id, isPokemon) => {
    navigate(isPokemon ? `/pokemon/${id}` : `/items/${id}`);
  };

  // Handle suggestion click from search results
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    handleNavigate(suggestion.id, showPokemon);
  };

  // Handle tab switching between Pokémon and items
  const handleTabSwitch = (isPokemonTab) => {
    setShowPokemon(isPokemonTab);
    setShowFavorites(false);
    setActivePokemonCategory(null);
    setActiveItemCategory(null);
    setSearchTerm('');
    setFilteredPokemon([]);
    setFilteredItems([]);
  };

  // Toggle favorite status for Pokémon
  const togglePokemonFavorite = async (_id, entity) => {
    await togglePokemonFavoriteInIndexedDB(_id, entity);
    setPokemonFavorites(await getPokemonFavoritesFromIndexedDB());
  };

  // Toggle favorite status for items
  const toggleItemFavorite = async (_id, entity) => {
    await toggleItemFavoriteInIndexedDB(_id, entity);
    setItemFavorites(await getItemFavoritesFromIndexedDB());
  };

  // Toggle showing favorite Pokémon or items
  const handleShowFavorites = async () => {
    setShowFavorites(prev => !prev);
    if (!showFavorites) {
      if (showPokemon) {
        setPokemonFavorites(await getPokemonFavoritesFromIndexedDB());
      } else {
        setItemFavorites(await getItemFavoritesFromIndexedDB());
      }
    }
  };

  // Render the main menu with search and category filters
  return (
    <div className="main-menu">
      <img src={pokedexImage} alt="Pokedex" className="pokedex-image" />
      <form className="search-form">
        <input
          type="text"
          placeholder={showPokemon ? "Search Pokémon by name" : "Search Items by name"}
          value={searchTerm}
          onChange={handleSearch}
        />
        {(filteredPokemon.length > 0 || filteredItems.length > 0) && (
          <div className="search-suggestions">
            {(showPokemon ? filteredPokemon : filteredItems).map((suggestion) => (
              <div
                key={suggestion.id}
                className="search-suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </form>
      <div className="tabs">
        <button className={`tab ${showPokemon ? 'active' : ''}`} onClick={() => handleTabSwitch(true)}>Pokémon</button>
        <button className={`tab ${!showPokemon ? 'active' : ''}`} onClick={() => handleTabSwitch(false)}>Items</button>
      </div>
      <div className="content">
        <h2>{showPokemon ? 'Pokémon' : 'Items'}</h2>
        {showPokemon ? (
          <>
            <button className="toggle-button" onClick={() => { handleShowFavorites(); }}>
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
            <button className="toggle-button" onClick={() => { handleShowFavorites(); }}>
              {showFavorites ? 'Back to Items' : 'Show Favorites'}
            </button>
            {!showFavorites && (
              <div className="category-buttons">
                <button className={`category-button ${activeItemCategory === 'all' ? 'active' : ''}`} onClick={() => toggleShowAllItems({ setActiveItemCategory, setShowFavorites })}>Show All Items</button>
                <button className={`category-button ${activeItemCategory === 'pokeballs' ? 'active' : ''}`} onClick={() => toggleShowPokeBalls({ setActiveItemCategory, setShowFavorites })}>Poke Balls</button>
                <button className={`category-button ${activeItemCategory === 'medical' ? 'active' : ''}`} onClick={() => toggleShowMedicalItems({ setActiveItemCategory, setShowFavorites })}>Medical Items</button>
                <button className={`category-button ${activeItemCategory === 'battle' ? 'active' : ''}`} onClick={() => toggleShowBattleItems({ setActiveItemCategory, setShowFavorites })}>Battle Items</button>
                <button className={`category-button ${activeItemCategory === 'loot' ? 'active' : ''}`} onClick={() => toggleShowLoot({ setActiveItemCategory, setShowFavorites })}>Loot</button>
                <button className={`category-button ${activeItemCategory === 'berries' ? 'active' : ''}`} onClick={() => toggleShowBerries({ setActiveItemCategory, setShowFavorites })}>Berries</button>
                <button className={`category-button ${activeItemCategory === 'evolution' ? 'active' : ''}`} onClick={() => toggleShowEvolutionItems({ setActiveItemCategory, setShowFavorites })}>Evolution Items</button>
                <button className={`category-button ${activeItemCategory === 'tms' ? 'active' : ''}`} onClick={() => toggleShowTMsHMsTRs({ setActiveItemCategory, setShowFavorites })}>TMs HMs TRs</button>
                <button className={`category-button ${activeItemCategory === 'held' ? 'active' : ''}`} onClick={() => toggleShowHeldItems({ setActiveItemCategory, setShowFavorites })}>Held Items</button>
                <button className={`category-button ${activeItemCategory === 'valuable' ? 'active' : ''}`} onClick={() => toggleShowValuableItems({ setActiveItemCategory, setShowFavorites })}>Valuable Items</button>
                <button className={`category-button ${activeItemCategory === 'ingredients' ? 'active' : ''}`} onClick={() => toggleShowIngredients({ setActiveItemCategory, setShowFavorites })}>Ingredients</button>
                <button className={`category-button ${activeItemCategory === 'key' ? 'active' : ''}`} onClick={() => toggleShowKeyItems({ setActiveItemCategory, setShowFavorites })}>Key Items</button>
              </div>
            )}
          </>
        )}
        <div className="pokemon-list">
          {renderPokemonCategory({
            activePokemonCategory,
            showFavorites,
            favorites: pokemonFavorites,
            toggleFavorite: togglePokemonFavorite,
            pokemon,
            handleNavigate: (id) => handleNavigate(id, true),
          })}
        </div>
        <div className="item-list">
          {renderItemCategory({
            showCategory: activeItemCategory,
            showFavorites,
            items,
            activeItemCategory,
            toggleItemFavorite,
            itemsFavorites: itemFavorites,
            handleNavigate: (id) => handleNavigate(id, false),
          })}
        </div>
      </div>
    </div>
  );
};

export default MainMenu; // Export the component for use in other parts of the application
