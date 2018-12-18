import {COMMAND_NAMES, SEGMENT_TYPES} from '../commands/primitiveShapeCommands.js';

const svgNs = "http://www.w3.org/2000/svg";

let canvas;

function init(containerId, canvasId) {
  let maybeAlreadyCanvas = document.getElementById(canvasId);

  if (!maybeAlreadyCanvas) {
    let container = document.getElementById(containerId);

    canvas = document.createElementNS(svgNs, 'svg');
    canvas.id = canvasId;
    canvas.setAttribute("width", "100%");
    canvas.setAttribute("height", "100%");
    // canvas.setAttribute("viewBox", "0 0 1000 600");
    canvas.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

    container.appendChild(canvas);
  } else {
    canvas = maybeAlreadyCanvas;
  }
}


function drawPrimitives(primitives, parent = canvas) {
  primitives.forEach(p => {
    // console.log('drawing primitive', p);
    drawPrimitive(p, parent);
  });
}

function drawPrimitive(p, parent = canvas) {
  switch (p.name) {
    case COMMAND_NAMES.DRAW_TEXT:
      drawText(p.params, parent);
      break;
    case COMMAND_NAMES.DRAW_ELLIPSE:
      drawEllipse(p.params, parent);
      break;
    case COMMAND_NAMES.DRAW_RECT:
      drawRect(p.params, parent);
      break;
    case COMMAND_NAMES.DRAW_LINE:
      drawLine(p.params, parent);
      break;
    case COMMAND_NAMES.DRAW_POLYLINE:
      drawPolyline(p.params, parent);
      break;
    case COMMAND_NAMES.DRAW_POLYGON:
      drawPolygon(p.params, parent);
      break;
    case COMMAND_NAMES.DRAW_PATH:
      drawPath(p.params, parent);
      break;
    default:
      throw `Unknown primitive ${p.name}`;
  }
}

function drawText(textData, parent = canvas) {
  const textElement = _createAndAdd(
    "text",
    textData,
    ["x","y"],
    parent
  )

  textElement.style.font = textData.font;

  const textNode = document.createTextNode(textData.text);
  textElement.appendChild(textNode);
}

function drawEllipse(ellipseData, parent = canvas) {
  _createAndAdd(
    "ellipse",
    ellipseData,
    ["cx","cy","rx","ry"],
    parent
  )
}

function drawRect(rectData, parent = canvas) {
  _createAndAdd(
    "rect",
    rectData,
    ["x","y","width","height","rx","ry"],
    parent
  )
}

function drawLine(lineData, parent = canvas) {
  _createAndAdd(
    "line",
    lineData,
    ['x1','y1','x2','y2'],
    parent
  );
}

function drawPolygon(polygonData, parent = canvas) {
  const pointsAsSvgString = polygonData.points.map(p => {
    return `${p.x},${p.y}`
  }).reduce((acc, item, index) => {
    if (index !== 0) {
      return acc + " " + item
    } else {
      return acc + item
    }
  }, "");

  const polygonForSvg = {
    ...polygonData,
    points: pointsAsSvgString
  }

  _createAndAdd(
    "polygon",
    polygonForSvg,
    ["points"],
    parent
  )
}

function drawPath(pathData, parent = canvas) {
  const pathStart = `M${pathData.startX} ${pathData.startY},`
  const segmentsAsSvgString = pathData.segments.map(s => {
    return _pathSegmentToSvgString(s);
  }).reduce((acc, item) => {
    return acc + " " + item
  }, pathStart);
  console.log(segmentsAsSvgString)

  const pathForSvg = {
    ...pathData,
    d: segmentsAsSvgString
  }

  _createAndAdd(
    "path",
    pathForSvg,
    ["d"],
    parent
  )
}

function _pathSegmentToSvgString(pathSegment) {
  switch (pathSegment.type) {
    case SEGMENT_TYPES.MOVE_TO:
      return `M${pathSegment.x} ${pathSegment.y}`;
    case SEGMENT_TYPES.LINE_TO:
      return `L ${pathSegment.toX} ${pathSegment.toY}`;
    case SEGMENT_TYPES.BEZIER_CURVE_TO:
      return `C ${pathSegment.cp1x} ${pathSegment.cp2x}, ${pathSegment.cp2x} ${pathSegment.cp2y}, ${pathSegment.toX} ${pathSegment.toY}`;
    case SEGMENT_TYPES.QUADRATIC_CURVE_TO:
      return `Q ${pathSegment.cpx} ${pathSegment.cpy}, ${pathSegment.toX} ${pathSegment.toY}`;
    default:
      throw `Unknown segment type ${pathSegment.type}`
  }
}

function drawGroup(groupData, parent = canvas) {
  const groupEl = _createAndAdd(
    "g",
    groupData,
    [],
    parent
  );

  _addStyles(groupEl, groupData);

  groupData.params.primitives.forEach(p => drawPrimitive(p, groupEl));
}

function _createAndAdd(elementTag, data, attributes, parent = canvas) {
  const element = document.createElementNS(svgNs, elementTag);
  _setAttributes(element, data, attributes);
  _addStyles(element, data);

  parent.appendChild(element);

  return element;
}

function _setAttributes(element, data, attributes) {
  attributes.forEach(a => {
    element.setAttribute(a, data[a])
  });
}

function _addStyles(element, shapeData) {
  if (shapeData.stroke) {
    element.style.stroke = shapeData.stroke;
    element.style.strokeWidth = shapeData.strokeWidth;
  }
  if (shapeData.fill) {
    element.style.fill = shapeData.fill;
  } else {
    element.style.fill = "none"
  }
}

function _addTransform(element, transform) {
  if (transform) {
    element.setAttribute("transform", transform);
  }
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