import canvasRenderingContext from './canvasRenderingContext.js';
import svgRenderingContext from './svgRenderingContext.js';

enum RenderingContextTypes {
  Canvas = "Canvas",
  Svg = "Svg"
}

const RenderingContextLoader = Object.freeze({
  load: function(type: string) {
    switch (type) {
      case RenderingContextTypes.Canvas:
        return canvasRenderingContext;
      case RenderingContextTypes.Svg:
        return svgRenderingContext;
      default:
        throw `Unknown rendering context type: ${type}`;
    }
  }
});

export {
  RenderingContextTypes,
  RenderingContextLoader,
}