import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cookies from 'js-cookie'
import { useFormik } from "formik";
import * as Yup from "yup";

export default function NewPost({ loggedIn, posts, setPosts }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: async (values) => {
      try {
        const { title, content } = values;
        const response = await axios.post(
          "http://localhost:3001/posts",
          {
            title,
            content,
          },
          {
            headers: {
              authorization: `Bearer ${cookies.get("accessToken")}`,
            },
          }
        );
        let newPosts = [...posts];
        newPosts.unshift(response.data);
        setPosts(newPosts);
        navigate(`/${response.data.slug}`)
      } catch (error) {
        alert(error.response.data.msg);
      }
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Please enter a title"),
      content: Yup.string().required("Content can't be empty"),
    }),
  });

  return (
    <div className="newPost">
      <form onSubmit={formik.handleSubmit} className="newPostContainer" >
        <div className="newPostInput">
          <span>Title</span>
          <input
            type="text"
            name="title"
            className="newPostTitle"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="error">{formik.errors.title}</div>
          ) : null}
        </div>
        <div className="newPostInput">
          <span>Content</span>
          <textarea
            className="newPostArea"
            cols="30"
            rows="10"
            name="content"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          ></textarea>
          {formik.touched.content && formik.errors.content ? (
            <div className="error">{formik.errors.content}</div>
          ) : null}
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
