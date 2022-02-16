import { useEffect, useState } from 'react'
import help from './help_black_24dp.svg'
import backSpace from "./keyboard_backspace_black_24dp.svg"
import returnKey from "./keyboard_return_black_24dp.svg"
import './App.css'
import wordsFile from "./5-letter-ar-words.txt"

const horof = "ّضصثقفغعهخحجدشسيبلاتنمكطذئءؤرىةوزظ".split("")
function Header() {
  return (
    <header className='flex w-screen px-6 py-2 shadow-md h-14'>
      <h1 className='m-auto font-mono font-black text-4xl'>
        كلمات
      </h1>
      <button className='h-full'>
        <img src={help} alt="مساعدة" title='مساعدة' />
      </button>
    </header>)
}

function Words({ currentWord, submittedWords }) {
  let words = Array(6).fill(undefined)
  let getWord = (currentWord, submittedWords, i) => {
    if (i > submittedWords.length) {
      return ""
    }
    return submittedWords[i] || currentWord
  }
  return (
    <section className='space-y-1'>
      {words.map((_, i) => <WordRow key={i} word={getWord(currentWord, submittedWords, i)} />)}
    </section>
  )
}
function WordRow({ word }) {
  let tiles = Array(5).fill(undefined)
  return (
    <div className='flex gap-1'>
      {tiles.map((tile, i) => <Tile key={i} letter={word[i] || " " /*pass letter or empty string*/} />)}
    </div>
  )
}

function Tile({ letter }) {
  return (
    <div className='text-4xl font-black text-center border-2 border-gray-400 rounded w-14 aspect-square' >
      {letter}
    </div>
  )
}

function Keyboard() {
  return (
    <section className='grid w-full max-w-lg grid-cols-12 grid-rows-3 gap-1'>
      {horof.map((harf) => <KeyButton key={harf}>{harf}</KeyButton>)}
      <KeyButton>
        <img src={returnKey} alt="وافق على الكلمة" />
      </KeyButton>
      <KeyButton className="col-start-1 row-start-3">
        <img src={backSpace} alt="احذف اخر حرف" />
      </KeyButton>

    </section>
  )
}
function KeyButton({ children, className }) {
  return (
    <div className={'py-4 px-0.5 font-bold text-center bg-gray-200 rounded-md' + className}>
      {children}
    </div>
  )
}


function Main() {
  const [wordsList, setWordsList] = useState([])
  const [currentWord, setCurrentWord] = useState("")
  const [submittedWords, setSubmittedWords] = useState([])
  const [targetWords, setTargetWord] = useState("")

  useEffect(
    () => {
      fetch(wordsFile).then(
        response => response.text()
      ).then(
        (content) => {
          setWordsList(content.split("\r\n"))
          setTargetWord()
        }
      )
    }
    , [])
  return (
    <main >

      <form className='w-0 h-0 opacity-0'
        onSubmit={event => handleSubmit(event, currentWord, wordsList, submittedWords, setSubmittedWords, setCurrentWord)} >
        <input className='w-0 h-0 opacity-0'
          id="input" value={currentWord}
          onChange={event => handleChange(event, currentWord, setCurrentWord)} />
        <input className='w-0 h-0 opacity-0' type="submit" value="" />
      </form>
      <label htmlFor="input" className='grid gap-4 my-4 justify-items-center place-items-center'>
        <Words currentWord={currentWord} submittedWords={submittedWords} />
        <Keyboard />
      </label>
    </main>
  )
}

function handleChange(event, currentWord, setCurrentWord) {
  const newWord = event.target.value
  const lastLetter = newWord.at(-1) // get the last letter
  // if we erase letter or add new valid letter we change the word
  if ((newWord.length < currentWord.length) || (horof.includes(lastLetter) && currentWord.length < 5)) {
    setCurrentWord(newWord)
  }
}

function handleSubmit(event, currentWord, wordsList, submittedWords, setSubmittedWords, setCurrentWord) {
  event.preventDefault()
  if ((currentWord.length == 5) && wordsList.includes(currentWord)) {
    setSubmittedWords([...submittedWords, currentWord])
    setCurrentWord("")
  }
}

function App() {

  return (
    <>
      <Header></Header>
      <Main></Main>
    </>
  )
}

export default App
