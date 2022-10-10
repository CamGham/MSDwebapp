/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";
import * as params from "./params";

const color = "aqua";
const boundingBoxColor = "red";
const lineWidth = 2;

export const tryResNetButtonName = "tryResNetButton";
export const tryResNetButtonText = "[New] Try ResNet50";
const tryResNetButtonTextCss = "width:100%;text-decoration:underline;";
const tryResNetButtonBackgroundCss = "background:#e61d5f;";

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function isMobile() {
  return isAndroid() || isiOS();
}

function setDatGuiPropertyCss(propertyText, liCssString, spanCssString = "") {
  var spans = document.getElementsByClassName("property-name");
  for (var i = 0; i < spans.length; i++) {
    var text = spans[i].textContent || spans[i].innerText;
    if (text == propertyText) {
      spans[i].parentNode.parentNode.style = liCssString;
      if (spanCssString !== "") {
        spans[i].style = spanCssString;
      }
    }
  }
}

export function updateTryResNetButtonDatGuiCss() {
  setDatGuiPropertyCss(
    tryResNetButtonText,
    tryResNetButtonBackgroundCss,
    tryResNetButtonTextCss
  );
}


function toTuple(y, x ) {
  return [y, x];
}

export function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
export function drawSkeleton(pose, minConfidence, ctx, scale = 1) {
  //   const keypoints = pose[0].keypoints;
  //  const adjacentKeyPoints = poseDetection.util.getAdjacentPairs(keypoints);

  //  adjacentKeyPoints.forEach((keypoints) => {
  //    drawSegment(
  //      toTuple(keypoints[0].y, keypoints[0].x),
  //      toTuple(keypoints[1].y, keypoints[1].x),
  //      color,
  //      scale,
  //      ctx
  //    );
  //  });

  // for (let i = 5; i < pose[0].keypoints.length; i++) {
  //   const keypoint = pose[0].keypoints[i];
  //   const nextKeypoint = pose[0].keypoints[i++];
  //   if (keypoint.score < minConfidence) {
  //     continue;
  //   }
  //   let x = keypoint.x;
  //   let y = keypoint.y;
  //   let x2 = nextKeypoint.x;
  //   let y2 = nextKeypoint.y;
  //   console.log()
  //   drawSegment(
  //     toTuple(y * scale, x * scale),
  //     toTuple(y2 * scale, x2 * scale),
  //     color,
  //     scale,
  //     ctx
  //   );
  // }

  const lShoulder = pose[0].keypoints[5];
  const rShoulder = pose[0].keypoints[6];
  const lElbow = pose[0].keypoints[7];
  const rElbow = pose[0].keypoints[8];
  const lWrist = pose[0].keypoints[9];
  const rWrist = pose[0].keypoints[10];
  const lHip = pose[0].keypoints[11];
  const rHip = pose[0].keypoints[12];
  const lKnee = pose[0].keypoints[13];
  const rKnee = pose[0].keypoints[14];
  const lAnkle = pose[0].keypoints[15];
  const rAnkle = pose[0].keypoints[16];

  //shoulder join
  drawSegment(
    toTuple(lShoulder.y, lShoulder.x),
    toTuple(rShoulder.y, rShoulder.x),
    color,
    scale,
    ctx
  );

  //left arm top
  drawSegment(
    toTuple(lShoulder.y, lShoulder.x),
    toTuple(lElbow.y, lElbow.x),
    color,
    scale,
    ctx
  );

  //left arm bottom
  drawSegment(
    toTuple(lElbow.y, lElbow.x),
    toTuple(lWrist.y, lWrist.x),
    color,
    scale,
    ctx
  );

  //right arm top
  drawSegment(
    toTuple(rShoulder.y, rShoulder.x),
    toTuple(rElbow.y, rElbow.x),
    color,
    scale,
    ctx
  );

  //right arm bottom
  drawSegment(
    toTuple(rElbow.y, rElbow.x),
    toTuple(rWrist.y, rWrist.x),
    color,
    scale,
    ctx
  );

  //left shoulder to hip
  drawSegment(
    toTuple(lShoulder.y, lShoulder.x),
    toTuple(lHip.y, lHip.x),
    color,
    scale,
    ctx
  );

  //right shoulder to hip
  drawSegment(
    toTuple(rShoulder.y, rShoulder.x),
    toTuple(rHip.y, rHip.x),
    color,
    scale,
    ctx
  );

  // hip join
  drawSegment(
    toTuple(lHip.y, lHip.x),
    toTuple(rHip.y, rHip.x),
    color,
    scale,
    ctx
  );

  //left hip to knee
  drawSegment(
    toTuple(lHip.y, lHip.x),
    toTuple(lKnee.y, lKnee.x),
    color,
    scale,
    ctx
  );

  //left knee to ankle
  drawSegment(
    toTuple(lKnee.y, lKnee.x),
    toTuple(lAnkle.y, lAnkle.x),
    color,
    scale,
    ctx
  );

  //right hip to knee
  drawSegment(
    toTuple(rHip.y, rHip.x),
    toTuple(rKnee.y, rKnee.x),
    color,
    scale,
    ctx
  );

  //right knee to ankle
  drawSegment(
    toTuple(rKnee.y, rKnee.x),
    toTuple(rAnkle.y, rAnkle.x),
    color,
    scale,
    ctx
  );

}

