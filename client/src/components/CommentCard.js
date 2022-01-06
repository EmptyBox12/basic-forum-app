import React from "react";
import { useNavigate } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";

export default function CommentCard({ comment }) {
  console.log(comment);
  const navigate = useNavigate();
  const { commentor, content, createdAt } = comment;
  const pastTime = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });
  return (
    <div className="commentContainer">
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
