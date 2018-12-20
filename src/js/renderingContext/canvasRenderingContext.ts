import {COMMAND_NAMES, SEGMENT_TYPES, Transform, TransformOp, TransformOps} from '../commands/primitiveShapeCommands.js';

let canvas;
let ctx;

function init(containerId, canvasId) {
  let maybeAlreadyCanvas = document.getElementById(canvasId);
  
  if (!maybeAlreadyCanvas) {
    let container = document.getElementById(containerId);

    canvas = document.createElement('canvas');
    canvas.id = canvasId;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    container.appendChild(canvas);

    ctx = canvas.getContext('2d');
  }
}

function drawPrimitives(primitives) {
  primitives.forEach(p => {
    // console.log('drawing primitive', p);
    drawPrimitive(p);
  });
}

function drawPrimitive(p) {
  switch (p.name) {
    case COMMAND_NAMES.DRAW_TEXT:
      drawText(p.params);
      break;
    case COMMAND_NAMES.DRAW_ELLIPSE:
      drawEllipse(p.params);
      break;
    case COMMAND_NAMES.DRAW_RECT:
      drawRect(p.params);
      break;
    case COMMAND_NAMES.DRAW_LINE:
      drawLine(p.params);
      break;
    case COMMAND_NAMES.DRAW_POLYGON:
      drawPolygon(p.params);
      break;
    case COMMAND_NAMES.DRAW_PATH:
      drawPath(p.params);
      break;
    default:
      throw `Unknown primitive ${p.name}`;
  }
}

function drawText(textData) {
  if (textData.drawParams.font) {
    ctx.font = textData.drawParams.font;
  }
  if (textData.styles && textData.styles.fill) {
    ctx.fillStyle = textData.styles.fill;
    ctx.fillText(textData.drawParams.text, textData.drawParams.x, textData.drawParams.y);
  }
  if (textData.styles && textData.styles.stroke) {
    ctx.strokeStyle = textData.styles.stroke;
    ctx.lineWidth = textData.styles.strokeWidth;
    ctx.strokeText(textData.drawParams.text, textData.drawParams.x, textData.drawParams.y);
  }
}

function drawEllipse(ellipseData) {
  ctx.beginPath();
  ctx.ellipse(
    ellipseData.drawParams.cx,
    ellipseData.drawParams.cy,
    ellipseData.drawParams.rx,
    ellipseData.drawParams.ry,
    0,
    0,
    2 * Math.PI
  )
  if (ellipseData.styles && ellipseData.styles.fill) {
    ctx.fillStyle = ellipseData.styles.fill;
    // console.log('filling ellipse', ctx.fillStyle);
    ctx.fill();
  }

  if (ellipseData.styles && ellipseData.styles.stroke) {
    ctx.strokeStyle = ellipseData.styles.stroke;
    ctx.lineWidth = ellipseData.styles.strokeWidth || ctx.lineWidth;
    ctx.stroke();
  }

  ctx.closePath();
}

function drawRect(rectData) {
  if (rectData.drawParams.rx > 0 || rectData.drawParams.ry > 0) {
    _drawRoundRect(rectData);
  } else {
    if (rectData.styles && rectData.styles.fill) {
      ctx.fillStyle = rectData.styles.fill;
      ctx.fillRect(rectData.drawParams.x, rectData.drawParams.y, rectData.drawParams.width, rectData.drawParams.height);
    }
    if (rectData.styles && rectData.styles.stroke) {
      ctx.strokeStyle = rectData.styles.stroke;
      ctx.lineWidth = rectData.styles.strokeWidth || ctx.lineWidth;
      ctx.strokeRect(rectData.drawParams.x, rectData.drawParams.y, rectData.drawParams.width, rectData.drawParams.height);
    }
  }
}

