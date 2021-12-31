import React from 'react'

export default function Navbar() {
  return (
    <div className='navBar'>
      <div className='logo'>
      <img src="./images/redditLogo.png" alt="logo" />
      <span>catit</span>
      </div>
      <div className='loginButtons'>
        <button>Log In</button>
        <button>Register</button>
      </div>
    </div>
  )
}
