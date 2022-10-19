import { Button, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";

const RegisterForm = (props) => {
  const auth = props.auth;
  const navigate = props.navigate;
  const firestore = props.firestore;

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
      password: "",
      confpassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      confpassword: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      //perform login
      if ((await getUsers(values)) === false) {
        createUserWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredentials) => {
            const user = userCredentials.user;
          })
          .catch((error) => {
            alert("Error with creation " + error);
          });
        addUser(values);
        navigate("/home");
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
    <form onSubmit={formik.handleSubmit} className="loginForm">
      <div className="fieldCont">
        <TextField
          id="name"
          variant="outlined"
          label="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
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
        <TextField
          id="confpassword"
          variant="outlined"
          type="password"
          label="Confirm Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confpassword}
        />
        <Button id="register" type="submit" variant="contained">
          Register
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
