import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import {
  drawKeypoints,
  drawSkeleton,
  exteriorAngle,
  interiorAngle,
} from "../utilities";
import BottomNav from "../components/TopNav";
import "./LiveCamera.css";
import useWindowDimensions from "../components/useWindowDimensions";
// import useScreenOrientation from 'react-hook-screen-orientation';
import AngleTable from "../components/AngleTable";
import ModalView from "../components/ModalView";
import { Button } from "@mui/material";
import { v4 as uuid } from "uuid";
import { firestore } from "../firebase/firestore";
import {addDoc, collection, Timestamp} from "firebase/firestore"

const LiveCamera = () => {
  let current = 2;
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [intAngle, setIntAngle] = useState(0);
  const [extAngle, setExtAngle] = useState(0);

  const { width, height } = useWindowDimensions();
  const [loadProgress, setLoadProgress] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const runModels = async () => {
    //create detecotr for pose detection
    const detectorConfig = {
      modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
    };
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      detectorConfig
    );
    //load coco for object detection

    const model = await cocoSsd.load().finally(() => {
      setLoadProgress((current) => (current += 1));
    });

    setInterval(() => {
      identify(detector);
      detect(model);
    }, 10);
  };

  useEffect(() => {
    (async () => {
      await tf.ready();
      tf.getBackend();
    })();
    runModels();
    // setCamera();
  }, []);

  useEffect(() => {
    if (loadProgress >= 1) {
      setModalShow(false);
    } else {
      setModalShow(true);
    }
  }, [loadProgress]);

  const drawRect = (detections, ctx) => {
    detections.forEach((prediction) => {
      const [x, y, width, height] = prediction["bbox"];
      const text = prediction["class"];

      const color = "#90CAF9";
      ctx.strokeStyle = color;
      ctx.font = "18px Arial";
      ctx.fillStyle = color;

      ctx.beginPath();
      ctx.fillText(text, x, y);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  };

  const identify = async (detector) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const poses = await detector.estimatePoses(video);

      drawCanvas(
        poses,
        video,
        videoWidth,
        videoHeight,
        canvasRef,
        setIntAngle,
        setExtAngle
      );
    }
  };

  const drawCanvas = (
    pose,
    video,
    videoWidth,
    videoHeight,
    canvas,
    setIntAngle
  ) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose, 0.3, ctx);
    drawSkeleton(pose, 0.3, ctx);
    interiorAngle(pose, setIntAngle);
    exteriorAngle(pose, setExtAngle);
  };

  const detect = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await model.detect(video);
      const ctx = canvasRef.current.getContext("2d");

      drawRect(obj, ctx);
    }
  };

  const handleCapture = async (values) => {
    try {

      const newDoc = await addDoc(collection(firestore, "shots"), {
        armInt: values.intAngle,
        armExt: values.extAngle,
        date: Timestamp.now(),
      });
      console.log("Doc: " + newDoc.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="liveCont">
      <div>
        <BottomNav current={current} />
      </div>
      {/* {loadProgress === 2 ? <ModalView show={false}/>: <ModalView show={true}/>} */}
      <ModalView show={modalShow} />
      <div className="camCont">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            // position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            // width: width,
            // height: height,
          }}
        />
        <canvas
          style={{
            // position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 10,
            // width: width,
            // height: height,
          }}
          ref={canvasRef}
        />
      </div>
      <div className="captureCont">
        <Button onClick={ () => {
          const angles={
            intAngle,
            extAngle
          }
          handleCapture(angles)}} variant="contained">Capture</Button>
      </div>
      <div className="angleCont">
        <AngleTable intAngle={intAngle} extAngle={extAngle} />
      </div>
    </div>
  );
};

export default LiveCamera;
