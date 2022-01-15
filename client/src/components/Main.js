import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Postcard from "./Postcard";

export default function Main({ posts, setPosts, filter }) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  async function getPosts() {
    try {
      const postsData = await axios.get(
        `http://localhost:3001/posts/?page=${page}&search=${filter}`
      );
      console.log(postsData.data.totalPosts);
      if (JSON.stringify(postsData.data.posts) != JSON.stringify(posts)) {
        console.log(postsData.data.posts);
        let allPosts = new Set([...posts, ...postsData.data.posts]);
        setPosts([...allPosts]);
        setTotalPage(Math.ceil(postsData.data.totalPosts / 10));
        setPage(page + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    (async () => {
      console.log(filter);
      const postsData = await axios.get(
        `http://localhost:3001/posts/?page=1&search=${filter}`
      );
      if (JSON.stringify(postsData.data.posts) != JSON.stringify(posts)) {
        console.log(postsData.data.posts);
        let allPosts = new Set([...postsData.data.posts]);
        setPosts([...allPosts]);
        setTotalPage(Math.ceil(postsData.data.totalPosts / 10));
        setPage(2);
      }
    })();
  }, [filter]);

  useEffect(() => {
    (async () => {
      if (posts.length == 0) {
        try {
          await getPosts();
        } catch (err) {
          console.log(err.response);
        }
      } else {
        try {
          const postsData = await axios.get(`http://localhost:3001/posts/`);
          setTotalPage(Math.ceil(postsData.data.totalPosts / 10));
          let currentPage = Math.ceil(posts.length / 10);
          setPage(currentPage + 1);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (page >= totalPage) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [posts, totalPage]);
  return (
    <div className="main">
      <InfiniteScroll
        dataLength={posts.length}
        next={getPosts}
        hasMore={hasMore}
        loader={<h4 style={{ color: "white" }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", color: "white" }}>
            <b>You have seen all posts! Refresh Page for new Posts!</b>
          </p>
        }
      >
        {posts.map((post) => {
          return <Postcard post={post} key={post._id} />;
        })}
      </InfiniteScroll>
    </div>
  );
}
