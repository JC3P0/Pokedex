import { fetchPokemon, fetchItems } from './api';
import { savePokemonToIndexedDB, getPokemonFromIndexedDB, saveItemsToIndexedDB, getItemsFromIndexedDB } from './indexedDB';

export const preloadData = async () => {
  const fetchDataInChunks = async (fetchFunction, saveFunction) => {
    let allData = [];
    let page = 1;
    let limit = 100;
    let chunk;

    do {
      chunk = await fetchFunction(page, limit);
      if (chunk.length > 0) {
        allData = allData.concat(chunk);
        await saveFunction(chunk);
      }
      page++;
    } while (chunk.length === limit);

    return allData;
  };

  const pokemonData = await getPokemonFromIndexedDB();
  if (pokemonData.length === 0) {
    await fetchDataInChunks(fetchPokemon, savePokemonToIndexedDB);
  }

  const itemsData = await getItemsFromIndexedDB();
  if (itemsData.length === 0) {
    await fetchDataInChunks(fetchItems, saveItemsToIndexedDB);
  }
};
