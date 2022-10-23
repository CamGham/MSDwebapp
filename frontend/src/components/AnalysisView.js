import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import "./ModalView.css";

const AnalysisView = (props) => {
const{
  data,
  setShowModal,
  visible,
} = props


  const [show,setShow] = useState(false)
  const handleClose = () => {
    setShow(false);

    setShowModal(false);
  }
useEffect(()=>{
  setShow(visible);
  
},[])

useEffect(()=>{
setShow(visible)
},[visible])

useEffect(()=>{
  console.log("finaluy here" + show)
},[show])

// useEffect(()=>{
//   // setShow(visible);
//   console.log("THIS IS")
  
// },[show])

// useEffect(()=>{
//   setShow(visible)
// },[])

// useEffect(()=>{
//   setShow(visible)
// console.log("NOW GETS HERE: " + show + " " + visible)
// console.log(data);
// },[visible])
  // const [isVisible, setIsVisible] = useState(show);
  // const handleClose = () => setIsVisible(true);
  return (
    <div>
      <Modal open={show} onClose={handleClose}>
        <h1>HERE IS THE ANALYSIS</h1>
      </Modal>
    </div>
  );
};

export default AnalysisView;
