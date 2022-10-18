import { Button, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {signInWithEmailAndPassword} from "firebase/auth";

const LoginForm = (props) => {
const auth = props.auth;
const navigate = props.navigate;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      //perform login

      signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredentials) =>{
        const user = userCredentials.user;
        navigate("/home");
      })
      .catch((error) =>{
    alert("Invalid login" + error);
      })
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="loginForm">
      <div className="fieldCont">
        <TextField
          id="email"
          variant="outlined"
          label="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <TextField
          id="password"
          variant="outlined"
          type="password"
          label="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <Button id="login" type="submit" variant="contained">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
