import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Error from "../pages/Error";
import Home from "../pages/Home";
import BrowseCars from "../pages/BrowseCars";
import AddCars from "../pages/AddCars";
import MyListings from "../pages/MyListings";
import MyBookings from "../pages/MyBookings";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UpdateCar from "../pages/UpdateCar";
import CarDetails from "../pages/CarDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,
    children: [
      { index: true, Component: Home },
      { path: "browseCars", Component: BrowseCars },
      {
        path: "addCar",
        Component: () => (
          <PrivateRoute>
            <AddCars />
          </PrivateRoute>
        ),
      },
      {
        path: "myListings",
        Component: () => (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "myBookings",
        Component: () => (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
       {
        path: "update-car/:id",
        Component: () => (
          <PrivateRoute>
            <UpdateCar></UpdateCar>
          </PrivateRoute>
        ),
      },
      {
        path: "car-details/:id",
        Component: () => (
          <PrivateRoute>
            <CarDetails></CarDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        Component: () => (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },

    ],
  },
]);
