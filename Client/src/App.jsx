// import { ToastContainer } from "react-toastify";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Root from "./layouts/Root.jsx";
import UserSignUp from "./components/UserSignUp.jsx";
import UserSignIn from "./components/UserSignIn.jsx";

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
        element: <UserSignIn/>,
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
