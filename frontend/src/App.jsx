
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import { SignIn, SignUp } from '@clerk/clerk-react'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
      <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home /> }/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
      </div>
  );
      
  
}

export default App;

