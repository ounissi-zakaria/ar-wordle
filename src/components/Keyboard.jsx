import backSpace from "../keyboard_backspace_black_24dp.svg";
import returnKey from "../keyboard_return_black_24dp.svg";
import { horof } from '../App';

export function Keyboard({ setCurrentWord, currentWord, submittedWords, setSubmittedWords, wordsList, horofMap, gameOver }) {
  return (
    <section className='grid w-full max-w-lg grid-cols-12 grid-rows-3 gap-1'>
      {horof.map((harf) => {
        return <KeyButton key={harf} onClick={handleKeyClick} currentWord={currentWord}
          setCurrentWord={setCurrentWord} score={horofMap[harf]} disabled={gameOver}>{harf}</KeyButton>;
      })}
      <KeyButton
        onClick={(children, currentWord, setCurrentWord) => {
          // trigger submit event 
          let e = new Event("submit", { bubbles: true });
          let form = document.querySelector("main > form");
          form.dispatchEvent(e);
        }}
        currentWord={currentWord} setCurrentWord={setCurrentWord} score={undefined} disabled={gameOver}>
        <img src={returnKey} alt="وافق على الكلمة" />
      </KeyButton>
      <KeyButton score={undefined} className="col-start-1 row-start-3" currentWord={currentWord} setCurrentWord={setCurrentWord}
        onClick={(children, currentWord, setCurrentWord) => setCurrentWord(currentWord.slice(0, -1))} disabled={gameOver}>
        <img src={backSpace} alt="احذف اخر حرف" />
      </KeyButton>

    </section>
  );
}
function KeyButton({ children, className, onClick, currentWord, setCurrentWord, score, disabled }) {
  let color = " bg-gray-200";
  if (score == 0) {
    color = " bg-neutral-500 text-white";
  } else if (score == 1) {
    color = " bg-amber-400 text-white";
  } else if (score == 2) {
    color = " bg-emerald-500 text-white";
  }
  return (
    <button className={'py-4 px-0.5 font-bold rounded-md ' + className + color}
      onClick={event => onClick(children, currentWord, setCurrentWord)} disabled={disabled}>
      {children}
    </button>
  );
}
function handleKeyClick(harf, currentWord, setCurrentWord) {
  if (currentWord.length < 5) {
    setCurrentWord(currentWord + harf);
  }

}
