import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Root from "./layouts/Root.jsx";
import UserSignUp from "./components/UserSignUp.jsx";
import UserSignIn from "./components/UserSignIn.jsx";
import OtpVerify from "./components/OtpVerify.jsx";
import HomePage from "./pages/HomePage.jsx";
import BloodRequest from "./pages/BloodRequest.jsx";
import { AuthRouter } from "./utils/AuthRouter.jsx";
import BloodRequestedList from "./pages/BloodRequestedList.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
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
            path: "/homepage",
            element: <HomePage />,
          },
          {
            path: "/bloodrequest",
            element: <BloodRequest />,
          },
          {
            path: "/bloodrequestlist",
            element: <BloodRequestedList />,
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
    </>
  );
}

export default App;
