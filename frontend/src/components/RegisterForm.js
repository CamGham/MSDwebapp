import { Button, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import "./LoginForm.css";

import { useDispatch } from "react-redux";
import { changeEmail } from "../redux/user/userSlice";

const RegisterForm = (props) => {
  const auth = props.auth;
  const navigate = props.navigate;
  const firestore = props.firestore;
  const dispatch = useDispatch();

  const getUsers = async (values) => {
    try {
      let exists = false;
      const docRef = doc(firestore, "users", values.email);
      const querySnapShot = await getDoc(docRef);

      if (querySnapShot.exists()) {
        exists = true;
      }
      return exists;
    } catch (e) {
      console.log(e);
    }
  };

  const addUser = async (values) => {
    try {
      const userID = values.email;
      const newDoc = await setDoc(doc(firestore, "users", userID), {
        name: values.name,
        email: values.email,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      passwordreg: "",
      confpassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      passwordreg: Yup.string().required("Required"),
      confpassword: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      //perform login

      if (values.passwordreg !== values.confpassword) {
        alert("Passwords do not match")
      } else {
        if ((await getUsers(values)) === false) {
          createUserWithEmailAndPassword(auth, values.email, values.passwordreg)
            .then((userCredentials) => {
              const user = userCredentials.user;
              dispatch(changeEmail(user.email));
            })
            .catch((error) => {
              alert("Error with creation " + error);
            });
          addUser(values);
          navigate("/home");
        }
      }
    },
  });

  //   useEffect(()=>{
  //     const unsubscribe  = auth.onAuthStateChanged((user)=>{
  //         if(user){
  //             navigate
  //         }
  //     })
  //   })

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <div className="fieldCont">
          <div className="compCont">
            <TextField
              id="name"
              variant="outlined"
              label="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </div>
          <div className="compCont">
            <TextField
              id="email"
              variant="outlined"
              label="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          <div className="compCont">
            <TextField
              id="passwordreg"
              variant="outlined"
              type="password"
              label="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordreg}
            />
          </div>
          <div className="compCont">
            <TextField
              id="confpassword"
              variant="outlined"
              type="password"
              label="Confirm Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confpassword}
            />
          </div>
          <div className="compCont">
            <Button id="regButt" type="submit" variant="contained">
              Register
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
