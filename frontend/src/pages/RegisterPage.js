import React from "react";
import RegisterForm from "../components/RegisterForm";
import { auth } from "../firebase/firebase";
import { firestore } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const RegisterPage = () => {
  let navigate = useNavigate();
  return (
    <div className="regCont">
      <BackButton />
      <RegisterForm auth={auth} firestore={firestore} navigate={navigate} />
    </div>
  );
};

export default RegisterPage;
