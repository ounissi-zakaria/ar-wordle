import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Main } from './components/Main'
export const horof = "ّضصثقفغعهخحجدشسيبلاتنمكطذئءؤرىةوزظ".split("")


function App() {
  const [gameOver, setGameOver] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  return (
    <>
      <Header gameOver={gameOver} targetWord={targetWord} />
      <Main gameOver={gameOver} setGameOver={setGameOver} targetWord={targetWord} setTargetWord={setTargetWord} />
    </>
  )
}

export default App
