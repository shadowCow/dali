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
  return drawEllipse(eyeId + "-iris", centerX, centerY, radius, radius, color)
}

function drawPupil(eyeId, centerX, centerY, radius) {
  return drawEllipse(eyeId + "-pupil", centerX, centerY, radius, radius, "black")
}

function drawEyeOutline(eyeId, centerX, centerY, irisRadius) {
  return drawEllipse(
    eyeId + "-eyeOutline",
    centerX,
    centerY,
    irisRadius*2,
    irisRadius*1.25,
    "white",
    "black",
    3
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
