// src/components/PokemonList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/pokemon')
      .then(response => setPokemon(response.data))
      .catch(error => console.error('Error fetching Pokemon:', error));
  }, []);

  return (
    <div>
      {pokemon.map(p => (
        <div key={p.id}>
          <Link to={`/pokemon/${p.id}`}>{p.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
