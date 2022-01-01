import React from 'react'
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  let navigate = useNavigate();
  return (
    <div className='navBar'>
      <div className='logo' onClick={()=> navigate("/")}>
      <img src="/images/redditLogo.png" alt="logo" />
      <span>catit</span>
      </div>
      <div className='loginButtons'>
        <button>Log In</button>
        <button>Register</button>
      </div>
    </div>
  )
}
