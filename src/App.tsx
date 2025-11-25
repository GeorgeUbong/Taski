import React from 'react'
import Login from './auth/Login'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

