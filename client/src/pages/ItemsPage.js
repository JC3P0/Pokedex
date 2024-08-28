import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ItemsPage.css';
import BaseLayout from '../utils/BaseLayout';
import { checkCacheAndRedirect } from '../utils/checkCacheAndRedirect';
import {
  getItemFavoritesFromIndexedDB,
  toggleItemFavoriteInIndexedDB,
} from '../utils/indexedDB';
import renderItemCategory from '../utils/renderItemCategory';

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [itemFavorites, setItemFavorites] = useState([]);
  const [activeItemCategory, setActiveItemCategory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await checkCacheAndRedirect(navigate, setItems, null);

      const cachedItemFavorites = await getItemFavoritesFromIndexedDB();
      setItemFavorites(cachedItemFavorites);
    };

    fetchData();
  }, [navigate]);

  const handleNavigate = (id) => {
    navigate(`/items/${id}`);
  };

  const toggleItemFavorite = async (_id, entity) => {
    await toggleItemFavoriteInIndexedDB(_id, entity);
    setItemFavorites(await getItemFavoritesFromIndexedDB());
  };

  const toggleShowItemByCategory = ({ setActiveItemCategory, category }) => {
    setActiveItemCategory(category);
  };

  return (
    <BaseLayout>
        <div className="category-buttons">
          <button className={`category-button ${activeItemCategory === 'all' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'all' })}>Show All Items</button>
          <button className={`category-button ${activeItemCategory === 'pokeballs' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'pokeballs' })}>Poke Balls</button>
          <button className={`category-button ${activeItemCategory === 'medical' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'medical' })}>Medical Items</button>
          <button className={`category-button ${activeItemCategory === 'battle' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'battle' })}>Battle Items</button>
          <button className={`category-button ${activeItemCategory === 'loot' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'loot' })}>Loot</button>
          <button className={`category-button ${activeItemCategory === 'berries' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'berries' })}>Berries</button>
          <button className={`category-button ${activeItemCategory === 'evolution' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'evolution' })}>Evolution Items</button>
          <button className={`category-button ${activeItemCategory === 'tms' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'tms' })}>TMs HMs TRs</button>
          <button className={`category-button ${activeItemCategory === 'held' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'held' })}>Held Items</button>
          <button className={`category-button ${activeItemCategory === 'valuable' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'valuable' })}>Valuable Items</button>
          <button className={`category-button ${activeItemCategory === 'ingredients' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'ingredients' })}>Ingredients</button>
          <button className={`category-button ${activeItemCategory === 'key' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory({ setActiveItemCategory, category: 'key' })}>Key Items</button>
        </div>
      <div className="item-list">
        {renderItemCategory({
          showCategory: activeItemCategory,
          items,
          activeItemCategory,
          toggleItemFavorite,
          itemsFavorites: itemFavorites,
          handleNavigate,
        })}
      </div>
    </BaseLayout>
  );
};

export default ItemsPage;
