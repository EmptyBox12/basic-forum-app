import React from "react";
import { useNavigate } from "react-router-dom";
import cookies from 'js-cookie'
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar({ loggedIn, setLoggedIn, iconColor }) {
  let navigate = useNavigate();

  async function handleLogout() {
    try {
      let responseData = await axios.post(
        `http://localhost:3001/user/logout`,
        {},
        {
          headers: {
            authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        }
      );
      cookies.remove("user");
      cookies.remove("accessToken");
      cookies.remove("refreshToken");
      setLoggedIn(false);
      toast.dark("Logged-out Successfully")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navBar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/images/redditLogo.png" alt="logo" style={{backgroundColor: cookies.get("user") ? JSON.parse(cookies.get("user")).color: iconColor}} />
        <span>catit</span>
      </div>
      <div className="loginButtons">
        {loggedIn ? (
          <>
            <button
              onClick={() => {
                navigate(`/create/post`);
              }}
            >
              New Post
            </button>
            <button
              onClick={() => {
                navigate(`/users/${JSON.parse(cookies.get("user")).slug}`);
              }}
            >
              Profile
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Log In
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}
