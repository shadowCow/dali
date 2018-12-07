
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
  let d = `M ${startX},${startY} ` +
           `Q ${startX + waveLength/2},${startY - amplitude} ${startX + waveLength},${startY} ` +
           "t"

  for (let i = 0; i < numCycles; i++) {
    d += ` ${waveLength},0`
  }
  return drawPath(id, d, fill, stroke, strokeWidth)
}