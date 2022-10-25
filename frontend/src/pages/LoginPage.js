import React from "react";
import LoginForm from "../components/LoginForm";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

const LoginPage = () => {
  let navigate = useNavigate();
  return (
    <div className="loginCont">
      <BackButton />
      <LoginForm auth={auth} navigate={navigate} />
    </div>
  );
};

export default LoginPage;
