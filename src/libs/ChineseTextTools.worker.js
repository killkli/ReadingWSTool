import { pipeline, env } from "@huggingface/transformers";

const POS_MODEL_NAME = "Xenova/bert-base-chinese-pos"
const WS_MODEL_NAME = "Xenova/bert-base-chinese-ws"

let Models = {
  ws: null,
  pos: null,
};


const initModels = async () => {
  try {
    Models.ws = await pipeline("token-classification", WS_MODEL_NAME);
    Models.pos = await pipeline("token-classification", POS_MODEL_NAME);
    postMessage({ type: 'modelsLoaded' });
  } catch (error) {
    console.error("Error initializing models in worker:", error);
    postMessage({ type: 'error', message: 'Failed to initialize models.' });
  }
};


const ClassifyTokens = async (raw_text) => {
  if (Models.ws === null || Models.pos === null) {
    console.warn("Models not loaded in worker.  Attempting to re-initialize.");
    await initModels(); // Attempt to re-initialize if not loaded
    if (Models.ws === null || Models.pos === null) {
        return { error: "Models not loaded" }; // Return an error if still not loaded
    }
  }
  try {
    const text_ws = await Models.ws(raw_text);
    const text_pos = await Models.pos(raw_text);
    const result = [];
    let temp_idx = -1;
    text_ws.forEach((ws_token, idx) => {
      if (ws_token.entity === "B") {
        temp_idx++;
        const cur_pos = text_pos[idx];
        result[temp_idx] = {
          word: ws_token.word,
          pos: cur_pos.entity,
        }
      } else {
        result[temp_idx].word += ws_token.word;
      }
    });
    return result;
  } catch (error) {
    console.error("Error during token classification in worker:", error);
    return { error: "Token classification failed." };
  }
};

// Initialize models when the worker starts
initModels();

self.addEventListener('message', async (event) => {
  if (event.data.type === 'classify') {
    const { text } = event.data;
    const result = await ClassifyTokens(text);
    postMessage({ type: 'result', result });
  }
});

