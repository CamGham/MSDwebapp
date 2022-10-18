import React from "react";
import LoginForm from '../components/LoginForm';
import {auth} from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    let navigate = useNavigate();
  return (
    <div className="loginCont">
      <LoginForm auth={auth} navigate={navigate}/>
    </div>
  );
};

export default LoginPage;
