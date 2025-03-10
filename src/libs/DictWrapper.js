import DictWorker from './Dict.worker.js?worker';

const dictWorker = new DictWorker();

/**
 * Query the dictionary for a given word.
 * @param {string} word - The word to query.
 * @returns {Promise} - A promise that resolves with the query result or rejects with an error.
 */
export const queryDictionary = (word) => {
  return new Promise((resolve, reject) => {
    dictWorker.postMessage({ type: 'query', text: word });

    dictWorker.onmessage = (event) => {
      if (event.data.type === 'result') {
        resolve(event.data.result);
      } else if (event.data.type === 'error') {
        reject(new Error(event.data.error));
      }
    };

    dictWorker.onerror = (error) => {
      reject(new Error(error.message));
    };
  });
};

