export function Words({ currentWord, submittedWords, submittedWordsMaps }) {
  let words = Array(6).fill(undefined);
  let getWord = (currentWord, submittedWords, i) => {
    if (i > submittedWords.length) {
      return "";
    }
    return submittedWords[i] || currentWord;
  };

  return (
    <section className='space-y-1'>
      {words.map((_, i) => <WordRow key={i} word={getWord(currentWord, submittedWords, i)} wordMap={submittedWordsMaps[i] || []} />)}
    </section>
  );
}
function WordRow({ word, wordMap }) {
  let tiles = Array(5).fill(undefined);
  return (
    <div className='flex gap-1'>
      {tiles.map((tile, i) => <Tile key={i} id={i} letter={word[i] || " " /*pass letter or empty string*/} score={wordMap[i]} />)}
    </div>
  );
}
function Tile({ letter, score, id }) {
  const delays = ["", "delay-100", "delay-200", "delay-300", "delay-[.400s]"];
  let color = "";
  if (score == 0) {
    color = " bg-neutral-500 text-white ";
  } else if (score == 1) {
    color = " bg-amber-400 text-white ";
  } else if (score == 2) {
    color = " bg-emerald-500 text-white ";
  }
  color = color + delays[id];
  return (
    <div className={'transition-colors duration-1000 text-4xl font-black text-center border-2 border-gray-400 rounded w-14 aspect-square ' + color}>
      {letter}
    </div>
  );
}
