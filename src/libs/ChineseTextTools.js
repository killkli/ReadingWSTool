import { pipeline, env } from "@huggingface/transformers";
import { awn } from "./AWN"



const POS_MODEL_NAME = "Xenova/bert-base-chinese-pos"
const WS_MODEL_NAME = "Xenova/bert-base-chinese-ws"

export const Models = {
  ws: null,
  pos: null,
};


export const initModels = async () => {
  Models.ws = await pipeline("token-classification", WS_MODEL_NAME);
  Models.pos = await pipeline("token-classification", POS_MODEL_NAME);
};


export const ClassifyTokens = async (raw_text) => {
  if (Models.ws === null || Models.pos === null) {
    awn.warning("模型尚未載入，請等待模型載入")
    await awn.asyncBlock(initModels());
  }
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
    }else{
      result[temp_idx].word += ws_token.word;
    }
  });
  return result;
}
