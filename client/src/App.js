import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import PokemonPage from './pages/PokemonPage';
import ItemsPage from './pages/ItemsPage';
import PokemonDetail from './pages/PokemonDetail';
import ItemDetail from './pages/ItemDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/pokemon" element={<PokemonPage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
