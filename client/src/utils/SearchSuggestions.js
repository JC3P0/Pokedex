import React from 'react';

// SearchSuggestions.js
const SearchSuggestions = ({ suggestions, onClick }) => {
    return (
      <div className="search-suggestions">
        {suggestions.map((suggestion) => (
          <div
            key={`${suggestion.type}-${suggestion.id}`} // Prefix the key with a type indicator
            className="search-suggestion"
            onClick={() => onClick(suggestion)}
          >
            {suggestion.name}
          </div>
        ))}
      </div>
    );
  };
  

export default SearchSuggestions;
