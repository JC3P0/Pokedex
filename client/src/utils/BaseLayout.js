  import React from 'react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import useFetchData from '../utils/hooks/useFetchData';
  import useSearch from '../utils/hooks/useSearch';
  import SearchSuggestions from './SearchSuggestions';
  import '../styles/BaseLayout.css';
  
  const pokedexImageUrl = 'https://raw.githubusercontent.com/JC3P0/Pokedex/main/client/src/assets/pokedex-image.png';
  
  const BaseLayout = ({ children, loading }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { items, pokemon } = useFetchData();
    const { searchTerm, filteredItems, filteredPokemon, handleSearch, handleSuggestionClick } = useSearch(items, pokemon);
  
  // Function to determine the placeholder text
  const getSearchPlaceholder = () => {
    if (location.pathname === '/') {
      return 'Search Pokémon and Items';
    } else if (location.pathname.startsWith('/items')) {
      return 'Search Items by name';
    } else {
      return 'Search Pokémon by name';
    }
  };

  const shouldShowSearchBar = () => {
    return location.pathname !== '/favorites';
  };

  const shouldShowFavoritesButton = () => {
    return location.pathname !== '/favorites';
  };

    return (
      <div className="base-layout">
        <div className="base-header">
          <img src={pokedexImageUrl} alt="Pokedex" className="header-image" />
        </div>
        {shouldShowSearchBar(location.pathname) && (
          <form className="search-form">
            <input
              type="text"
              placeholder={getSearchPlaceholder(location.pathname)}
              value={searchTerm}
              onChange={handleSearch}
            />
            <SearchSuggestions
              suggestions={location.pathname === '/' ? [...filteredPokemon, ...filteredItems] : location.pathname.startsWith('/items') ? filteredItems : filteredPokemon}
              onClick={handleSuggestionClick}
            />
          </form>
        )}
        <div className="tabs">
          <button className={`tab ${location.pathname.startsWith('/pokemon') ? 'active' : ''} ${loading ? 'disabled' : ''}`} onClick={() => !loading && navigate('/pokemon')} disabled={loading}>
            Pokémon
          </button>
          <button className={`tab ${location.pathname.startsWith('/items') ? 'active' : ''} ${loading ? 'disabled' : ''}`} onClick={() => !loading && navigate('/items')} disabled={loading}>
            Items
          </button>
        </div>
        <div className="favorites">
          {shouldShowFavoritesButton(location.pathname) && (
            <button className="favorite-button" onClick={() => navigate('/favorites')}>Favorites</button>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    );
  };
  
  export default BaseLayout;
  