import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function Register({ loggedIn, setIconColor }) {
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
      color: "#ffffff",
    },
    onSubmit: async (values) => {
      try {
        const { email, username, password, color } = values;
        const loginData = await axios.post(
          "http://catit.herokuapp.com/user/register",
          {
            email,
            username,
            password,
            color
          }
        );
        setIconColor("white");
        navigate("/login");
        toast.dark("Registered Successfully");
      } catch (error) {
        toast.dark(error.response.data.msg);
        console.log(error.response.data);
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
        <div
          className="loginPassword"
          style={{ width: "300px" }}
        >
          <label htmlFor="color">Color</label>
          <input
            type="color"
            name="color"
            style = {{width:"70px", height:"30px", padding:"0", borderRadius:"5px"}}
            value={formik.values.color}
            onChange={(e)=> {
              formik.handleChange(e);
              console.log(e.target.value);
              setIconColor(e.target.value);
            }}
            onBlur={formik.handleBlur}
          />
        </div>
        <button type="submit" style={{ width: "140px", marginRight: "50px" }}>
          Register
        </button>
      </form>
    </div>
  );
}
