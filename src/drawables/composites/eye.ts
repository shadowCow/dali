import { CompositeDrawable, compositeDrawable, PrimitiveDrawable, primitiveDrawable } from "../primitives/drawable"
import { ellipse } from "../primitives/primitiveShapes"
import { fill, strokeAndFill } from "../primitives/styles"


export function eyePair(
  id: string,
  cx: number,
  cy: number,
  eyeSpacing: number,
  irisRadius: number,
  irisColor: string
): CompositeDrawable {
  const centerXEye1 = cx - eyeSpacing/2 - irisRadius*2
  const centerXEye2 = cx + eyeSpacing/2 + irisRadius*2

  const drawables = [
    eye(
      id + 'eyeOne',
      centerXEye1,
      cy,
      irisRadius,
      irisColor
    ),
    eye(
      id + 'eyeTwo',
      centerXEye2,
      cy,
      irisRadius,
      irisColor
    )
  ]

  return compositeDrawable(
    id,
    drawables,
  )
}

export function eye(
  id: string,
  cx: number,
  cy: number,
  irisRadius: number,
  irisColor: string,
): CompositeDrawable {
  
  const drawables = [
    eyeOutline(id, cx, cy, irisRadius),
    iris(id, cx, cy, irisRadius, irisColor),
    pupil(id, cx, cy, irisRadius/2),
  ]

  return compositeDrawable(
    id,
    drawables,
  )
}

function iris(
  eyeId: string,
  cx: number,
  cy: number,
  radius: number,
  color: string
): PrimitiveDrawable {
  return primitiveDrawable(
    eyeId + '-iris',
    ellipse(
      cx,
      cy,
      radius,
      radius
    ),
    fill(color)
  )
}

function pupil(
  eyeId: string,
  cx: number,
  cy: number,
  r: number
): PrimitiveDrawable {
  return primitiveDrawable(
    eyeId + '-pupil',
    ellipse(
      cx,
      cy,
      r,
      r
    ),
    fill('black')
  )
}

function eyeOutline(
  eyeId: string,
  cx: number,
  cy: number,
  irisRadius: number
): PrimitiveDrawable {
  return primitiveDrawable(
    eyeId + '-eyeOutline',
    ellipse(
      cx,
      cy,
      irisRadius*2,
      irisRadius*2,
    ),
    strokeAndFill(
      'black',
      3,
      'white'
    )
  )
}
