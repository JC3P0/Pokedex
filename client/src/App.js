import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import PokemonDetail from './components/PokemonDetail';
import { FavoritesProvider } from './context/FavoritesContext';
import { ItemsProvider } from './context/ItemsContext'; // Add this line

function App() {
  return (
    <FavoritesProvider>
      <ItemsProvider> {/* Add this line */}
        <Router>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
          </Routes>
        </Router>
      </ItemsProvider> {/* Add this line */}
    </FavoritesProvider>
  );
}

export default App;
