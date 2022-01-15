import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import NewPost from "./components/NewPost";
import "./App.css";

axios.interceptors.response.use(null, async (error) => {
  if (
    error.config &&
    error.response &&
    cookies.get("refreshToken") &&
    error.response.status === 401
  ) {
    try {
      const accessToken = await axios.post(
        "http://localhost:3001/token/",
        {},
        {
          headers: {
            authorization: `Bearer ${cookies.get("refreshToken")}`,
          },
        }
      );
      console.log(accessToken.data);
      error.config.headers.authorization = `Bearer ${accessToken.data.accessToken}`;
      cookies.set("accessToken", accessToken.data.accessToken, { path: "/" });
      return axios.request(error.config);
    } catch (error) {
      console.log(error.response);
    }
  }

  return Promise.reject(error);
});

function App() {
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [iconColor, setIconColor] = useState("white");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("http://localhost:3001/user/getUser", {
          headers: {
            authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        });
        let stringUser = JSON.stringify(response.data.user);
        cookies.set("user", stringUser, { path: "/" });
        setLoggedIn(true);
      } catch (error) {
        //need to move these to axios interceptor
        cookies.remove("user");
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        setIconColor("white");
        console.log(error.response);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          iconColor={iconColor}
          setFilter = {setFilter}
          filter={filter}
        />
        <ToastContainer  autoClose={2000}/>
        <Routes>
          <Route path="/" element={<Main posts = {posts} setPosts= {setPosts} filter={filter} setFilter={setFilter}/>} />
          <Route path="/:slug" element={<Post loggedIn={loggedIn} setDeletePost = {setPosts}/>} />
          <Route path="/users/:slug" element={<Profile />} />
          <Route
            path="/register"
            element={
              <Register loggedIn={loggedIn} setIconColor={setIconColor} />
            }
          />
          <Route
            path="/create/post"
            element={
              <NewPost loggedIn={loggedIn} setPosts={setPosts} />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                setIconColor={setIconColor}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
