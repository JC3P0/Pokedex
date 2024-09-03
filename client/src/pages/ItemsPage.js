import React from 'react';
import itemPage from '../styles/PreviewPage.module.css';
import BaseLayout from '../utils/BaseLayout';
import usePreview from '../utils/hooks/usePreview';
import renderItemCategory from '../utils/renderItemCategory';

const ItemsPage = () => {
  const {
    entities: items,
    favorites: itemFavorites,
    activeCategory: activeItemCategory,
    handleNavigate,
    toggleFavorite: toggleItemFavorite,
    toggleShowCategory: toggleShowItemByCategory,
  } = usePreview('item');

  return (
    <BaseLayout>
      <div className={itemPage.previewContainer}>
          <div className={itemPage.categoryButtons}>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'all' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('all')}>Show All Items</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'pokeballs' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('pokeballs')}>Poke Balls</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'medical' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('medical')}>Medical Items</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'battle' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('battle')}>Battle Items</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'loot' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('loot')}>Loot</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'berries' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('berries')}>Berries</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'evolution' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('evolution')}>Evolution Items</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'tms' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('tms')}>TMs HMs TRs</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'held' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('held')}>Held Items</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'valuable' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('valuable')}>Valuable Items</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'ingredients' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('ingredients')}>Ingredients</button>
            <button className={`${itemPage.categoryButton} ${activeItemCategory === 'key' ? 'active' : ''}`} onClick={() => toggleShowItemByCategory('key')}>Key Items</button>
          </div>
        <div className={itemPage.previewList}>
          {renderItemCategory({
            showCategory: activeItemCategory,
            items,
            activeItemCategory,
            toggleItemFavorite,
            itemsFavorites: itemFavorites,
            handleNavigate,
          })}
        </div>
      </div>
    </BaseLayout>
  );
};

export default ItemsPage;
