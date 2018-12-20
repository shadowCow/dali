import {drawEllipse} from '../primitiveShapeCommands.js'

function drawEye(
  id,
  centerX,
  centerY,
  irisRadius,
  irisColor
) {
  return [
    drawEyeOutline(id, centerX, centerY, irisRadius),
    drawIris(id, centerX, centerY, irisRadius, irisColor),
    drawPupil(id, centerX, centerY, irisRadius/2),
  ]
}

function drawIris(eyeId, centerX, centerY, radius, color) {
  return drawEllipse(
    eyeId + "-iris",
    {cx: centerX, cy: centerY, rx: radius, ry: radius},
    {fill: color}
  )
}

function drawPupil(eyeId, centerX, centerY, radius) {
  return drawEllipse(
    eyeId + "-pupil",
    {cx: centerX, cy: centerY, rx: radius, ry: radius},
    {fill:"black"}
  )
}

function drawEyeOutline(eyeId, centerX, centerY, irisRadius) {
  return drawEllipse(
    eyeId + "-eyeOutline",
    {cx: centerX, cy: centerY, rx: irisRadius*2, ry: irisRadius*1.25},
    {fill:"white",stroke:"black",strokeWidth:3}
  )
}

function drawEyePair(id, centerX, centerY, eyeSpacing, irisRadius, irisColor) {
  const centerXEye1 = centerX - eyeSpacing/2 - irisRadius*2
  const centerXEye2 = centerX + eyeSpacing/2 + irisRadius*2

  return [
    ...drawEye(id + "-eyeOne", centerXEye1, centerY, irisRadius, irisColor),
    ...drawEye(id + "-eyeTwo", centerXEye2, centerY, irisRadius, irisColor)
  ]
}

export {
  drawEye,
  drawEyePair
}