function _drawRoundRect(rectData) {
  const {x, y, width, height, rx, ry} = rectData.drawParams;
  const {fill, stroke, strokeWidth} = rectData.styles;

  ctx.fillStyle = fill || ctx.fillStyle;
  ctx.strokeStyle = stroke || ctx.strokeStyle;
  ctx.lineWidth = strokeWidth || ctx.lineWidth;

  ctx.beginPath();
  ctx.moveTo(x + rx, y);
  ctx.lineTo(x + width - rx, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
  ctx.lineTo(x + width, y + height - ry);
  ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
  ctx.lineTo(x + rx, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
  ctx.lineTo(x, y + ry);
  ctx.quadraticCurveTo(x, y, x + rx, y);
  
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

  ctx.closePath();
}

function drawLine(lineData) {
  if (lineData.styles) {
    ctx.fillStyle = lineData.styles.fill || ctx.fillStyle;
    ctx.strokeStyle = lineData.styles.stroke || ctx.strokeStyle;
    ctx.lineWidth = lineData.styles.strokeWidth || ctx.lineWidth;
  }
  
  ctx.beginPath();
  ctx.moveTo(lineData.drawParams.x1, lineData.drawParams.y1);
  ctx.lineTo(lineData.drawParams.x2, lineData.drawParams.y2);

  ctx.stroke();
  ctx.closePath();
}

function drawPolygon(polygonData) {
  if (polygonData.styles) {
    ctx.fillStyle = polygonData.styles.fill || ctx.fillStyle;
    ctx.strokeStyle = polygonData.styles.stroke || ctx.strokeStyle;
    ctx.lineWidth = polygonData.styles.strokeWidth || ctx.lineWidth;
  }
  
  const points = polygonData.drawParams.points;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length-1; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length-1].x, points[points.length-1].y)

  if (polygonData.styles && polygonData.styles.fill) {
    ctx.fill();
  }
  if (polygonData.styles && polygonData.styles.stroke) {
    ctx.stroke();
  }
  ctx.closePath();
}

function drawPath(pathData) {
  if (pathData.styles) {
    // does fill make any sense?
    ctx.fillStyle = pathData.styles.fill || ctx.fillStyle;
    ctx.strokeStyle = pathData.styles.stroke || ctx.strokeStyle;
    ctx.lineWidth = pathData.styles.strokeWidth || ctx.lineWidth;
  }
  
  ctx.beginPath();
  ctx.moveTo(pathData.drawParams.startX, pathData.drawParams.startY);
  pathData.drawParams.segments.forEach(s => _drawPathSegment(ctx, s));

  if (pathData.styles && pathData.styles.fill) {
    ctx.fill();
  }

  if (pathData.styles && pathData.styles.stroke) {
    ctx.stroke();
  }

  ctx.closePath();
}

function _drawPathSegment(ctx, segment) {
  switch (segment.type) {
    case SEGMENT_TYPES.MOVE_TO:
      ctx.moveTo(segment.x, segment.y);
      break;
    case SEGMENT_TYPES.LINE_TO:
      ctx.lineTo(segment.toX, segment.toY);
      break;
    case SEGMENT_TYPES.BEZIER_CURVE_TO:
      ctx.bezierCurveTo(
        segment.cp1x,
        segment.cp1y,
        segment.cp2x,
        segment.cp2y,
        segment.toX,
        segment.toY
      )
      break;
    case SEGMENT_TYPES.QUADRATIC_CURVE_TO:
      ctx.quadraticCurveTo(
        segment.cpx,
        segment.cpy,
        segment.toX,
        segment.toY
      )
      break;
    default:
      throw `Unknown path segment type: ${segment.type}`
  }
}

function drawGroup(
  group
) {
  group.params.drawParams.primitives.forEach(p => drawPrimitive(p));
}

function _applyTransform(
  transform: Transform,
  drawingOp: () => void,
  ctx: CanvasRenderingContext2D,
): void {
  transform.transformOps.forEach(tOp=> _applyTransformOp(tOp, ctx))

  drawingOp();
}

function _applyTransformOp(
  transformOp: TransformOp,
  ctx: CanvasRenderingContext2D,
): void {
  switch (transformOp.type) {
    case TransformOps.ROTATE:
      ctx.rotate(transformOp.a);
      break;
    case TransformOps.SCALE:
      ctx.scale(transformOp.x, transformOp.y);
      break;
    case TransformOps.SKEW:
      ctx.transform(1, transformOp.y, transformOp.x, 1, 0, 0);
      break;
    case TransformOps.TRANSLATE:
      ctx.translate(transformOp.x, transformOp.y);
      break;
  }
}

function _resetTransform(
  ctx: CanvasRenderingContext2D
): void {
  ctx.setTransform(1,0,0,1,0,0);
}

export default {
  init,
  drawPrimitives,
  drawText,
  drawEllipse,
  drawRect,
  drawLine,
  drawPolygon,
  drawPath,
  drawGroup
}