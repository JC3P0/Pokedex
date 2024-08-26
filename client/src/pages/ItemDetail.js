import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ItemDetail.css';
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

  // Render the item details
  return (
    <div className="item-detail">
      <div className="detail-card">
        <span className="item-id">#{item.id}</span>
        <button className="favorite-button" onClick={() => toggleFavorite(item._id, item)}>
          {favorites.some(f => f._id === item._id) ? '❤️' : '♡'}
        </button>
        <button className="back-button" onClick={() => navigate('/', { state: { tab: 'items' } })}>
          ←
        </button>
        <h1 className="item-name">{item.name}</h1> {/* Display item name */}
        <img className="item-image" src={item.sprites?.default || ''} alt={item.name} />
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
