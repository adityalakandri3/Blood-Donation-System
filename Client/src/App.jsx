import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/layout/Root.jsx";
import UserSignUp from "./components/pages/Auth/UserSignUp.jsx";
import UserSignIn from "./components/pages/Auth/UserSignIn.jsx";
import OtpVerify from "./components/pages/Auth/OtpVerify.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import BloodRequest from "./components/pages/BloodRequest.jsx";
import { AuthRouter } from "./middleware/AuthRouter.jsx";
import BloodRequestedList from "./components/pages/BloodRequestedList.jsx";
import BloodCampList from "./components/pages/BloodCampList.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/pages/Auth/Profile.jsx";
import ProfileUpdate from "./components/pages/Auth/ProfileUpdate.jsx";
import PasswordUpdate from "./components/pages/Auth/PasswordUpdate.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <UserSignUp />,
      },
      {
        path: "/signin",
        element: <UserSignIn />,
      },
      {
        path: "/otpverify",
        element: <OtpVerify />,
      },
      {
        element: <AuthRouter />,
        children: [
          {
            path: "/profile",
            element: <Profile />
          },
          {
            path: "/edit-user/:id",
            element: <ProfileUpdate />
          },
          {
            path: "/update-password",
            element: <PasswordUpdate />
          },
          {
            path: "/bloodrequest",
            element: <BloodRequest />,
          },
          {
            path: "/bloodrequestlist",
            element: <BloodRequestedList />,
          },
          {
            path: "/bloodcamp",
            element: <BloodCampList />,
          },
          
      
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
