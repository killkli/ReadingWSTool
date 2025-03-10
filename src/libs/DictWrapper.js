import DictWorker from './Dict.worker.js?worker';

const dictWorker = new DictWorker();

// 儲存 Promise 的 resolve 函式，以便在收到 Worker 回應時呼叫
const pendingQueries = new Map();
let queryIdCounter = 0;

dictWorker.onmessage = (event) => {
  if (event.data.type === 'result') {
    const { queryId, result } = event.data;
    const { resolve } = pendingQueries.get(queryId);
    if (resolve) {
      resolve(result);
      pendingQueries.delete(queryId); // 清除已完成的查詢
    }
  } else if (event.data.type === 'error') {
    const { queryId, error } = event.data;
    const { reject } = pendingQueries.get(queryId);
    if (reject) {
      reject(new Error(error));
      pendingQueries.delete(queryId); // 清除已完成的查詢
    }
  }
};

dictWorker.onerror = (error) => {
  console.error("DictWorker error:", error);
};

/**
 * Query the dictionary for a given word.
 * @param {string} word - The word to query.
 * @returns {Promise} - A promise that resolves with the query result or rejects with an error.
 */
export const queryDictionary = (word) => {
  return new Promise((resolve, reject) => {
    queryIdCounter++;
    const queryId = queryIdCounter;
    pendingQueries.set(queryId, { resolve, reject }); // 儲存 resolve 函式，key 為 queryId
    dictWorker.postMessage({ type: 'query', text: word, queryId: queryId }); // 送出 queryId 給 Worker
    // 注意：不要在這裡設定 dictWorker.onmessage，已經在檔案頂層設定過了
  });
};
