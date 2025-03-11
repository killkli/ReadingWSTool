import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

/** @type {{db:null|import("@sqlite.org/sqlite-wasm").Database}} */
const instance = {
  db: null,
  init_promise: null,
}

const queryWord = async (word) => {
  if (!instance.db) {
    if (!instance.init_promise) {
      instance.init_promise = initializeSQLite();
    }
    await instance.init_promise;
  }
  /** @type {import("@sqlite.org/sqlite-wasm").Database} */
  const db = instance.db;
  const results =
    db.exec({
      sql: `select * from entries e
    join heteronyms h on h.entry_id = e.id
    join definitions d on d.heteronym_id = h.id
    where e.title = '${word}' 
    `,
      returnValue: "resultRows",
      rowMode: 'object',
    })
  return results;
}

self.addEventListener('message', async (event) => {
  if (event.data.type === 'query') {
    try {
      const { text, queryId } = event.data; // 接收 queryId
      const result = await queryWord(text);
      postMessage({ type: 'result', result, queryId: queryId, text }); // 回傳 queryId
    } catch (error) {
      postMessage({ type: 'error', error: error.message, queryId: event.data.queryId }); // 回傳 queryId
    }
  }
});


const log = console.log;
const error = console.error;

const start = async () => {
  const sqlite3 = await sqlite3InitModule({
    print: log,
    printErr: error,
  });
  log('Done initializing. Running demo...');
  log('Running SQLite3 version', sqlite3.version.libVersion);
  const response = await fetch('/ReadingWSTool/dict-revised.sqlite3');
  if (!response.ok) {
    throw new Error(`Failed to fetch database: ${response.statusText}`);
  }
  const dbData = await response.arrayBuffer();

  // Step 3: Create an in-memory database
  const db = new sqlite3.oo1.DB(':memory:', 'c'); // 'c' mode to create the database

  // Step 4: Allocate memory in the WebAssembly heap
  const pData = sqlite3.wasm.alloc(dbData.byteLength);
  if (!pData) {
    throw new Error('Failed to allocate memory in WebAssembly heap');
  }

  // Step 5: Copy the fetched data into the allocated memory
  const heap = sqlite3.wasm.heap8u();
  heap.set(new Uint8Array(dbData), pData);

  // Step 6: Load the data into the in-memory database
  const flags = sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE;
  const rc = sqlite3.capi.sqlite3_deserialize(
    db.pointer,       // Database handle
    'main',           // Schema name
    pData,            // Pointer to data in WASM memory
    dbData.byteLength, // Size of the data
    dbData.byteLength, // Buffer size (same as data size here)
    flags             // Free memory when database closes
  );
  if (rc !== sqlite3.capi.SQLITE_OK) {
    throw new Error(`Failed to deserialize database: error code ${rc}`);
  }
  log('Loading and initializing SQLite3 module...');

  instance.db = db;
};

const initializeSQLite = async () => {
  try {
    await start();
  } catch (err) {
    error('Initialization error:', err.name, err.message);
  }
};

