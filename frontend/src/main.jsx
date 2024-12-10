import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
import CreatePost from './components/CreatePost.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }, 
  {
    path: "/register",
    element: <Registration />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/newpost", 
    element: <CreatePost />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
