import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Main } from './components/Main'
export const horof = "ّضصثقفغعهخحجدشسيبلاتنمكطذئءؤرىةوزظ".split("")


function App() {
  const [helpModal, setHelpModal] = useState(false)
  return (
    <>
      <Header helpModal={helpModal} setHelpModal={setHelpModal}></Header>
      <Main></Main>
    </>
  )
}

export default App
