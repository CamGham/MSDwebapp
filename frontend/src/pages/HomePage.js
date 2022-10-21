import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from "react";
import BottomNav from "../components/TopNav";

import { getEmail } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

const HomePage = () => {
  let current = 1;
  const email = useSelector(getEmail);

  return (
    <div>
      <BottomNav current={current}/>
      <h2>Welcome {email}!</h2>
    </div>
  );
};

export default HomePage;
