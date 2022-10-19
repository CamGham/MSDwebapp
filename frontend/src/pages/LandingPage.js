import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Button from "@mui/material/Button";
import logo from "../assets/shooterlogo.png";

const LandingPage = () => {
  let navigate = useNavigate();
  return (
    <div className="landingCont">
      <div className="logoCont">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="buttonCont">
        <div className="button">
          <Button
            className="login"
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
        <div className="button">
          <Button
            className="register"
            variant="outlined"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
