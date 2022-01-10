import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import cookies from 'js-cookie'

export default function Login({ setLoggedIn, loggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  },[]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const loginData = await axios.post("http://localhost:3001/user/login", {
          email,
          password,
        });
        cookies.set("accessToken", loginData.data.accessToken, { path: '/' });
        let stringUser = JSON.stringify(loginData.data.newUser);
        cookies.set("user", stringUser, { path: '/' });
        cookies.set("refreshToken", loginData.data.refreshToken, { path: '/' });
        setLoggedIn(true);
        navigate("/");
      } catch (error) {
        alert(error.response.data.msg);
      }
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter an email"),
      password: Yup.string().required("You need to enter a password"),
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
