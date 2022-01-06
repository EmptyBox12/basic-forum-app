import React from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";


export default function Login({setLoggedIn}) {
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <div>
      Login
    </div>
  )
}
