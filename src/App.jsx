import { useState } from 'react'
import logo from './logo.svg'
import help from './help_black_24dp.svg'
import backSpace from "./keyboard_backspace_black_24dp.svg"
import returnKey from "./keyboard_return_black_24dp.svg"
import './App.css'

function Header() {
  return (
    <header className='flex w-screen px-6 py-2 shadow-md h-14'>
      <div className='h-full m-auto'>
        <img className='h-full' src={logo} alt="شعار الموقع" />
      </div>
      <button className='h-full'>
        <img src={help} alt="مساعدة" title='مساعدة' />
      </button>
    </header>)
}

function Words() {
  let words = Array(6).fill(undefined)
  return (
    <section className='space-y-1'>
      {words.map((word, i) => <WordRow key={i}></WordRow>)}
    </section>
  )
}
function WordRow() {
  let tiles = Array(5).fill(undefined)
  return (
    <div className='flex gap-1'>
      {tiles.map((tile, i) => <Tile key={i}></Tile>)}
    </div>
  )
}

function Tile() {
  return (
    <div className='border-2 border-gray-400 rounded w-14 aspect-square' >
    </div>
  )
}

function Keyboard() {
  let horof = "ّضصثقفغعهخحجدشسيبلاتنمكطذئءؤرىةوزظ".split("")
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
  return (
    <main className='grid gap-4 my-4 justify-items-center place-items-center'>
      <Words></Words>
      <Keyboard></Keyboard>
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
