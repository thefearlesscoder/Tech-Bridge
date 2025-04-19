import { Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/clerk-react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard.jsx'
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import CreateProjectPage from './pages/UploadPorject';
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/upload-project" element={<CreateProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
