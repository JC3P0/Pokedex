// src/components/PokemonDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetail.css'; // Import the CSS file

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching Pokemon:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const addToFavorites = () => {
    axios.post(`http://localhost:3001/api/favorites/${id}`)
      .then(response => alert('Added to favorites'))
      .catch(error => {
        console.error('Error adding to favorites:', error);
        alert('Failed to add to favorites');
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details: {error.message}</div>;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>{pokemon.description}</p>
      <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
      <button onClick={addToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default PokemonDetail;
