import React, { createContext, useState, useEffect } from 'react';
import api from '../config';

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [itemsFavorites, setItemsFavorites] = useState([]);

  useEffect(() => {
    const cachedItems = JSON.parse(localStorage.getItem('items'));

    if (!cachedItems || cachedItems.length === 0) {
      console.log('Fetching Items data...');
      api.get('http://localhost:3001/api/items?limit=3000')
        .then(response => {
          console.log('Items data fetched:', response.data);
          setItems(response.data);
          localStorage.setItem('items', JSON.stringify(response.data));
        })
        .catch(error => console.error('Error fetching Items:', error));
    } else {
      console.log('Using cached Items data');
      setItems(cachedItems);
    }

    api.get('http://localhost:3001/api/favoriteItems')
      .then(response => {
        setItemsFavorites(response.data);
      })
      .catch(error => console.error('Error fetching favorite items:', error));
  }, []);

  const toggleItemFavorite = (id, item) => {
    const isFavorite = itemsFavorites.some(f => f.itemId.id === id);
    const url = `http://localhost:3001/api/favoriteItems/${id}`;
    const method = isFavorite ? 'DELETE' : 'POST';

    api({ method, url })
      .then(() => {
        const newFavorites = isFavorite
          ? itemsFavorites.filter(f => f.itemId.id !== id)
          : [...itemsFavorites, { itemId: item }];
        setItemsFavorites(newFavorites);
      })
      .catch(error => console.error('Error toggling favorite item:', error));
  };

  return (
    <ItemsContext.Provider value={{ items, itemsFavorites, toggleItemFavorite }}>
      {children}
    </ItemsContext.Provider>
  );
};
