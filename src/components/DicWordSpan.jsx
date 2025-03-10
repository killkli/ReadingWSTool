import { queryDictionary } from "../libs/DictWrapper";
import { useState, useEffect } from "react";

export function DicWordSpan({ word, category }) {
  const [def_text, setDefText] = useState(null);

  useEffect(() => {
    queryDictionary(word).then((res) => {
      console.log(res);
      setDefText(res);
    });
  }, [word]);

  return (
    <div className={"tooltip  tooltip-bottom " + category}>
      <span className={"tooltip-content text-left"}>
        <ol className="list">
          {def_text instanceof Array
            ? def_text.map((d, idx) => (
                <li
                  className="list-row"
                  key={"def_" + word + Math.random() * idx * 100}
                >
                  {d.def}
                </li>
              ))
            : null}
        </ol>
      </span>
      <span className="font-extrabold">{word[0]}</span>
      {word.slice(1)}
    </div>
  );
}
