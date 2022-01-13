import React, {useEffect, useState} from "react";
import { useNavigate} from "react-router-dom";
import cookies from "js-cookie";
import axios from "axios";
import formatDistance from "date-fns/formatDistance";

export default function CommentCard({ comment, loggedIn }) {
  const [commentOwner, setCommentOwner] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { commentor, content, createdAt } = comment;
  const pastTime = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });
  useEffect(() => {
    if (loggedIn) {
      setUser(JSON.parse(cookies.get("user")));
    } else {
      setUser(null);
    }
  }, [loggedIn]);

  useEffect(() => {
    if (comment && user) {
      if (comment.commentor._id == user._id) {
        setCommentOwner(true);
      } else {
        setCommentOwner(false);
      }
    } else {
      setCommentOwner(false);
    }
  }, [comment, user]);
  async function handleDelete() {
    try {
      let deleteResponse = await axios.delete(
        `http://localhost:3001/comments/${comment._id}`,
        {
          headers: {
            authorization: `Bearer ${cookies.get("accessToken")}`,
          },
        }
      );
      console.log(deleteResponse.data);
      navigate(0);
    } catch (error) {
      console.log(error.response);
    }
    
  }
  return (
    <div className="commentContainer">
    {commentOwner && <button className="deleteComment" onClick={handleDelete}>Delete</button>}
      <div className="commentTitle">
        <span
          className="commentUsername"
          onClick={() => {
            navigate(`/users/${commentor.slug}`);
          }}
        >
          {commentor.username}
        </span>
        <span className="commentPastTime">- {pastTime}</span>
      </div>
      <div className="commentContent">{content}</div>
    </div>
  );
}
