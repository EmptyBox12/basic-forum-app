import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register({ loggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { email, username, password } = values;
        const loginData = await axios.post(
          "http://localhost:3001/user/register",
          {
            email,
            username,
            password,
          }
        );
        navigate("/login");
      } catch (error) {
        alert(error.response.data.msg);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter an email"),
      username: Yup.string().required("You need to enter a username"),
      password: Yup.string()
        .required("You need to enter a password")
        .min(6, "Password must be longer than 6 characters"),
    }),
  });

  return (
    <div className="loginFormContainer">
      <form className="loginForm" onSubmit={formik.handleSubmit}>
        <div className="loginEmail">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="loginPassword">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="loginPassword">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" style={{"width": "140px", "marginRight":"50px" }}>Register</button>
      </form>
    </div>
  );
}
