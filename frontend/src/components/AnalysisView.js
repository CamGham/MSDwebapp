import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import "./AnalysisView.css";
import Box from "@mui/material/Box";

const AnalysisView = (props) => {
  const { data, setShowModal, visible } = props;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);

    setShowModal(false);
  };
  useEffect(() => {
    setShow(visible);
  }, []);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  useEffect(() => {}, [show]);

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "#121212",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "60%",
            height: "50%",
          }}
        >
          {data[0] && (
            <div className="dataView">
              <h3>Date: {data[0].date}</h3>
              <h3>Shooting Arm Internal Angle: {data[0].relAngle}</h3>
              <h3>Shooting Arm Internal Angle: {data[0].armInt}</h3>
              <h3>Shooting Arm External Angle: {data[0].armExt}</h3>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AnalysisView;
