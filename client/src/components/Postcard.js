import React from "react";

export default function Postcard({ post }) {
  const { title, content, user, comments } = post;
  return (
    <div className="postCardContainer">
      <img src="./images/computer.png" alt="" />
      <div className="postCard">
        <div className="postCardTitle">{title}</div>
        <div className="postCardBottom">
          <div className="postCardAuthor">Posted by {user.username}</div>
          <div className="postCardComments">{comments.length} Comments</div>
        </div>
      </div>
    </div>
  );
}
