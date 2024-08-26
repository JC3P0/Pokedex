import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ItemsPage.css';
import BaseLayout from '../utils/BaseLayout';
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

  return (
    <BaseLayout>
      <div className="tabs">
          <div className="category-buttons">
            <button className={`category-button ${activeItemCategory === 'all' ? 'active' : ''}`} onClick={() => toggleShowAllItems({ setActiveItemCategory })}>Show All Items</button>
            <button className={`category-button ${activeItemCategory === 'pokeballs' ? 'active' : ''}`} onClick={() => toggleShowPokeBalls({ setActiveItemCategory })}>Poke Balls</button>
            <button className={`category-button ${activeItemCategory === 'medical' ? 'active' : ''}`} onClick={() => toggleShowMedicalItems({ setActiveItemCategory })}>Medical Items</button>
            <button className={`category-button ${activeItemCategory === 'battle' ? 'active' : ''}`} onClick={() => toggleShowBattleItems({ setActiveItemCategory })}>Battle Items</button>
            <button className={`category-button ${activeItemCategory === 'loot' ? 'active' : ''}`} onClick={() => toggleShowLoot({ setActiveItemCategory })}>Loot</button>
            <button className={`category-button ${activeItemCategory === 'berries' ? 'active' : ''}`} onClick={() => toggleShowBerries({ setActiveItemCategory })}>Berries</button>
            <button className={`category-button ${activeItemCategory === 'evolution' ? 'active' : ''}`} onClick={() => toggleShowEvolutionItems({ setActiveItemCategory })}>Evolution Items</button>
            <button className={`category-button ${activeItemCategory === 'tms' ? 'active' : ''}`} onClick={() => toggleShowTMsHMsTRs({ setActiveItemCategory })}>TMs HMs TRs</button>
            <button className={`category-button ${activeItemCategory === 'held' ? 'active' : ''}`} onClick={() => toggleShowHeldItems({ setActiveItemCategory })}>Held Items</button>
            <button className={`category-button ${activeItemCategory === 'valuable' ? 'active' : ''}`} onClick={() => toggleShowValuableItems({ setActiveItemCategory })}>Valuable Items</button>
            <button className={`category-button ${activeItemCategory === 'ingredients' ? 'active' : ''}`} onClick={() => toggleShowIngredients({ setActiveItemCategory })}>Ingredients</button>
            <button className={`category-button ${activeItemCategory === 'key' ? 'active' : ''}`} onClick={() => toggleShowKeyItems({ setActiveItemCategory })}>Key Items</button>
          </div>
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
