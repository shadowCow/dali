import { quadraticCurveTo, primitiveDrawable, path, Styles, Transform, PrimitiveDrawable } from "../primitives/index";

export function waves(
  id: string,
  x: number,
  y: number,
  waveLength: number,
  amplitude: number,
  cycleCount: number,
  styles?: Styles,
  transforms?: Array<Transform>
): PrimitiveDrawable {

  let segments = [
    quadraticCurveTo(
      x + waveLength/2,
      y + amplitude,
      x + waveLength,
      y
    )
  ];

  for (let i = 1; i < cycleCount; i++) {
    segments.push(quadraticCurveTo(
      segments[i-1].toX + waveLength/2,
      segments[i-1].toY + amplitude,
      segments[i-1].toX + waveLength,
      segments[i-1].toY
    ));
  }

  return primitiveDrawable(
    id,
    path(
      x,
      y,
      segments
    ),
    styles,
    transforms
  )
}
