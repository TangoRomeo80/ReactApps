import React from 'react'
import Die from './components/Die'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Die face='five' />
      <Die face='one' />
      <Die face='two' />
      <Die face='four' />
    </div>
  )
}

export default App
