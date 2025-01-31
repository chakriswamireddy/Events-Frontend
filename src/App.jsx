import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter,Navigate,Route, Routes} from 'react-router-dom'
import AuthorizeUser from './mycomponents/AuthorizeUser'
import Homepage from './mycomponents/Homepage'
import 'animate.css';

function App() {

  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/authorize' />} />

      <Route path='/authorize' element={<AuthorizeUser /> } />
      
      <Route path='/home' element= {<Homepage />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
