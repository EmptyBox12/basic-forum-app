import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from 'js-cookie';
import CommentCard from "./CommentCard";

export default function Post({ loggedIn }) {
  const { slug } = useParams();
  const [commentArea, setCommentArea] = useState("");
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      let postResponse = await axios.get(`http://localhost:3001/posts/${slug}`);
      let post = postResponse.data;
      setPost(post);
    })();
  }, []);

  async function makeComment() {
    try {
      const response = await axios.post(
        `http://localhost:3001/comments/${slug}`,
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
      let newPost = {...post};
      newPost.comments.unshift(comment);
      setPost(newPost);
      setCommentArea("");
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="postContainer">
      {post ? (
        <div className="post">
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
          <button className="commentButton" onClick={makeComment} disabled={loggedIn ? false : true}>
            Comment
          </button>
          <div className="comments">
            {post.comments.map((comment) => {
              return <CommentCard comment={comment} key={comment._id} />;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
