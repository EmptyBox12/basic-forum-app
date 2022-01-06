import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentCard from "./CommentCard";

export default function Post() {
  const { slug } = useParams();
  const [commentArea, setCommentArea] = useState("");
  const [post, setPost] = useState(null);

  useEffect(()=> {
    (async ()=> {
      let postResponse = await axios.get(`http://localhost:3001/posts/${slug}`);
      let post = postResponse.data;
      setPost(post);
    })()
  },[])

  return (
    <div className="postContainer">
     {post ? 
     <div className="post">
        <div className="postTitle">{post.title}</div>
        <div className="postAuthor">Posted by {post.user.username}</div>
        <div className="postContent">{post.content}</div>
        <div className="makeComment">
          Comment:
          <textarea className="commentArea" onChange={(e)=> {setCommentArea(e.target.value)}} cols="40" rows="8" value={commentArea}></textarea> </div>
          <button className="commentButton">Comment</button>
          <div className="comments">
            {post.comments.map(comment => {
              return <CommentCard comment = {comment} key={comment._id} />
            })}
          </div>
      </div> 
      : null}
    </div>
  )
}
