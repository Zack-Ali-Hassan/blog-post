import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/loginPage.jsx'
import SignupPage from './pages/signupPage.jsx'
import { AuthProvider } from './Context.jsx'
import CreatePostPage from './pages/CreatePostPage.jsx'

import {Toaster} from 'react-hot-toast';
const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children :[
      {
        path : '/login',
        element : <LoginPage/>
      },
      {
        path : '/signup',
        element : <SignupPage/>
      },
      {
        path : '/create-post',
        element : <CreatePostPage/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
   <AuthProvider>
    
   <Toaster />
   <RouterProvider router={router}/>
   </AuthProvider>
  </React.StrictMode>,
)