/**
 * Draw pose keypoints onto a canvas
 */
export function drawKeypoints(pose, minConfidence, ctx, scale = 1) {
  console.log(pose[0].keypoints.length);
  for (let i = 5; i < pose[0].keypoints.length; i++) {
    const keypoint = pose[0].keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }
    let x = keypoint.x;
    let y = keypoint.y;
    //  const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
//  export function drawBoundingBox(keypoints, ctx) {
//    const boundingBox = posenet.getBoundingBox(keypoints);

//    ctx.rect(
//      boundingBox.minX,
//      boundingBox.minY,
//      boundingBox.maxX - boundingBox.minX,
//      boundingBox.maxY - boundingBox.minY
//    );

//    ctx.strokeStyle = boundingBoxColor;
//    ctx.stroke();
//  }

/**
 * Converts an arary of pixel data into an ImageData object
 */
export async function renderToCanvas(a, ctx) {
  const [height, width] = a.shape;
  const imageData = new ImageData(width, height);

  const data = await a.data();

  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    const k = i * 3;

    imageData.data[j + 0] = data[k + 0];
    imageData.data[j + 1] = data[k + 1];
    imageData.data[j + 2] = data[k + 2];
    imageData.data[j + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Draw an image on a canvas
 */
export function renderImageToCanvas(image, size, canvas) {
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);
}

/**
 * Draw heatmap values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's heatmap outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
export function drawHeatMapValues(heatMapValues, outputStride, canvas) {
  const ctx = canvas.getContext("2d");
  const radius = 5;
  const scaledValues = heatMapValues.mul(tf.scalar(outputStride, "int32"));

  drawPoints(ctx, scaledValues, radius, color);
}

/**
 * Used by the drawHeatMapValues method to draw heatmap points on to
 * the canvas
 */
function drawPoints(ctx, points, radius, color) {
  const data = points.buffer().values;

  for (let i = 0; i < data.length; i += 2) {
    const pointY = data[i];
    const pointX = data[i + 1];

    if (pointX !== 0 && pointY !== 0) {
      ctx.beginPath();
      ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

/**
 * Draw offset vector values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's offset vector outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
// export function drawOffsetVectors(
//     heatMapValues, offsets, outputStride, scale = 1, ctx) {
//   const offsetPoints =
//       posenet.singlePose.getOffsetPoints(heatMapValues, outputStride, offsets);

//   const heatmapData = heatMapValues.buffer().values;
//   const offsetPointsData = offsetPoints.buffer().values;

//   for (let i = 0; i < heatmapData.length; i += 2) {
//     const heatmapY = heatmapData[i] * outputStride;
//     const heatmapX = heatmapData[i + 1] * outputStride;
//     const offsetPointY = offsetPointsData[i];
//     const offsetPointX = offsetPointsData[i + 1];

//     drawSegment(
//         [heatmapY, heatmapX], [offsetPointY, offsetPointX], color, scale, ctx);
//   }
// }
