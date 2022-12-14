const color = "white";
const lineWidth = 2;

/**
 * Convert coord to tuple
 */
function toTuple(y, x) {
  return [y, x];
}

/* Draw point */
function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draw line
 */
function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draw skeleton
 */
export function drawSkeleton(pose, minConfidence, ctx, scale = 1) {
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
  if (lShoulder.score > minConfidence && rShoulder.score > minConfidence) {
    drawSegment(
      toTuple(lShoulder.y, lShoulder.x),
      toTuple(rShoulder.y, rShoulder.x),
      color,
      scale,
      ctx
    );
  }

  //angle between lShoulder and lElbow
  calcAngle(
    toTuple(rShoulder.y, rShoulder.x),
    toTuple(lShoulder.y, lShoulder.x),
    toTuple(lShoulder.y, lShoulder.x),
    toTuple(lElbow.y, lElbow.x),
    ctx,
    "red"
  );

  //left arm top
  if (lShoulder.score > minConfidence && lElbow.score > minConfidence) {
    drawSegment(
      toTuple(lShoulder.y, lShoulder.x),
      toTuple(lElbow.y, lElbow.x),
      color,
      scale,
      ctx
    );
  }

  //angle between lElbow and lWrist
  calcAngle(
    toTuple(lShoulder.y, lShoulder.x),
    toTuple(lElbow.y, lElbow.x),
    toTuple(lElbow.y, lElbow.x),
    toTuple(lWrist.y, lWrist.x),
    ctx,
    color
  );

  //left arm bottom
  if (lElbow.score > minConfidence && lWrist.score > minConfidence) {
    drawSegment(
      toTuple(lElbow.y, lElbow.x),
      toTuple(lWrist.y, lWrist.x),
      color,
      scale,
      ctx
    );
  }

  //angle between rightShoulder and rightElbow
  calcAngle(
    toTuple(lShoulder.y, lShoulder.x),
    toTuple(rShoulder.y, rShoulder.x),
    toTuple(rShoulder.y, rShoulder.x),
    toTuple(rElbow.y, rElbow.x),
    ctx,
    "red"
  );

  //right arm top
  if (rShoulder.score > minConfidence && rElbow.score > minConfidence) {
    drawSegment(
      toTuple(rShoulder.y, rShoulder.x),
      toTuple(rElbow.y, rElbow.x),
      color,
      scale,
      ctx
    );
  }

  //angle between rElbow and rWrist
  calcAngle(
    toTuple(rShoulder.y, rShoulder.x),
    toTuple(rElbow.y, rElbow.x),
    toTuple(rElbow.y, rElbow.x),
    toTuple(rWrist.y, rWrist.x),
    ctx,
    color
  );

  //right arm bottom
  if (rElbow.score > minConfidence && rWrist.score > minConfidence) {
    drawSegment(
      toTuple(rElbow.y, rElbow.x),
      toTuple(rWrist.y, rWrist.x),
      color,
      scale,
      ctx
    );
  }
  //left shoulder to hip
  if (lShoulder.score > minConfidence && lHip.score > minConfidence) {
    drawSegment(
      toTuple(lShoulder.y, lShoulder.x),
      toTuple(lHip.y, lHip.x),
      color,
      scale,
      ctx
    );
  }
  //right shoulder to hip
  if (rShoulder.score > minConfidence && rHip.score > minConfidence) {
    drawSegment(
      toTuple(rShoulder.y, rShoulder.x),
      toTuple(rHip.y, rHip.x),
      color,
      scale,
      ctx
    );
  }
  // hip join
  if (lHip.score > minConfidence && rHip.score > minConfidence) {
    drawSegment(
      toTuple(lHip.y, lHip.x),
      toTuple(rHip.y, rHip.x),
      color,
      scale,
      ctx
    );
  }
  //left hip to knee
  if (lHip.score > minConfidence && lKnee.score > minConfidence) {
    drawSegment(
      toTuple(lHip.y, lHip.x),
      toTuple(lKnee.y, lKnee.x),
      color,
      scale,
      ctx
    );
  }
  //left knee to ankle
  if (lKnee.score > minConfidence && lAnkle.score > minConfidence) {
    drawSegment(
      toTuple(lKnee.y, lKnee.x),
      toTuple(lAnkle.y, lAnkle.x),
      color,
      scale,
      ctx
    );
  }
  //right hip to knee
  if (rHip.score > minConfidence && rKnee.score > minConfidence) {
    drawSegment(
      toTuple(rHip.y, rHip.x),
      toTuple(rKnee.y, rKnee.x),
      color,
      scale,
      ctx
    );
  }
  //right knee to ankle
  if (rKnee.score > minConfidence && rAnkle.score > minConfidence) {
    drawSegment(
      toTuple(rKnee.y, rKnee.x),
      toTuple(rAnkle.y, rAnkle.x),
      color,
      scale,
      ctx
    );
  }
}

