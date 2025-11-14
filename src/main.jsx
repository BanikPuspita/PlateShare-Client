import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout.jsx";
import Home from "./components/Pages/Home.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import Register from "./components/Pages/Register.jsx";
import Login from "./components/Pages/Login.jsx";
import AvailableFoods from "./components/Pages/AvailableFoods.jsx";
import FoodDetails from "./components/Pages/FoodDetails.jsx";
import PrivateRoute from "./components/Routes/PrivateRoute.jsx";
import AddFood from "./components/Pages/AddFood.jsx";
import UpdateFood from "./components/Pages/UpdateFood.jsx";
import MyRequests from "./components/Pages/MyRequests.jsx";
import RequestFood from "./components/Pages/MyRequests.jsx";
import ManageFoods from "./components/Pages/ManageFoods.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/available-foods", element: <AvailableFoods /> },
      {
        path: "/food/:id",
        element: <PrivateRoute><FoodDetails /></PrivateRoute>
      },
      {
        path: "/add-food",
        element: <PrivateRoute><AddFood /></PrivateRoute>
      },
      {
        path: "/update-food/:id",
        element: <PrivateRoute><UpdateFood /></PrivateRoute>
      },
      {
        path: "/my-requests",
        element: <PrivateRoute><MyRequests /></PrivateRoute>
      },
      {
        path: "/manage-foods",
        element: <PrivateRoute><ManageFoods /></PrivateRoute>
      },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
