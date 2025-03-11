import React from "react";
import { useState, useEffect } from "react";
import { classifyText } from "../libs/ChineseTextTools";
import PosText from "./PosText.jsx";

function Article({ originalText }) {
  const [processedText, setProcessedText] = useState([]);
  const [error, setError] = useState(null);

  const processTextRaw = async () => {
    setProcessedText(null);
    try {
      const processed = [];
      const sentences = originalText.split("\n");
      for (const sentence of sentences) {
        const posedText = await classifyText(sentence);
        processed.push(posedText);
      }
      setProcessedText(processed);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const processText = () => {
    processTextRaw();
  };

  useEffect(() => {
    if (originalText) {
      processText();
    }
  }, [originalText]);
  return (
    <div className="container text-[1.3rem] leading-[2.5rem] mx-auto p-4 font-sans text-gray-800 dark:text-gray-300 flex flex-col md:flex-row">
      <div
        className={
          "target md:w-1/2 p-4 rounded-2xl border border-gray-300 dark:border-gray-700" +
          (processedText === null ? " skeleton" : "")
        }
      >
        <div className="hero"><h3>分詞後</h3></div>
        {processedText === null ? "處理中..." : null}
        {(error ?? processedText !== null) ? (
          <PosText posedSentences={processedText} />
        ) : null}
      </div>
      <div className="normal md:w-1/2 p-4 rounded-2xl border border-gray-300 dark:border-gray-700 mr-4">
        <div className="hero"><h3>原文</h3></div>
        {originalText.split("\n").map((s, idx) => (
          <p key={`original_${s}_${idx}_${new Date().getTime()}`}> {s}</p>
        ))}
      </div>
    </div>
  );
}

export default Article;
