import { drawPath, quadraticCurvePathSegment, Transform, Styles } from "../primitiveShapeCommands.js";

interface DrawWaveParams {
  startX: number;
  startY: number;
  waveLength: number;
  amplitude: number;
  numCycles: number;
}

function drawWave(
  id: string,
  drawParams: DrawWaveParams,
  styles?: Styles,
  transform?: Transform
) {

  let segments = [
    quadraticCurvePathSegment(
      drawParams.startX + drawParams.waveLength/2,
      drawParams.startY + drawParams.amplitude,
      drawParams.startX + drawParams.waveLength,
      drawParams.startY
    )
  ];

  for (let i = 1; i < drawParams.numCycles; i++) {
    segments.push(quadraticCurvePathSegment(
      segments[i-1].toX + drawParams.waveLength/2,
      segments[i-1].toY + drawParams.amplitude,
      segments[i-1].toX + drawParams.waveLength,
      segments[i-1].toY
    ));
  }

  return drawPath(
    id,
    {startX: drawParams.startX, startY: drawParams.startY, segments},
    styles,
    transform
  )
}

export {
  drawWave
}