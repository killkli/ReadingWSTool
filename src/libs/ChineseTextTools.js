import { awn } from "./AWN";

let worker;

export const initWorker = () => {
  if (worker) {
    // If the worker is already initialized, terminate it and start a new one
    worker.terminate();
  }
  worker = new Worker(new URL('./ChineseTextTools.worker.js', import.meta.url),{ type: "module" });

  worker.onmessage = (event) => {
    if (event.data.type === 'result') {
      // Handle the result from the worker
      if (typeof window.classifyCallback === 'function') {
        window.classifyCallback(event.data.result);
      }
    } else if (event.data.type === 'error') {
      awn.alert(`Worker Error: ${event.data.message}`);
    } else if (event.data.type === 'modelsLoaded') {
      awn.success("模型已載入");
    }
  };

  worker.onerror = (error) => {
    awn.alert(`Worker Error: ${error.message}`);
    console.error("Worker error:", error);
  };
};

export const classifyText = (text) => {
  if (!worker) {
    initWorker();
  }
  return new Promise((resolve, reject) => {
    if (!worker) {
      initWorker();
    }
    const messageHandler = (event) => {
      if (event.data.type === 'result') {
        worker.removeEventListener('message', messageHandler); // Remove the listener
        resolve(event.data.result);
      } else if (event.data.type === 'error') {
        worker.removeEventListener('message', messageHandler); // Remove the listener
        awn.alert(`Worker Error: ${event.data.message}`);
        reject(event.data.message);
      }
    };
    worker.addEventListener('message', messageHandler);
    worker.postMessage({ type: 'classify', text });
  });
};
