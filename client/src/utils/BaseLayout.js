import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchItems, fetchPokemon } from '../utils/api';
import { getItemsFromIndexedDB, saveItemsToIndexedDB, getPokemonFromIndexedDB, savePokemonToIndexedDB } from '../utils/indexedDB';
import '../styles/BaseLayout.css';

const pokedexImageUrl = 'https://raw.githubusercontent.com/JC3P0/Pokedex/main/client/src/assets/pokedex-image.png';

const BaseLayout = ({ children, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [items, setItems] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (location.pathname.startsWith('/items')) {
        let cachedItems = await getItemsFromIndexedDB();
        if (cachedItems.length === 0) {
          const itemsData = await fetchItems();
          await saveItemsToIndexedDB(itemsData);
          setItems(itemsData);
        } else {
          setItems(cachedItems);
        }
      } else if (location.pathname.startsWith('/pokemon')) {
        let cachedPokemon = await getPokemonFromIndexedDB();
        if (cachedPokemon.length === 0) {
          const pokemonData = await fetchPokemon();
          await savePokemonToIndexedDB(pokemonData);
          setPokemon(pokemonData);
        } else {
          setPokemon(cachedPokemon);
        }
      }
    };

    fetchData();
  }, [location.pathname]);

  const handleSearch = (e) => {
    const { value } = e.target;
    const validatedValue = value.replace(/[^a-zA-Z]/g, '').substring(0, 20);
    setSearchTerm(validatedValue);
  
    if (validatedValue === '') {
      setFilteredItems([]);
      setFilteredPokemon([]);
      return;
    }
  
    if (location.pathname.startsWith('/items')) {
      setFilteredItems(items.filter(i => i.name.toLowerCase().startsWith(validatedValue.toLowerCase())));
    } else if (location.pathname.startsWith('/pokemon')) {
      setFilteredPokemon(pokemon.filter(p => p.name.toLowerCase().startsWith(validatedValue.toLowerCase())));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    if (location.pathname.startsWith('/items')) {
      navigate(`/items/${suggestion.id}`);
    } else if (location.pathname.startsWith('/pokemon')) {
      navigate(`/pokemon/${suggestion.id}`);
    }
  };

  const getSearchPlaceholder = () => {
    if (location.pathname.startsWith('/items')) {
      return 'Search Items by name';
    } else if (location.pathname.startsWith('/pokemon')) {
      return 'Search Pokémon by name';
    } else {
      return '';
    }
  };

  const shouldShowSearchBar = () => {
    return location.pathname !== '/' && location.pathname !== '/favorites';
  };

  const shouldShowFavoritesButton = () => {
    return location.pathname !== '/favorites' && location.pathname !== '/';
  };

  return (
    <div className="base-layout">
      <div className="base-header">
        <img src={pokedexImageUrl} alt="Pokedex" className="header-image" />
      </div>
      {shouldShowSearchBar() && (
        <form className="search-form">
          <input
            type="text"
            placeholder={getSearchPlaceholder()}
            value={searchTerm}
            onChange={handleSearch}
          />
          {(filteredItems.length > 0 || filteredPokemon.length > 0) && (
            <div className="search-suggestions">
              {(location.pathname.startsWith('/items') ? filteredItems : filteredPokemon).map((suggestion) => (
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
      )}

      <div className="tabs">
        <button
          className={`tab ${location.pathname.startsWith('/pokemon') ? 'active' : ''} ${loading ? 'disabled' : ''}`}
          onClick={() => !loading && navigate('/pokemon')}
          disabled={loading}
        >
          Pokémon
        </button>
        <button
          className={`tab ${location.pathname.startsWith('/items') ? 'active' : ''} ${loading ? 'disabled' : ''}`}
          onClick={() => !loading && navigate('/items')}
          disabled={loading}
        >
          Items
        </button>
      </div>
      <div className="favorites">
        {shouldShowFavoritesButton() && (
          <button className="favorite-button" onClick={() => navigate('/favorites')}>
            Favorites
          </button>
        )}
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default BaseLayout;
