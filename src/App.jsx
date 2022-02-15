import { useState } from 'react'
import logo from './logo.svg'
import help from './help_black_24dp.svg'
import './App.css'

function Header() {
  return (
    <header className='flex w-screen px-6 py-2 shadow-md h-14'>
      <div className='h-full m-auto'>
        <img className='h-full' src={logo} alt="شعار الموقع" />
      </div>
      <button className='h-full'>
        <img src={help} alt="مساعدة" />
      </button>
    </header>)
}
function Main() {
  return (
    <main>

    </main>
  )
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
