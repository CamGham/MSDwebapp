import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Button from "@mui/material/Button";

const LandingPage = () => {
  let navigate = useNavigate();
  return (
    <div className="landingCont">
      <h1>Landing Page</h1>

      <div className="buttonCont">
        <Button
        id="login"
          variant="contained"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>

        <Button
        id="register"
          variant="outlined"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
      </div>
    </div>
  );
};
export default LandingPage;
