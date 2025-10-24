import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import ima from './components/images/tutorial.png'
import './App.css'
import TutorialsArea from './components/TutorialsArea'


function App() {
  

  return (
    <>
      <div className='App'>
        <p className='description' tabIndex="0">
          Escucha y descarga tutoriales dirgidos a personas con discapacidad visual en formato de audio, para que puedas realizar distintos procesos en tus dispositivos de forma rápida y accesible.
        </p>
        <img src= { ima }/>
        <div className='list-tutorial'>
          <TutorialsArea />
        </div>
      </div>
    </>
  )
}

export default App
