import {
  COMMAND_NAMES,
  SEGMENT_TYPES,
  PrimitiveShapeParams,
  Styles,
  Transform,
  TransformOp,
  TransformOps
} from '../commands/primitiveShapeCommands.js';
import Command from '../commands/command.js';

const svgNs = "http://www.w3.org/2000/svg";

let canvas;

function init(containerId: string, canvasId: string): void {
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


function drawPrimitives(
  primitives: Array<Command<PrimitiveShapeParams>>,
  parent = canvas
): void {
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

  textElement.style.font = textData.drawParams.font;

  const textNode = document.createTextNode(textData.drawParams.text);
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
  const pointsAsSvgString = polygonData.drawParams.points.map(p => {
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
    drawParams: {
      points: pointsAsSvgString
    }
  }

  _createAndAdd(
    "polygon",
    polygonForSvg,
    ["points"],
    parent
  )
}

function drawPath(pathData, parent = canvas) {
  const pathStart = `M${pathData.drawParams.startX} ${pathData.drawParams.startY},`
  const segmentsAsSvgString = pathData.drawParams.segments.map(s => {
    return _pathSegmentToSvgString(s);
  }).reduce((acc, item) => {
    return acc + " " + item
  }, pathStart);

  const pathForSvg = {
    ...pathData,
    drawParams: {
      d: segmentsAsSvgString
    }
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

function drawGroup(
  groupData: Command<PrimitiveShapeParams>,
  parent = canvas
): void {
  const groupEl = _createAndAdd(
    "g",
    groupData.params,
    [],
    parent
  );

  _addStyles(groupEl, groupData.params.styles);

  groupData.params.drawParams.primitives.forEach(p => drawPrimitive(p, groupEl));
}

function _createAndAdd(
  elementTag: string,
  data: PrimitiveShapeParams,
  attributes: Array<string>,
  parent = canvas
) {
  const element = document.createElementNS(svgNs, elementTag);
  _setAttributes(element, data.drawParams, attributes);
  _addStyles(element, data.styles);
  _addTransform(element, data.transform);

  parent.appendChild(element);

  return element;
}

function _setAttributes(
  element,
  data: object,
  attributes: Array<string>
): void {
  attributes.forEach(a => {
    element.setAttribute(a, data[a])
  });
}

function _addStyles(
  element,
  styles?: Styles,
): void {
  if (styles) {
    if (styles.stroke) {
      element.style.stroke = styles.stroke;
      element.style.strokeWidth = styles.strokeWidth;
    }
    if (styles.fill) {
      element.style.fill = styles.fill;
    } else {
      element.style.fill = "none"
    }
  }
}

function _addTransform(
  element,
  transform?: Transform
): void {
  if (transform) {
    let transformAsSvgString: string = transform.transformOps.reduce((acc: string, item: TransformOp, index) => {
      if (index !== 0) {
        return acc + " " + _transformOpAsSvgString(item)
      } else {
        return acc + _transformOpAsSvgString(item) 
      }
    }, "")
    element.setAttribute("transform", transformAsSvgString);
  }
}

function _transformOpAsSvgString(
  transformOp: TransformOp
): string {
  switch (transformOp.type) {
    case TransformOps.ROTATE:
      return _rotateAsSvgString(transformOp)
    case TransformOps.SCALE:
      return _scaleAsSvgString(transformOp)
    case TransformOps.SKEW:
      return _skewAsSvgString(transformOp)
    case TransformOps.TRANSLATE:
      return _translateAsSvgString(transformOp)
  }
}

function _rotateAsSvgString(
  rotate: TransformOp
): string {
  return `rotate(${rotate.a} ${rotate.x} ${rotate.y})`
}

function _scaleAsSvgString(
  scale: TransformOp
): string {
  return `scale(${scale.x} ${scale.y})`
}

function _skewAsSvgString(
  skew: TransformOp
): string {
  let skewString: string = "";
  if (skew.x) {
    skewString = `skewX(${skew.x})`
  }
  if (skew.y) {
    let maybeSpace = skewString.length > 0
     ? " "
     : "";

    skewString = skewString + maybeSpace + `skewY(${skew.y})`
  }

  return skewString;
}

function _translateAsSvgString(
  translate: TransformOp
): string {
  return `translate(${translate.x} ${translate.y})`
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