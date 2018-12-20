import { drawPath, quadraticCurvePathSegment } from "../primitiveShapeCommands.js";
function drawWave(id, drawParams, styles, transform) {
    var segments = [
        quadraticCurvePathSegment(drawParams.startX + drawParams.waveLength / 2, drawParams.startY + drawParams.amplitude, drawParams.startX + drawParams.waveLength, drawParams.startY)
    ];
    for (var i = 1; i < drawParams.numCycles; i++) {
        segments.push(quadraticCurvePathSegment(segments[i - 1].toX + drawParams.waveLength / 2, segments[i - 1].toY + drawParams.amplitude, segments[i - 1].toX + drawParams.waveLength, segments[i - 1].toY));
    }
    return drawPath(id, { startX: drawParams.startX, startY: drawParams.startY, segments: segments }, styles, transform);
}
export { drawWave };
//# sourceMappingURL=wave.js.map