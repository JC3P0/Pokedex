import { getItemsFromIndexedDB, getPokemonFromIndexedDB } from './indexedDB';

export const checkCacheAndRedirect = async (navigate, setItems, setPokemon) => {
  const cachedItems = await getItemsFromIndexedDB();
  const cachedPokemon = await getPokemonFromIndexedDB();

  // Check if both cached items and Pokémon are empty
  if (cachedItems.length === 0 || cachedPokemon.length === 0) {
    // Redirect to main menu for preloading if either is not cached
    navigate('/');
  } else {
    // Set the relevant data depending on the page
    if (setItems) {
      setItems(cachedItems);
    }
    if (setPokemon) {
      setPokemon(cachedPokemon);
    }
  }
};
