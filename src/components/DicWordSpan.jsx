import { queryDictionary } from "../libs/DictWrapper";
import { useState, useEffect } from "react";

export function DicWordSpan({ word, category }) {
  const [def_text, setDefText] = useState(null);

  queryDictionary(word).then((res) => {
    setDefText(JSON.stringify(res));
  });

  useEffect(() => {
    queryDictionary(word).then((res) => {
      setDefText(JSON.stringify(res));
    });
  }, [word]);

  return (
    <span className={"tooltip " + category}>
      <span className="tooltip-content">
        <span className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">
          {def_text ?? "讀取中"}
        </span>
      </span>
      <span className="font-extrabold">{word[0]}</span>
      {word.slice(1)}
    </span>
  );
}
