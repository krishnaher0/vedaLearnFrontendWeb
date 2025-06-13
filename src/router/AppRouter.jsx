

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import React from 'react'
import WelcomeScreen from '../pages/WelcomeScreen'
import Register from '../pages/Register'
import Login from '../pages/Login'
import MainLayout from '../layout/MainLayout'

export default function AppRouter() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<WelcomeScreen/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>

        <Route element={<MainLayout/>}></Route>
    </Routes>

    </BrowserRouter>
    
  )
}
