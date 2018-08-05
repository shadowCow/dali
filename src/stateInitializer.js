import uuidv4 from 'uuid/v4'

import PaintingConstants from './model/PaintingConstants'
import actionCreators from './model/actions/actionCreators'
import eye from './model/actions/compositeActions/eye'

const {CIRCLE} = PaintingConstants
const {drawCircle, drawPath, drawEllipse, drawWave} = actionCreators
const {drawEye, drawEyePair} = eye

function getInitialActions() {
  return [
    drawCircle('1',100,100,50,"red","black",3),
    drawPath("2","M 200,100 A 30 60 20 1 1 250 250","green"),
    drawWave("3",50, 50, 50, 40, 20,"none","blue",3),
    ...drawEye("4", 300, 200, 50, "blue"),
    ...drawEyePair("5", 500, 400, 30, 30, "brown"),
    drawEllipse("6", 700, 200, 50, 250, "red")
  ]
}

export default getInitialActions
