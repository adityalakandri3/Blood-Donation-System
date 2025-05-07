import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layouts/Root.jsx";
import UserSignUp from "./components/UserSignUp.jsx";
import UserSignIn from "./components/UserSignIn.jsx";
import OtpVerify from "./components/OtpVerify.jsx";
import HomePage from "./pages/HomePage.jsx";
import BloodRequest from "./pages/BloodRequest.jsx";
import { AuthRouter } from "./utils/AuthRouter.jsx";
import BloodRequestedList from "./pages/BloodRequestedList.jsx";
import BloodCampList from "./pages/BloodCampList.jsx";



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
    </>
  );
}

export default App;
