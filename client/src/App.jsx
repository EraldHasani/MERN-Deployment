import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Display from './components/Display'
import DisplayOne from './components/DisplayOne'
import Form from './components/Form'
import Update from './components/Update'
import {AuthProvider, useAuth} from './AuthContext'
import axios from 'axios'
import LoginPage from './views/LoginPage'
import Home from './views/Home'

import './App.css'

function App() {
  const {user}= useAuth();
  const token = localStorage.getItem('token');
  const [pirates,setPirates] = useState([]);


  return (
    <>
    
    <BrowserRouter>
    <Routes>
      { token?  (
        <>
    <Route path="/" element={<Display pirates={pirates} setPirates={setPirates} user={user}/>} />
    <Route path="/pirates" element={<Display pirates={pirates} setPirates={setPirates} user={user}/>} />
    <Route path="/pirates/add" element={<Form user={user}/>} />
    <Route path="/pirate/details/:id" element={<DisplayOne user={user}/>} />
    <Route path="/pirates/update/:id/" element={<Update user={user}/>} />
    </>
    ) : (
      <Route path="*" element={<LoginPage/>} />
      ) }

    </Routes>

    </BrowserRouter>



    </>
  )
}

export default App
