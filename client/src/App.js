import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import NewPost from "./components/NewPost";
import "./App.css";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  async function getPosts() {
    try {
      const posts = await axios.get("http://localhost:3001/posts/");
      setPosts(posts.data);
    } catch (err) {
      console.log(err.response);
    }
  }
  useEffect(() => {
    (async () => {
      try {
        let response = await axios.get("http://localhost:3001/user/getUser", {
          headers: {
            authorization: `Bearer ${cookies.accessToken}`,
          },
        });
        setCookie("user", response.data.user);
        setLoggedIn(true);
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await getPosts();
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Main posts={posts} />} />
          <Route path="/:slug" element={<Post loggedIn={loggedIn}/>} />
          <Route path="/users/:slug" element={<Profile />} />
          <Route path="/register" element={<Register loggedIn={loggedIn} />} />
          <Route path="/new-post" element={<NewPost loggedIn={loggedIn} posts = {posts} setPosts = {setPosts} />} />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
