var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { COMMAND_NAMES, SEGMENT_TYPES, TransformOps } from '../commands/primitiveShapeCommands.js';
var svgNs = "http://www.w3.org/2000/svg";
var canvas;
function init(containerId, canvasId) {
    var maybeAlreadyCanvas = document.getElementById(canvasId);
    if (!maybeAlreadyCanvas) {
        var container = document.getElementById(containerId);
        canvas = document.createElementNS(svgNs, 'svg');
        canvas.id = canvasId;
        canvas.setAttribute("width", "100%");
        canvas.setAttribute("height", "100%");
        canvas.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
        container.appendChild(canvas);
    }
    else {
        canvas = maybeAlreadyCanvas;
    }
}
function drawPrimitives(primitives, parent) {
    if (parent === void 0) { parent = canvas; }
    primitives.forEach(function (p) {
        drawPrimitive(p, parent);
    });
}
function drawPrimitive(p, parent) {
    if (parent === void 0) { parent = canvas; }
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
            throw "Unknown primitive " + p.name;
    }
}
function drawText(textData, parent) {
    if (parent === void 0) { parent = canvas; }
    var textElement = _createAndAdd("text", textData, ["x", "y"], parent);
    textElement.style.font = textData.drawParams.font;
    var textNode = document.createTextNode(textData.drawParams.text);
    textElement.appendChild(textNode);
}
function drawEllipse(ellipseData, parent) {
    if (parent === void 0) { parent = canvas; }
    _createAndAdd("ellipse", ellipseData, ["cx", "cy", "rx", "ry"], parent);
}
function drawRect(rectData, parent) {
    if (parent === void 0) { parent = canvas; }
    _createAndAdd("rect", rectData, ["x", "y", "width", "height", "rx", "ry"], parent);
}
function drawLine(lineData, parent) {
    if (parent === void 0) { parent = canvas; }
    _createAndAdd("line", lineData, ['x1', 'y1', 'x2', 'y2'], parent);
}
function drawPolygon(polygonData, parent) {
    if (parent === void 0) { parent = canvas; }
    var pointsAsSvgString = polygonData.drawParams.points.map(function (p) {
        return p.x + "," + p.y;
    }).reduce(function (acc, item, index) {
        if (index !== 0) {
            return acc + " " + item;
        }
        else {
            return acc + item;
        }
    }, "");
    var polygonForSvg = __assign({}, polygonData, { drawParams: {
            points: pointsAsSvgString
        } });
    _createAndAdd("polygon", polygonForSvg, ["points"], parent);
}
function drawPath(pathData, parent) {
    if (parent === void 0) { parent = canvas; }
    var pathStart = "M" + pathData.drawParams.startX + " " + pathData.drawParams.startY + ",";
    var segmentsAsSvgString = pathData.drawParams.segments.map(function (s) {
        return _pathSegmentToSvgString(s);
    }).reduce(function (acc, item) {
        return acc + " " + item;
    }, pathStart);
    var pathForSvg = __assign({}, pathData, { drawParams: {
            d: segmentsAsSvgString
        } });
    _createAndAdd("path", pathForSvg, ["d"], parent);
}
function _pathSegmentToSvgString(pathSegment) {
    switch (pathSegment.type) {
        case SEGMENT_TYPES.MOVE_TO:
            return "M" + pathSegment.x + " " + pathSegment.y;
        case SEGMENT_TYPES.LINE_TO:
            return "L " + pathSegment.toX + " " + pathSegment.toY;
        case SEGMENT_TYPES.BEZIER_CURVE_TO:
            return "C " + pathSegment.cp1x + " " + pathSegment.cp2x + ", " + pathSegment.cp2x + " " + pathSegment.cp2y + ", " + pathSegment.toX + " " + pathSegment.toY;
        case SEGMENT_TYPES.QUADRATIC_CURVE_TO:
            return "Q " + pathSegment.cpx + " " + pathSegment.cpy + ", " + pathSegment.toX + " " + pathSegment.toY;
        default:
            throw "Unknown segment type " + pathSegment.type;
    }
}
function drawGroup(groupData, parent) {
    if (parent === void 0) { parent = canvas; }
    var groupEl = _createAndAdd("g", groupData.params, [], parent);
    _addStyles(groupEl, groupData.params.styles);
    groupData.params.drawParams.primitives.forEach(function (p) { return drawPrimitive(p, groupEl); });
}
function _createAndAdd(elementTag, data, attributes, parent) {
    if (parent === void 0) { parent = canvas; }
    var element = document.createElementNS(svgNs, elementTag);
    _setAttributes(element, data.drawParams, attributes);
    _addStyles(element, data.styles);
    _addTransform(element, data.transform);
    parent.appendChild(element);
    return element;
}
function _setAttributes(element, data, attributes) {
    attributes.forEach(function (a) {
        element.setAttribute(a, data[a]);
    });
}
function _addStyles(element, styles) {
    if (styles) {
        if (styles.stroke) {
            element.style.stroke = styles.stroke;
            element.style.strokeWidth = styles.strokeWidth;
        }
        if (styles.fill) {
            element.style.fill = styles.fill;
        }
        else {
            element.style.fill = "none";
        }
    }
}
function _addTransform(element, transform) {
    if (transform) {
        var transformAsSvgString = transform.transformOps.reduce(function (acc, item, index) {
            if (index !== 0) {
                return acc + " " + _transformOpAsSvgString(item);
            }
            else {
                return acc + _transformOpAsSvgString(item);
            }
        }, "");
        element.setAttribute("transform", transformAsSvgString);
    }
}
function _transformOpAsSvgString(transformOp) {
    switch (transformOp.type) {
        case TransformOps.ROTATE:
            return _rotateAsSvgString(transformOp);
        case TransformOps.SCALE:
            return _scaleAsSvgString(transformOp);
        case TransformOps.SKEW:
            return _skewAsSvgString(transformOp);
        case TransformOps.TRANSLATE:
            return _translateAsSvgString(transformOp);
    }
}
function _rotateAsSvgString(rotate) {
    return "rotate(" + rotate.a + " " + rotate.x + " " + rotate.y + ")";
}
function _scaleAsSvgString(scale) {
    return "scale(" + scale.x + " " + scale.y + ")";
}
function _skewAsSvgString(skew) {
    var skewString = "";
    if (skew.x) {
        skewString = "skewX(" + skew.x + ")";
    }
    if (skew.y) {
        var maybeSpace = skewString.length > 0
            ? " "
            : "";
        skewString = skewString + maybeSpace + ("skewY(" + skew.y + ")");
    }
    return skewString;
}
function _translateAsSvgString(translate) {
    return "translate(" + translate.x + " " + translate.y + ")";
}
export default {
    init: init,
    drawPrimitives: drawPrimitives,
    drawText: drawText,
    drawEllipse: drawEllipse,
    drawRect: drawRect,
    drawLine: drawLine,
    drawPolygon: drawPolygon,
    drawPath: drawPath,
    drawGroup: drawGroup
};
//# sourceMappingURL=svgRenderingContext.js.map