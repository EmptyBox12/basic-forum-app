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

import "./App.css";

axios.interceptors.response.use(null, error=>{
  
});

function App() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [posts, setPosts] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  async function getPosts() {
    try {
      const posts = await axios.get("http://localhost:3001/posts/");
      setPosts(posts.data)
    } catch (err) {
      console.log(err.response);
    }
  }
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
        <Navbar loggedIn = {loggedIn} />
        <Routes>
          <Route path="/" element={<Main posts={posts} />} />
          <Route path="/:slug" element={<Post />} />
          <Route path="/users/:slug" element={<Profile />} />
          <Route path="/login" element={<Login setLoggedIn = {setLoggedIn} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
