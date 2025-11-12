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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-requests",
        element: (
          <PrivateRoute>
            <MyRequests></MyRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "/request/:id",
        element: (
          <PrivateRoute>
            <RequestFood></RequestFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-foods",
        element: (
          <PrivateRoute>
            <ManageFoods></ManageFoods>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
