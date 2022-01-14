import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Postcard from "./Postcard";

export default function Profile() {
  const { slug } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  async function getUserPosts() {
    try {
      let usersData = await axios.get(
        `http://localhost:3001/posts/userPosts/${slug}/?page=${page}`
      );
      let allPosts = new Set([...userPosts, ...usersData.data.posts]);
      setUserPosts([...allPosts]);
      setTotalPage(Math.ceil(usersData.data.totalPosts / 10));
      setPage(page + 1);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    (async () => {
      await getUserPosts();
    })();
  }, []);

  useEffect(() => {
    if (page >= totalPage) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [userPosts, totalPage]);

  return (
    <div className="profileContainer">
      <div className="profileUsername">{slug}'s posts</div>
      <InfiniteScroll
        dataLength={userPosts.length}
        next={getUserPosts}
        hasMore={hasMore}
        loader={<h4 style={{ color: "white" }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", color: "white" }}>
            <b>You have seen all posts! Refresh Page for new Posts!</b>
          </p>
        }
      >
        {userPosts.length > 0 &&
          userPosts.map((post) => {
            return <Postcard post={post} key={post._id} />;
          })}
      </InfiniteScroll>
    </div>
  );
}
