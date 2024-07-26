// utils/indexedDB.js
const DB_NAME = 'PokedexDB';
const DB_VERSION = 1;
const POKEMON_STORE = 'pokemon';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(POKEMON_STORE)) {
        db.createObjectStore(POKEMON_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const savePokemonToIndexedDB = async (pokemon) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([POKEMON_STORE], 'readwrite');
    const store = transaction.objectStore(POKEMON_STORE);
    store.clear(); // Clear the store before saving new data

    for (const p of pokemon) {
      store.add(p);
    }

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getPokemonFromIndexedDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([POKEMON_STORE], 'readonly');
    const store = transaction.objectStore(POKEMON_STORE);
    const request = store.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};
