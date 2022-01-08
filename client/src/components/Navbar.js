import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Navbar({ loggedIn, setLoggedIn, iconColor }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  let navigate = useNavigate();

  async function handleLogout() {
    try {
      let responseData = await axios.post(
        `http://localhost:3001/user/logout`,
        {},
        {
          headers: {
            authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );
      removeCookie("user");
      removeCookie("accessToken");
      removeCookie("refreshToken");
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="navBar">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/images/redditLogo.png" alt="logo" style={{backgroundColor: cookies.user ? cookies.user.color : iconColor}} />
        <span>catit</span>
      </div>
      <div className="loginButtons">
        {loggedIn ? (
          <>
            <button
              onClick={() => {
                navigate(`/new-post`);
              }}
            >
              New Post
            </button>
            <button
              onClick={() => {
                navigate(`/users/${cookies.user.slug}`);
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
