import { useEffect, useState } from 'react';
import wordsFile from "../5-letter-ar-words.txt";
import { Words } from './Words';
import { Keyboard } from './Keyboard'
import { horof } from "../App"

export function Main({ gameOver, setGameOver, targetWord, setTargetWord }) {
  const [wordsList, setWordsList] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [submittedWords, setSubmittedWords] = useState([]);
  const [submittedWordsMaps, setSubmittedWordsMaps] = useState([]); // state of each letter in submitted words
  const [horofMap, setHorofMap] = useState({}); // state of each letter in the alphabet

  const today = new Date();
  const startDay = new Date("Feb 19 2022");
  let index = Math.abs(today - startDay);
  index = Math.floor(index / (1000 * 60 * 60 * 24));
  const lastIndex = Number(localStorage["lastIndex"]);

  useEffect(
    () => {
      if (isNaN(lastIndex)) {
        localStorage.setItem("lastIndex", index);
      }
      if (localStorage["wordsList"]) {
        const words = localStorage["wordsList"].split(",")
        setWordsList(words);
        if (lastIndex == index) {
          setGameOver(localStorage["gameOver"] === "true");
          setHorofMap(JSON.parse(localStorage["horofMap"]));
          setSubmittedWords(localStorage["submittedWords"].split(","));
          setSubmittedWordsMaps(JSON.parse(localStorage["submittedWordsMaps"]));
        } else {
          localStorage.setItem("lastIndex", index);
        }
        setTargetWord(words[index % words.length])
      } else {
        fetch(wordsFile).then(
          response => response.text()
        ).then(
          (content) => {
            let words = content.split("\r\n");
            setWordsList(words);
            localStorage.setItem("wordsList", words);
            setTargetWord(words[index % words.length])
          }
        );
      }
    },
    []);

  useEffect(() => {
    localStorage.setItem("gameOver", gameOver);
    localStorage.setItem("horofMap", JSON.stringify(horofMap));
    localStorage.setItem("submittedWords", submittedWords);
    localStorage.setItem("submittedWordsMaps", JSON.stringify(submittedWordsMaps));
  });
  return (
    <main className='grid gap-4 my-4 justify-items-center place-items-center'>

      <form className='w-0 h-0 opacity-0'
        onSubmit={event => {
          handleSubmit(event, currentWord, wordsList, submittedWords,
            setSubmittedWords, setCurrentWord, submittedWordsMaps,
            setSubmittedWordsMaps, horofMap, setHorofMap, targetWord,
            gameOver, setGameOver);
        }}>
        <input className='w-0 h-0 opacity-0'
          id="input" value={currentWord}
          onChange={event => handleChange(event, currentWord, setCurrentWord, gameOver)}
          autoFocus="autofocus" autoComplete="false" />
        <input className='w-0 h-0 opacity-0' type="submit" value="" />
      </form>
      <label htmlFor="input">
        <Words currentWord={currentWord} submittedWords={submittedWords} submittedWordsMaps={submittedWordsMaps} />
      </label>
      <Keyboard setCurrentWord={setCurrentWord} currentWord={currentWord}
        submittedWords={submittedWords} setSubmittedWords={setSubmittedWords}
        wordsList={wordsList} horofMap={horofMap} gameOver={gameOver} />
    </main>
  );
}

function handleChange(event, currentWord, setCurrentWord, gameOver) {
  const newWord = event.target.value
  const lastLetter = newWord.at(-1) // get the last letter
  // if we erase letter or add new valid letter we change the word
  if ((newWord.length < currentWord.length) || (horof.includes(lastLetter) && currentWord.length < 5) && !gameOver) {
    setCurrentWord(newWord)
  }
}

function handleSubmit(event, currentWord, wordsList,
  submittedWords, setSubmittedWords, setCurrentWord,
  submittedWordsMaps, setSubmittedWordsMaps,
  horofMap, setHorofMap, targetWord,
  gameOver, setGameOver) {
  event.preventDefault()
  if ((currentWord.length == 5) && wordsList.includes(currentWord) && !gameOver) {
    let map = new Array(5).fill(0)

    let cw = currentWord // copy current and target word
    let tw = targetWord

    // loop throuhg the letters of the entered word and score the letter 
    // if it's not in the target it has a score of 0
    // if it's in the word but is not placed correctly it has score of 1
    // if it's in the word and in the correct place it has score of 2
    for (let i = 0; i < 5; i++) {
      horofMap[cw[i]] = 0
      if (cw[i] == tw[i]) {
        map[i] = 2
        horofMap[cw[i]] = 2
        cw = cw.replace(cw[i], "_")
        tw = tw.replace(tw[i], "_")
      }
    }
    for (let i = 0; i < 5; i++) {
      if (cw[i] == "_") continue
      if (tw.includes(cw[i])) {
        map[i] = 1
        horofMap[cw[i]] = 1
        tw = tw.replace(cw[i], "")
      }
    }
    if ((currentWord == targetWord) || (submittedWords.length == 5)) {
      setGameOver(true)
      localStorage.setItem("rounds", (localStorage["rounds"] || 0) + 1)
      if (currentWord == targetWord) {
        localStorage.setItem("wins", (localStorage["wins"] || 0) + 1)
        localStorage.setItem(submittedWords.length + 1, (localStorage[submittedWords.length + 1] || 0) + 1)
      } else {
        localStorage.setItem("losses", (localStorage["losses"] || 0) + 1)
      }
    }
    setSubmittedWords([...submittedWords, currentWord])
    setSubmittedWordsMaps([...submittedWordsMaps, map])
    setHorofMap(horofMap)
    setCurrentWord("")
  }
}
