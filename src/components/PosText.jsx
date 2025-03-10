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
    {posedSentences.map((s,idx) => {
      return (
        <p key={`${s}_${idx}_${new Date().getTime()}`}>
          {s.map((word,idx) => {
            const category = `${classifyTag(word.pos)}`;
            const key = `${word}_${idx}_${new Date().getTime()}`;
            if (word.word.length > 1) {
              return (
                <span className={category} key={key}>
                  <LongWord word={word.word} />
                </span>
              );
            } else {
              return <span className={category} key={key}>{word.word}</span>;
            }
          })}
        </p>
      );
    })}
  </>
);

export default PosText;
