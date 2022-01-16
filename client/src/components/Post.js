import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import formatDistance from "date-fns/formatDistance";
import { toast } from "react-toastify";
import CommentCard from "./CommentCard";

export default function Post({ loggedIn, setDeletePost }) {
  const { slug } = useParams();
  const [commentArea, setCommentArea] = useState("");
  const [postOwner, setPostOwner] = useState(false);
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let postResponse = await axios.get(`http://catit.herokuapp.com/posts/${slug}`);
      let post = postResponse.data;
      setPost(post);
    })();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      setUser(JSON.parse(cookies.get("user")));
    } else {
      setUser(null);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (post && user) {
      if (post.user._id == user._id) {
        setPostOwner(true);
      } else {
        setPostOwner(false);
      }
    } else {
      setPostOwner(false);
    }
  }, [post, user]);

  async function handleCommentDelete(id) {
    try {
      let deleteResponse = await axios.delete(
        `http://catit.herokuapp.com/comments/${id}`,
        {
          headers: {
            authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        }
      );
      let newPost = { ...post };
      console.log(newPost);
      let index = post.comments.findIndex(item => item._id === id);
      newPost.comments.splice(index, 1);
      setPost(newPost);
      toast.dark("Comment Deleted Successfully!");
    } catch (error) {
      console.log(error.response);
    }
    
  }

  async function makeComment() {
    try {
      const response = await axios.post(
        `http://catit.herokuapp.com/comments/${slug}`,
        {
          content: commentArea,
        },
        {
          headers: {
            authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        }
      );
      let comment = response.data.newComment;
      let newPost = { ...post };
      newPost.comments.unshift(comment);
      setPost(newPost);
      setCommentArea("");
      toast.dark("Comment Made Successfully!");
    } catch (error) {
      toast.dark("Can't Delete Comment")
      console.log(error.response);
    }
  }
  async function handleDelete() {
    try {
      let deleteResponse = await axios.delete(
        `http://catit.herokuapp.com/posts/${slug}`,
        {
          headers: {
            authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        }
      );
      setDeletePost((prev) => {
        let newPosts = [...prev];
        let index = newPosts.findIndex(item => item.slug == slug);
        newPosts.splice(index, 1);
        return newPosts;
      });
      navigate("/");
      toast.dark("Post Deleted Successfully!");
      console.log(deleteResponse.data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }

  return (
    <div className="postContainer">
      {post ? (
        <div className="post">
          <div className="postDetailPastTime">
            {formatDistance(new Date(post.createdAt), new Date(), {
              addSuffix: true,
            })}
          </div>
          <div className="postTitle">{post.title}</div>
          <div
            className="postAuthor"
            onClick={() => {
              navigate(`/users/${post.user.slug}`);
            }}
          >
            Posted by {post.user.username}
          </div>
          <div className="postContent">{post.content}</div>
          <div className="makeComment">
            {postOwner && <button className="deletePost" onClick={handleDelete}>Delete Post</button>}
            Comment:
            <textarea
              className="commentArea"
              onChange={(e) => {
                setCommentArea(e.target.value);
              }}
              cols="40"
              rows="8"
              value={commentArea}
            ></textarea>{" "}
          </div>
          <button
            className="commentButton"
            onClick={makeComment}
            disabled={loggedIn ? false : true}
          >
            Comment
          </button>
          <div className="comments">
            {post.comments.map((comment) => {
              return <CommentCard comment={comment} key={comment._id} loggedIn = {loggedIn} handleDelete={handleCommentDelete}/>;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
