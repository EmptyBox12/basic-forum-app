import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Postcard from "./Postcard";

export default function Profile() {
  const { slug } = useParams();
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let usersData = await axios.get(
          `http://localhost:3001/posts/userPosts/${slug}`
        );
        let users = usersData.data;
        console.log(users);
        setUserPosts(users);
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, []);
  return (
    <div className="profileContainer">
      <div className="profileUsername">{slug}'s posts</div>
      {userPosts &&
        userPosts.posts.map((post) => {
          return <Postcard post={post} key={post._id} />;
        })}
    </div>
  );
}
