import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getImageOrPlaceholder } from '../utils/getImageOrPlaceholder';
import '../styles/ItemDetail.css';
import detail from '../styles/DetailedPage.module.css';
import { getItemByIdFromIndexedDB, getItemFavoritesFromIndexedDB, toggleItemFavoriteInIndexedDB } from '../utils/indexedDB';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // useEffect to fetch item details and favorites when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemByIdFromIndexedDB(id);
        if (!data) {
          throw new Error("Item not found in IndexedDB");
        }
        setItem(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item:', error);
        setError(error);
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const favoritesData = await getItemFavoritesFromIndexedDB();
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchItem();
    fetchFavorites();
  }, [id]);

  // Function to toggle the favorite status of an item
  const toggleFavorite = async (_id, item) => {
    await toggleItemFavoriteInIndexedDB(_id, item);
    const updatedFavorites = await getItemFavoritesFromIndexedDB();
    setFavorites(updatedFavorites);
  };

  // Display loading /error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading item details: {error.message}</div>;

  const cardStyle = {
    backgroundColor: '#566a74',
  };

  // Render the item details
  return (
    <div className={detail.detailContainer}>
      <div className={detail.detailCard} style={cardStyle}>
        <span className={detail.detailId}>#{item.id}</span>
        <button className={`${detail.favoriteButton} ${favorites.some(f => f._id === item._id) ? detail.favorited : ''}`}
          onClick={() => toggleFavorite(item._id, item)}>
          {favorites.some(f => f._id === item._id) ? '❤️' : '♡'}
        </button>
        <button className={detail.backButton} onClick={() => navigate('/', { state: { tab: 'item' } })}>
          <span>&#x2794;</span>
        </button>
        <h1 className={detail.detailName}>{item.name}</h1>
        <img className={detail.detailImage} src={getImageOrPlaceholder(item.sprites?.default)} alt={item.name}/>
        <div className="item-category">
          Category: {item.category?.name || 'Unknown'}
        </div>
        <div className="item-cost">
          Cost: {item.cost || '0'}
        </div>
        <div className="item-effect">
          Effect: {item.effect || 'No effect available'}
        </div>
        <div className="item-fling-power">
          Fling Power: {item.fling_power || '0'}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
