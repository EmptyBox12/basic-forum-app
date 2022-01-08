import React from "react";
import { useNavigate } from "react-router-dom";

export default function Postcard({ post }) {
  const { title, content, user, comments, slug } = post;
  const navigate = useNavigate();
  function linkToAuthor(e) {
    navigate(`/users/${user.slug}`);
    e.stopPropagation()
  }

  return (
    <div className="postCardContainer" onClick={()=> {navigate(`/${slug}`)}}>
      <img src="/images/redditLogo.png" style = {{"backgroundColor": user.color,"borderRadius":"50px" } } alt="dog" />
      <div className="postCard">
        <div className="postCardTitle">{title}</div>
        <div className="postCardBottom">
          <div className="postCardAuthor" onClick={linkToAuthor}>Posted by {user.username}</div>
          <div className="postCardComments">{comments.length} Comments</div>
        </div>
      </div>
    </div>
  );
}
