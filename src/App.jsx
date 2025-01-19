import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter,Link,Navigate,Route, Routes} from 'react-router-dom'
import AuthorizeUser from './mycomponents/AuthorizeUser'
import Homepage from './mycomponents/Homepage'
import 'animate.css';
import { Home } from 'lucide-react'

function App() {

  

  useEffect(()=> {

  },[])

  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<div> HI <Home /> <Link to='/authorize'> Enter  </Link>  </div>} />

      <Route path='/authorize' element={<AuthorizeUser /> } />
      
      <Route path='/home' element= {<Homepage />} />

    </Routes>
    </BrowserRouter>
  )
}

export default App
