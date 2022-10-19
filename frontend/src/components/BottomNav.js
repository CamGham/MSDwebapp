import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import HomeIcon from "@mui/icons-material/Home";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";

const BottomNav = (props) => {

    let navigate = useNavigate();
  const [value, setValue] = useState(props.current);
useEffect(()=>{
    console.log(value)
    if(value == 0)
    {
        navigate("/results");
    }
    if(value == 1)
    {
        navigate("/home");
    }
    if(value == 2)
    {
        navigate("/camera");
    }
},[value])

  return (
    <div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Results"
          icon={<SportsBasketballIcon />}
          LinkComponent={"/results"}
        />
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Camera" icon={<CameraAltIcon />} LinkComponent={"/camera"}/>
      </BottomNavigation>
    </div>
  );
};

export default BottomNav;
