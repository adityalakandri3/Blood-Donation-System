import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>   
      <h1>Hello World</h1>
      <button onClick={()=> navigate("/signup")}>SignUp</button>
      <button onClick={()=> navigate("/signin")}>SignIn</button>
    </div>
  )
}

export default Home
