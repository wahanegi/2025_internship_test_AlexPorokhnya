import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Registration from './Registration'
import Login from './Login'
import CreatePost from './CreatePost'
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