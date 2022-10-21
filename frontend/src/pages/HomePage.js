import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useState } from "react";
import BottomNav from "../components/TopNav";

const HomePage = () => {
  let current = 1;

  return (
    <div>
      <BottomNav current={current}/>
    </div>
  );
};

export default HomePage;
