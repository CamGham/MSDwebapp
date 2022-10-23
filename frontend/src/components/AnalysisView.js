import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import "./ModalView.css";

const AnalysisView = (props) => {
  const visible = props.show;

  const [show,setShow] = useState(false)
  const handleClose = () => setShow(false);

useEffect(()=>{
  setShow(visible)
console.log("NOW GETS HERE: " + show + " " + visible)
},[visible])
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
