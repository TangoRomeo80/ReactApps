import React from 'react'
import Pokecard from './components/Pokecard'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Pokecard id={4} name="Cahrmander" type="fire" exp={62} />
    </div>
  )
}

export default App
