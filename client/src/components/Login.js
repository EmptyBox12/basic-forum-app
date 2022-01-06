import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login({ setLoggedIn, loggedIn }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

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
        setCookie("accessToken", loginData.data.accessToken);
        setCookie("user", loginData.data.newUser);
        setCookie("refreshToken", loginData.data.refreshToken);
        setLoggedIn(true);
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

  useEffect(() => {
    if (loggedIn) {
      //navigate to profile after profile is done
      navigate("/");
    }
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
