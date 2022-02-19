import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Main } from './components/Main'
export const horof = "ّضصثقفغعهخحجدشسيبلاتنمكطذئءؤرىةوزظ".split("")


function App() {
  const [targetWord, setTargetWord] = useState("");
  const [statsModal, setStatsModal] = useState(false)

  return (
    <>
      <Header targetWord={targetWord} statsModal={statsModal} setStatsModal={setStatsModal} />
      <Main targetWord={targetWord} setTargetWord={setTargetWord} setStatsModal={setStatsModal} />
    </>
  )
}

export default App
