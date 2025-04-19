// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ClerkProvider } from '@clerk/clerk-react';
import { store } from './store/store.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



createRoot(document.getElementById("root")).render(

    <div className='bg-richblack-900 w-full min-h-screen'>
      
      <BrowserRouter>
          <App />
        </BrowserRouter>

    </div>

);
