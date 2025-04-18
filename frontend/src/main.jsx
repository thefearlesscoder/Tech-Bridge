import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API;

createRoot(document.getElementById("root")).render(

    <div className='bg-richblack-900 w-full min-h-screen'>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </div>

);
