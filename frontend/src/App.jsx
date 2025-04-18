import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/clerk-react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {

  return (
      <Routes>
        <Route path="/" element={<Home /> }/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
  )
}

export default App
