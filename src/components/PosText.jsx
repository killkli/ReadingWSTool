import { classifyTag } from "../libs/TagToClass.js";
import { DicWordSpan } from "./DicWordSpan.jsx";

const PosText = ({ posedSentences }) => (
  <>
    {posedSentences.map((s, idx) => {
      return (
        <p key={`${s}_${idx}_${new Date().getTime()}`}>
          {s.map((word, idx) => {
            const category = `${classifyTag(word.pos)}`;
            const key = `${word}_${idx}_${new Date().getTime()}`;
            if (word.word.length > 1) {
              return (
                <DicWordSpan word={word.word} category={category} key={key} />
              );
            } else {
              return (
                <span className={category} key={key}>
                  {word.word}
                </span>
              );
            }
          })}
        </p>
      );
    })}
  </>
);

export default PosText;
