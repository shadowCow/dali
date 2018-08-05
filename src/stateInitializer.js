import uuidv4 from 'uuid/v4'

import PaintingConstants from './model/PaintingConstants'
import actionCreators from './model/actions/actionCreators'

const {CIRCLE} = PaintingConstants
const {drawCircle, drawPath} = actionCreators

function getInitialActions() {
  return [
    drawCircle('1',100,100,50,"red","black",3),
    drawPath("2","M 200,100 A 30 60 20 1 1 250 250")
  ]
}

export default getInitialActions
