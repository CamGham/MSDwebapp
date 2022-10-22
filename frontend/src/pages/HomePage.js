import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from "react";
import TopNav from "../components/TopNav";
import "./HomePage.css"

import { getEmail } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

const HomePage = () => {
  let current = 1;
  const email = useSelector(getEmail);

  return (
    <div>
      <TopNav current={current}/>
      <h2>Welcome {email}!</h2>
    </div>
  );
};

export default HomePage;
