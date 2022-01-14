import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Postcard from "./Postcard";

export default function Main({ posts, setPosts }) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [hasMore, setHasMore] = useState();

  async function getPosts() {
    try {
      const postsData = await axios.get(
        `http://localhost:3001/posts/?page=${page}`
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
      if (posts.length == 0) {
        try {
          await getPosts();
        } catch (err) {
          console.log(err.response);
        }
      } else {
        try {
          const postsData = await axios.get(`http://localhost:3001/posts/`);
          setTotalPage(postsData.data.totalPosts);
          setPosts(postsData.data.posts);
          setPage(2);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (page == totalPage) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [posts, totalPage]);
  return (
    <div className="main">
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={getPosts}
        hasMore={hasMore}
        loader={<h4 style={{ color: "white" }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", color: "white" }}>
            <b>Yay! You have seen it all</b>
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
