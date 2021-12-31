import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import axios from "axios";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Profile from "./components/Profile";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

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
        <Navbar />
        <Routes>
          <Route path="/" element={<Main posts={posts} />} />
          <Route path="/:slug" element={<Post />} />
          <Route path="/users/:slug" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
