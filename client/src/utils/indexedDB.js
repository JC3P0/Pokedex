// src/utils/indexedDB.js
const dbName = "PokedexDB";
const pokemonStore = "pokemon";
const itemsStore = "items";
const pokemonFavoritesStore = "pokemonFavorites";
const itemFavoritesStore = "itemFavorites";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(pokemonStore)) {
        db.createObjectStore(pokemonStore, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(itemsStore)) {
        db.createObjectStore(itemsStore, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(pokemonFavoritesStore)) {
        db.createObjectStore(pokemonFavoritesStore, { keyPath: "_id" });
      }
      if (!db.objectStoreNames.contains(itemFavoritesStore)) {
        db.createObjectStore(itemFavoritesStore, { keyPath: "_id" });
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
  const transaction = db.transaction(pokemonStore, "readwrite");
  const store = transaction.objectStore(pokemonStore);
  pokemon.forEach((p) => store.put(p));
  return transaction.complete;
};

export const getPokemonFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(pokemonStore, "readonly");
  const store = transaction.objectStore(pokemonStore);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getPokemonByIdFromIndexedDB = async (id) => {
  const db = await openDB();
  const transaction = db.transaction(pokemonStore, "readonly");
  const store = transaction.objectStore(pokemonStore);
  return new Promise((resolve, reject) => {
    const request = store.get(parseInt(id, 10));
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const saveItemsToIndexedDB = async (items) => {
  const db = await openDB();
  const transaction = db.transaction(itemsStore, "readwrite");
  const store = transaction.objectStore(itemsStore);
  items.forEach((item) => store.put(item));
  return transaction.complete;
};

export const getItemsFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(itemsStore, "readonly");
  const store = transaction.objectStore(itemsStore);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getItemByIdFromIndexedDB = async (id) => {
  const db = await openDB();
  const transaction = db.transaction(itemsStore, "readonly");
  const store = transaction.objectStore(itemsStore);
  return new Promise((resolve, reject) => {
    const request = store.get(parseInt(id, 10));
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getPokemonFavoritesFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(pokemonFavoritesStore, "readonly");
  const store = transaction.objectStore(pokemonFavoritesStore);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const getItemFavoritesFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction(itemFavoritesStore, "readonly");
  const store = transaction.objectStore(itemFavoritesStore);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

export const togglePokemonFavoriteInIndexedDB = async (_id, entity) => {
  const db = await openDB();
  const transaction = db.transaction(pokemonFavoritesStore, "readwrite");
  const store = transaction.objectStore(pokemonFavoritesStore);
  const existingFavorite = await new Promise((resolve, reject) => {
    const request = store.get(_id);
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });

  if (existingFavorite) {
    store.delete(_id);
    console.log(`Removed ${entity.name} from favorites`);
  } else {
    store.put({ _id, ...entity });
    console.log(`Added ${entity.name} to favorites`);
  }
  return transaction.complete;
};

export const toggleItemFavoriteInIndexedDB = async (_id, entity) => {
  const db = await openDB();
  const transaction = db.transaction(itemFavoritesStore, "readwrite");
  const store = transaction.objectStore(itemFavoritesStore);
  const existingFavorite = await new Promise((resolve, reject) => {
    const request = store.get(_id);
    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
    request.onerror = (event) => {
      reject(event.target.error);
    };
  });

  if (existingFavorite) {
    store.delete(_id);
    console.log(`Removed ${entity.name} from favorites`);
  } else {
    store.put({ _id, ...entity });
    console.log(`Added ${entity.name} to favorites`);
  }
  return transaction.complete;
};
