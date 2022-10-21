import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import React, { useEffect, useState } from "react";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import HomeIcon from "@mui/icons-material/Home";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import "./TopNav.css";
const BottomNav = (props) => {

    let navigate = useNavigate();
  const [value, setValue] = useState(props.current);
useEffect(()=>{
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
      className="nav"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        // sx={{
        //   ".MuiBottomNavigation-root":{
        //     color: "#2b2b2b"
        //   },
        //   "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
        //     color: "#7E7E7E"
        //   },
        //   "& .Mui-selected, .Mui-selected > svg":{
        //     color:"#ffff"
        //   }
        // }}
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
