import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemDetail.css';
import { getItemByIdFromIndexedDB, getItemFavoritesFromIndexedDB, toggleItemFavoriteInIndexedDB } from '../utils/indexedDB';

const ItemDetail = () => {
  const { id } = useParams(); // Get the item ID from the URL parameters
  const [item, setItem] = useState(null); // State to store the item details
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to store any errors
  const [favorites, setFavorites] = useState([]); // State to store the list of favorite items
  const navigate = useNavigate(); // Hook to navigate programmatically

  // useEffect to fetch item details and favorites when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemByIdFromIndexedDB(id); // Fetch item details from IndexedDB by ID
        if (!data) {
          throw new Error("Item not found in IndexedDB");
        }
        setItem(data); // Set the item state with fetched data
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching item:', error);
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    const fetchFavorites = async () => {
      try {
        const favoritesData = await getItemFavoritesFromIndexedDB(); // Fetch favorite items from IndexedDB
        setFavorites(favoritesData); // Set the favorites state with fetched data
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchItem(); // Fetch the item details
    fetchFavorites(); // Fetch the favorites
  }, [id]); // Dependency array to refetch data when the item ID changes

  // Function to toggle the favorite status of an item
  const toggleFavorite = async (_id, item) => {
    await toggleItemFavoriteInIndexedDB(_id, item); // Toggle favorite status in IndexedDB
    const updatedFavorites = await getItemFavoritesFromIndexedDB(); // Fetch the updated list of favorites
    setFavorites(updatedFavorites); // Update the favorites state
  };

  // Display loading state
  if (loading) return <div>Loading...</div>;
  // Display error state
  if (error) return <div>Error loading item details: {error.message}</div>;

  // Render the item details
  return (
    <div className="item-detail">
      <div className="detail-card">
        <span className="item-id">#{item.id}</span> {/* Display item ID */}
        <button className="favorite-button" onClick={() => toggleFavorite(item._id, item)}>
          {favorites.some(f => f._id === item._id) ? '❤️' : '♡'} {/* Toggle favorite status */}
        </button>
        <button className="back-button" onClick={() => navigate('/', { state: { tab: 'items' } })}>
          ← {/* Navigate back to the items tab */}
        </button>
        <h1 className="item-name">{item.name}</h1> {/* Display item name */}
        <img className="item-image" src={item.sprites?.default || ''} alt={item.name} /> {/* Display item image */}
        <div className="item-category">
          Category: {item.category?.name || 'Unknown'} {/* Display item category */}
        </div>
        <div className="item-cost">
          Cost: {item.cost || '0'} {/* Display item cost */}
        </div>
        <div className="item-effect">
          Effect: {item.effect || 'No effect available'} {/* Display item effect */}
        </div>
        <div className="item-fling-power">
          Fling Power: {item.fling_power || '0'} {/* Display item fling power */}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail; // Export the component for use in other parts of the application
