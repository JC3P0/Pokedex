import React from 'react';
import { getImageOrPlaceholder } from '../utils/getImageOrPlaceholder';
import detail from '../styles/DetailedPage.module.css';
import useDetail from '../utils/hooks/useDetail';

const ItemDetail = () => {
  const { entity: item, loading, error, favorites, toggleFavorite, navigate } = useDetail('item');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading item details: {error.message}</div>;

  const cardStyle = {
    backgroundColor: '#566a74',
  };

  return (
    <div className={detail.detailContainer}>
      <div className={detail.detailCard} style={cardStyle}>
        <span className={detail.detailId}>#{item.id}</span>
        <button className={`${detail.favoriteButton} ${favorites.some((f) => f._id === item._id) ? detail.favorited : ''}`} onClick={() => toggleFavorite(item._id, item)}>{favorites.some((f) => f._id === item._id) ? '❤️' : '♡'}</button>
        <button className={detail.backButton} onClick={() => navigate('/', { state: { tab: 'item' } })}>
          <span>&#x2794;</span>
        </button>
        <h1 className={detail.detailName}>{item.name}</h1>
        <div className={detail.detailCategory}>Category: {item.category?.name || 'Unknown'}</div>
        <img className={detail.detailImage} src={getImageOrPlaceholder(item.sprites?.default)} alt={item.name} style={{ width: '75px' }}/>
        <div className={detail.detailEffect}>Effect: {item.effect || 'No effect available'}</div>
        <div className={detail.detailCost}>Cost: {item.cost || '0'}</div>
        <div className={detail.detailFlingPower}>Fling Power: {item.fling_power || '0'}</div>
      </div>
    </div>
  );
};

export default ItemDetail;
