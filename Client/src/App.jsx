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
import ForgotPasswordLink from "./components/pages/Auth/ForgotPasswordLink.jsx";
import ResetPasswork from "./components/pages/Auth/ResetPasswork.jsx";
import UpdateBloodRequest from "./components/pages/UpdateBloodRequest.jsx";
import BloodRequestedListForDonors from "./components/pages/BloodRequestedListForDonors.jsx";
import UpdateRequestDonor from "./components/pages/UpdateRequestDonor.jsx";
import BloodCampDetails from "./components/pages/BloodCampDetails.jsx";
import MyRegistrations from "./components/pages/MyRegistrations.jsx";
import CancelRegistration from "./components/pages/CancelRegistration.jsx";
import Contact from "./components/pages/Contact.jsx";
import About from "./components/pages/About.jsx";

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
        path: "/reset-password-link",
        element: <ForgotPasswordLink />,
      },
      {
        path: "/account/reset-password/:id/:token",
        element: <ResetPasswork />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About/>,
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
            path: "/create-blood-request",
            element: <BloodRequest />,
          },
          {
            path: "/blood-request-list",
            element: <BloodRequestedList />,
          },
          {
            path: "/update-bloodrequest/:id",
            element: <UpdateBloodRequest />,
          },
          {
            path: "/get-blood-request-donor",
            element: <BloodRequestedListForDonors />,
          },
          
          {
            path: "/update-request-donor/:id",
            element: <UpdateRequestDonor />,
          },
          {
            path: "/blood-camp-list",
            element: <BloodCampList />,
          },
          {
            path: "/blood-camp/:id",
            element: <BloodCampDetails />,
          },
          {
            path: "/my-registrations",
            element: <MyRegistrations />,
          },
          {
            path: "/my-registrations/cancel-registration/:id",
            element: <CancelRegistration />,
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
