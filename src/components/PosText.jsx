import { classifyTag } from "../libs/TagToClass.js";
function LongWord({ word }) {
  return (
    <>
      <span className="font-extrabold">{word[0]}</span>
      {word.slice(1)}
    </>
  );
}

const PosText = ({ posedSentences }) => (
  <>
    {posedSentences.map((s) => {
      return (
        <p>
          {s.map((word) => {
            const category = `${classifyTag(word.pos)}`;
            if (word.word.length > 1) {
              return (
                <span className={category}>
                  <LongWord word={word.word} />
                </span>
              );
            } else {
              return <span className={category}>{word.word}</span>;
            }
          })}
        </p>
      );
    })}
  </>
);

export default PosText;
