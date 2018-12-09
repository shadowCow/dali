import {COMMAND_NAMES, SEGMENT_TYPES} from '../commands/primitiveShapeCommands.js';

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
    _drawPrimitive(p);
  });
}

function _drawPrimitive(p) {
  switch (p.name) {
    case COMMAND_NAMES.DRAW_ELLIPSE:
      drawEllipse(p.params);
      break;
    case COMMAND_NAMES.DRAW_RECT:
      drawRect(p.params);
      break;
    case COMMAND_NAMES.DRAW_LINE:
      drawLine(p.params);
      break;
    case COMMAND_NAMES.DRAW_POLYLINE:
      drawPolyline(p.params);
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

function drawEllipse(ellipseData) {
  ctx.beginPath();
  ctx.ellipse(
    ellipseData.centerX,
    ellipseData.centerY,
    ellipseData.radiusX,
    ellipseData.radiusY,
    0,
    0,
    2 * Math.PI
  )
  if (ellipseData.fill) {
    ctx.fillStyle = ellipseData.fill;
    console.log('filling ellipse', ctx.fillStyle);
    ctx.fill();
  }

  if (ellipseData.stroke) {
    ctx.strokeStyle = ellipseData.stroke;
    ctx.lineWidth = ellipseData.strokeWidth || ctx.lineWidth;
    ctx.stroke();
  }

  ctx.closePath();
}

function drawRect(rectData) {
  if (rectData.rx > 0 || rectData.ry > 0) {
    _drawRoundRect(rectData);
  } else {
    if (rectData.fill) {
      ctx.fillStyle = rectData.fill;
      ctx.fillRect(rectData.x, rectData.y, rectData.width, rectData.height);
    }
    if (rectData.stroke) {
      ctx.strokeStyle = rectData.stroke;
      ctx.lineWidth = rectData.strokeWidth;
      ctx.strokeRect(rectData.x, rectData.y, rectData.width, rectData.height);
    }
  }
}

function _drawRoundRect(rectData) {
  const {x, y, width, height, rx, ry, fill, stroke, strokeWidth} = rectData;

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
  ctx.fillStyle = lineData.fill || ctx.fillStyle;
  ctx.strokeStyle = lineData.stroke || ctx.strokeStyle;
  ctx.lineWidth = lineData.strokeWidth || ctx.lineWidth;

  ctx.beginPath();
  ctx.moveTo(lineData.x1, lineData.y1);
  ctx.lineTo(lineData.x2, lineData.y2);

  ctx.stroke();
  ctx.closePath();
}

function drawPolyline(polylineData) {

}

function drawPolygon(polygonData) {
  console.log('drawing polygon', polygonData);
  ctx.fillStyle = polygonData.fill || ctx.fillStyle;
  ctx.strokeStyle = polygonData.stroke || ctx.strokeStyle;
  ctx.lineWidth = polygonData.strokeWidth || ctx.lineWidth;

  const points = polygonData.points;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length-1; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.lineTo(points[points.length-1].x, points[points.length-1].y)

  if (polygonData.fill) {
    ctx.fill();
  }
  if (polygonData.stroke) {
    ctx.stroke();
  }
  ctx.closePath();
}

function drawPath(pathData) {
  // does fill make any sense?
  ctx.fillStyle = pathData.fill || ctx.fillStyle;
  ctx.strokeStyle = pathData.stroke || ctx.strokeStyle;
  ctx.lineWidth = pathData.strokeWidth || ctx.lineWidth;

  ctx.beginPath();
  ctx.moveTo(pathData.startX, pathData.startY);
  pathData.segments.forEach(s => _drawPathSegment(ctx, s));

  if (pathData.fill) {
    ctx.fill();
  }

  if (pathData.stroke) {
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
  if (group.params.transform) {
    let {a,b,c,d,e,f} = group.params.transform;
    ctx.transform(a,b,c,d,e,f);
  }
  
  group.params.primitives.forEach(p => _drawPrimitive(p));

  ctx.setTransform(1,0,0,1,0,0);
}

export default {
  init,
  drawPrimitives,
  drawEllipse,
  drawRect,
  drawLine,
  drawPolyline,
  drawPolygon,
  drawPath,
  drawGroup
}