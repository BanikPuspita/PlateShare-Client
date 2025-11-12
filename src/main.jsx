import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout.jsx'
import Home from './components/Pages/Home.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import Register from './components/Pages/Register.jsx'
import Login from './components/Pages/Login.jsx'
import AvailableFoods from './components/Pages/AvailableFoods.jsx'
import FoodDetails from './components/Pages/FoodDetails.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>
      },
      {
        path: "/food/:id",
        element: <FoodDetails></FoodDetails>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
