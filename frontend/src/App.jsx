import { Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from '@clerk/clerk-react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard.jsx'
import SignupForm from './pages/SignupForm'
import LoginForm from './pages/LoginForm'
import CreateProjectPage from './pages/UploadPorject'
import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import AOS from "aos"
import "aos/dist/aos.css"
import CommunityPage from './pages/CommunityPage.jsx'
import MakeCommunityPost from './pages/MakeCommunityPost.jsx'
import { Project } from './pages/Project.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import { MySpace } from './pages/MySpace.jsx'
import WishlistPage from './pages/WishlistPage.jsx'

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    })
  }, [])

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/upload-project" element={<CreateProjectPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/make-post" element={<MakeCommunityPost />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/project-detail/:id" element={<ProjectDetail />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/my-space" element={<MySpace />} />
      </Routes>
    </div>
  )
}

export default App
