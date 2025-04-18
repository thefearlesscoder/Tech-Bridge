
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import { SignIn, SignUp } from '@clerk/clerk-react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import CreateProjectPage from './pages/UploadPorject';

function App() {
  return (
      <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home /> }/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/upload-project" element={< CreateProjectPage/>} />
          </Routes>
      </div>
  );
      
  
}

export default App;

