import canvasRenderingContext from './canvasRenderingContext.js';
import svgRenderingContext from './svgRenderingContext.js';
var RenderingContextTypes;
(function (RenderingContextTypes) {
    RenderingContextTypes["Canvas"] = "Canvas";
    RenderingContextTypes["Svg"] = "Svg";
})(RenderingContextTypes || (RenderingContextTypes = {}));
var RenderingContextLoader = Object.freeze({
    load: function (type) {
        switch (type) {
            case RenderingContextTypes.Canvas:
                return canvasRenderingContext;
            case RenderingContextTypes.Svg:
                return svgRenderingContext;
            default:
                throw "Unknown rendering context type: " + type;
        }
    }
});
export { RenderingContextTypes, RenderingContextLoader, };
//# sourceMappingURL=renderingContexts.js.map