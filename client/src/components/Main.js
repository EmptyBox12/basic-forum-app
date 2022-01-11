import React, { useState, useEffect } from "react";
import Postcard from "./Postcard";
import axios from "axios";

export default function Main() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    try {
      const postsData = await axios.get("http://localhost:3001/posts/");
      if (JSON.stringify(postsData.data) != JSON.stringify(posts)) {
        setPosts(postsData.data);
      }
    } catch (err) {
      console.log(err);
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
  }, [posts]);
  return (
    <div className="main">
      {posts.map((post) => {
        return <Postcard post={post} key={post._id} />;
      })}
    </div>
  );
}
