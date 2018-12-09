import { drawPath, quadraticCurvePathSegment } from "../primitiveShapeCommands.js";

function drawWave(
  id,
  startX,
  startY,
  waveLength,
  amplitude,
  numCycles,
  fill,
  stroke,
  strokeWidth
) {

  let segments = [
    quadraticCurvePathSegment(
      startX + waveLength/2,
      startY + amplitude,
      startX + waveLength,
      startY
    )
  ];

  for (let i = 1; i < numCycles; i++) {
    segments.push(quadraticCurvePathSegment(
      segments[i-1].toX + waveLength/2,
      segments[i-1].toY + amplitude,
      segments[i-1].toX + waveLength,
      segments[i-1].toY
    ));
  }

  return drawPath(
    id,
    startX,
    startY,
    segments,
    fill,
    stroke,
    strokeWidth
  )
}

export {
  drawWave
}