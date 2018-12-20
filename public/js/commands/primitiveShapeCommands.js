var COMMAND_NAMES = Object.freeze({
    DRAW_TEXT: 'draw_text',
    DRAW_ELLIPSE: 'draw_ellipse',
    DRAW_RECT: 'draw_rect',
    DRAW_LINE: 'draw_line',
    DRAW_POLYLINE: 'draw_polyline',
    DRAW_POLYGON: 'draw_polygon',
    DRAW_PATH: 'draw_path',
    DRAW_GROUP: 'draw_group'
});
function drawText(id, drawParams, styles, transform) {
    var params = {
        id: id,
        drawParams: drawParams,
        styles: styles,
        transform: transform
    };
    return {
        name: COMMAND_NAMES.DRAW_TEXT,
        params: params
    };
}
function drawEllipse(id, drawParams, styles, transform) {
    var params = {
        id: id,
        drawParams: drawParams,
        styles: styles,
        transform: transform
    };
    return {
        name: COMMAND_NAMES.DRAW_ELLIPSE,
        params: params
    };
}
function drawRect(id, drawParams, styles, transform) {
    var params = {
        id: id,
        drawParams: drawParams,
        styles: styles,
        transform: transform
    };
    return {
        name: COMMAND_NAMES.DRAW_RECT,
        params: params
    };
}
function drawLine(id, drawParams, styles, transform) {
    var params = {
        id: id,
        drawParams: drawParams,
        styles: styles,
        transform: transform
    };
    return {
        name: COMMAND_NAMES.DRAW_LINE,
        params: params
    };
}
function drawPolyline(id, drawParams, styles, transform) {
    var params = {
        id: id,
        drawParams: drawParams,
        styles: styles,
        transform: transform
    };
    return {
        name: COMMAND_NAMES.DRAW_POLYLINE,
        params: params
    };
}
function drawPolygon(id, drawParams, styles, transform) {
    var params = {
        id: id,
        drawParams: drawParams,
        styles: styles,
        transform: transform
    };
    return {
        name: COMMAND_NAMES.DRAW_POLYGON,
        params: params
    };
}
function drawPath(id, drawParams, styles, transform) {
    var params = {
        id: id,
        drawParams: drawParams,
        styles: styles,
        transform: transform
    };
    return {
        name: COMMAND_NAMES.DRAW_PATH,
        params: params
    };
}
var SEGMENT_TYPES = Object.freeze({
    MOVE_TO: "move_to",
    LINE_TO: 'line_to',
    BEZIER_CURVE_TO: 'bezier_curve_to',
    QUADRATIC_CURVE_TO: 'quadratic_curve_to'
});
function moveToPathSegment(x, y) {
    return {
        type: SEGMENT_TYPES.MOVE_TO,
        x: x,
        y: y
    };
}
function linePathSegment(toX, toY) {
    return {
        type: SEGMENT_TYPES.LINE_TO,
        toX: toX,
        toY: toY
    };
}
function bezierCurvePathSegment(cp1x, cp1y, cp2x, cp2y, toX, toY) {
    return {
        type: SEGMENT_TYPES.BEZIER_CURVE_TO,
        cp1x: cp1x,
        cp1y: cp1y,
        cp2x: cp2x,
        cp2y: cp2y,
        toX: toX,
        toY: toY
    };
}
function quadraticCurvePathSegment(cpx, cpy, toX, toY) {
    return {
        type: SEGMENT_TYPES.QUADRATIC_CURVE_TO,
        cpx: cpx,
        cpy: cpy,
        toX: toX,
        toY: toY
    };
}
function drawGroup(id, drawParams, styles, transform) {
    var params = {
        id: id,
        drawParams: drawParams,
        styles: styles,
        transform: transform
    };
    return {
        name: COMMAND_NAMES.DRAW_GROUP,
        params: params
    };
}
var TransformOps;
(function (TransformOps) {
    TransformOps["TRANSLATE"] = "translate";
    TransformOps["ROTATE"] = "rotate";
    TransformOps["SCALE"] = "scale";
    TransformOps["SKEW"] = "skew";
})(TransformOps || (TransformOps = {}));
function translate(x, y) {
    return {
        type: TransformOps.TRANSLATE,
        x: x,
        y: y
    };
}
function rotate(a, x, y) {
    return {
        type: TransformOps.ROTATE,
        a: a,
        x: x,
        y: y
    };
}
function scale(x, y) {
    return {
        type: TransformOps.SCALE,
        x: x,
        y: y
    };
}
function skew(x, y) {
    return {
        type: TransformOps.SKEW,
        x: x,
        y: y
    };
}
export { COMMAND_NAMES, drawGroup, drawText, drawEllipse, drawRect, drawLine, drawPolyline, drawPolygon, drawPath, SEGMENT_TYPES, moveToPathSegment, linePathSegment, bezierCurvePathSegment, quadraticCurvePathSegment, TransformOps, translate, rotate, scale, skew };
//# sourceMappingURL=primitiveShapeCommands.js.map