/**
 * Draw joints
 */
export function drawKeypoints(pose, minConfidence, ctx, scale = 1) {
  for (let i = 5; i < pose[0].keypoints.length; i++) {
    const keypoint = pose[0].keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }
    let x = keypoint.x;
    let y = keypoint.y;

    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

function calcAngle([ay, ax], [by, bx], [cy, cx], [dy, dx], ctx, color) {
  const slope1 = (ay - by) / (ax - bx);
  const slope2 = (cy - dy) / (cx - dx);

  const angle = Math.atan((slope2 - slope1) / (1 + slope1 * slope2));
  const text = (angle * 180) / Math.PI;

  ctx.beginPath();
  ctx.fillText(text, bx, by);
  ctx.stroke();
}

export function interiorAngle(pose, setIntAngle) {
  const lShoulder = pose[0].keypoints[5];
  const rShoulder = pose[0].keypoints[6];
  const rElbow = pose[0].keypoints[8];

  const ay = lShoulder.y;
  const ax = lShoulder.x;
  const by = rShoulder.y;
  const bx = rShoulder.x;
  const dy = rElbow.y;
  const dx = rElbow.x;

  const slope1 = (ay - by) / (ax - bx);
  const slope2 = (by - dy) / (bx - dx);

  const angle = Math.atan((slope2 - slope1) / (1 + slope1 * slope2));
  const angleReturn = (angle * 180) / Math.PI;
  setIntAngle(Math.abs(Math.round(angleReturn)));
}

export function exteriorAngle(pose, setExtAngle) {
  const rShoulder = pose[0].keypoints[6];
  const rElbow = pose[0].keypoints[8];
  const rWrist = pose[0].keypoints[10];

  const ay = rShoulder.y;
  const ax = rShoulder.x;
  const by = rElbow.y;
  const bx = rElbow.x;
  const dy = rWrist.y;
  const dx = rWrist.x;

  const slope1 = (ay - by) / (ax - bx);
  const slope2 = (by - dy) / (bx - dx);

  const angle = Math.atan((slope2 - slope1) / (1 + slope1 * slope2));
  const angleReturn = (angle * 180) / Math.PI;
  setExtAngle(Math.abs(Math.round(angleReturn)));
}

export function releaseAngle(pose, setRelAngle) {
  const rShoulder = pose[0].keypoints[6];
  const rWrist = pose[0].keypoints[10];

  const ay = rShoulder.y;
  const ax = rShoulder.x;
  const by = rWrist.y;
  const bx = rWrist.x;
  const dy = rShoulder.y;
  const dx = rWrist.x;

  const slope1 = (ay - by) / (ax - bx);
  const slope2 = (ay - dy) / (ax - dx);

  const angle = Math.atan((slope2 - slope1) / (1 + slope1 * slope2));
  const angleReturn = (angle * 180) / Math.PI;
  setRelAngle(Math.abs(Math.round(angleReturn)));
}
